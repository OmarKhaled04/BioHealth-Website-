'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

const EASE = [0, 0, 0.2, 1] as const;

export function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">

      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/testIMG/mother & child 2.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* ── Gradient overlays ── */}
      {/* Left: readable purple, clears out by 55% so the photo shows naturally */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-violet-950/90 via-violet-900/40 to-transparent" />
      {/* Mobile: lighter full tint */}
      <div className="absolute inset-0 z-[1] bg-violet-950/30 lg:hidden" />
      {/* Bottom depth — subtle grounding */}
      <div className="absolute inset-x-0 bottom-0 h-32 z-[1] bg-gradient-to-t from-violet-950/50 to-transparent" />

      {/* ── Subtle animated wave motif on the left overlay ── */}
      <svg
        viewBox="0 0 500 800"
        className="pointer-events-none absolute left-0 top-0 h-full w-1/2 opacity-[0.07] z-[2]"
        aria-hidden="true"
        fill="none"
      >
        {[100, 150, 200, 250, 300].map((r, i) => (
          <motion.ellipse
            key={r}
            cx="180" cy="400" rx={r} ry={r * 0.6}
            stroke="rgba(255,255,255,0.35)" strokeWidth="1"
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 22 + i * 5, repeat: Infinity, ease: 'linear' }}
            style={{ originX: '180px', originY: '400px' }}
          />
        ))}
      </svg>

      {/* ── Content ── */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2">

            {/* ── Left: text column ── */}
            <div className="pb-16 pt-28 text-center lg:pb-28 lg:text-left">

              {/* Eyebrow */}
              <motion.div
                className="mb-6 flex items-center justify-center gap-3 lg:justify-start"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <motion.span
                  className="block h-px bg-amber-400"
                  initial={{ width: 0 }} animate={{ width: 40 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                />
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                  {t('eyebrow')}
                </span>
                <motion.span
                  className="block h-px bg-amber-400"
                  initial={{ width: 0 }} animate={{ width: 40 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                />
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                {t('title')}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
                className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-violet-200 lg:mx-0"
              >
                {t('subtitle')}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.42, ease: EASE }}
                className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
              >
                <motion.div
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <Link
                    href="/products"
                    className="inline-block rounded-full bg-white px-8 py-3.5 text-sm font-bold text-violet-700 shadow-lg transition-shadow hover:shadow-white/20"
                  >
                    {t('cta')} →
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <Link
                    href="/about"
                    className="inline-block rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-bold text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
                  >
                    {t('learnMore')}
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
                className="mx-auto mt-14 grid max-w-xs grid-cols-3 divide-x divide-white/10 lg:mx-0"
              >
                {[
                  { value: '17',   label: t('stats.products')  },
                  { value: '12',   label: t('stats.countries') },
                  { value: '100%', label: t('stats.halal')     },
                ].map(({ value, label }) => (
                  <div key={label} className="px-4 text-center first:pl-0 last:pr-0">
                    <p className="text-3xl font-extrabold text-white">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-white/40">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right column intentionally empty — image fills the background */}
            <div className="hidden lg:block" />

          </div>
        </div>
      </div>
    </section>
  );
}
