// Section heading with optional subtitle — animates in when scrolled into view
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  centered = true,
  className,
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={cn('mb-10', centered && 'text-center', className)}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <motion.p
          className="mt-3 text-lg text-gray-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
