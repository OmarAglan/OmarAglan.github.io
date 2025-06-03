// src/utils/markdown.ts
// EDITED FILE CONTENT

import fs from 'fs';
import path from 'path';
import { BlogPost } from '../types/index'; // Updated import

const BLOG_DIRECTORY = path.join(process.cwd(), 'src/data/posts'); // Corrected directory

export const parseMarkdown = (content: string): BlogPost => {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  // Default structure should match the BlogPost interface from types/index.ts
  const defaultPost: Omit<BlogPost, 'id' | 'slug' | 'category'> & { category?: BlogCategory } = {
    title: 'Untitled',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    readTime: '5 min read',
    content: content, // Will be overwritten if frontmatter exists
    summary: '',
    featured: false,
    excerpt: ''
    // category will be set from frontmatter or a default
  };
  
  let finalCategory: BlogCategory = 'Tech Tips'; // A sensible default category

  if (!match) {
    // If no frontmatter, use content as is and generate basic fields
    const excerpt = content.slice(0, 150) + '...';
    return {
      ...defaultPost,
      id: '', // Or generate one if needed
      slug: '', // Or generate one if needed
      content: content,
      excerpt: excerpt,
      summary: excerpt,
      category: finalCategory, // Assign default category
    };
  }

  const [, frontMatter, markdownContent] = match;
  const metadata: Partial<Omit<BlogPost, 'id' | 'slug' | 'content' | 'excerpt'>> = {};

  frontMatter.split('\n').forEach(line => {
    const [key, ...values] = line.split(':').map(str => str.trim());
    if (key && values.length) {
      const value = values.join(':');
      if (key === 'tags') {
        metadata.tags = value.split(',').map(tag => tag.trim());
      } else if (key === 'featured') {
        metadata.featured = value.toLowerCase() === 'true';
      } else if (key === 'category') {
        finalCategory = value as BlogCategory; // Assume value is a valid BlogCategory
      }
      else {
        // Assign other properties, ensuring they exist on BlogPost
        if (key in defaultPost || key === 'title' || key === 'date' || key === 'readTime' || key === 'summary') {
          (metadata as any)[key] = value;
        }
      }
    }
  });

  const parsedContent = markdownContent.trim();
  const excerpt = metadata.excerpt || parsedContent.slice(0, 150) + '...';
  const summary = metadata.summary || excerpt;

  return {
    id: '', // Will be set by getBlogPosts/getBlogPost
    slug: '', // Will be set by getBlogPosts/getBlogPost
    title: metadata.title || defaultPost.title,
    date: metadata.date || defaultPost.date,
    category: finalCategory,
    tags: metadata.tags || defaultPost.tags,
    readTime: metadata.readTime || defaultPost.readTime,
    content: parsedContent,
    summary: summary,
    featured: metadata.featured !== undefined ? metadata.featured : defaultPost.featured,
    excerpt: excerpt,
  };
};

export const getBlogPosts = (): BlogPost[] => {
  const files = fs.readdirSync(BLOG_DIRECTORY);
  
  return files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(BLOG_DIRECTORY, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const post = parseMarkdown(fileContents);
      const slug = filename.replace(/\.md$/, ''); // Ensure only .md is replaced
      
      return {
        ...post,
        id: slug,
        slug
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
};

export const getBlogPost = (id: string): BlogPost | null => {
  try {
    const filePath = path.join(BLOG_DIRECTORY, `${id}.md`);
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