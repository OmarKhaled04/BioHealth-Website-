'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations();
  const displayName = t(product.nameKey);
  const unitLabel = t(`products.${product.ageRange.unit}`);
  const ageLabel = product.ageRange.max
    ? `${product.ageRange.min}–${product.ageRange.max} ${unitLabel}`
    : `${product.ageRange.min}+ ${unitLabel}`;

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm transition-shadow duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-violet-900/40"
      >
        {/* Badge */}
        <div className="absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] truncate rounded-full border border-amber-400/30 bg-amber-400/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
          {product.badge}
        </div>

        {/* Fixed-height image area */}
        <div className="relative h-52 flex-shrink-0">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center px-8 pt-12 pb-2"
          >
            <Image
              src={product.imagePath}
              alt={displayName}
              width={140}
              height={185}
              className="h-full w-auto max-h-36 object-contain drop-shadow-2xl"
            />
          </motion.div>
          {/* Glow under image */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 h-10 w-24 -translate-x-1/2 rounded-full bg-white/10 blur-xl transition-all duration-300 group-hover:bg-violet-300/20" />
        </div>

        {/* Info — grows to fill remaining height */}
        <div className="flex flex-1 flex-col p-5 pt-3">
          {/* Age pill */}
          <span className="mb-2 self-start rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white/80">
            {ageLabel}
          </span>

          <p className="text-base font-bold leading-snug text-white">{displayName}</p>

          {/* Features preview — flex-1 pushes CTA to bottom */}
          <ul className="mt-3 flex-1 space-y-1.5">
            {product.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-violet-200">
                <span className="mt-0.5 flex-shrink-0 text-amber-400">✓</span>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA row */}
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-xs font-semibold text-white/60 transition-colors duration-200 group-hover:text-white">
              {t('products.viewDetails')}
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-sm text-white transition-colors duration-200 group-hover:bg-amber-400 group-hover:text-violet-900">
              →
            </span>
          </div>
        </div>

        {/* Hover shimmer */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.div>
    </Link>
  );
}
