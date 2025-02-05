import fs from 'fs';
import path from 'path';
import { BlogPost } from '../types';

const BLOG_DIRECTORY = path.join(process.cwd(), 'src/content/blog');

export const parseMarkdown = (content: string): BlogPost => {
  // Simple frontmatter parser
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  const defaultPost: BlogPost = {
    id: '',
    title: 'Untitled',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    readTime: '5 min read',
    content: content,
    summary: '',
    featured: false,
    slug: '',
    excerpt: ''
  };

  if (!match) {
    return defaultPost;
  }

  const [, frontMatter, markdownContent] = match;
  const metadata: Partial<BlogPost> = {};

  // Parse front matter
  frontMatter.split('\n').forEach(line => {
    const [key, ...values] = line.split(':').map(str => str.trim());
    if (key && values.length) {
      const value = values.join(':');
      if (key === 'tags') {
        metadata[key] = value.split(',').map(tag => tag.trim());
      } else if (key === 'featured') {
        metadata[key] = value.toLowerCase() === 'true';
      } else {
        const validKey = key as keyof Omit<BlogPost, 'tags' | 'featured'>;
        metadata[validKey] = value;
      }
    }
  });

  const parsedContent = markdownContent.trim();
  const excerpt = parsedContent.slice(0, 150) + '...';

  return {
    ...defaultPost,
    ...metadata,
    content: parsedContent,
    excerpt,
    readTime: metadata.readTime || defaultPost.readTime,
    featured: metadata.featured || false
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
      const slug = filename.replace('.md', '');
      
      return {
        ...post,
        id: slug,
        slug
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.date || '1970-01-01');
      const dateB = new Date(b.date || '1970-01-01');
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
    return null;
  }
};
