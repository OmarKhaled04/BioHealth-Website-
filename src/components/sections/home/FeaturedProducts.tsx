'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import { ProductCard } from '@/components/sections/products/ProductCard';
import { Link } from '@/navigation';
import { products } from '@/data/products';

const EASE = [0, 0, 0.2, 1] as const;

export function FeaturedProducts() {
  const t = useTranslations('home.featured');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const featured = products.slice(0, 4);

  return (
    <section className="relative bg-violet-800/50 py-24 backdrop-blur-sm">
      {/* Faint top separator line */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div ref={ref} className="container mx-auto px-4">

        {/* Section heading */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="block h-px w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              Catalogue
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
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Product grid */}
        <StaggerGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* View all */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
        >
          <Link
            href="/products"
            className="inline-block rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-semibold text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
          >
            View All Products →
          </Link>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </section>
  );
}
