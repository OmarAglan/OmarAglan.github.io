export type ProjectCategory = 'All' | '3D Games' | '2D Games' | 'VR/AR' | 'Mobile Games';

export const projectCategories: ProjectCategory[] = ['All', '3D Games', '2D Games', 'VR/AR', 'Mobile Games'];

export interface GameProject {
  id: string;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, 'All'>;
  imageUrl: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  features: string[];
  status: 'Completed' | 'In Development' | 'On Hold';
}

export const gameDevProjects: GameProject[] = [
  {
    id: 'space-explorer',
    title: 'Space Explorer VR',
    description: 'An immersive VR space exploration game where players can navigate through a procedurally generated universe, discover unique planets, and interact with various space phenomena.',
    category: 'VR/AR',
    imageUrl: '/projects/space-explorer.jpg',
    technologies: ['Unity', 'C#', 'VR Toolkit', 'Shader Graph', 'Oculus SDK'],
    demoUrl: 'https://space-explorer-vr.demo',
    githubUrl: 'https://github.com/omaglan/space-explorer',
    videoUrl: '/projects/space-explorer-gameplay.mp4',
    features: [
      'Procedurally generated planets and space environments',
      'Physics-based spacecraft controls',
      'Interactive space phenomena',
      'Dynamic weather systems',
      'Realistic gravitational effects'
    ],
    status: 'In Development'
  },
  {
    id: 'pixel-adventure',
    title: 'Pixel Adventure',
    description: 'A charming 2D platformer with retro-style graphics, featuring a unique time-manipulation mechanic and challenging puzzle elements.',
    category: '2D Games',
    imageUrl: '/projects/pixel-adventure.jpg',
    technologies: ['Unity', 'C#', '2D Animation', 'Pixel Art', 'Cinemachine'],
    demoUrl: 'https://pixel-adventure.demo',
    githubUrl: 'https://github.com/omaglan/pixel-adventure',
    features: [
      'Time manipulation mechanics',
      'Hand-crafted pixel art',
      'Dynamic level generation',
      'Progressive difficulty system',
      'Multiple playable characters'
    ],
    status: 'Completed'
  },
  {
    id: 'dungeon-crawler',
    title: 'Dungeon Crawler RPG',
    description: 'A 3D dungeon crawler RPG with procedurally generated levels, dynamic lighting, and a deep character progression system.',
    category: '3D Games',
    imageUrl: '/projects/dungeon-crawler.jpg',
    technologies: ['Unity', 'C#', 'ProBuilder', 'Universal RP', 'NavMesh'],
    githubUrl: 'https://github.com/omaglan/dungeon-crawler',
    videoUrl: '/projects/dungeon-crawler-demo.mp4',
    features: [
      'Procedural dungeon generation',
      'Dynamic lighting system',
      'Advanced AI pathfinding',
      'Character customization',
      'Inventory management'
    ],
    status: 'In Development'
  },
  {
    id: 'ar-puzzle',
    title: 'AR Puzzle Quest',
    description: 'An augmented reality puzzle game that transforms your surroundings into an interactive puzzle environment.',
    category: 'VR/AR',
    imageUrl: '/projects/ar-puzzle.jpg',
    technologies: ['Unity', 'C#', 'AR Foundation', 'Vuforia', 'Mobile SDK'],
    demoUrl: 'https://ar-puzzle-quest.demo',
    features: [
      'Real-world environment scanning',
      'Interactive AR puzzles',
      'Physics-based interactions',
      'Progressive difficulty',
      'Social features'
    ],
    status: 'Completed'
  },
  {
    id: 'mobile-racer',
    title: 'Neon Racer',
    description: 'A high-speed mobile racing game with neon-styled graphics, featuring multiplayer races and customizable vehicles.',
    category: 'Mobile Games',
    imageUrl: '/projects/neon-racer.jpg',
    technologies: ['Unity', 'C#', 'Mobile Input', 'Photon Networking', 'Post Processing'],
    demoUrl: 'https://neon-racer.demo',
    features: [
      'Real-time multiplayer racing',
      'Vehicle customization',
      'Dynamic track generation',
      'Cross-platform play',
      'Leaderboard system'
    ],
    status: 'In Development'
  }
];
