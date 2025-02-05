export interface Project {
  id: string;
  videoUrl: string;
  buttonText: string;
  category: string;
  path: string;
}

export const projects: Project[] = [
  {
    id: 'fullstack',
    videoUrl: '/assets/videos/fullstack-preview.mp4',
    buttonText: 'Full-Stack Portfolio',
    category: 'fullstack',
    path: '/portfolio/fullstack'
  },
  {
    id: 'gamedev',
    videoUrl: '/assets/videos/gamedev-preview.mp4',
    buttonText: 'Game Development Portfolio',
    category: 'gamedev',
    path: '/portfolio/gamedev'
  }
];
