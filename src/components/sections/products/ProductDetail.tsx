'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types/product';
import { products } from '@/data/products';

// ─── Shared helpers ────────────────────────────────────────────────────────────

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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Related products mini-card ────────────────────────────────────────────────

function RelatedCard({ product }: { product: Product }) {
  const t = useTranslations();
  const name = t(product.nameKey);
  const unitLabel = t(`products.${product.ageRange.unit}`);
  const ageLabel = product.ageRange.max
    ? `${product.ageRange.min}–${product.ageRange.max} ${unitLabel}`
    : `${product.ageRange.min}+ ${unitLabel}`;

  return (
    <Link href={`/products/${product.slug}`} className="block w-60 flex-shrink-0">
      <motion.div
        whileHover={{ y: -6, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm hover:border-white/30 hover:shadow-xl hover:shadow-violet-900/40"
      >
        {/* Badge */}
        <div className="absolute left-3 top-3 z-10 truncate rounded-full border border-amber-400/30 bg-amber-400/20 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-300">
          {t(product.badgeKey)}
        </div>

        {/* Image */}
        <div className="relative h-40 flex-shrink-0">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center px-6 pt-10 pb-2"
          >
            <Image
              src={product.imagePath}
              alt={name}
              width={110}
              height={145}
              className="h-full w-auto max-h-28 object-contain drop-shadow-xl"
            />
          </motion.div>
          <div className="pointer-events-none absolute bottom-1 left-1/2 h-8 w-20 -translate-x-1/2 rounded-full bg-white/10 blur-lg" />
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col p-4 pt-2">
          <span className="mb-1.5 self-start rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold text-white/80">
            {ageLabel}
          </span>
          <p className="text-sm font-bold leading-snug text-white">{name}</p>

          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-[11px] font-semibold text-white/50 group-hover:text-white transition-colors duration-200">
              {t('products.viewDetails')}
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs text-white group-hover:bg-amber-400 group-hover:text-violet-900 transition-colors duration-200">
              →
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.div>
    </Link>
  );
}

// ─── Carousel ──────────────────────────────────────────────────────────────────

const CARD_W = 256; // 240px card + 16px gap
const VISIBLE = 3;

function RelatedCarousel({ related }: { related: Product[] }) {
  const [page, setPage] = useState(0);
  const maxPage = Math.max(0, related.length - VISIBLE);
  const t = useTranslations();

  return (
    <section className="mt-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-8 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-amber-400" />
          <h2 className="text-2xl font-bold text-white">{t('products.relatedProducts')}</h2>
        </div>

        {/* Nav buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/25 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
            disabled={page >= maxPage}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/25 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </motion.div>

      {/* Track */}
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: -page * CARD_W }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="flex gap-4"
        >
          {related.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
            >
              <RelatedCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      {related.length > VISIBLE && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/30'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Main detail component ─────────────────────────────────────────────────────

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations();
  const displayName = t(product.nameKey);
  const description = t(product.descriptionKey);
  const unitLabel = t(`products.${product.ageRange.unit}`);
  const ageLabel = product.ageRange.max
    ? `${product.ageRange.min}–${product.ageRange.max} ${unitLabel}`
    : `${product.ageRange.min}+ ${unitLabel}`;

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-violet-700">
      <WaveMotif className="pointer-events-none absolute inset-0 h-full w-full opacity-40" />

      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
          >
            ← {t('products.filterAll')}
          </Link>
        </motion.div>

        {/* Hero grid */}
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Floating product image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            className="flex justify-center"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute h-96 w-96 rounded-full bg-white/10 blur-2xl" />
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <Image
                  src={product.imagePath}
                  alt={displayName}
                  width={440}
                  height={560}
                  className="h-auto max-h-[560px] w-auto max-w-[420px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div variants={stagger} initial="hidden" animate="visible">

            <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                BioHealth Prodentia
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mb-3 text-4xl font-extrabold leading-tight text-white lg:text-5xl">
              {displayName}
            </motion.h1>

            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-amber-400/40 bg-amber-400/20 px-4 py-1.5 text-sm font-semibold text-amber-300">
                {t(product.badgeKey)}
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/80">
                {ageLabel}
              </span>
              {product.netWeight && (
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/80">
                  {product.netWeight}
                </span>
              )}
            </motion.div>

            <motion.p variants={fadeUp} className="mb-8 text-lg leading-relaxed text-violet-100">
              {description}
            </motion.p>

            <motion.div variants={fadeUp} className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/60">
                {t('products.keyFeatures')}
              </p>
              <ul className="space-y-3">
                {product.featureKeys.map((key, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.4, ease: EASE }}
                    className="flex items-start gap-3 text-sm text-violet-100"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-xs font-bold text-amber-300">
                      ✓
                    </span>
                    {t(key)}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
                {product.category === 'formula' ? t('products.filterFormula') : t('products.filterBabyFood')}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Related products carousel */}
        {related.length > 0 && <RelatedCarousel related={related} />}

      </div>
    </main>
  );
}
