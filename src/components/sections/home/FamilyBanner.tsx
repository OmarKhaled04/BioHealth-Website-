'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@/navigation';

const EASE = [0, 0, 0.2, 1] as const;

const STATS = [
  { value: '4+',    label: 'Global Markets' },
  { value: '17',   label: 'Products' },
  { value: '100%', label: 'Halal Certified' },
  { value: 'GMP',  label: 'EU Manufactured' },
];

export function FamilyBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50 py-20">
      {/* Soft background blobs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-purple-100/40 blur-3xl" />

      <div ref={ref} className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left: text + stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="mb-4 flex items-center gap-3">
              <motion.span
                className="block h-px bg-amber-400"
                initial={{ width: 0 }}
                animate={inView ? { width: 36 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
                Our Promise
              </span>
            </div>

            <h2 className="text-4xl font-extrabold leading-tight text-violet-900 sm:text-5xl">
              Pure Nutrition,
              <br />
              <span className="text-violet-600">Trusted by Families</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-violet-700/70">
              From birth to toddlerhood, Lactonic formulas are crafted with molecular
              precision to support your child&apos;s growth at every stage.
            </p>

            {/* Trust stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map(({ value, label }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                  className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-violet-100"
                >
                  <p className="text-2xl font-extrabold text-violet-700">{value}</p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-violet-500">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
              className="mt-8"
            >
              <Link
                href="/products"
                className="inline-block rounded-full bg-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:scale-105 hover:bg-violet-700 hover:shadow-violet-300"
              >
                Explore All Products →
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-violet-200/60">
              <Image
                src="/images/testIMG/mother and child 3.png"
                alt="Happy mother holding and playing with her baby"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
              />
              {/* Trust overlay card */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 px-5 py-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400" />
                  </span>
                  <p className="text-sm font-semibold text-violet-900">
                    Trusted by parents worldwide
                  </p>
                </div>
                <p className="mt-1 pl-6 text-xs text-violet-600/70">
                  FSSC 22000 · ISO 9001 · Halal Certified
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-3 -top-3 rounded-2xl bg-amber-400 px-4 py-2 shadow-lg shadow-amber-200"
            >
              <p className="text-[11px] font-bold uppercase tracking-wide text-amber-900">
                Scientifically
              </p>
              <p className="text-[11px] font-bold uppercase tracking-wide text-amber-900">
                Formulated
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
