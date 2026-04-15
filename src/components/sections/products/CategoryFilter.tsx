// Category filter bar — used as a standalone component if needed
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { categories } from '@/data/products';

interface CategoryFilterProps {
  onFilterChange?: (category: string) => void;
}

export function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const t = useTranslations();
  const [active, setActive] = useState('all');

  function handleClick(key: string) {
    setActive(key);
    onFilterChange?.(key);
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => handleClick(cat.key)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            active === cat.key
              ? 'bg-primary-600 text-white'
              : 'border border-gray-300 text-gray-600 hover:border-primary-400 hover:text-primary-700'
          )}
        >
          {t(cat.labelKey)}
        </button>
      ))}
    </div>
  );
}
