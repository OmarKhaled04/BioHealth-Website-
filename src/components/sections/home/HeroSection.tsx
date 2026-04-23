'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

const EASE = [0, 0, 0.2, 1] as const;

function WaveMotif() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      aria-hidden="true"
      fill="none"
    >
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

export function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden py-36 text-center">
      <WaveMotif />

      <div className="relative z-10 container mx-auto px-4">

        {/* Amber eyebrow — matches products page header */}
        <motion.div
          className="mb-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
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

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {t('title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-violet-200"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42, ease: EASE }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
            <Link
              href="/products"
              className="inline-block rounded-full bg-white px-8 py-3.5 text-sm font-bold text-violet-700 shadow-lg transition-shadow hover:shadow-white/20"
            >
              {t('cta')} →
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
            <Link
              href="/about"
              className="inline-block rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-bold text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 divide-x divide-white/10"
        >
          {[
            { value: '17', label: 'Products' },
            { value: '3',  label: 'Locales' },
            { value: '100%', label: 'Halal' },
          ].map(({ value, label }) => (
            <div key={label} className="px-6 text-center first:pl-0 last:pr-0">
              <p className="text-3xl font-extrabold text-white">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/45">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
