import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  amount?: number | 'some' | 'all';
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.52,
  direction = 'up',
  distance = 24,
  amount = 0.15,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Determine viewport threshold
  const threshold =
    typeof amount === 'number'
      ? amount
      : amount === 'all'
      ? 0.5
      : 0.12;

  // Track viewport intersection directly to ensure bulletproof triggering
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialOffset();

  const variants = {
    hidden: {
      opacity: 0,
      x: initialOffset.x,
      y: initialOffset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      inherit={false}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{
        once,
        amount: threshold,
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
