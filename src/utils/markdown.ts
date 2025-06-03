// src/utils/markdown.ts
// IMPROVED BLOG POST PARSING

import fs from 'fs';
import path from 'path';
import { BlogPost, BlogCategory } from '../types/index';

const BLOG_DIRECTORY = path.join(process.cwd(), 'src/data/posts');

// Calculate estimated read time based on word count
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

// Generate excerpt from markdown content
const generateExcerpt = (content: string, maxLength: number = 150): string => {
  // Remove markdown syntax for a cleaner excerpt
  const cleanContent = content
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
    .trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  // Find the last complete word within the limit
  const truncated = cleanContent.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > 0 
    ? truncated.slice(0, lastSpaceIndex) + '...'
    : truncated + '...';
};

// Parse YAML-like frontmatter more robustly
const parseFrontMatter = (frontMatter: string): Record<string, any> => {
  const metadata: Record<string, any> = {};
  
  frontMatter.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) return; // Skip empty lines and comments
    
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) return;
    
    const key = trimmedLine.slice(0, colonIndex).trim();
    const value = trimmedLine.slice(colonIndex + 1).trim();
    
    if (!key || !value) return;
    
    // Parse different value types
    if (key === 'tags') {
      // Handle both array format and comma-separated
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          metadata.tags = JSON.parse(value.replace(/'/g, '"'));
        } catch {
          metadata.tags = value.slice(1, -1).split(',').map(tag => tag.trim().replace(/['"]/g, ''));
        }
      } else {
        metadata.tags = value.split(',').map(tag => tag.trim().replace(/['"]/g, ''));
      }
    } else if (key === 'featured' || key === 'published' || key === 'draft') {
      metadata[key] = value.toLowerCase() === 'true';
    } else if (key === 'date' || key === 'publishDate' || key === 'lastmod') {
      // Validate and normalize date format
      const date = new Date(value.replace(/['"]/g, ''));
      metadata[key] = isNaN(date.getTime()) ? new Date().toISOString().split('T')[0] : value.replace(/['"]/g, '');
    } else if (key === 'weight' || key === 'priority') {
      // Parse numeric values
      const numValue = parseInt(value.replace(/['"]/g, ''), 10);
      metadata[key] = isNaN(numValue) ? 0 : numValue;
    } else {
      // Remove quotes if present and handle multiline values
      metadata[key] = value.replace(/^['"]|['"]$/g, '');
    }
  });
  
  return metadata;
};

export const parseMarkdown = (content: string): Omit<BlogPost, 'id' | 'slug'> => {
  // Support both --- and +++ frontmatter delimiters
  const frontMatterRegex = /^(---|\+\+\+)\n([\s\S]*?)\n(---|\+\+\+)\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  let markdownContent = content;
  let metadata: Record<string, any> = {};

  if (match) {
    const [, , frontMatter, , body] = match;
    metadata = parseFrontMatter(frontMatter);
    markdownContent = body.trim();
  }

  // Generate or use provided values with better defaults
  const title = metadata.title || extractTitleFromContent(markdownContent) || 'Untitled';
  const date = metadata.date || metadata.publishDate || new Date().toISOString().split('T')[0];
  const readTime = metadata.readTime || calculateReadTime(markdownContent);
  const excerpt = metadata.excerpt || metadata.description || generateExcerpt(markdownContent);
  const summary = metadata.summary || excerpt;
  const tags = Array.isArray(metadata.tags) ? metadata.tags : 
               typeof metadata.tags === 'string' ? metadata.tags.split(',').map(t => t.trim()) : [];  const featured = metadata.featured === true;
  
  // Validate and set category with better fallback logic
  const validCategories: BlogCategory[] = [
    'Web Development',
    'Game Development', 
    'UI/UX Design',
    'Tech Tips',
    'Career Insights',
    'Project Showcase',
    'Mobile Development',
    'DevOps & Cloud',
    'AI & Machine Learning',
    'Cybersecurity',
    'Software Architecture'
  ];
  
  let category: BlogCategory = 'Tech Tips'; // Default
  
  // Try to match category from metadata
  if (metadata.category && validCategories.includes(metadata.category as BlogCategory)) {
    category = metadata.category as BlogCategory;
  } else if (metadata.categories && Array.isArray(metadata.categories) && metadata.categories.length > 0) {
    // Try first valid category from categories array
    const validCategory = metadata.categories.find(cat => validCategories.includes(cat as BlogCategory));
    if (validCategory) category = validCategory as BlogCategory;
  } else {
    // Infer category from tags
    const tagCategoryMap: Record<string, BlogCategory> = {
      'React': 'Web Development',
      'TypeScript': 'Web Development',
      'JavaScript': 'Web Development',
      'HTML': 'Web Development',
      'CSS': 'Web Development',
      'Unity': 'Game Development',
      'C#': 'Game Development',
      'Game Design': 'Game Development',
      'UX': 'UI/UX Design',
      'UI': 'UI/UX Design',
      'Design': 'UI/UX Design',
      'Mobile': 'Mobile Development',
      'iOS': 'Mobile Development',
      'Android': 'Mobile Development',
      'DevOps': 'DevOps & Cloud',
      'Cloud': 'DevOps & Cloud',
      'AWS': 'DevOps & Cloud',
      'Docker': 'DevOps & Cloud',
      'AI': 'AI & Machine Learning',
      'ML': 'AI & Machine Learning',
      'Security': 'Cybersecurity'
    };
    
    for (const tag of tags) {
      if (tagCategoryMap[tag]) {
        category = tagCategoryMap[tag];
        break;
      }
    }
  }
  return {
    title,
    date,
    category,
    tags,
    readTime,
    excerpt,
    summary,
    content: markdownContent,
    featured
  };
};

// Helper function to extract title from content if not in frontmatter
const extractTitleFromContent = (content: string): string | null => {
  const lines = content.trim().split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      return trimmed.slice(2).trim();
    }
  }
  return null;
};

export const getBlogPosts = (): BlogPost[] => {
  try {
    if (!fs.existsSync(BLOG_DIRECTORY)) {
      console.warn(`Blog directory not found: ${BLOG_DIRECTORY}`);
      return [];
    }

    const files = fs.readdirSync(BLOG_DIRECTORY);
    
    const posts = files
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        try {
          const filePath = path.join(BLOG_DIRECTORY, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const post = parseMarkdown(fileContents);
          const slug = filename.replace(/\.md$/, '');
          
          return {
            ...post,
            id: slug,
            slug
          };
        } catch (error) {
          console.error(`Error parsing blog post ${filename}:`, error);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

    return posts;
  } catch (error) {
    console.error('Error reading blog posts directory:', error);
    return [];
  }
};

export const getBlogPost = (id: string): BlogPost | null => {
  try {
    const filePath = path.join(BLOG_DIRECTORY, `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`Blog post not found: ${filePath}`);
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const post = parseMarkdown(fileContents);
    
    return {
      ...post,
      id,
      slug: id
    };
  } catch (error) {
    console.error(`Error fetching blog post ${id}:`, error);
    return null;
  }
};

// Additional utility functions for better blog management

export const validateBlogPost = (post: Partial<BlogPost>): string[] => {
  const errors: string[] = [];
  
  if (!post.title?.trim()) {
    errors.push('Title is required');
  }
  
  if (!post.content?.trim()) {
    errors.push('Content is required');
  }
  
  if (!post.date) {
    errors.push('Date is required');
  } else {
    const date = new Date(post.date);
    if (isNaN(date.getTime())) {
      errors.push('Invalid date format');
    }
  }
  
  if (!post.category) {
    errors.push('Category is required');
  }
  
  if (!Array.isArray(post.tags)) {
    errors.push('Tags must be an array');
  }
  
  return errors;
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};