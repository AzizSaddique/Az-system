import React from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      key={location.pathname}
      className={`w-full flex-grow flex flex-col ${shouldReduceMotion ? '' : 'animate-page-enter'} ${className}`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
