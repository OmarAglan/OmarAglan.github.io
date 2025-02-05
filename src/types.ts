import { ReactNode } from 'react';

export interface VideoButtonProps {
  videoUrl: string;
  buttonText: string;
  className?: string;
  onClick?: () => void;
  projectPath: string;
}

export interface LoadingStateProps {
  isLoading: boolean;
  children: ReactNode;
}

export interface BlogPost {
  title: string;
  date: string;
  slug: string;
  content: string;
  excerpt: string;
  featured?: boolean;
  id?: string;
  readTime?: string;
  tags?: string[];
  summary?: string;
}

export interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

export interface WaveBackgroundProps {
  className?: string;
  children?: ReactNode;
}
