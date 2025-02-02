interface FullStackProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: 'Web App' | 'Mobile App' | 'API' | 'Desktop App';
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  detailedDescription?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  timeline?: {
    started: string;
    completed?: string;
  };
}

export const fullStackProjects: FullStackProject[] = [
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    description: 'A modern portfolio website built with React and TypeScript, featuring blog functionality and project showcases.',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'CSS'],
    category: 'Web App',
    imageUrl: '/assets/images/portfolio-preview.png',
    githubUrl: 'https://github.com/OmarAglan/OmarAglan.github.io',
    detailedDescription: `
      A personal portfolio website built to showcase my projects and share my experiences through blog posts.
      The website features a modern design with smooth animations and a responsive layout.
    `,
    features: [
      'Responsive design that works on all devices',
      'Blog system with markdown support',
      'Project portfolio with filtering',
      'Dark theme with glassmorphism effects',
      'Smooth page transitions and animations'
    ],
    challenges: [
      'Implementing a robust blog system with code syntax highlighting',
      'Creating a responsive layout that works well on all screen sizes',
      'Optimizing performance and load times'
    ],
    solutions: [
      'Used React Markdown with custom syntax highlighting',
      'Implemented a mobile-first design approach',
      'Utilized code splitting and lazy loading'
    ],
    timeline: {
      started: '2024-01',
      completed: '2024-02'
    }
  }
  // Add more projects here
];

export const projectCategories = ['All', 'Web App', 'Mobile App', 'API', 'Desktop App'] as const;
export type ProjectCategory = typeof projectCategories[number];

export type { FullStackProject };
