import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export const LoadingSpinner = ({ 
  size = 40, 
  color = '#4169E1' 
}: LoadingSpinnerProps) => {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        border: `4px solid ${color}20`,
        borderTop: `4px solid ${color}`,
        borderRadius: '50%',
        margin: 'auto'
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
};
