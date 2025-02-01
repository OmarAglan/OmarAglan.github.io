import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '../types';

const BLOG_DIRECTORY = path.join(process.cwd(), 'src/content/blog');

export const getBlogPosts = (): BlogPost[] => {
  const files = fs.readdirSync(BLOG_DIRECTORY);
  
  const posts = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(BLOG_DIRECTORY, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        id: filename.replace('.md', ''),
        title: data.title,
        date: data.date,
        readTime: data.readTime,
        tags: data.tags,
        summary: data.summary,
        content
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
};

export const getBlogPost = (id: string): BlogPost | null => {
  try {
    const filePath = path.join(BLOG_DIRECTORY, `${id}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      id,
      title: data.title,
      date: data.date,
      readTime: data.readTime,
      tags: data.tags,
      summary: data.summary,
      content
    };
  } catch (error) {
    return null;
  }
};
