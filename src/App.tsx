import { motion, useScroll, useSpring } from 'framer-motion'; // Import hooks
import type { JSX } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';

function App(): JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-background text-text font-inter antialiased selection:bg-accent/30 selection:text-white"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-highlight origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </motion.main>
  )
}

export default App