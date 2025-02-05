export type BlogCategory = 
  | 'Web Development'
  | 'Game Development'
  | 'UI/UX Design'
  | 'Tech Tips'
  | 'Career Insights'
  | 'Project Showcase'
  | 'Mobile Development'
  | 'DevOps & Cloud'
  | 'AI & Machine Learning'
  | 'Cybersecurity'
  | 'Blockchain'
  | 'Software Architecture';

export interface BlogPost {
  id: string;
  title: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content: string;
  featured: boolean;
  slug: string;
  summary: string;
}

export const blogCategories: BlogCategory[] = [
  'Web Development',
  'Game Development',
  'UI/UX Design',
  'Mobile Development',
  'DevOps & Cloud',
  'AI & Machine Learning',
  'Tech Tips',
  'Career Insights',
  'Project Showcase',
  'Cybersecurity',
  'Software Architecture'
];

export const commonTags = [
  'React',
  'TypeScript',
  'JavaScript',
  'Python',
  'Unity',
  'C#',
  'Node.js',
  'AWS',
  'Docker',
  'Kubernetes',
  'CI/CD',
  'Git',
  'Design Patterns',
  'Performance',
  'Security',
  'Testing',
  'Mobile',
  'Web',
  'Backend',
  'Frontend',
  'Database',
  'API',
  'UI',
  'UX',
  'Accessibility',
  'Best Practices'
];

export type SortOption = 
  | 'date-desc'
  | 'date-asc'
  | 'title-asc'
  | 'title-desc';

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' }
];

// Import markdown files
import gameDevContent from './posts/getting-started-game-dev.md?raw';
import webDevContent from './posts/web-development-best-practices.md?raw';
import uxDesignContent from './posts/ux-design-principles.md?raw';

// This will be our central registry of blog posts
export const blogPosts: BlogPost[] = [
  {
    id: 'getting-started-game-dev',
    title: 'Getting Started with Game Development',
    summary: 'A comprehensive guide to beginning your journey in game development.',
    date: '2024-01-15',
    readTime: '8 min read',
    excerpt: 'A comprehensive guide to beginning your journey in game development, covering essential tools and concepts.',
    tags: ['Unity', 'C#', 'Game Design', 'Beginner'],
    content: gameDevContent,
    featured: true,
    slug: 'getting-started-game-dev',
    category: 'Game Development'
  },
  {
    id: 'web-development-best-practices',
    title: 'Modern Web Development Best Practices',
    summary: 'Explore the latest best practices in web development.',
    date: '2024-01-22',
    readTime: '10 min read',
    excerpt: 'Explore the latest best practices in web development, from performance optimization to responsive design.',
    tags: ['React', 'TypeScript', 'Performance', 'Best Practices'],
    content: webDevContent,
    featured: true,
    slug: 'web-development-best-practices',
    category: 'Web Development'
  },
  {
    id: 'ux-design-principles',
    title: 'Essential UX Design Principles',
    summary: 'Learn the fundamental principles of UX design.',
    date: '2024-02-01',
    readTime: '6 min read',
    excerpt: 'Learn the fundamental principles of UX design that can transform your digital products.',
    tags: ['UX', 'Design', 'User Research', 'Prototyping'],
    content: uxDesignContent,
    featured: false,
    slug: 'ux-design-principles',
    category: 'UI/UX Design'
  }
];
