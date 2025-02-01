import { memo } from 'react';
import { motion } from 'framer-motion';
import { WaveBackgroundProps } from '../types';
import './WaveBackground.css';

/**
 * WaveBackground Component
 * 
 * A decorative background component that displays animated waves.
 * Uses framer-motion for smooth animations.
 * 
 * @param {WaveBackgroundProps} props - The component props
 * @returns {JSX.Element} The rendered WaveBackground component
 */
const WaveBackground = memo(({ className = '' }: WaveBackgroundProps): JSX.Element => {
  return (
    <motion.div
      className={`wave-background ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="wave wave1" />
      <div className="wave wave2" />
      <div className="wave wave3" />
      <div className="wave wave4" />
    </motion.div>
  );
});

WaveBackground.displayName = 'WaveBackground';

export default WaveBackground;
