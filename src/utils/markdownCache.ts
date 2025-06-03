// src/utils/markdownCache.ts
// Performance optimization and caching for markdown content

import { parseContent, type ParsedSection } from './contentParser';
import { parseFrontmatter } from './markdown';

interface CacheEntry {
  content: ParsedSection[];
  frontmatter: any;
  timestamp: number;
  contentHash: string;
}

class MarkdownCache {
  private cache = new Map<string, CacheEntry>();
  private readonly maxAge = 5 * 60 * 1000; // 5 minutes
  private readonly maxSize = 100; // Maximum number of cached entries

  private generateHash(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  private isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > this.maxAge;
  }

  private evictOldEntries(): void {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entries
      const entries = Array.from(this.cache.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp);
      
      const toRemove = entries.slice(0, Math.floor(this.maxSize * 0.2));
      toRemove.forEach(([key]) => this.cache.delete(key));
    }
  }

  public parseWithCache(postId: string, rawContent: string): {
    content: ParsedSection[];
    frontmatter: any;
  } {
    const contentHash = this.generateHash(rawContent);
    const cached = this.cache.get(postId);

    // Check if we have a valid cached entry
    if (cached && !this.isExpired(cached) && cached.contentHash === contentHash) {
      return {
        content: cached.content,
        frontmatter: cached.frontmatter
      };
    }

    // Parse the content
    const { frontmatter, content } = parseFrontmatter(rawContent);
    const parsedContent = parseContent(content);

    // Cache the result
    this.evictOldEntries();
    this.cache.set(postId, {
      content: parsedContent,
      frontmatter,
      timestamp: Date.now(),
      contentHash
    });

    return {
      content: parsedContent,
      frontmatter
    };
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public getCacheStats(): {
    size: number;
    maxSize: number;
    entries: Array<{ postId: string; timestamp: number; expired: boolean }>;
  } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      entries: Array.from(this.cache.entries()).map(([postId, entry]) => ({
        postId,
        timestamp: entry.timestamp,
        expired: this.isExpired(entry)
      }))
    };
  }
}

// Singleton instance
export const markdownCache = new MarkdownCache();

// Utility function to preload frequently accessed posts
export const preloadPosts = async (postIds: string[], getContent: (id: string) => string) => {
  const promises = postIds.map(async (postId) => {
    try {
      const content = getContent(postId);
      markdownCache.parseWithCache(postId, content);
    } catch (error) {
      console.warn(`Failed to preload post ${postId}:`, error);
    }
  });

  await Promise.all(promises);
};

// Enhanced error handling for markdown parsing
export const safeParseMarkdown = (postId: string, rawContent: string): {
  content: ParsedSection[];
  frontmatter: any;
  error?: string;
} => {
  try {
    return markdownCache.parseWithCache(postId, rawContent);
  } catch (error) {
    console.error(`Error parsing markdown for post ${postId}:`, error);
    
    // Return safe fallback
    return {
      content: [{
        type: 'paragraph',
        content: ['Error parsing content. Please check the markdown format.'],
        meta: {}
      }],
      frontmatter: {
        title: 'Error Loading Post',
        date: new Date().toISOString().split('T')[0],
        excerpt: 'There was an error loading this post.'
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Debounced search function for real-time content filtering
export const createDebouncedSearch = (
  searchFn: (query: string) => void,
  delay: number = 300
) => {
  let timeoutId: NodeJS.Timeout;
  
  return (query: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => searchFn(query), delay);
  };
};

// Memory usage monitoring (development only)
export const getMemoryUsage = (): {
  cacheSize: number;
  jsHeapSizeLimit?: number;
  usedJSHeapSize?: number;
} => {
  const stats = markdownCache.getCacheStats();
  
  return {
    cacheSize: stats.size,
    ...(typeof window !== 'undefined' && 'performance' in window && 'memory' in (window.performance as any) 
      ? {
          jsHeapSizeLimit: (window.performance as any).memory.jsHeapSizeLimit,
          usedJSHeapSize: (window.performance as any).memory.usedJSHeapSize
        }
      : {})
  };
};
