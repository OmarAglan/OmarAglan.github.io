import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 'getting-started-with-game-dev',
    title: 'Getting Started with Game Development',
    summary: 'My journey into game development and key learnings along the way.',
    date: '2024-01-15',
    readTime: '5 min read',
    tags: ['Game Dev', 'Unity', 'Beginner'],
    content: `
      Game development is an exciting journey that combines creativity with technical skills. Here's my story and what I've learned along the way.

      The Beginning
      -------------
      I started my game development journey with Unity, drawn to its powerful features and extensive community support. The first steps were both challenging and rewarding.

      Key Learnings
      ------------
      • Start Small: Begin with simple projects to build confidence
      • Learn the Fundamentals: Understanding core programming concepts is crucial
      • Join Communities: The game dev community is incredibly supportive
      • Practice Regularly: Consistency is key to improvement

      Tools and Resources
      -----------------
      Here are some essential tools and resources that helped me:
      • Unity Game Engine
      • Visual Studio Code
      • Unity Asset Store
      • Game Development Forums

      Future Goals
      -----------
      I'm continuing to expand my skills in:
      • Advanced Game Mechanics
      • 3D Modeling
      • Shader Programming
      • Game Design Patterns

      Stay tuned for more updates on my game development journey!
    `
  },
  {
    id: 'web-development-best-practices',
    title: 'Web Development Best Practices',
    summary: 'Essential practices I follow for clean and maintainable code.',
    date: '2024-01-22',
    readTime: '4 min read',
    tags: ['Web Dev', 'React', 'TypeScript'],
    content: `
      After years of web development, I've learned that following certain practices can significantly improve code quality and maintainability.

      Type Safety with TypeScript
      -------------------------
      TypeScript has become an essential tool in my development workflow. Here's why:
      • Catch errors early in development
      • Better IDE support and autocompletion
      • Improved code documentation
      • Enhanced refactoring capabilities

      Component Architecture
      --------------------
      When building React applications, I follow these principles:
      • Single Responsibility
      • DRY (Don't Repeat Yourself)
      • Composition over Inheritance
      • Proper State Management

      Performance Optimization
      ---------------------
      Key areas I focus on:
      • Code splitting
      • Lazy loading
      • Memoization
      • Bundle size optimization

      Testing Strategies
      ----------------
      A robust testing strategy includes:
      • Unit Tests
      • Integration Tests
      • End-to-End Tests
      • Performance Tests

      Stay tuned for more web development insights!
    `
  }
];
