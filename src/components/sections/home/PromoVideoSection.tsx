'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

const EASE = [0, 0, 0.2, 1] as const;

export function PromoVideoSection() {
  const t = useTranslations('home.promo');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative bg-violet-900/60 py-24 backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div ref={ref} className="container relative mx-auto px-4">

        {/* Heading */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="block h-px w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              Our Story
            </span>
            <span className="block h-px w-8 bg-amber-400" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h2>
          <motion.p
            className="mt-3 text-base text-violet-200"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
          >
            {t('description')}
          </motion.p>
        </motion.div>

        {/* Video placeholder */}
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          <div className="aspect-video overflow-hidden rounded-2xl border border-white/15 bg-black/30 shadow-2xl">
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-white/10">
                <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm text-white/40">Video coming soon</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
