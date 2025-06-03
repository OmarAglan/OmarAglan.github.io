// src/App.tsx
// EDITED FILE CONTENT

import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { LoadingState } from './components/LoadingState/LoadingState';
import { ThemeProvider } from './contexts/ThemeContext';
import { ReadingProgress } from './components/ReadingProgress/ReadingProgress';
import Header from './components/Header';
import WaveBackground from './components/WaveBackground';
import BlogSection from './components/Blog/BlogSection';
import VideoButton from './components/VideoButton';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer';
import BlogPage from './pages/BlogPage';
import { projects } from './data/projects';
import './App.css';

// Lazy load components
const FullStackPortfolio = lazy(() => import('./components/FullStackPortfolio'));
const GameDevPortfolio = lazy(() => import('./components/GameDevPortfolio'));
// Use the more advanced BlogPost component from src/components/Blog
const BlogPost = lazy(() => import('./components/Blog/BlogPost'));
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));

const HomePage = () => (
  <div className="home-container">
    <AboutMe />
    <div className="section-divider" />
    <motion.div 
      className="projects-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {projects.map((project) => (
        <VideoButton
          key={project.id}
          videoUrl={project.videoUrl}
          buttonText={project.buttonText}
          className={`project-button ${project.category}`}
          projectPath={project.path}
        />
      ))}
    </motion.div>
    <div className="section-divider" />
    <Contact />
    <div className="section-divider" />
    <BlogSection />
  </div>
);

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <Suspense fallback={<LoadingState isLoading={true}><div>Loading...</div></LoadingState>}>
        <Router>
          <div className="app-container">
            <ReadingProgress />
            <WaveBackground />
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio/fullstack" element={<FullStackPortfolio />} />
                <Route path="/portfolio/gamedev" element={<GameDevPortfolio />} />
                <Route path="/blog" element={<BlogPage />} />
                {/* UPDATED Route to use AdvancedBlogPost and its expected param 'postId' */}
                <Route path="/blog/:postId" element={<BlogPost />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </Suspense>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
