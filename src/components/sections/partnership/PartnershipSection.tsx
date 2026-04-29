'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, type ChangeEvent, type MouseEvent } from 'react';

// ── Animation constants ────────────────────────────────────────────────────
const EASE = [0, 0, 0.2, 1] as const;
const VIEWPORT = { once: true, margin: '-80px' } as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};
const fadeRight = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};
const scaleUp = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

function WaveMotif({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden fill="none">
      {[80, 120, 160, 200, 240].map((r, i) => (
        <motion.ellipse
          key={r}
          cx="200" cy="200" rx={r} ry={r * 0.55}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '200px', originY: '200px' }}
        />
      ))}
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
      <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75L35 40h7c1.657 0 3-1.343 3-3V16.2z"/>
      <path fill="#1e88e5" d="M3 16.2l3.614 1.71L13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z"/>
      <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,28 13,40 24,30.45 35,40 36,28"/>
      <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859C9.132 8.301 8.228 8 7.298 8 4.924 8 3 9.924 3 12.298z"/>
      <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341C38.868 8.301 39.772 8 40.702 8 43.076 8 45 9.924 45 12.298z"/>
    </svg>
  );
}

function OutlookIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
      <path fill="#1976D2" d="M28 12h14c1.1 0 2 .9 2 2v20c0 1.1-.9 2-2 2H28V12z"/>
      <path fill="#fff" d="M30 26h10v2H30zm0-4h10v2H30zm0-4h10v2H30z"/>
      <path fill="#0D47A1" d="M4 12h22c1.1 0 2 .9 2 2v20c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V14c0-1.1.9-2 2-2z"/>
      <circle fill="#fff" cx="15" cy="24" r="7"/>
      <circle fill="#1976D2" cx="15" cy="24" r="5"/>
    </svg>
  );
}

// ── Section 1: Hero with image ─────────────────────────────────────────────
function Hero() {
  const t = useTranslations('partnership');

  return (
    <section className="relative min-h-[88vh] overflow-hidden flex items-center">

      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/testIMG/partnership.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient overlays — mirrors home page style */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-violet-950/90 via-violet-900/40 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-violet-950/30 lg:hidden" />
      <div className="absolute inset-x-0 bottom-0 h-32 z-[1] bg-gradient-to-t from-violet-950/50 to-transparent" />

      {/* Subtle wave motif on the left overlay */}
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

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2">

            {/* Left: text */}
            <div className="pb-16 pt-24 text-center lg:pb-24 lg:text-left">

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="mb-4 flex items-center justify-center gap-3 lg:justify-start"
              >
                <motion.span
                  className="block h-px bg-amber-400"
                  initial={{ width: 0 }} animate={{ width: 40 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                />
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                  {t('hero.eyebrow')}
                </span>
                <motion.span
                  className="block h-px bg-amber-400"
                  initial={{ width: 0 }} animate={{ width: 40 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.18, ease: EASE }}
                className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                {t('hero.title')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
                className="mx-auto mt-5 max-w-lg text-lg text-violet-200 lg:mx-0"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
              >
                {(t.raw('hero.badges') as string[]).map((label, i) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                    className="rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm"
                  >
                    {label}
                  </motion.span>
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

// ── Section 2: About BHP ───────────────────────────────────────────────────
function IntroSection() {
  const t = useTranslations('partnership');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50 py-24">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-purple-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="mb-14 text-center"
        >
          <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3">
            <motion.span
              className="block h-px bg-amber-400"
              initial={{ width: 0 }} whileInView={{ width: 36 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              {t('intro.eyebrow')}
            </span>
            <motion.span
              className="block h-px bg-amber-400"
              initial={{ width: 0 }} whileInView={{ width: 36 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE }}
            />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold leading-tight text-violet-900 sm:text-5xl">
            {t('intro.heading')}
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-violet-700/70">
            {t('intro.body')}
          </motion.p>
        </motion.div>

        {/* Key facts grid */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {(['4', '12', '5', '40+'] as const).map((value, i) => {
            const label = (t.raw('intro.statLabels') as string[])[i];
            return (
            <motion.div
              key={label}
              variants={scaleUp}
              className="rounded-xl bg-white p-5 text-center shadow-sm ring-1 ring-violet-100"
            >
              <p className="text-2xl font-extrabold text-violet-700">{value}</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-violet-500">{label}</p>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ── Section 3: Contact / Email (moved up) ──────────────────────────────────
const inputCls =
  'w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur-sm transition-all duration-200 focus:border-white/50 focus:bg-white/20 focus:ring-2 focus:ring-white/10';

function CTASection() {
  const t = useTranslations('partnership');
  const [values, setValues] = useState({ subject: 'Distribution Partnership', message: '' });

  function handleChange(e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  }

  function buildUrl(provider: 'gmail' | 'outlook') {
    if (provider === 'gmail') {
      return (
        'https://mail.google.com/mail/?view=cm' +
        `&to=Info@lactonic.org` +
        `&su=${encodeURIComponent(values.subject)}` +
        `&body=${encodeURIComponent(values.message)}`
      );
    }
    return (
      'https://outlook.live.com/mail/0/deeplink/compose' +
      `?to=Info@lactonic.org` +
      `&subject=${encodeURIComponent(values.subject)}` +
      `&body=${encodeURIComponent(values.message)}`
    );
  }

  function handleOpen(e: MouseEvent<HTMLButtonElement>, provider: 'gmail' | 'outlook') {
    e.preventDefault();
    window.open(buildUrl(provider), '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="relative overflow-hidden bg-violet-700 py-24">
      <WaveMotif className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-15" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* Heading */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3">
            <motion.span
              className="block h-px bg-amber-400"
              initial={{ width: 0 }} whileInView={{ width: 40 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              {t('cta.eyebrow')}
            </span>
            <motion.span
              className="block h-px bg-amber-400"
              initial={{ width: 0 }} whileInView={{ width: 40 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE }}
            />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white sm:text-5xl">
            {t('cta.heading')}
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-lg text-violet-200/80">
            {t('cta.body')}
          </motion.p>
        </motion.div>

        {/* Email card + form */}
        <div className="grid gap-8 lg:grid-cols-5 lg:items-start">

          {/* Email info */}
          <motion.div
            variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                  {t('cta.emailLabel')}
                </span>
              </div>
              <a
                href="mailto:Info@lactonic.org"
                className="text-lg font-bold text-white hover:text-violet-200 transition-colors"
              >
                {t('cta.emailValue')}
              </a>
              <p className="mt-4 text-sm leading-relaxed text-violet-200/60">
                {t('cta.hint')}
              </p>
              <div className="mt-6 space-y-2 text-sm text-violet-200/70">
                {(t.raw('cta.partnerTypes') as string[]).map(l => (
                  <div key={l} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeRight} initial="hidden" whileInView="visible" viewport={VIEWPORT}
            className="lg:col-span-3"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-sm">
              <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-violet-400 to-purple-400" />
              <form className="space-y-5 p-8">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-violet-200">
                    {t('cta.subjectLabel')}
                  </label>
                  <select
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    className={inputCls}
                  >
                    <option value="Distribution Partnership" className="bg-violet-900">{t('cta.subjects.distribution')}</option>
                    <option value="New Market Entry" className="bg-violet-900">{t('cta.subjects.newMarket')}</option>
                    <option value="Agency Partnership" className="bg-violet-900">{t('cta.subjects.agency')}</option>
                    <option value="General Inquiry" className="bg-violet-900">{t('cta.subjects.general')}</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-violet-200">
                    {t('cta.messageLabel')}
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={handleChange}
                    placeholder={t('cta.messagePlaceholder')}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <motion.button
                    type="submit"
                    onClick={(e) => handleOpen(e, 'gmail')}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-300/30 hover:bg-red-500/20 hover:shadow-xl"
                  >
                    <GmailIcon />
                    {t('cta.openGmail')}
                  </motion.button>

                  <motion.button
                    type="submit"
                    onClick={(e) => handleOpen(e, 'outlook')}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/30 hover:bg-blue-500/20 hover:shadow-xl"
                  >
                    <OutlookIcon />
                    {t('cta.openOutlook')}
                  </motion.button>
                </div>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ── Section 4: Distribution Model ─────────────────────────────────────────
function OpportunitiesSection() {
  const t = useTranslations('partnership');
  const items = t.raw('opportunities.items') as { title: string; body: string }[];

  const ICONS = ['🌐', '📍', '🤝'];

  return (
    <section className="relative overflow-hidden bg-violet-600 py-24">
      <WaveMotif className="absolute inset-0 h-full w-full opacity-25" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="mb-14 text-center"
        >
          <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3">
            <motion.span
              className="block h-px bg-amber-300"
              initial={{ width: 0 }} whileInView={{ width: 36 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              {t('opportunities.eyebrow')}
            </span>
            <motion.span
              className="block h-px bg-amber-300"
              initial={{ width: 0 }} whileInView={{ width: 36 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE }}
            />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white sm:text-5xl">
            {t('opportunities.heading')}
          </motion.h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="group flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 hover:shadow-xl"
            >
              <span className="text-3xl">{ICONS[i]}</span>
              <div className="h-0.5 w-10 rounded-full bg-amber-400" />
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-violet-100/80">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section 5: What to Expect from BHP ────────────────────────────────────
function WhySection() {
  const t = useTranslations('partnership');
  const items = t.raw('why.items') as { icon: string; title: string; body: string }[];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-violet-50 py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="mb-14 text-center"
        >
          <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-amber-400 block" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              {t('why.eyebrow')}
            </span>
            <span className="h-px w-8 bg-amber-400 block" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-violet-900 sm:text-5xl">
            {t('why.heading')}
          </motion.h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-md ring-1 ring-violet-100 transition-shadow duration-300 hover:shadow-xl hover:shadow-violet-100"
            >
              <span className="mb-4 text-3xl">{item.icon}</span>
              <div className="mb-4 h-0.5 w-10 rounded-full bg-violet-400" />
              <h3 className="mb-2 font-bold text-violet-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-violet-600/80">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Root export ────────────────────────────────────────────────────────────
export function PartnershipSection() {
  return (
    <main style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
      <Hero />
      <IntroSection />
      <CTASection />
      <OpportunitiesSection />
      <WhySection />
    </main>
  );
}
