'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { Certification } from '@/types/certification';

const categoryConfig: Record<string, { labelKey: string; gradient: string; glow: string }> = {
  'food-safety': {
    labelKey: 'certifications.categories.foodSafety.label',
    gradient: 'from-violet-500 to-purple-600',
    glow: 'rgba(124,58,237,0.22)',
  },
  quality: {
    labelKey: 'certifications.categories.quality.label',
    gradient: 'from-indigo-500 to-blue-600',
    glow: 'rgba(79,70,229,0.22)',
  },
  halal: {
    labelKey: 'certifications.categories.halal.label',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.22)',
  },
};

function isStillValid(dateStr: string): boolean {
  if (dateStr === '—') return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && date > new Date();
}

interface Props {
  certification: Certification;
  index?: number;
}

export function CertificationCard({ certification, index = 0 }: Props) {
  const t = useTranslations();
  const cfg = categoryConfig[certification.category] ?? categoryConfig.quality;

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.45, 0.27, 0.9] }}
      whileHover="hover"
      animate="rest"
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100"
      style={{ willChange: 'transform' }}
      variants={{
        rest: {
          y: 0,
          boxShadow: '0 4px 20px -4px rgba(0,0,0,0.08)',
        },
        hover: {
          y: -10,
          boxShadow: `0 28px 60px -12px ${cfg.glow}, 0 0 0 1.5px ${cfg.glow}`,
          transition: { duration: 0.3, ease: 'easeOut' },
        },
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-y-0 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
        variants={{
          rest: { x: '-120%' },
          hover: { x: '400%', transition: { duration: 0.75, ease: 'easeInOut' } },
        }}
      />

      <a
        href={certification.imageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden bg-gradient-to-b from-gray-50 to-white"
        style={{ aspectRatio: '3 / 4' }}
      >
        <div className="absolute inset-3 overflow-hidden rounded-lg shadow-inner ring-1 ring-gray-200/60">
          <Image
            src={certification.imageUrl}
            alt={certification.name}
            fill
            className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <motion.span
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05, transition: { duration: 0.2 } },
          }}
          className={`absolute left-4 top-4 z-10 rounded-full bg-gradient-to-r ${cfg.gradient} px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg`}
        >
          {t(cfg.labelKey)}
        </motion.span>

        {/* View overlay on hover */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center bg-gradient-to-t from-gray-950/85 via-gray-900/60 to-transparent py-6 pt-12"
          variants={{
            rest: { y: '100%' },
            hover: { y: 0, transition: { duration: 0.35, ease: [0.21, 0.45, 0.27, 0.9] } },
          }}
        >
          <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-violet-600">
              <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
            </svg>
            View Certificate
          </span>
        </motion.div>
      </a>

      <div className="flex flex-col gap-1 px-5 py-4">
        <div className={`mb-3 h-[2px] w-10 rounded-full bg-gradient-to-r ${cfg.gradient}`} />

        <h3 className="font-bold leading-snug text-gray-900">{certification.name}</h3>
        <p className="text-sm text-gray-500">{certification.issuer}</p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="truncate text-xs text-gray-400">{certification.certNumber}</span>
          {isStillValid(certification.validUntil) && (
            <span className="shrink-0 rounded-full bg-primary-50 px-2.5 py-0.5 text-[11px] font-semibold text-primary-700 ring-1 ring-primary-100">
              {t('certifications.card.validUntil', { date: certification.validUntil })}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
