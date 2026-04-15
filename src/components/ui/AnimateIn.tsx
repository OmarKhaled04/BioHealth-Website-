// Scroll-triggered fade-in wrapper — animates children when they enter the viewport
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

const directionOffset: Record<NonNullable<AnimateInProps['direction']>, { x: number; y: number }> = {
  up:    { x: 0,   y: 32  },
  down:  { x: 0,   y: -32 },
  left:  { x: 32,  y: 0   },
  right: { x: -32, y: 0   },
  none:  { x: 0,   y: 0   },
};

export function AnimateIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { x, y } = directionOffset[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
