import { motion } from 'framer-motion';
import BackButton from './BackButton';
import './Portfolio.css';

const GameDevPortfolio = () => {
  return (
    <motion.div
      className="portfolio-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackButton />
      <h1>Game Development Portfolio</h1>
      <div className="portfolio-content">
        {/* Add your game development portfolio content here */}
        <div className="portfolio-grid">
          {/* Add your projects here */}
        </div>
      </div>
    </motion.div>
  );
};

export default GameDevPortfolio;
