'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

const EASE = [0, 0, 0.2, 1] as const;

const ICONS: Array<() => React.ReactElement> = [
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 3v7.5L6 17.25A2.25 2.25 0 008.25 20h7.5A2.25 2.25 0 0018 17.25L15 10.5V3M9 3h6M9 3H7.5M15 3h1.5" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
];

const ACCENTS = ['#fbbf24', '#34d399', '#818cf8', '#f472b6'] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: EASE },
  }),
};

export function WhyLactonic() {
  const t = useTranslations('home.why');
  const items = t.raw('items') as Array<{ title: string; body: string }>;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative bg-violet-800/50 py-24 backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div ref={ref} className="container mx-auto px-4">

        {/* Heading */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="block h-px w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              {t('eyebrow')}
            </span>
            <span className="block h-px w-8 bg-amber-400" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h2>
          <motion.p
            className="mx-auto mt-3 max-w-xl text-base text-violet-200"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ title, body }, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="flex flex-col rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Icon circle */}
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ background: `${ACCENTS[i]}18`, color: ACCENTS[i] }}
              >
                {ICONS[i]()}
              </div>

              {/* Accent line */}
              <div
                className="mb-4 h-0.5 w-10 rounded-full"
                style={{ background: ACCENTS[i] }}
              />

              <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-violet-200/80">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </section>
  );
}
