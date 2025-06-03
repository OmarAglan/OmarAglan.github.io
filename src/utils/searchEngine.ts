import { BlogPost } from '../types/index';

export interface SearchResult extends BlogPost {
  score: number;
  highlights: {
    title?: string;
    excerpt?: string;
    content?: string;
  };
}

export interface SearchOptions {
  includeContent?: boolean;
  fuzzyMatch?: boolean;
  minScore?: number;
  maxResults?: number;
}

export class BlogSearchEngine {
  private posts: BlogPost[];
  private searchIndex: Map<string, Set<string>> = new Map();

  constructor(posts: BlogPost[]) {
    this.posts = posts;
    this.buildSearchIndex();
  }

  private buildSearchIndex() {
    this.posts.forEach(post => {
      const words = this.extractWords([
        post.title,
        post.excerpt,
        post.content,
        ...post.tags,
        post.category
      ].join(' '));

      words.forEach(word => {
        if (!this.searchIndex.has(word)) {
          this.searchIndex.set(word, new Set());
        }
        this.searchIndex.get(word)!.add(post.id);
      });
    });
  }

  private extractWords(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
  }

  private calculateScore(post: BlogPost, query: string): number {
    const searchTerms = this.extractWords(query);
    let score = 0;

    searchTerms.forEach(term => {
      // Title matches (highest weight)
      if (post.title.toLowerCase().includes(term)) {
        score += 10;
      }

      // Tag matches (high weight)
      if (post.tags.some(tag => tag.toLowerCase().includes(term))) {
        score += 8;
      }

      // Category matches (medium weight)
      if (post.category.toLowerCase().includes(term)) {
        score += 6;
      }

      // Excerpt matches (medium weight)
      if (post.excerpt.toLowerCase().includes(term)) {
        score += 4;
      }

      // Content matches (lower weight)
      if (post.content.toLowerCase().includes(term)) {
        score += 2;
      }

      // Fuzzy matching for search index
      this.searchIndex.forEach((postIds, indexedWord) => {
        if (indexedWord.includes(term) && postIds.has(post.id)) {
          score += 1;
        }
      });
    });

    return score;
  }

  private highlightText(text: string, query: string): string {
    const searchTerms = this.extractWords(query);
    let highlightedText = text;

    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });

    return highlightedText;
  }

  public search(query: string, options: SearchOptions = {}): SearchResult[] {
    const {
      includeContent = true,
      fuzzyMatch = true,
      minScore = 1,
      maxResults = 20
    } = options;

    if (!query.trim()) {
      return [];
    }

    const results: SearchResult[] = [];

    this.posts.forEach(post => {
      const score = this.calculateScore(post, query);
      
      if (score >= minScore) {
        const highlights = {
          title: this.highlightText(post.title, query),
          excerpt: this.highlightText(post.excerpt, query),
          ...(includeContent && {
            content: this.highlightText(
              post.content.substring(0, 200) + '...',
              query
            )
          })
        };

        results.push({
          ...post,
          score,
          highlights
        });
      }
    });

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
  }

  public getSuggestions(query: string, limit: number = 5): string[] {
    const searchTerms = this.extractWords(query);
    const suggestions = new Set<string>();

    if (searchTerms.length === 0) {
      return [];
    }

    const lastTerm = searchTerms[searchTerms.length - 1];

    // Find words that start with the last term
    this.searchIndex.forEach((postIds, indexedWord) => {
      if (indexedWord.startsWith(lastTerm) && indexedWord !== lastTerm) {
        const suggestion = searchTerms.slice(0, -1).concat(indexedWord).join(' ');
        suggestions.add(suggestion);
      }
    });

    // Add tag and category suggestions
    this.posts.forEach(post => {
      post.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lastTerm)) {
          suggestions.add(tag);
        }
      });

      if (post.category.toLowerCase().includes(lastTerm)) {
        suggestions.add(post.category);
      }
    });

    return Array.from(suggestions).slice(0, limit);
  }

  public getPopularSearchTerms(): string[] {
    // In a real app, this would come from analytics
    // For now, return common terms from the content
    const termFrequency = new Map<string, number>();

    this.searchIndex.forEach((postIds, term) => {
      termFrequency.set(term, postIds.size);
    });

    return Array.from(termFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([term]) => term);
  }
}

// Utility functions for search highlighting
export function stripHighlights(text: string): string {
  return text.replace(/<\/?mark>/g, '');
}

export function extractSnippet(content: string, query: string, maxLength: number = 200): string {
  const extractWords = (text: string): string[] => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
  };

  const searchTerms = extractWords(query);
  const lowerContent = content.toLowerCase();
  
  // Find the first occurrence of any search term
  let firstIndex = content.length;
  searchTerms.forEach((term: string) => {
    const index = lowerContent.indexOf(term.toLowerCase());
    if (index !== -1 && index < firstIndex) {
      firstIndex = index;
    }
  });

  // Extract snippet around the first occurrence
  const start = Math.max(0, firstIndex - maxLength / 2);
  const end = Math.min(content.length, start + maxLength);
  
  let snippet = content.substring(start, end);
  
  // Clean up the snippet
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';
  
  return snippet;
}
