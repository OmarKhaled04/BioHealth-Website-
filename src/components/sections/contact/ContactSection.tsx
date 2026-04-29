'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';

// ── Animation constants (mirrors AboutSection) ─────────────────────────────
const EASE   = [0, 0, 0.2, 1] as const;
const VIEWPORT = { once: true, margin: '-80px' } as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const fadeRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const scaleUp = {
  hidden:  { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] as const } },
};
const stagger     = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };
const staggerFast = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

// Floating particles (cert-hero pattern)
const PARTICLES = [
  { size: 10, top: '12%', left: '8%',  dur: 5,   delay: 0   },
  { size: 6,  top: '65%', left: '14%', dur: 4,   delay: 1   },
  { size: 14, top: '20%', left: '88%', dur: 6,   delay: 0.5 },
  { size: 8,  top: '75%', left: '82%', dur: 4.5, delay: 1.5 },
  { size: 12, top: '45%', left: '50%', dur: 7,   delay: 0.8 },
  { size: 5,  top: '35%', left: '72%', dur: 3.5, delay: 2   },
];

// ── Shared decorative components ───────────────────────────────────────────

/** Rotating ellipses — same as AboutSection.WaveMotif */
function WaveMotif({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden fill="none">
      {[80, 120, 160, 200, 240].map((r, i) => (
        <motion.ellipse
          key={r}
          cx="200" cy="200" rx={r} ry={r * 0.55}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '200px', originY: '200px' }}
        />
      ))}
    </svg>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────

function MailIconSolid() {
  return (
    <svg viewBox="0 0 24 24" fill="white" className="h-10 w-10">
      <path d="M1.5 8.067v7.433A2.25 2.25 0 0 0 3.75 17.75h16.5a2.25 2.25 0 0 0 2.25-2.25V8.067l-9.54 6.285a.75.75 0 0 1-.82 0L1.5 8.067Z"/>
      <path d="M22.5 6.908V6.75a2.25 2.25 0 0 0-2.25-2.25h-16.5A2.25 2.25 0 0 0 1.5 6.75v.158l10.5 6.913 10.5-6.913Z"/>
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

// ── Section 1: Hero (cert-hero pattern) ───────────────────────────────────

function Hero() {
  const t = useTranslations('contact');
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-500 to-purple-600 py-32 text-center text-white">

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-white/10"
          style={{ width: p.size, height: p.size, top: p.top, left: p.left }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Radial glow (cert-hero) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(167,139,250,0.18),transparent)]" />

      {/* Dot grid (cert-hero) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container relative mx-auto px-4">

        {/* Pulsing mail icon (cert-hero shield pattern) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-400/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-400/20"
            animate={{ scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.45 }}
          />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-violet-500 shadow-2xl shadow-primary-900/50">
            <MailIconSolid />
          </div>
        </motion.div>

        {/* Title — CSS transition to avoid SSR flash */}
        <h1
          className={`text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ transitionDelay: '120ms' }}
        >
          <span className="bg-gradient-to-r from-primary-300 via-violet-300 to-primary-200 bg-clip-text text-transparent">
            {t('hero.title')}
          </span>
        </h1>

        <p
          className={`mx-auto mt-5 max-w-2xl text-lg text-white/60 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
          style={{ transitionDelay: '250ms' }}
        >
          {t('hero.subtitle')}
        </p>

        {/* Trust badge — email address */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {['Info@lactonic.org', t('hero.eyebrow')].map((label, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm"
            >
              {label}
            </motion.span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

// ── Section 2: Email info band (slate-900, like About StrategicPillars) ───

function EmailBand() {
  const t = useTranslations('contact');
  const items = t.raw('info.items') as Array<{ title: string; body: string }>;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50 py-24">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-purple-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6">

        {/* Eyebrow */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="mb-14">
          <div className="mb-4 flex items-center gap-3">
            <motion.span
              className="block h-px bg-amber-400"
              initial={{ width: 0 }} whileInView={{ width: 36 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              {t('info.heading')}
            </span>
          </div>
          <h2 className="text-4xl font-bold text-violet-900">{t('info.body')}</h2>
        </motion.div>

        {/* Email card */}
        <motion.a
          href="mailto:Info@lactonic.org"
          variants={scaleUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="group mb-12 flex items-center gap-5 rounded-2xl border border-violet-200 bg-white px-7 py-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-xl hover:shadow-violet-100"
        >
          <div className="relative shrink-0">
            <motion.span
              className="absolute inset-0 rounded-xl bg-violet-400/20"
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: 'easeOut' }}
            />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
              <MailIconSolid />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-500">{t('info.email.label')}</p>
            <p className="mt-1 text-xl font-bold text-violet-900 transition-colors duration-300 group-hover:text-violet-700">
              {t('info.email.value')}
            </p>
          </div>
          <span className="ml-auto text-2xl text-violet-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-amber-400">
            →
          </span>
        </motion.a>

        {/* Why contact items */}
        <div className="space-y-0">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              transition={{ delay: i * 0.1 }}
              className="group flex items-start gap-6 border-b border-violet-100 py-6 last:border-0"
            >
              <span className="mt-1 flex h-2.5 w-2.5 shrink-0 rounded-full bg-violet-500 ring-4 ring-violet-200 transition-all duration-300 group-hover:ring-violet-300" />
              <span className="w-8 shrink-0 text-sm font-bold text-violet-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-semibold text-violet-900 transition-colors duration-200 group-hover:text-violet-600">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-violet-600/70">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Section 3: Form (violet-700 + WaveMotif, like About CoreValues) ────────

const inputCls =
  'w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur-sm transition-all duration-200 focus:border-white/50 focus:bg-white/20 focus:ring-2 focus:ring-white/10';

const JOB_VALUE = 'job';

function FormSection() {
  const t = useTranslations('contact');
  const [values, setValues] = useState({ subject: '', message: '' });

  function handleChange(e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    setCvFile(e.target.files?.[0] ?? null);
  }

  function buildUrl(provider: 'gmail' | 'outlook') {
    if (provider === 'gmail') {
      return (
        'https://mail.google.com/mail/?view=cm' +
        `&to=Info@lactonic.org` +
        `&su=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`
      );
    }
    return (
      'https://outlook.live.com/mail/0/deeplink/compose' +
      `?to=Info@lactonic.org` +
      `&subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`
    );
  }

  function handleOpen(e: FormEvent, provider: 'gmail' | 'outlook') {
    e.preventDefault();
    window.open(buildUrl(provider), '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="relative overflow-hidden bg-violet-700 py-24">
      <WaveMotif className="absolute inset-0 h-full w-full opacity-40" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">

        {/* Heading */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <motion.span
              className="block h-px bg-amber-400"
              initial={{ width: 0 }} whileInView={{ width: 36 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              {t('form.heading')}
            </span>
            <motion.span
              className="block h-px bg-amber-400"
              initial={{ width: 0 }} whileInView={{ width: 36 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE }}
            />
          </div>
          <h2 className="text-4xl font-bold text-white">{t('hero.title')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-violet-200/70">{t('form.hint')}</p>
        </motion.div>

        {/* Two-column: envelope illustration + form card */}
        <div className="grid gap-12 lg:grid-cols-5 lg:items-start">

          {/* Illustration (left, 2 cols) */}
          <motion.div
            variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT}
            className="hidden lg:col-span-2 lg:block"
          >
            <div className="rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-sm">
              <motion.svg
                viewBox="0 0 240 180"
                className="w-full"
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
              >
                <ellipse cx="120" cy="158" rx="80" ry="7" fill="rgba(255,255,255,0.08)" />
                <motion.rect
                  x="30" y="40" width="180" height="110" rx="12"
                  fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.55 }}
                />
                <motion.path
                  d="M30 52 L120 105 L210 52"
                  fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.7, delay: 0.4 }}
                />
                {[95, 112, 126].map((y, i) => (
                  <motion.line
                    key={y} x1="65" y1={y} x2={175 - i * 12} y2={y}
                    stroke="rgba(251,191,36,0.7)" strokeWidth="3" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.4, delay: 0.75 + i * 0.13 }}
                  />
                ))}
                {[{ cx: 192, cy: 28 }, { cx: 204, cy: 16 }, { cx: 214, cy: 7 }].map((s, i) => (
                  <motion.circle
                    key={i} cx={s.cx} cy={s.cy} r={4 - i * 0.5}
                    fill="#fbbf24"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                    viewport={VIEWPORT}
                    transition={{ duration: 1.3, delay: 1.2 + i * 0.18, repeat: Infinity, repeatDelay: 2.5 }}
                  />
                ))}
              </motion.svg>

              <div className="mt-6 space-y-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                    {t('info.email.label')}
                  </span>
                </div>
                <p className="font-semibold text-white">{t('info.email.value')}</p>
              </div>
            </div>
          </motion.div>

          {/* Form card (right, 3 cols) */}
          <motion.div
            variants={fadeRight} initial="hidden" whileInView="visible" viewport={VIEWPORT}
            className="lg:col-span-3"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-sm">

              {/* Amber gradient top bar */}
              <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-primary-400 to-violet-400" />

              <form className="space-y-5 p-8 sm:p-10">

                {/* Subject — combo: dropdown + free-text */}
                <motion.div
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
                  transition={{ delay: 0.05 }}
                >
                  <label className="mb-2 block text-sm font-semibold text-violet-200">
                    {t('form.subject')}
                  </label>
                  <select
                    value={dropdownSubject}
                    onChange={handleSelectChange}
                    className={inputCls}
                  >
                    <option value="" disabled className="bg-violet-900">{t('form.subjectPlaceholder')}</option>
                    <option value="General Inquiry"   className="bg-violet-900">{t('form.subjects.general')}</option>
                    <option value="Partnership"       className="bg-violet-900">{t('form.subjects.partnership')}</option>
                    <option value="Technical Support" className="bg-violet-900">{t('form.subjects.support')}</option>
                    <option value="Other"             className="bg-violet-900">{t('form.subjects.other')}</option>
                  </select>
                  <input
                    type="text"
                    value={subject}
                    onChange={handleSubjectInput}
                    placeholder={t('form.subjectCustomPlaceholder')}
                    className={`${inputCls} mt-2`}
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
                  transition={{ delay: 0.14 }}
                >
                  <label className="mb-2 block text-sm font-semibold text-violet-200">
                    {t('form.messageLabel')}
                  </label>
                  <textarea
                    name="message" required rows={6}
                    value={values.message}
                    onChange={handleChange}
                    placeholder={t('form.messagePlaceholder')}
                    className={`${inputCls} resize-none`}
                  />
                </motion.div>

                {/* Divider */}
                <motion.div
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
                  transition={{ delay: 0.22 }}
                  className="flex items-center gap-4 py-1"
                >
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="text-[11px] font-medium tracking-wide text-white/40">{t('form.hint')}</span>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-transparent" />
                </motion.div>

                {/* Gmail + Outlook */}
                <motion.div
                  variants={staggerFast}
                  initial="hidden" whileInView="visible" viewport={VIEWPORT}
                  className="grid grid-cols-2 gap-4"
                >
                  <motion.button
                    variants={scaleUp}
                    type="submit"
                    onClick={(e) => handleOpen(e, 'gmail')}
                    className="group flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-300/30 hover:bg-red-500/20 hover:shadow-xl hover:shadow-red-900/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <GmailIcon />
                    {t('form.openGmail')}
                  </motion.button>

                  <motion.button
                    variants={scaleUp}
                    type="submit"
                    onClick={(e) => handleOpen(e, 'outlook')}
                    className="group flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/30 hover:bg-blue-500/20 hover:shadow-xl hover:shadow-blue-900/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <OutlookIcon />
                    {t('form.openOutlook')}
                  </motion.button>
                </motion.div>

              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Section 4: CTA (About ClosingCTA pattern) ──────────────────────────────

function CTA() {
  const t = useTranslations('contact');

  return (
    <section className="relative overflow-hidden bg-violet-700 py-28">
      <WaveMotif className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <motion.div
        variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3">
          <motion.span
            className="block h-px bg-amber-400"
            initial={{ width: 0 }} whileInView={{ width: 40 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
          />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
            BioHealth Prodentia
          </span>
          <motion.span
            className="block h-px bg-amber-400"
            initial={{ width: 0 }} whileInView={{ width: 40 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </motion.div>

        <motion.h2 variants={scaleUp} className="text-5xl font-bold italic text-white lg:text-6xl">
          {t('cta.heading')}
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-6 text-lg text-violet-200">
          {t('cta.body')}
        </motion.p>

        <motion.div variants={scaleUp} className="mt-10">
          <Link
            href="/products"
            className="inline-block rounded-full border-2 border-white px-10 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-violet-700"
          >
            {t('cta.button')}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Root export ────────────────────────────────────────────────────────────

export function ContactSection() {
  return (
    <main style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
      <Hero />
      <EmailBand />
      <FormSection />
      <CTA />
    </main>
  );
}
