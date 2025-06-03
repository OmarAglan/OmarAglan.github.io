// src/types/index.ts
// THIS IS THE NEW CONTENT FOR THIS FILE

import { ReactNode } from 'react';

// --- Component Props ---
export interface VideoButtonProps {
  videoUrl: string;
  buttonText: string;
  className?: string;
  projectPath: string;
}

export interface LoadingStateProps {
  isLoading: boolean;
  children: ReactNode;
  loadingText?: string;
}

export interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

export interface WaveBackgroundProps {
  className?: string;
  children?: ReactNode; // Kept from src/types.ts, though not currently used in WaveBackground.tsx
}

// Note: HeaderProps, PortfolioProps, AnimationProps, AppState, ApiResponse, RouteParams
// from the original src/types/index.ts were very generic or not clearly used by existing
// components. They can be re-added if a specific need arises.
// The Project type was also very generic and conflicted with more specific project types
// in data files. It's better to define project types closer to their data or use
// more specific names if they are to be shared.

// --- Blog Related Types ---
// These type definitions are now the single source of truth.
// The actual data arrays (like blogCategories, sortOptions) remain in src/data/blogPosts.ts

export type BlogCategory =
  | 'Web Development'
  | 'Game Development'
  | 'UI/UX Design'
  | 'Tech Tips'
  | 'Technical'
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
  content: string; // This will be the raw markdown string
  featured: boolean;
  slug: string;
  summary: string;
}

export type SortOption =
  | 'date-desc'
  | 'date-asc'
  | 'title-asc'
  | 'title-desc';