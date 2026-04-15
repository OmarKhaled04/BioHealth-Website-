// Hero section — full-width banner with entrance animations and floating background blobs
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 py-28 text-center">

      {/* Floating background blobs */}
      <motion.div
        className="pointer-events-none absolute -top-16 -left-16 h-80 w-80 rounded-full bg-primary-200 opacity-30 blur-3xl"
        animate={{ scale: [1, 1.15, 1], x: [0, 12, 0], y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-16 -right-16 h-96 w-96 rounded-full bg-primary-300 opacity-20 blur-3xl"
        animate={{ scale: [1, 1.1, 1], x: [0, -14, 0], y: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100 opacity-40 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Content */}
      <div className="container relative mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl font-extrabold tracking-tight text-primary-800 sm:text-6xl lg:text-7xl"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto mt-6 max-w-2xl text-xl text-gray-600"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-10"
        >
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Link href="/products">
              <Button size="lg">{t('cta')}</Button>
            </Link>
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
