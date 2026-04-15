'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ProductCard } from './ProductCard';
import { products, categories } from '@/data/products';

export function ProductCatalog() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
              activeCategory === cat.key
                ? 'bg-primary-600 text-white shadow-sm'
                : 'border border-gray-300 text-gray-600 hover:border-primary-400 hover:text-primary-700'
            )}
          >
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      {/* Product count */}
      <p className="mb-6 text-sm text-gray-500">
        {filtered.length} product{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid — 4 cols desktop, 3 tablet, 2 small, 1 mobile */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
