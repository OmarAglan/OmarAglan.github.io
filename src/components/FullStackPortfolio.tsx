import { motion } from 'framer-motion';
import BackButton from './BackButton';
import './Portfolio.css';

const FullStackPortfolio = () => {
  return (
    <motion.div
      className="portfolio-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackButton />
      <h1>Full Stack Portfolio</h1>
      <div className="portfolio-content">
        {/* Add your full stack portfolio content here */}
        <div className="portfolio-grid">
          {/* Add your projects here */}
        </div>
      </div>
    </motion.div>
  );
};

export default FullStackPortfolio;
