import { memo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackButtonProps } from '../types';
import './BackButton.css';

/**
 * BackButton Component
 * 
 * A button component that navigates back to the previous page.
 * Uses framer-motion for smooth animations.
 * 
 * @param {BackButtonProps} props - The component props
 * @returns {JSX.Element} The rendered BackButton component
 */
const BackButton = memo(({ className = '' }: BackButtonProps): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(-1);
  };

  return (
    <motion.button
      className={`back-button ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      <span>Back</span>
    </motion.button>
  );
});

BackButton.displayName = 'BackButton';

export default BackButton;
