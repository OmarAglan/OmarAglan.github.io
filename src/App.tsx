import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { LoadingState } from './components/LoadingState/LoadingState';
import Header from './components/Header';
import WaveBackground from './components/WaveBackground';
import BlogSection from './components/Blog/BlogSection';
import VideoButton from './components/VideoButton';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer';
import BlogPage from './pages/BlogPage';
import './App.css';

// Lazy load components
const FullStackPortfolio = lazy(() => import('./components/FullStackPortfolio'));
const GameDevPortfolio = lazy(() => import('./components/GameDevPortfolio'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));

const projects = [
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

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingState />}>
      <Router>
        <div className="app-container">
          <WaveBackground />
          <Header />
          <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio/fullstack" element={<FullStackPortfolio />} />
                <Route path="/portfolio/gamedev" element={<GameDevPortfolio />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
              </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
