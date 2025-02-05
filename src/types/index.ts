// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  thumbnailSrc: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'fullstack' | 'gamedev';
}

// Component Props Types
export interface VideoButtonProps {
  project: Project;
  onClick?: (project: Project) => void;
  className?: string;
}

export interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

export interface HeaderProps {
  className?: string;
}

export interface WaveBackgroundProps {
  className?: string;
}

export interface PortfolioProps {
  projects: Project[];
  category: 'fullstack' | 'gamedev';
}

// Animation Types
export interface AnimationProps {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

// State Types
export interface AppState {
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Route Types
export interface RouteParams {
  category?: string;
  projectId?: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
  featured: boolean;
  slug: string;
  excerpt: string;
}
