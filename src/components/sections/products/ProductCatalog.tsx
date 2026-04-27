'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { products, categories } from '@/data/products';

function WaveMotif({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" fill="none">
      {[80, 120, 160, 200, 240].map((r, i) => (
        <motion.ellipse
          key={r}
          cx="200" cy="200" rx={r} ry={r * 0.55}
          stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '200px', originY: '200px' }}
        />
      ))}
    </svg>
  );
}

const EASE = [0, 0, 0.2, 1] as const;
const VIEWPORT = { once: true, margin: '-60px' } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export function ProductCatalog() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="relative min-h-screen overflow-hidden bg-violet-700">
      <WaveMotif className="pointer-events-none absolute inset-0 h-full w-full opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">

        {/* Header */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate="visible"
          className="mb-14 text-center"
        >
          <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3">
            <motion.span
              className="block h-px bg-amber-400"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              BioHealth Prodentia
            </span>
            <motion.span
              className="block h-px bg-amber-400"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            />
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl font-extrabold text-white lg:text-6xl">
            {t('products.title')}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-violet-200">
            {t('products.subtitle')}
          </motion.p>
        </motion.div>

        {/* Lifestyle image strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
          className="mb-12 overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-[21/7] overflow-hidden rounded-2xl">
            <Image
              src="/images/testIMG/kid.png"
              alt="Happy healthy child"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 to-transparent" />
          </div>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-white text-violet-700 shadow-lg'
                  : 'border border-white/25 bg-white/10 text-white/80 backdrop-blur-sm hover:bg-white/20 hover:text-white'
              }`}
            >
              {activeCategory === cat.key && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative z-10">{t(cat.labelKey)}</span>
            </button>
          ))}
        </motion.div>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 text-center text-sm text-white/50"
        >
          {t('products.itemCount', { count: filtered.length })}
        </motion.p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                viewport={VIEWPORT}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
