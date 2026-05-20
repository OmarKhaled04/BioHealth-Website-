'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import Image from 'next/image';

// ── Animation constants ────────────────────────────────────────────────────
const EASE   = [0, 0, 0.2, 1] as const;
const SPRING = { type: 'spring', stiffness: 260, damping: 22 } as const;
const VIEWPORT = { once: true, margin: '-60px' } as const;

const fadeUp   = { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: EASE } } };
const fadeLeft = { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0,  transition: { duration: 0.65, ease: EASE } } };
const fadeRight= { hidden: { opacity: 0, x: 48 },  visible: { opacity: 1, x: 0,  transition: { duration: 0.65, ease: EASE } } };
const scaleUp  = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const } } };
const stagger  = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

// ── Shared decorative wave motif ───────────────────────────────────────────
function WaveMotif({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden fill="none">
      {[80, 120, 160, 200, 240].map((r, i) => (
        <motion.ellipse
          key={r} cx="200" cy="200" rx={r} ry={r * 0.55}
          stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '200px', originY: '200px' }}
        />
      ))}
    </svg>
  );
}

// ── Eyebrow helper ─────────────────────────────────────────────────────────
function Eyebrow({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <motion.div className="mb-4 flex items-center justify-center gap-3">
      <motion.span className={`block h-px ${dark ? 'bg-amber-400' : 'bg-amber-500'}`}
        initial={{ width: 0 }} whileInView={{ width: 36 }} viewport={VIEWPORT}
        transition={{ duration: 0.8, ease: EASE }} />
      <span className={`text-xs font-semibold uppercase tracking-widest ${dark ? 'text-amber-300' : 'text-amber-500'}`}>
        {text}
      </span>
      <motion.span className={`block h-px ${dark ? 'bg-amber-400' : 'bg-amber-500'}`}
        initial={{ width: 0 }} whileInView={{ width: 36 }} viewport={VIEWPORT}
        transition={{ duration: 0.8, ease: EASE }} />
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// WHO GROWTH DATA  (weight-for-age kg: [P3, P15, P50, P85, P97])
// ══════════════════════════════════════════════════════════════════════════════
type PR = [number, number, number, number, number];
const WHO_WEIGHT: Record<'boy' | 'girl', Record<number, PR>> = {
  boy: {
    0:  [2.5, 2.9, 3.3, 3.9, 4.4],  1:  [3.4, 3.9, 4.5, 5.1, 5.7],
    2:  [4.3, 4.9, 5.6, 6.3, 7.1],  3:  [5.0, 5.7, 6.4, 7.2, 8.0],
    4:  [5.6, 6.2, 7.0, 7.9, 8.7],  5:  [6.0, 6.7, 7.5, 8.4, 9.3],
    6:  [6.4, 7.1, 7.9, 8.8, 9.7],  7:  [6.7, 7.4, 8.3, 9.2, 10.2],
    8:  [6.9, 7.7, 8.6, 9.6, 10.5], 9:  [7.1, 7.9, 8.9, 9.9, 10.9],
    10: [7.4, 8.2, 9.2, 10.2, 11.2],11: [7.6, 8.4, 9.4, 10.5, 11.5],
    12: [7.8, 8.6, 9.6, 10.8, 11.8],13: [8.0, 8.8, 9.9, 11.1, 12.1],
    14: [8.2, 9.0, 10.1, 11.3, 12.4],15:[8.3, 9.2, 10.3, 11.5, 12.7],
    16: [8.5, 9.4, 10.5, 11.8, 13.0],17:[8.6, 9.5, 10.7, 12.0, 13.2],
    18: [8.8, 9.8, 10.9, 12.2, 13.4],19:[9.0, 10.0, 11.2, 12.5, 13.7],
    20: [9.1, 10.1, 11.3, 12.7, 14.0],21:[9.2, 10.3, 11.5, 12.9, 14.2],
    22: [9.4, 10.5, 11.7, 13.1, 14.5],23:[9.5, 10.6, 11.9, 13.4, 14.7],
    24: [9.7, 10.8, 12.2, 13.6, 15.0],
  },
  girl: {
    0:  [2.4, 2.8, 3.2, 3.7, 4.2],  1:  [3.2, 3.6, 4.2, 4.8, 5.5],
    2:  [3.9, 4.5, 5.1, 5.8, 6.6],  3:  [4.5, 5.2, 5.8, 6.6, 7.5],
    4:  [5.0, 5.7, 6.4, 7.3, 8.2],  5:  [5.4, 6.1, 6.9, 7.8, 8.8],
    6:  [5.7, 6.5, 7.3, 8.2, 9.3],  7:  [6.0, 6.8, 7.6, 8.6, 9.7],
    8:  [6.3, 7.0, 7.9, 9.0, 10.2], 9:  [6.5, 7.3, 8.2, 9.3, 10.5],
    10: [6.7, 7.5, 8.5, 9.6, 10.9], 11: [6.9, 7.7, 8.7, 9.9, 11.2],
    12: [7.0, 7.9, 8.9, 10.1, 11.5],13: [7.2, 8.1, 9.2, 10.4, 11.8],
    14: [7.4, 8.3, 9.4, 10.7, 12.1],15: [7.6, 8.5, 9.6, 10.9, 12.4],
    16: [7.7, 8.7, 9.8, 11.2, 12.7],17: [7.9, 8.9, 10.0, 11.4, 13.0],
    18: [8.1, 9.1, 10.2, 11.6, 13.2],19:[8.2, 9.2, 10.4, 11.9, 13.5],
    20: [8.4, 9.4, 10.6, 12.1, 13.8],21:[8.5, 9.6, 10.9, 12.4, 14.1],
    22: [8.7, 9.8, 11.1, 12.6, 14.4],23:[8.9, 10.0, 11.3, 12.9, 14.7],
    24: [9.0, 10.2, 11.5, 13.1, 14.9],
  },
};

// length-for-age cm at key months — interpolated for in-between
const WHO_LENGTH: Record<'boy' | 'girl', Record<number, PR>> = {
  boy: {
    0:  [46.1, 47.9, 49.9, 51.8, 53.7], 3:  [57.3, 59.0, 61.4, 63.9, 66.2],
    6:  [63.3, 65.1, 67.6, 70.1, 72.6], 9:  [67.7, 69.7, 72.3, 74.9, 77.5],
    12: [71.7, 73.9, 76.6, 79.4, 82.1], 18: [77.5, 79.9, 83.0, 86.0, 89.0],
    24: [82.5, 85.3, 88.5, 91.9, 95.2],
  },
  girl: {
    0:  [45.6, 47.3, 49.1, 51.0, 52.9], 3:  [56.2, 57.7, 59.8, 62.0, 64.0],
    6:  [61.5, 63.5, 65.7, 68.0, 70.3], 9:  [65.6, 67.7, 70.1, 72.6, 75.0],
    12: [68.9, 71.1, 73.8, 76.5, 79.2], 18: [74.0, 76.5, 79.4, 82.4, 85.4],
    24: [79.3, 82.1, 85.5, 88.9, 92.2],
  },
};

function interpolateRef(table: Record<number, PR>, age: number): PR {
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  if (age <= keys[0]) return table[keys[0]];
  if (age >= keys[keys.length - 1]) return table[keys[keys.length - 1]];
  const lo = keys.filter(k => k <= age).at(-1)!;
  const hi = keys.find(k => k > age)!;
  const t  = (age - lo) / (hi - lo);
  return table[lo].map((v, i) => +(v + t * (table[hi][i] - v)).toFixed(2)) as PR;
}

type GrowthStatus = 'severe-low' | 'mild-low' | 'normal' | 'mild-high' | 'severe-high';
function getStatus(value: number, ref: PR): GrowthStatus {
  if (value < ref[0])  return 'severe-low';
  if (value < ref[1])  return 'mild-low';
  if (value <= ref[3]) return 'normal';
  if (value <= ref[4]) return 'mild-high';
  return 'severe-high';
}
function getPercentileLabel(value: number, ref: PR): string {
  if (value < ref[0])  return '< 3rd percentile';
  if (value < ref[1])  return '3rd – 15th percentile';
  if (value < ref[2])  return '15th – 50th percentile';
  if (value <= ref[3]) return '50th – 85th percentile';
  if (value <= ref[4]) return '85th – 97th percentile';
  return '> 97th percentile';
}
function getNeedle(value: number, ref: PR): number {
  // returns 0–100 position on the gauge
  const [p3, , p50, , p97] = ref;
  const min = p3 * 0.85, max = p97 * 1.15;
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}
const STATUS_META: Record<GrowthStatus, { label: string; color: string; bg: string; border: string }> = {
  'severe-low':  { label: 'Severely Underweight',   color: 'text-red-400',    bg: 'bg-red-900/30',    border: 'border-red-500/40' },
  'mild-low':    { label: 'Mildly Underweight',      color: 'text-orange-300', bg: 'bg-orange-900/20', border: 'border-orange-400/40' },
  'normal':      { label: 'Normal Range ✓',          color: 'text-emerald-300',bg: 'bg-emerald-900/20',border: 'border-emerald-400/40' },
  'mild-high':   { label: 'Mildly Above Average',    color: 'text-orange-300', bg: 'bg-orange-900/20', border: 'border-orange-400/40' },
  'severe-high': { label: 'Significantly Above Average', color: 'text-red-400',bg: 'bg-red-900/30',    border: 'border-red-500/40' },
};

// ══════════════════════════════════════════════════════════════════════════════
// VACCINATION SCHEDULE DATA
// ══════════════════════════════════════════════════════════════════════════════
interface VaxEntry { id: string; name: string; disease: string }
interface VaxGroup { ageLabel: string; color: string; dueLow: number; dueHigh: number; vaccines: VaxEntry[] }
const VAX_SCHEDULE: VaxGroup[] = [
  { ageLabel: 'At Birth', color: 'violet', dueLow: 0, dueHigh: 0,
    vaccines: [
      { id: 'bcg',      name: 'BCG',                     disease: 'Tuberculosis (TB)' },
      { id: 'opv0',     name: 'OPV – 0 Dose',             disease: 'Polio' },
      { id: 'hepb0',    name: 'Hepatitis B – Birth Dose', disease: 'Hepatitis B' },
    ]},
  { ageLabel: '6 Weeks', color: 'purple', dueLow: 1, dueHigh: 2,
    vaccines: [
      { id: 'penta1',   name: 'Pentavalent – 1st Dose', disease: 'Diphtheria, Pertussis, Tetanus, Hepatitis B, Hib' },
      { id: 'opv1',     name: 'OPV – 1st Dose',          disease: 'Polio' },
      { id: 'ipv1',     name: 'IPV – 1st Dose',           disease: 'Polio (injectable)' },
      { id: 'rota1',    name: 'Rotavirus – 1st Dose',     disease: 'Rotavirus Diarrhea' },
      { id: 'pcv1',     name: 'PCV – 1st Dose',           disease: 'Pneumococcal disease' },
    ]},
  { ageLabel: '10 Weeks', color: 'indigo', dueLow: 2, dueHigh: 3,
    vaccines: [
      { id: 'penta2',   name: 'Pentavalent – 2nd Dose', disease: 'Diphtheria, Pertussis, Tetanus, Hepatitis B, Hib' },
      { id: 'opv2',     name: 'OPV – 2nd Dose',          disease: 'Polio' },
      { id: 'ipv2',     name: 'IPV – 2nd Dose',           disease: 'Polio (injectable)' },
      { id: 'rota2',    name: 'Rotavirus – 2nd Dose',     disease: 'Rotavirus Diarrhea' },
      { id: 'pcv2',     name: 'PCV – 2nd Dose',           disease: 'Pneumococcal disease' },
    ]},
  { ageLabel: '14 Weeks', color: 'blue', dueLow: 3, dueHigh: 5,
    vaccines: [
      { id: 'penta3',   name: 'Pentavalent – 3rd Dose', disease: 'Diphtheria, Pertussis, Tetanus, Hepatitis B, Hib' },
      { id: 'opv3',     name: 'OPV – 3rd Dose',          disease: 'Polio' },
      { id: 'ipv3',     name: 'IPV – 2nd Dose',           disease: 'Polio (injectable)' },
      { id: 'rota3',    name: 'Rotavirus – 3rd Dose',     disease: 'Rotavirus Diarrhea' },
      { id: 'pcv3',     name: 'PCV – 3rd Dose',           disease: 'Pneumococcal disease' },
    ]},
  { ageLabel: '9 Months', color: 'amber', dueLow: 8, dueHigh: 11,
    vaccines: [
      { id: 'mr1',      name: 'Measles-Rubella (MR) – 1st', disease: 'Measles, Rubella' },
      { id: 'je1',      name: 'JE – 1st Dose',               disease: 'Japanese Encephalitis' },
      { id: 'vita1',    name: 'Vitamin A – 1st Dose',         disease: 'Vitamin A Deficiency' },
    ]},
  { ageLabel: '16 – 24 Months', color: 'orange', dueLow: 14, dueHigh: 25,
    vaccines: [
      { id: 'dpt-b1',   name: 'DPT Booster – 1st',           disease: 'Diphtheria, Pertussis, Tetanus' },
      { id: 'opv-b',    name: 'OPV Booster',                  disease: 'Polio' },
      { id: 'mr2',      name: 'MR – 2nd Dose',                disease: 'Measles, Rubella' },
      { id: 'je2',      name: 'JE – 2nd Dose',                disease: 'Japanese Encephalitis' },
      { id: 'vita2',    name: 'Vitamin A – 2nd to 9th Dose',  disease: 'Vitamin A Deficiency (every 6 months)' },
    ]},
  { ageLabel: '5 – 6 Years', color: 'rose', dueLow: 57, dueHigh: 74,
    vaccines: [
      { id: 'dpt-b2',   name: 'DPT Booster – 2nd',           disease: 'Diphtheria, Pertussis, Tetanus' },
    ]},
];

const TOTAL_VACCINES = VAX_SCHEDULE.reduce((s, g) => s + g.vaccines.length, 0);

const VAX_COLOR: Record<string, string> = {
  violet: 'bg-violet-500/20 border-violet-400/30 text-violet-200',
  purple: 'bg-purple-500/20 border-purple-400/30 text-purple-200',
  indigo: 'bg-indigo-500/20 border-indigo-400/30 text-indigo-200',
  blue:   'bg-blue-500/20 border-blue-400/30 text-blue-200',
  amber:  'bg-amber-500/20 border-amber-400/30 text-amber-200',
  orange: 'bg-orange-500/20 border-orange-400/30 text-orange-200',
  rose:   'bg-rose-500/20 border-rose-400/30 text-rose-200',
};
const VAX_DOT: Record<string, string> = {
  violet:'bg-violet-400', purple:'bg-purple-400', indigo:'bg-indigo-400',
  blue:'bg-blue-400', amber:'bg-amber-400', orange:'bg-orange-400', rose:'bg-rose-400',
};

// ══════════════════════════════════════════════════════════════════════════════
// BRAIN DEVELOPMENT MILESTONES — static styling only; text comes from locale
// ══════════════════════════════════════════════════════════════════════════════
const MILESTONE_META = [
  { gradient: 'from-violet-600 to-purple-700', icon: '🧠', recIcon: '🤱' },
  { gradient: 'from-blue-600 to-indigo-700',   icon: '🔬', recIcon: '🗣️' },
  { gradient: 'from-emerald-600 to-teal-700',  icon: '💡', recIcon: '🍎' },
  { gradient: 'from-amber-500 to-orange-600',  icon: '⚡', recIcon: '🎮' },
];


// ══════════════════════════════════════════════════════════════════════════════
// SECTION 1: HERO
// ══════════════════════════════════════════════════════════════════════════════
function Hero() {
  const t = useTranslations('childHealth');
  const PARTICLES = [
    { s: 10, t: '12%', l: '6%',  d: 5,   dl: 0   },
    { s: 6,  t: '70%', l: '10%', d: 4,   dl: 1   },
    { s: 14, t: '15%', l: '92%', d: 6,   dl: 0.5 },
    { s: 8,  t: '78%', l: '85%', d: 4.5, dl: 1.5 },
    { s: 5,  t: '40%', l: '3%',  d: 3.5, dl: 2   },
  ];

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-gradient-to-br from-violet-700 via-violet-600 to-purple-800 text-white flex items-center">
      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          className="pointer-events-none absolute rounded-full bg-white/10"
          style={{ width: p.s, height: p.s, top: p.t, left: p.l }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.dl, ease: 'easeInOut' }}
        />
      ))}

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(167,139,250,0.25),transparent)]" />
      <WaveMotif className="absolute inset-0 h-full w-full opacity-15" />

      <div className="container relative mx-auto px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 flex items-center gap-3"
            >
              <motion.span className="block h-px bg-amber-400"
                initial={{ width: 0 }} animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }} />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">{t('hero.eyebrow')}</span>
              <motion.span className="block h-px bg-amber-400"
                initial={{ width: 0 }} animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: EASE }}
              className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="bg-gradient-to-r from-white via-violet-100 to-amber-200 bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-white/70"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Quick nav pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {(t.raw('hero.pills') as string[]).map((label, i) => (
                <a key={i} href={['#growth','#milestones','#vaccination'][i]}
                  className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: hero image */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
            className="relative flex items-center justify-center"
          >
            {/* Glow ring behind image */}
            <div className="absolute inset-0 rounded-full bg-violet-400/20 blur-3xl" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <Image
                src="/images/child-health/ChatGPT Image May 6, 2026, 10_38_40 PM.png"
                alt="Children learning and growing"
                width={520}
                height={520}
                className="relative z-10 drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2: INTERACTIVE GROWTH TRACKER
// ══════════════════════════════════════════════════════════════════════════════
function GrowthTracker() {
  const t = useTranslations('childHealth');
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [age, setAge]       = useState(6);
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const weightNum = parseFloat(weight);
  const lengthNum = parseFloat(length);

  const weightRef = useMemo(() => interpolateRef(WHO_WEIGHT[gender], age), [gender, age]);
  const lengthRef = useMemo(() => {
    const keys = Object.keys(WHO_LENGTH[gender]).map(Number);
    const nearest = keys.reduce((a, b) => Math.abs(b - age) < Math.abs(a - age) ? b : a);
    return interpolateRef(WHO_LENGTH[gender], nearest);
  }, [gender, age]);

  const weightStatus = submitted && !isNaN(weightNum) ? getStatus(weightNum, weightRef) : null;
  const lengthStatus = submitted && !isNaN(lengthNum) ? getStatus(lengthNum, lengthRef) : null;

  const inputCls = 'w-full rounded-xl border border-violet-500/50 bg-violet-600/50 px-4 py-3 text-sm text-white placeholder:text-violet-300 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-500/40 transition-all';

  return (
    <section id="growth" className="relative overflow-hidden bg-gradient-to-br from-violet-800 via-violet-700 to-purple-800 py-24">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-violet-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="mb-12 text-center">
          <Eyebrow text={t('growth.eyebrow')} dark />
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white sm:text-5xl">
            {t('growth.title')}
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-lg text-violet-200/70">
            {t('growth.subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">

          {/* Input card */}
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <div className="overflow-hidden rounded-2xl border border-violet-500/40 bg-violet-700/60 shadow-xl shadow-violet-900/40">
              <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-amber-400" />
              <div className="space-y-6 p-8">

                {/* Gender */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-violet-200">{t('growth.gender')}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['boy', 'girl'] as const).map(g => (
                      <button key={g} type="button" onClick={() => { setGender(g); setSubmitted(false); }}
                        className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all ${
                          gender === g
                            ? 'border-violet-400 bg-violet-600 text-white shadow-lg shadow-violet-900/50'
                            : 'border-violet-700/50 bg-violet-800/40 text-violet-200 hover:border-violet-500'
                        }`}>
                        <span>{g === 'boy' ? '👦' : '👧'}</span>
                        {g === 'boy' ? t('growth.boy') : t('growth.girl')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age slider */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold text-violet-200">{t('growth.age')}</label>
                    <span className="rounded-full bg-violet-700/60 px-3 py-0.5 text-sm font-bold text-violet-200">
                      {age} {age === 1 ? t('growth.month') : t('growth.months')}
                    </span>
                  </div>
                  <input type="range" min={0} max={24} value={age}
                    onChange={e => { setAge(+e.target.value); setSubmitted(false); }}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-violet-200 accent-violet-600"
                  />
                  <div className="mt-1 flex justify-between text-xs text-violet-400">
                    <span>{t('growth.birthLabel')}</span><span>{t('growth.twelveMonths')}</span><span>{t('growth.twentyFourMonths')}</span>
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-violet-200">{t('growth.weight')}</label>
                  <input type="number" step="0.1" min="1" max="20" value={weight} placeholder="e.g. 7.5"
                    onChange={e => { setWeight(e.target.value); setSubmitted(false); }}
                    className={inputCls}
                  />
                </div>

                {/* Length */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-violet-200">
                    {t('growth.length')} <span className="font-normal text-violet-400">{t('growth.optional')}</span>
                  </label>
                  <input type="number" step="0.5" min="40" max="100" value={length} placeholder="e.g. 65.5"
                    onChange={e => { setLength(e.target.value); setSubmitted(false); }}
                    className={inputCls}
                  />
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => { if (weight) setSubmitted(true); }}
                  disabled={!weight}
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-950/50 transition-all disabled:opacity-40 hover:shadow-violet-800/50"
                >
                  {t('growth.check')}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Results card */}
          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <div className="overflow-hidden rounded-2xl border border-violet-500/40 bg-violet-700/60 shadow-xl shadow-violet-900/40 min-h-[420px]">
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-violet-400 to-purple-500" />
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div key="empty"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <div className="mb-4 text-6xl opacity-30">📊</div>
                      <p className="text-violet-400">{t('growth.empty')}</p>
                    </motion.div>
                  ) : (
                    <motion.div key="results"
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-violet-400">
                          {gender === 'boy' ? `👦 ${t('growth.boy')}` : `👧 ${t('growth.girl')}`} · {age} {age === 1 ? t('growth.month') : t('growth.months')}
                        </p>
                        <p className="mt-1 text-2xl font-extrabold text-white">{t('growth.resultsTitle')}</p>
                      </div>

                      {/* Weight result */}
                      {weightStatus && (
                        <GrowthResultBar
                          label={t('growth.weight')}
                          value={weightNum}
                          unit="kg"
                          ref_={weightRef}
                          status={weightStatus}
                        />
                      )}

                      {/* Length result */}
                      {lengthStatus && (
                        <GrowthResultBar
                          label={t('growth.length')}
                          value={lengthNum}
                          unit="cm"
                          ref_={lengthRef}
                          status={lengthStatus}
                        />
                      )}

                      {/* Reference values */}
                      <div className="rounded-xl bg-violet-600/50 p-4 text-xs text-violet-200">
                        <p className="mb-1.5 font-bold text-violet-200">{t('growth.whoRef')} ({age} mo, {gender})</p>
                        <div className="flex justify-between gap-2">
                          {(['P3', 'P15', 'P50', 'P85', 'P97'] as const).map((p, i) => (
                            <div key={p} className="text-center">
                              <p className="font-semibold text-violet-400">{p}</p>
                              <p className="mt-0.5 font-bold text-white">{weightRef[i]} kg</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-violet-400">{t('growth.source')}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function GrowthResultBar({ label, value, unit, ref_, status }: {
  label: string; value: number; unit: string; ref_: PR; status: GrowthStatus;
}) {
  const t = useTranslations('childHealth');
  const meta    = STATUS_META[status];
  const needle  = getNeedle(value, ref_);
  const pLabel  = getPercentileLabel(value, ref_);

  return (
    <div className={`rounded-xl border p-4 ${meta.bg} ${meta.border}`}>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-violet-200">{label}</p>
        <span className={`text-sm font-bold ${meta.color}`}>{value} {unit}</span>
      </div>
      {/* Gauge bar */}
      <div className="relative h-3 overflow-hidden rounded-full bg-gradient-to-r from-red-400 via-emerald-400 to-red-400">
        <motion.div
          className="absolute top-1/2 h-5 w-2 -translate-y-1/2 rounded-full bg-white shadow-lg ring-2 ring-violet-600"
          initial={{ left: '50%' }}
          animate={{ left: `${needle}%` }}
          transition={{ duration: 0.8, ease: EASE }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-violet-500">
        <span>{t('growth.low')}</span><span>{t('growth.normal')}</span><span>{t('growth.high')}</span>
      </div>
      <p className={`mt-2 text-xs font-semibold ${meta.color}`}>
        {meta.label} &middot; {pLabel}
      </p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 3: BRAIN DEVELOPMENT MILESTONES
// ══════════════════════════════════════════════════════════════════════════════
type MilestonePeriod = { period: string; subtitle: string; brainStage: string; points: string[]; recTitle: string; recBody: string; nutritionBody: string; };

function DevelopmentMilestones() {
  const t = useTranslations('childHealth');
  const [active, setActive] = useState(0);

  const milestones = (t.raw('milestones.periods') as MilestonePeriod[]).map((p, i) => ({
    ...p, ...MILESTONE_META[i],
  }));

  return (
    <section id="milestones" className="relative overflow-hidden bg-violet-700 py-24">
      <WaveMotif className="absolute inset-0 h-full w-full opacity-20" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="mb-14 text-center">
          <Eyebrow text={t('milestones.eyebrow')} dark />
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white sm:text-5xl">
            {t('milestones.title')}
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-lg text-violet-200/80">
            {t('milestones.subtitle')}
          </motion.p>
        </motion.div>

        {/* Period tabs */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {milestones.map((m, i) => (
            <motion.button
              key={i} type="button"
              onClick={() => setActive(i)}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              className={`rounded-xl border px-4 py-3 text-center text-xs font-bold uppercase tracking-wide transition-all ${
                active === i
                  ? 'border-white/40 bg-white/20 text-white shadow-lg'
                  : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
              }`}
            >
              <div className="mb-1 text-xl">{m.icon}</div>
              {m.period}
            </motion.button>
          ))}
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          {milestones.map((m, i) =>
            active === i && (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className={`overflow-hidden rounded-2xl bg-gradient-to-br ${m.gradient} p-1`}>
                  <div className="rounded-xl bg-violet-800/70 backdrop-blur-sm">
                    <div className="grid gap-0 lg:grid-cols-3">

                      {/* Brain stage */}
                      <div className="flex flex-col items-center justify-center border-b border-white/10 p-8 text-center lg:border-b-0 lg:border-r">
                        <div className="mb-3 text-5xl">{m.icon}</div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/50">{t('milestones.brainStage')}</p>
                        <p className="mt-2 text-xl font-extrabold text-white">{m.brainStage}</p>
                        <p className="mt-1 text-sm text-white/60">{m.subtitle}</p>
                      </div>

                      {/* Key developments */}
                      <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-300">{t('milestones.keyDev')}</p>
                        <ul className="space-y-3">
                          {m.points.map((pt, j) => (
                            <motion.li key={j}
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.08 }}
                              className="flex items-start gap-2.5 text-sm text-white/80"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                              {pt}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommendation */}
                      <div className="p-8">
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-violet-300">{t('milestones.parentRec')}</p>
                        <div className="flex items-start gap-3">
                          <span className="text-3xl">{m.recIcon}</span>
                          <div>
                            <p className="font-bold text-white">{m.recTitle}</p>
                            <p className="mt-1 text-sm leading-relaxed text-white/70">{m.recBody}</p>
                          </div>
                        </div>
                        <div className="mt-6 rounded-xl border border-white/10 bg-white/10 p-4">
                          <p className="text-xs font-semibold text-amber-300">{t('milestones.nutritionTip')}</p>
                          <p className="mt-1 text-xs text-white/70">{m.nutritionBody}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>

        {/* Key international recommendations row */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {(t.raw('milestones.recs') as {icon: string; title: string; body: string}[]).map(r => (
            <motion.div key={r.title} variants={scaleUp}
              className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
            >
              <span className="text-2xl">{r.icon}</span>
              <p className="mt-2 text-xs font-bold text-white">{r.title}</p>
              <p className="mt-1 text-xs text-white/60">{r.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 4: INTERACTIVE VACCINATION TRACKER
// ══════════════════════════════════════════════════════════════════════════════
function VaccinationTracker() {
  const t = useTranslations('childHealth');
  const ageLabels = t.raw('vaccination.ageLabels') as string[];
  const [childAge, setChildAge]           = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [openGroup, setOpenGroup]         = useState<number | null>(null);

  type VaxStatus = 'done' | 'due' | 'upcoming';

  function getStatus(gi: number): VaxStatus {
    const g = VAX_SCHEDULE[gi];
    if (childAge > g.dueHigh) return 'done';
    if (childAge >= g.dueLow) return 'due';
    return 'upcoming';
  }

  const doneVaxCount = hasInteracted
    ? VAX_SCHEDULE.reduce((s, g, gi) => getStatus(gi) === 'done' ? s + g.vaccines.length : s, 0) : 0;
  const dueVaxCount = hasInteracted
    ? VAX_SCHEDULE.reduce((s, g, gi) => getStatus(gi) === 'due'  ? s + g.vaccines.length : s, 0) : 0;
  const nextGroupIdx = hasInteracted
    ? VAX_SCHEDULE.findIndex((_, gi) => getStatus(gi) === 'upcoming') : -1;

  function formatAge(months: number): string {
    if (months === 0) return t('vaccination.newborn');
    if (months < 24)  return `${months} ${t('vaccination.months')}`;
    const yrs = Math.floor(months / 12);
    const mo  = months % 12;
    return mo > 0
      ? `${yrs} ${t('vaccination.years')} ${mo} ${t('vaccination.months')}`
      : `${yrs} ${t('vaccination.years')}`;
  }

  function updateAge(val: number) {
    setChildAge(Math.min(72, Math.max(0, val)));
    setHasInteracted(true);
  }

  const statusLabel: Record<VaxStatus, string> = {
    done:     t('vaccination.statusDone'),
    due:      t('vaccination.statusDue'),
    upcoming: t('vaccination.statusUpcoming'),
  };

  return (
    <section id="vaccination" className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-violet-800 to-purple-900 py-24">
      <WaveMotif className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="mb-12 text-center">
          <Eyebrow text={t('vaccination.eyebrow')} dark />
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white sm:text-5xl">
            {t('vaccination.title')}
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-lg text-violet-200/80">
            {t('vaccination.subtitle')}
          </motion.p>
        </motion.div>

        {/* Age Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT}
          className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm"
        >
          <p className="mb-4 text-center text-sm font-semibold text-violet-200">
            {t('vaccination.ageInputLabel')}
          </p>

          {/* Age display */}
          <div className="mb-5 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={hasInteracted ? childAge : 'idle'}
                initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="text-5xl font-extrabold tracking-tight text-white"
              >
                {hasInteracted ? formatAge(childAge) : '—'}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Stepper + number input */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => updateAge(childAge - 1)}
              disabled={childAge === 0 && hasInteracted}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl font-bold text-white transition-all hover:bg-white/20 disabled:opacity-30"
            >−</button>
            <input
              type="number" min={0} max={72} step={1}
              value={hasInteracted ? childAge : ''}
              onChange={e => {
                const v = parseInt(e.target.value);
                if (!isNaN(v)) updateAge(v);
                else setHasInteracted(false);
              }}
              placeholder="0–72"
              className="w-28 rounded-xl border border-violet-500/50 bg-violet-600/50 px-3 py-2 text-center text-2xl font-bold text-white placeholder:text-violet-400 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-500/40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => updateAge(childAge + 1)}
              disabled={childAge === 72 && hasInteracted}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl font-bold text-white transition-all hover:bg-white/20 disabled:opacity-30"
            >+</button>
          </div>

          {/* Range slider */}
          <input
            type="range" min={0} max={72} step={1} value={childAge}
            onChange={e => updateAge(+e.target.value)}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-amber-400"
          />
          <div className="mt-2 flex justify-between text-xs text-violet-400">
            <span>{t('vaccination.newborn')}</span>
            <span>2 {t('vaccination.years')}</span>
            <span>6 {t('vaccination.years')}</span>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {!hasInteracted ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-8 rounded-2xl border border-dashed border-white/20 px-8 py-14 text-center"
            >
              <div className="mb-3 text-5xl">💉</div>
              <p className="text-violet-300/80">{t('vaccination.noInput')}</p>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">

              {/* Status banner */}
              <div className={`overflow-hidden rounded-2xl border p-4 text-center ${
                dueVaxCount > 0
                  ? 'border-amber-400/40 bg-amber-500/15'
                  : doneVaxCount === TOTAL_VACCINES
                  ? 'border-emerald-400/40 bg-emerald-500/15'
                  : 'border-emerald-400/20 bg-emerald-900/20'
              }`}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${dueVaxCount}-${doneVaxCount}`}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    className={`text-base font-bold ${dueVaxCount > 0 ? 'text-amber-200' : 'text-emerald-200'}`}
                  >
                    {dueVaxCount > 0
                      ? `💉 ${dueVaxCount} ${t('vaccination.dueNowBanner')}`
                      : doneVaxCount === TOTAL_VACCINES
                      ? t('vaccination.allDone')
                      : `✅ ${t('vaccination.allClear')}`
                    }
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Stats row */}
              <div className={`grid gap-4 ${nextGroupIdx >= 0 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-900/20 p-4 text-center">
                  <p className="text-3xl font-extrabold text-emerald-300">{doneVaxCount}</p>
                  <p className="mt-1 text-xs leading-tight text-emerald-400/80">{t('vaccination.doneCountLabel')}</p>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-900/20 p-4 text-center">
                  <p className="text-3xl font-extrabold text-amber-300">{dueVaxCount}</p>
                  <p className="mt-1 text-xs leading-tight text-amber-400/80">{t('vaccination.dueCountLabel')}</p>
                </div>
                {nextGroupIdx >= 0 && (
                  <div className="rounded-xl border border-violet-500/20 bg-violet-700/20 p-4 text-center">
                    <p className="text-xs text-violet-400/80">{t('vaccination.nextVisitLabel')}</p>
                    <p className="mt-1 text-sm font-bold leading-tight text-white">{ageLabels[nextGroupIdx]}</p>
                    <p className="text-xs text-violet-400">{VAX_SCHEDULE[nextGroupIdx].vaccines.length} {t('vaccination.vaccinesCount')}</p>
                  </div>
                )}
              </div>

              {/* Full schedule timeline */}
              <div className="space-y-2">
                {VAX_SCHEDULE.map((group, gi) => {
                  const status = getStatus(gi);
                  const isDue  = status === 'due';
                  const isDone = status === 'done';
                  const isOpen = isDue || openGroup === gi;

                  const rowCls = isDue
                    ? 'border-amber-400/50 bg-amber-500/10 shadow-md shadow-amber-900/20'
                    : isDone
                    ? 'border-white/5 bg-white/5 opacity-70'
                    : 'border-white/10 bg-white/5';

                  const iconEl = isDue ? (
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/30">
                      <motion.span className="absolute inset-0 rounded-full bg-amber-400/25"
                        animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
                      <span className="relative text-base">💉</span>
                    </span>
                  ) : isDone ? (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">✓</span>
                  ) : (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm text-white/30">⏳</span>
                  );

                  const badgeCls = isDue
                    ? 'bg-amber-500/30 text-amber-200 font-bold'
                    : isDone
                    ? 'bg-emerald-500/15 text-emerald-400/70'
                    : 'bg-white/10 text-white/40';

                  return (
                    <motion.div
                      key={group.ageLabel}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: gi * 0.04 }}
                      className={`overflow-hidden rounded-2xl border transition-all ${rowCls}`}
                    >
                      <button
                        type="button"
                        onClick={() => { if (!isDue) setOpenGroup(openGroup === gi ? null : gi); }}
                        className={`flex w-full items-center gap-3 px-5 py-4 text-left ${!isDue ? 'cursor-pointer hover:bg-white/5' : 'cursor-default'}`}
                      >
                        {iconEl}
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-bold ${isDone ? 'text-white/50' : 'text-white'}`}>{ageLabels[gi]}</p>
                          <p className="text-xs text-white/30">{group.vaccines.length} {t('vaccination.vaccinesCount')}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs ${badgeCls}`}>
                          {statusLabel[status]}
                        </span>
                        {!isDue && (
                          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-xs text-white/25">▾</motion.span>
                        )}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 border-t border-white/10 px-5 pb-4 pt-3">
                              {group.vaccines.map(v => (
                                <div key={v.id} className={`flex items-start gap-3 rounded-xl px-3 py-2.5 ${
                                  isDue ? 'border border-amber-400/20 bg-amber-500/10' : 'bg-white/5'
                                }`}>
                                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                                    isDue ? 'bg-amber-400' : isDone ? 'bg-emerald-400/50' : 'bg-violet-400/50'
                                  }`} />
                                  <div className="min-w-0">
                                    <p className={`text-sm font-semibold ${isDone ? 'text-white/40' : 'text-white'}`}>{v.name}</p>
                                    <p className="mt-0.5 text-xs text-white/30">{v.disease}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEWPORT}
          className="mt-8 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-center text-xs text-amber-200/80"
        >
          ⚠️ {t('vaccination.disclaimer')}
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ══════════════════════════════════════════════════════════════════════════════
export function ChildHealthSection() {
  return (
    <main style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
      <Hero />
      <GrowthTracker />
      <DevelopmentMilestones />
      <VaccinationTracker />
    </main>
  );
}
