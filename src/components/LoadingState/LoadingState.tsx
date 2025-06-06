// src/components/LoadingState/LoadingState.tsx
// EDITED FILE CONTENT (Only the import line changes)

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { LoadingStateProps } from '../../types/index'; // Updated import

export const LoadingState = ({
  isLoading,
  children,
  loadingText = 'Loading...'
}: LoadingStateProps) => {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '2rem',
          minHeight: '200px'
        }}
      >
        <LoadingSpinner />
        <p style={{ 
          color: '#4169E1',
          fontWeight: 500
        }}>
          {loadingText}
        </p>
      </motion.div>
    );
  }

  return <>{children}</>;
};