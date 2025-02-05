export interface VideoButtonProps {
  videoUrl: string;
  buttonText: string;
  className?: string;
  onClick?: () => void;
  projectPath: string;
}

export interface LoadingStateProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export interface BlogPost {
  title: string;
  date: string;
  slug: string;
  content: string;
  excerpt: string;
  featured?: boolean;
}
