'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { products } from '@/data/products';
import type { Product } from '@/types/product';

const EASE = [0, 0, 0.2, 1] as const;

// ─── Types ─────────────────────────────────────────────────────────────────────

type Age = '0-6m' | '6-12m' | '1-3y';
type Category = 'formula' | 'baby-food';
type SpecialNeeds = 'none' | 'colic' | 'regurgitation' | 'allergy' | 'lactose';
type Preference = 'premium' | 'easy';
type FoodType = 'fruity' | 'savory' | 'mixed';
type Step = 'age' | 'category' | 'special-needs' | 'preference' | 'food-type' | 'result';

interface QuizState {
  age?: Age;
  category?: Category;
  specialNeeds?: SpecialNeeds;
  preference?: Preference;
  foodType?: FoodType;
}

interface OptionDef {
  value: string;
  label: string;
  sub: string;
  icon: string;
}

// ─── Product recommendation logic ──────────────────────────────────────────────

function getProductSlug(s: QuizState): string {
  const { age, category, specialNeeds, preference, foodType } = s;

  if (category === 'baby-food') {
    if (age === '0-6m') return 'lactonic-3-fruits';
    if (foodType === 'fruity') return 'lactonic-4-fruits-cookie';
    if (foodType === 'savory') return age === '1-3y' ? 'lactonic-vegetables-beef' : 'lactonic-baby-kabsah';
    return 'lactonic-fruit-cereals';
  }

  // formula
  if (specialNeeds === 'colic') return 'lactonic-ac-gold';
  if (specialNeeds === 'regurgitation') return 'lactonic-ar-gold';
  if (specialNeeds === 'lactose') return 'lactonic-lf';

  if (age === '0-6m') {
    if (specialNeeds === 'allergy') return 'lactonic-ha-1';
    return preference === 'easy' ? 'ease-to-go-1' : 'lactonic-gold-1';
  }
  if (age === '6-12m') {
    if (specialNeeds === 'allergy') return 'lactonic-ha-2';
    return preference === 'easy' ? 'ease-to-go-2' : 'lactonic-gold-2';
  }
  // 1-3y
  if (specialNeeds === 'allergy') return 'lactonic-ha-3';
  return preference === 'easy' ? 'ease-to-go-3' : 'lactolac-gold-3';
}

const MEDICAL_SLUGS = new Set([
  'lactonic-ha-1', 'lactonic-ha-2', 'lactonic-ha-3', 'lactonic-lf',
]);

// ─── Wave background ────────────────────────────────────────────────────────────

function WaveMotif() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
      aria-hidden="true"
      fill="none"
    >
      {[80, 120, 160, 200, 240].map((r, i) => (
        <motion.ellipse
          key={r}
          cx="200" cy="200" rx={r} ry={r * 0.55}
          stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '200px', originY: '200px' }}
        />
      ))}
    </svg>
  );
}

// ─── Floating particles ─────────────────────────────────────────────────────────

const PARTICLES = [
  { size: 6, x: '15%', y: '20%', delay: 0 },
  { size: 4, x: '80%', y: '15%', delay: 1.2 },
  { size: 8, x: '70%', y: '70%', delay: 0.7 },
  { size: 5, x: '25%', y: '75%', delay: 1.8 },
  { size: 3, x: '90%', y: '45%', delay: 0.4 },
  { size: 7, x: '10%', y: '55%', delay: 2.1 },
];

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-400/20"
          style={{ width: p.size, height: p.size, left: p.x, top: p.y }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i * 0.4, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─── Progress bar ───────────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-300"
        initial={{ width: '4%' }}
        animate={{ width: `${Math.max(value, 4)}%` }}
        transition={{ duration: 0.55, ease: EASE }}
      />
    </div>
  );
}

// ─── Option card ────────────────────────────────────────────────────────────────

function OptionCard({ opt, onSelect }: { opt: OptionDef; onSelect: (v: string) => void }) {
  return (
    <motion.button
      onClick={() => onSelect(opt.value)}
      className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left backdrop-blur-sm transition-colors hover:border-amber-400/40 hover:bg-white/10"
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl transition-colors group-hover:bg-amber-400/15">
        {opt.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-white">{opt.label}</p>
        <p className="mt-0.5 text-sm text-violet-300">{opt.sub}</p>
      </div>
      <span className="flex-shrink-0 text-lg text-amber-300 opacity-0 transition-opacity group-hover:opacity-100">
        →
      </span>
    </motion.button>
  );
}

// ─── Step slide variants ────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 72 : -72, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -72 : 72, opacity: 0 }),
};

// ─── Staggered option list ──────────────────────────────────────────────────────

function StepContent({
  question,
  options,
  onSelect,
  onBack,
}: {
  question: string;
  options: OptionDef[];
  onSelect: (v: string) => void;
  onBack?: () => void;
}) {
  return (
    <div>
      <h2 className="mb-6 text-xl font-bold leading-snug text-white sm:text-2xl">{question}</h2>
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => (
          <motion.div
            key={opt.value}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35, ease: EASE }}
          >
            <OptionCard opt={opt} onSelect={onSelect} />
          </motion.div>
        ))}
      </div>
      {onBack && (
        <motion.button
          onClick={onBack}
          className="mt-5 text-sm text-violet-300 transition-colors hover:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: options.length * 0.06 + 0.1 }}
        >
          ← Back
        </motion.button>
      )}
    </div>
  );
}

// ─── Result screen ──────────────────────────────────────────────────────────────

function ResultScreen({
  product,
  onRetake,
  t,
  tGlobal,
  isMedical,
}: {
  product: Product;
  onRetake: () => void;
  t: ReturnType<typeof useTranslations<'quiz'>>;
  tGlobal: ReturnType<typeof useTranslations>;
  isMedical: boolean;
}) {
  const displayName = tGlobal(product.nameKey as Parameters<typeof tGlobal>[0]);
  const description = tGlobal(product.descriptionKey as Parameters<typeof tGlobal>[0]);

  return (
    <div className="text-center">
      {/* Confetti dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 6 + (i % 3) * 4,
            height: 6 + (i % 3) * 4,
            background: i % 2 === 0 ? '#fcd34d' : '#c4b5fd',
            left: `${10 + i * 14}%`,
            top: `${8 + (i % 2) * 12}%`,
          }}
          initial={{ scale: 0, y: 0, opacity: 1 }}
          animate={{ scale: [0, 1.4, 1], y: [-20, -60 - i * 8], opacity: [1, 1, 0] }}
          transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
        />
      ))}

      {/* Match badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="mb-4 inline-block rounded-full bg-amber-400/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300"
      >
        ✨ {t('result.eyebrow')}
      </motion.div>

      {/* Product image */}
      <motion.div
        className="relative mx-auto mb-4"
        style={{ width: 260, height: 260 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
      >
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src={product.imagePath}
            alt={displayName}
            width={260}
            height={260}
            className="mx-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 rounded-full bg-white/10 blur-2xl" />
      </motion.div>

      {/* Badge pill */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.22 }}
        className="inline-block rounded-full bg-violet-600/50 px-3 py-0.5 text-xs font-medium text-violet-100"
      >
        {tGlobal(product.badgeKey)}
      </motion.span>

      {/* Name */}
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, ease: EASE }}
        className="mt-2 text-2xl font-extrabold text-white"
      >
        {displayName}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-2 text-sm leading-relaxed text-violet-200"
      >
        {description}
      </motion.p>

      {/* Features */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.42 }}
        className="mt-4 flex flex-col gap-1.5 text-left"
      >
        {product.featureKeys.slice(0, 4).map((key, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-violet-100">
            <span className="flex-shrink-0 text-amber-400">✓</span>
            {tGlobal(key)}
          </li>
        ))}
      </motion.ul>

      {/* Medical disclaimer */}
      {isMedical && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-2.5 text-xs text-amber-200"
        >
          ⚕️ {t('result.medicalNote')}
        </motion.p>
      )}

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, ease: EASE }}
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <Link
          href={`/products/${product.slug}`}
          className="flex-1 rounded-full bg-white px-6 py-3.5 text-center text-sm font-bold text-violet-700 shadow-lg transition-shadow hover:shadow-white/20"
        >
          {t('result.viewDetails')} →
        </Link>
        <button
          onClick={onRetake}
          className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          {t('result.retake')}
        </button>
      </motion.div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────────

export function BabyQuiz() {
  const t = useTranslations('quiz');
  const tGlobal = useTranslations();

  const [step, setStep] = useState<Step>('age');
  const [dir, setDir] = useState(1);
  const [state, setState] = useState<QuizState>({});
  const [history, setHistory] = useState<Step[]>([]);

  function advance(nextStep: Step, patch: Partial<QuizState>) {
    setDir(1);
    setState((s) => ({ ...s, ...patch }));
    setHistory((h) => [...h, step]);
    setStep(nextStep);
  }

  function goBack() {
    if (history.length === 0) return;
    setDir(-1);
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setStep(prev);
  }

  function reset() {
    setDir(-1);
    setState({});
    setHistory([]);
    setStep('age');
  }

  // Progress 0–100
  const TOTAL_STEPS = 4;
  const progress = step === 'result' ? 100 : Math.min(Math.round((history.length / TOTAL_STEPS) * 100), 95);

  // Resolve result product
  const resultSlug = step === 'result' ? getProductSlug(state) : null;
  const resultProduct = resultSlug ? products.find((p) => p.slug === resultSlug) ?? null : null;
  const isMedical = resultSlug ? MEDICAL_SLUGS.has(resultSlug) : false;

  // Step counter label
  const ORDERED_STEPS: Step[] = ['age', 'category', 'special-needs', 'preference', 'food-type'];
  const stepNumber = ORDERED_STEPS.indexOf(step) + 1;
  const stepTotal = ORDERED_STEPS.length;

  return (
    <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-violet-700">
      {/* Background layers */}
      <WaveMotif />
      <Particles />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(139,92,246,0.3),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-violet-900/40 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-lg flex-col items-center justify-center px-4 py-16">

        {/* Header */}
        <motion.div
          className="mb-5 flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className="h-px w-10 bg-amber-400 block" />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
            {t('eyebrow')}
          </span>
          <span className="h-px w-10 bg-amber-400 block" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          className="mb-2 text-center text-3xl font-extrabold leading-tight text-white sm:text-4xl"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
          className="mb-8 text-center text-sm leading-relaxed text-violet-200 sm:text-base"
        >
          {t('subtitle')}
        </motion.p>

        {/* Progress area */}
        <motion.div
          className="mb-6 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24 }}
        >
          <ProgressBar value={progress} />
          {step !== 'result' && (
            <p className="mt-1.5 text-right text-xs text-violet-400">
              {t('stepOf', { current: stepNumber, total: stepTotal })}
            </p>
          )}
        </motion.div>

        {/* Quiz card */}
        <div className="relative w-full">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: EASE }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-md sm:p-8"
            >
              {/* Inner shimmer */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent" />

              {/* ── Step: age ── */}
              {step === 'age' && (
                <StepContent
                  question={t('q1.question')}
                  options={[
                    { value: '0-6m',  label: t('q1.opt1.label'), sub: t('q1.opt1.sub'), icon: '🐣' },
                    { value: '6-12m', label: t('q1.opt2.label'), sub: t('q1.opt2.sub'), icon: '🌱' },
                    { value: '1-3y',  label: t('q1.opt3.label'), sub: t('q1.opt3.sub'), icon: '🌟' },
                  ]}
                  onSelect={(v) => advance('category', { age: v as Age })}
                />
              )}

              {/* ── Step: category ── */}
              {step === 'category' && (
                <StepContent
                  question={t('q2.question')}
                  options={[
                    { value: 'formula',    label: t('q2.opt1.label'), sub: t('q2.opt1.sub'), icon: '🍼' },
                    { value: 'baby-food',  label: t('q2.opt2.label'), sub: state.age === '0-6m' ? t('q2.opt2.sub0') : t('q2.opt2.sub'), icon: '🥄' },
                  ]}
                  onSelect={(v) => {
                    if (v === 'formula') {
                      advance('special-needs', { category: 'formula' });
                    } else if (state.age === '0-6m') {
                      advance('result', { category: 'baby-food' });
                    } else {
                      advance('food-type', { category: 'baby-food' });
                    }
                  }}
                  onBack={goBack}
                />
              )}

              {/* ── Step: special-needs ── */}
              {step === 'special-needs' && (
                <StepContent
                  question={t('q3.question')}
                  options={[
                    { value: 'none',          label: t('q3.opt1.label'), sub: t('q3.opt1.sub'), icon: '😊' },
                    { value: 'colic',         label: t('q3.opt2.label'), sub: t('q3.opt2.sub'), icon: '😣' },
                    { value: 'regurgitation', label: t('q3.opt3.label'), sub: t('q3.opt3.sub'), icon: '🤭' },
                    { value: 'allergy',       label: t('q3.opt4.label'), sub: t('q3.opt4.sub'), icon: '🤧' },
                    { value: 'lactose',       label: t('q3.opt5.label'), sub: t('q3.opt5.sub'), icon: '🥛' },
                  ]}
                  onSelect={(v) => {
                    if (v === 'none') {
                      advance('preference', { specialNeeds: 'none' });
                    } else {
                      advance('result', { specialNeeds: v as SpecialNeeds });
                    }
                  }}
                  onBack={goBack}
                />
              )}

              {/* ── Step: preference ── */}
              {step === 'preference' && (
                <StepContent
                  question={t('q4.question')}
                  options={[
                    { value: 'premium', label: t('q4.opt1.label'), sub: t('q4.opt1.sub'), icon: '⭐' },
                    { value: 'easy',    label: t('q4.opt2.label'), sub: t('q4.opt2.sub'), icon: '⚡' },
                  ]}
                  onSelect={(v) => advance('result', { preference: v as Preference })}
                  onBack={goBack}
                />
              )}

              {/* ── Step: food-type ── */}
              {step === 'food-type' && (
                <StepContent
                  question={t('q5.question')}
                  options={[
                    { value: 'fruity', label: t('q5.opt1.label'), sub: t('q5.opt1.sub'), icon: '🍎' },
                    { value: 'savory', label: t('q5.opt2.label'), sub: t('q5.opt2.sub'), icon: '🥩' },
                    { value: 'mixed',  label: t('q5.opt3.label'), sub: t('q5.opt3.sub'), icon: '🌾' },
                  ]}
                  onSelect={(v) => advance('result', { foodType: v as FoodType })}
                  onBack={goBack}
                />
              )}

              {/* ── Step: result ── */}
              {step === 'result' && resultProduct && (
                <ResultScreen
                  product={resultProduct}
                  onRetake={reset}
                  t={t}
                  tGlobal={tGlobal}
                  isMedical={isMedical}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
