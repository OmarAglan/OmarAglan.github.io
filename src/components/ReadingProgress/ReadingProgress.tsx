import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ReadingProgress.css';

interface ReadingProgressProps {
  targetRef?: React.RefObject<HTMLElement>;
  showPercentage?: boolean;
  className?: string;
}

export function ReadingProgress({ 
  targetRef, 
  showPercentage = false, 
  className = '' 
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      const target = targetRef?.current || document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = target.scrollHeight - window.innerHeight;
      
      if (scrollHeight <= 0) {
        setProgress(0);
        setIsVisible(false);
        return;
      }
      
      const currentProgress = Math.min((scrollTop / scrollHeight) * 100, 100);
      setProgress(currentProgress);
      setIsVisible(scrollTop > 100); // Show after 100px scroll
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll);
    calculateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);

  return (
    <motion.div
      className={`reading-progress ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="reading-progress-track">
        <motion.div
          className="reading-progress-fill"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      {showPercentage && (
        <span className="reading-progress-text">
          {Math.round(progress)}%
        </span>
      )}
    </motion.div>
  );
}

// Circular reading progress variant
export function CircularReadingProgress({ 
  targetRef, 
  size = 60,
  strokeWidth = 4,
  className = '' 
}: ReadingProgressProps & { size?: number; strokeWidth?: number }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      const target = targetRef?.current || document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = target.scrollHeight - window.innerHeight;
      
      if (scrollHeight <= 0) {
        setProgress(0);
        setIsVisible(false);
        return;
      }
      
      const currentProgress = Math.min((scrollTop / scrollHeight) * 100, 100);
      setProgress(currentProgress);
      setIsVisible(scrollTop > 100);
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll);
    calculateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);

  const circumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className={`circular-reading-progress ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{ duration: 0.3 }}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="progress-ring">
        <circle
          className="progress-ring-background"
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth / 2}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          className="progress-ring-progress"
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth / 2}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.3 }}
        />
      </svg>
      <div className="progress-percentage">
        {Math.round(progress)}%
      </div>
    </motion.div>
  );
}

// Reading time estimator component
interface ReadingTimeProps {
  content: string;
  wordsPerMinute?: number;
  className?: string;
}

export function ReadingTime({ 
  content, 
  wordsPerMinute = 200, 
  className = '' 
}: ReadingTimeProps) {
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return (
    <span className={`reading-time ${className}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
      {readingTime} min read • {wordCount.toLocaleString()} words
    </span>
  );
}

// Estimated reading time remaining component
export function ReadingTimeRemaining({ 
  content, 
  progress, 
  wordsPerMinute = 200,
  className = '' 
}: ReadingTimeProps & { progress: number }) {
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const totalReadingTime = wordCount / wordsPerMinute;
  const timeRemaining = Math.max(0, totalReadingTime * (1 - progress / 100));
  
  const formatTime = (minutes: number) => {
    if (minutes < 1) {
      return 'Less than 1 min remaining';
    }
    return `${Math.ceil(minutes)} min remaining`;
  };

  return (
    <span className={`reading-time-remaining ${className}`}>
      {formatTime(timeRemaining)}
    </span>
  );
}
