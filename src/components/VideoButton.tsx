import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { VideoButtonProps } from '../types';
import './VideoButton.css';

/**
 * VideoButton Component
 * 
 * A button component that displays a video thumbnail and plays the video on hover.
 * Uses framer-motion for smooth animations and transitions.
 * 
 * @param {VideoButtonProps} props - The component props
 * @returns {JSX.Element} The rendered VideoButton component
 */
const VideoButton: React.FC<VideoButtonProps> = memo(({ 
  videoUrl, 
  buttonText, 
  className = '', 
  onClick, 
  projectPath 
}: VideoButtonProps): JSX.Element => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const playVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error: Error) => {
        if (error.name !== 'AbortError') {
          console.error('Error playing video:', error);
        }
      });
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    setIsHovering(true);
    timeoutIdRef.current = setTimeout(playVideo, 100);
  }, [playVideo]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const handleClick = useCallback(() => {
    navigate(projectPath);
  }, [navigate, projectPath]);

  return (
    <motion.div
      className={`video-button-wrapper ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        className="video-button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="button-text">{buttonText}</span>
        <motion.div
          className={`video-overlay ${isHovering && isVideoLoaded ? 'visible' : ''}`}
          animate={{ opacity: isHovering && isVideoLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <video
            ref={videoRef}
            className="video-element"
            src={videoUrl}
            muted
            playsInline
            onLoadedData={handleVideoLoaded}
            loop
          />
        </motion.div>
      </motion.button>
    </motion.div>
  );
});

VideoButton.displayName = 'VideoButton';

export default VideoButton;