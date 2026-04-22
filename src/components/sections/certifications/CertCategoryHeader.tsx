'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const categoryAccents: Record<string, { gradient: string; bg: string; number: string }> = {
  'food-safety': {
    gradient: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    number: 'text-violet-100',
  },
  quality: {
    gradient: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-50',
    number: 'text-indigo-100',
  },
  halal: {
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    number: 'text-emerald-100',
  },
};

interface Props {
  index: number;
  label: string;
  description: string;
  category: string;
}

export function CertCategoryHeader({ index, label, description, category }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const accent = categoryAccents[category] ?? categoryAccents.quality;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="relative flex items-start gap-5"
    >
      {/* Large decorative number */}
      <div className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${accent.gradient} shadow-lg`}>
        <span className={`absolute text-7xl font-black leading-none ${accent.number} select-none`}>
          {String(index).padStart(2, '0')}
        </span>
        <span className="relative text-xl font-black text-white">{String(index).padStart(2, '0')}</span>
      </div>

      <div className="flex-1 pt-1">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{label}</h2>
          {/* Animated line */}
          <motion.div
            className={`h-[3px] flex-1 rounded-full bg-gradient-to-r ${accent.gradient} opacity-30`}
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </motion.div>
  );
}
