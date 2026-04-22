'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useInView } from 'framer-motion';

// ── Reuse the same wave motif from AboutSection ────────────────────────────────
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

// ── rAF-based animated counter (same approach as AboutSection) ─────────────────
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

// ── Stats ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 9,    suffix: '',  label: 'Total Certifications' },
  { value: 2002, suffix: '',  label: 'Certified Since' },
  { value: 3,    suffix: '+', label: "Int'l Standards" },
  { value: 100,  suffix: '%', label: 'Audit Pass Rate' },
];

// ── Component ──────────────────────────────────────────────────────────────────
export function CertAtAGlance() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardX  = useSpring(useTransform(mouseX, [-1, 1], [-14, 14]), { stiffness: 120, damping: 20 });
  const cardY  = useSpring(useTransform(mouseY, [-1, 1], [-9,   9]), { stiffness: 120, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
    mouseY.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
  }

  return (
    <section
      className="relative flex min-h-[480px] items-center justify-center overflow-hidden bg-violet-700 py-24"
      onMouseMove={onMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* Animated wave background */}
      <WaveMotif className="absolute inset-0 h-full w-full opacity-50" />

      {/* Radial highlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(167,139,250,0.15),transparent)]" />

      {/* Tilt card */}
      <motion.div
        style={{ rotateX: cardY, rotateY: cardX, transformPerspective: 900 }}
        initial={{ opacity: 0, scale: 0.88, y: 36 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.15 }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md"
      >
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-4 w-4">
              <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/70">
            Certifications at a Glance
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-7">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold text-white">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs text-white/65">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom badge row */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-white/15 pt-6">
          {['FSSC 22000', 'ISO 9001', 'IFS', 'Halal'].map((label) => (
            <span
              key={label}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Inner glass highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
      </motion.div>
    </section>
  );
}
