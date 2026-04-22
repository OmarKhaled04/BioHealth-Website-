"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";

// ─── Brand data ────────────────────────────────────────────────────────────────

const STATS = [
  { value: 40, suffix: "+", label: "Nutrients Per Formula" },
  { value: 4,  suffix: "",  label: "Global Markets" },
  { value: 8,  suffix: "+", label: "Lactonic Product Lines" },
  { value: 5,  suffix: "",  label: "International Certifications" },
];

const VALUES = [
  { title: "Customer Focus", num: "01", body: "We deeply value our customers and strive to meet their needs through exceptional quality and service." },
  { title: "Teamwork",       num: "02", body: "We invest in top talent and continuously develop our team to stay aligned with evolving market needs." },
  { title: "Innovation",     num: "03", body: "Innovation in molecules, hi-tech products, and digital systems is the cornerstone of our business." },
  { title: "Leadership",     num: "04", body: "Combining tech leadership with research and rapid development, we continuously shape the future of our industry." },
];

const PILLARS = [
  { n: "01", title: "Research & Development",  body: "Innovating specialty products for the Middle East through hi-tech and molecular research." },
  { n: "02", title: "Human Capital",            body: "Continuous development programs for marketing and sales excellence." },
  { n: "03", title: "Production & QA",          body: "All products are made under strict QA, including GLP, GSP, and validated protocols." },
  { n: "04", title: "Distribution Expansion",   body: "Focused on expanding agency and distribution partnerships across new regions." },
  { n: "05", title: "Digital Integration",      body: "Adopting automation and digital integration across production, sales, and distribution." },
];

const PARTNERS = [
  { flag: "🍁", country: "Canada",       note: "Headquarters" },
  { flag: "🇸🇦", country: "Saudi Arabia", note: "Dallah Pharma" },
  { flag: "🇪🇬", country: "Egypt",        note: "Seucal Pharma" },
  { flag: "🇰🇼", country: "Kuwait",       note: "Boushahri Group" },
];

const CERTS = [
  "FSSC 22000", "ISO 9001:2015", "IFS Certified",
  "HALAL Assurance", "OGS Trademark", "GLP & GSP",
];

// ─── Animation config ──────────────────────────────────────────────────────────

const EASE = [0, 0, 0.2, 1] as const;
const SPRING = { type: "spring", stiffness: 260, damping: 28 } as const;
const VIEWPORT = { once: true, margin: "-80px" } as const;

// ─── Shared variants ───────────────────────────────────────────────────────────

const fadeUp   = { hidden: { opacity: 0, y: 48 },   visible: { opacity: 1, y: 0,   transition: { duration: 0.7, ease: EASE } } };
const fadeDown = { hidden: { opacity: 0, y: -40 },  visible: { opacity: 1, y: 0,   transition: { duration: 0.65, ease: EASE } } };
const fadeLeft = { hidden: { opacity: 0, x: -60 },  visible: { opacity: 1, x: 0,   transition: { duration: 0.7, ease: EASE } } };
const fadeRight= { hidden: { opacity: 0, x: 60 },   visible: { opacity: 1, x: 0,   transition: { duration: 0.7, ease: EASE } } };
const scaleUp  = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] as const } } };

const stagger      = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };
const staggerFast  = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

// ─── SVG Wave motif ────────────────────────────────────────────────────────────

function WaveMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" fill="none">
      {[80, 120, 160, 200, 240].map((r, i) => (
        <motion.ellipse
          key={r}
          cx="200" cy="200" rx={r} ry={r * 0.55}
          stroke="rgba(255,255,255,0.20)" strokeWidth="1.5"
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        />
      ))}
    </svg>
  );
}

// ─── Animated counter — rAF-based, reliable in all FM versions ─────────────────

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
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

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardX = useSpring(useTransform(mouseX, [-1, 1], [-14, 14]), { stiffness: 120, damping: 20 });
  const cardY = useSpring(useTransform(mouseY, [-1, 1], [-9, 9]),   { stiffness: 120, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
    mouseY.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
  }

  return (
    <section
      className="grid min-h-[92vh] lg:grid-cols-2"
      onMouseMove={onMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* ── Left dark panel ── */}
      <div className="flex flex-col justify-center bg-slate-900 px-10 py-20 lg:px-20">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-xl">

          {/* Eyebrow slides down */}
          <motion.div variants={fadeDown} className="mb-6 flex items-center gap-3">
            <motion.span
              className="block h-px bg-amber-400"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              BioHealth Prodentia · BHP
            </span>
          </motion.div>

          {/* Headline — each line falls down from above */}
          <motion.h1 variants={staggerFast} className="overflow-hidden text-5xl font-extrabold leading-tight text-white lg:text-6xl">
            {["Leap to the", "Future of", "Infant Nutrition"].map((line, i) => (
              <motion.span key={i} variants={fadeDown} className={`block ${i === 2 ? "text-violet-400" : ""}`}>
                {line}
              </motion.span>
            ))}
          </motion.h1>

          {/* Body */}
          <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-slate-400">
            A Canadian multinational delivering scientifically advanced infant nutrition and
            healthcare solutions. We combine molecular innovation with GMP/EU-compliant
            manufacturing to set new standards in neonatal care.
          </motion.p>

          {/* Badge pops in with spring overshoot */}
          <motion.div variants={scaleUp} className="mt-8 inline-flex items-center gap-3 rounded-full border border-violet-700 bg-violet-950 px-5 py-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-500" />
            </span>
            <span className="text-sm font-medium text-violet-300">Simply Sophisticated</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Right violet panel ── */}
      <motion.div
        className="relative flex items-center justify-center overflow-hidden bg-violet-700 px-10 py-20"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      >
        <WaveMotif className="absolute inset-0 h-full w-full opacity-60" />

        <motion.div
          style={{ rotateX: cardY, rotateY: cardX, transformPerspective: 900 }}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.45 }}
          className="relative z-10 w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md"
        >
          <div className="mb-5 flex items-center gap-3">
            <Image src="/logo/dolphine.png" alt="BHP logo" width={36} height={36} className="object-contain drop-shadow-lg" />
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">At a glance</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-white">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Stats band ────────────────────────────────────────────────────────────────

function StatsBand() {
  return (
    <section className="bg-slate-900 py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 lg:grid-cols-4"
      >
        {STATS.map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} className="text-center">
            {/* Animated underline expands as card enters */}
            <p className="text-5xl font-extrabold text-white">
              <AnimatedCounter target={s.value} suffix={s.suffix} />
            </p>
            <motion.div
              className="mx-auto mt-3 h-0.5 bg-violet-500"
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            />
            <p className="mt-3 text-sm text-slate-400">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Vision / Mission ──────────────────────────────────────────────────────────

function VisionMission() {
  const [tab, setTab] = useState<"vision" | "mission">("vision");

  const content = {
    vision: { label: "Our Vision",   text: "To provide communities with exceptional products through manufacturing excellence and GMP/EU-compliant innovation." },
    mission:{ label: "Our Mission",  text: "To maximize user outcomes by offering high-quality, reliable infant nutrition in partnership with global health professionals." },
  };

  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:items-center">

        {/* Left */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">Who We Are</span>
          </div>
          <h2 className="mb-8 text-4xl font-bold text-slate-900">Guided by Purpose</h2>

          {/* Tab switcher */}
          <div className="mb-8 flex w-fit rounded-xl border border-slate-200 bg-slate-100 p-1">
            {(["vision", "mission"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className="relative px-8 py-2.5 text-sm font-semibold capitalize">
                {tab === t && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-lg bg-violet-700 shadow"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${tab === t ? "text-white" : "text-slate-500"}`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-violet-700">{content[tab].label}</p>
              <p className="mt-3 text-lg leading-relaxed text-slate-700">{content[tab].text}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Right — layered blocks */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative pb-10 pl-8 lg:pb-12 lg:pl-10"
        >
          <div className="relative flex h-72 flex-col justify-between overflow-hidden rounded-2xl lg:h-96">
            {/* Autoplay looping video */}
            <video
              src="/videos/Lactonic Commercial movie.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Violet overlay so text stays readable */}
            <div className="absolute inset-0 bg-violet-900/60" />

            {/* Content on top */}
            <div className="relative z-10 flex flex-col justify-between h-full p-10">
              <div>
                <span className="select-none text-4xl leading-none text-white/30">&ldquo;</span>
                <p className="-mt-2 text-xl font-bold leading-snug text-white">
                  Leap to the Future<br />of Infant Nutrition
                </p>
                <p className="mt-3 text-sm text-violet-200">Canadian innovation · Global reach</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {["GMP / EU", "ISO 9001", "HALAL"].map((c) => (
                  <div key={c} className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                    <p className="text-xs font-semibold text-white">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 rounded-xl bg-slate-900 px-5 py-4 shadow-2xl">
            <p className="text-xs text-slate-400">Manufacturing Partner</p>
            <p className="mt-1 font-semibold text-white">Reny Picot, Spain</p>
            <p className="text-xs text-slate-500">Industrias Lácteas Asturianas S.A.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Core values ───────────────────────────────────────────────────────────────

function CoreValues() {
  return (
    <section className="relative overflow-hidden bg-violet-700 py-24">
      {/* Same animated wave background as the hero right panel */}
      <WaveMotif className="absolute inset-0 h-full w-full opacity-40" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-12 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">What Drives Us</span>
            <span className="h-px w-8 bg-amber-400" />
          </div>
          <h2 className="text-4xl font-bold text-white">Core Values</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white/10 p-8 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-violet-600 hover:shadow-2xl hover:-translate-y-2 hover:border-white/20"
            >
              {/* Ghost number */}
              <span className="absolute -right-2 -top-4 select-none text-7xl font-black text-white/10 transition-colors duration-300 group-hover:text-white/20">
                {v.num}
              </span>
              <h3 className="relative mb-3 text-lg font-bold text-white">
                {v.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-violet-100 transition-colors duration-300 group-hover:text-white">
                {v.body}
              </p>
              {/* Sliding bottom accent */}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Strategic pillars ─────────────────────────────────────────────────────────

function StrategicPillars() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-violet-700/30 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-14"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">How We Operate</span>
          </div>
          <h2 className="text-4xl font-bold text-white">Strategic Pillars</h2>
        </motion.div>

        <div className="space-y-0">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.n}
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              transition={{ delay: i * 0.1 }}
              className="group flex items-start gap-6 border-b border-white/10 py-7 last:border-0"
            >
              <span className="mt-1.5 flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-violet-500 ring-4 ring-violet-500/20 transition-all duration-300 group-hover:ring-violet-500/50" />
              <span className="w-8 flex-shrink-0 text-sm font-bold text-violet-500">{p.n}</span>
              <div>
                <h3 className="font-semibold text-white transition-colors duration-200 group-hover:text-violet-300">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Global presence + certifications ─────────────────────────────────────────

function GlobalPresence() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-14 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">Our Reach</span>
            <span className="h-px w-8 bg-amber-400" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900">Global Presence &amp; Certifications</h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Partners */}
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-500">Distribution Partners</h3>
            <div className="space-y-3">
              {PARTNERS.map((p, i) => (
                <motion.div
                  key={p.country}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}
                  className="group flex items-center gap-4 rounded-xl bg-slate-50 px-5 py-4 transition-all duration-300 hover:bg-slate-900"
                >
                  <span className="text-2xl">{p.flag}</span>
                  <div>
                    <p className="font-semibold text-slate-900 transition-colors duration-300 group-hover:text-white">{p.country}</p>
                    <p className="text-xs text-slate-500 transition-colors duration-300 group-hover:text-slate-400">{p.note}</p>
                  </div>
                  <span className="ml-auto text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-violet-400">→</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-500">Quality Certifications</h3>
            <div className="grid grid-cols-2 gap-3">
              {CERTS.map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ delay: i * 0.08, duration: 0.45, ease: EASE }}
                  className="group flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 transition-all duration-300 hover:translate-x-1 hover:border-violet-300 hover:bg-violet-50"
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500" />
                  <span className="text-sm font-medium text-slate-700 transition-colors duration-300 group-hover:text-violet-700">{c}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Manufactured by</p>
              <p className="mt-2 font-semibold text-slate-900">Reny Picot · Spain</p>
              <p className="text-sm text-slate-500">Industrias Lácteas Asturianas S.A. — advanced nutritional R&amp;D facility</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Closing CTA ───────────────────────────────────────────────────────────────

function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-violet-700 py-28">
      <WaveMotif className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <motion.div variants={scaleUp} className="mb-6 flex justify-center">
          <Image src="/logo/dolphine.png" alt="BioHealth Prodentia" width={72} height={72} className="object-contain drop-shadow-2xl" />
        </motion.div>

        <motion.div variants={fadeDown} className="mb-4 flex items-center justify-center gap-3">
          <motion.span className="block h-px bg-amber-400" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={VIEWPORT} transition={{ duration: 0.7, ease: EASE }} />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">BioHealth Prodentia</span>
          <motion.span className="block h-px bg-amber-400" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={VIEWPORT} transition={{ duration: 0.7, ease: EASE }} />
        </motion.div>

        <motion.h2 variants={scaleUp} className="text-5xl font-bold italic text-white lg:text-6xl">
          Simply Sophisticated
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-6 text-lg text-violet-200">
          Leap to the future of infant nutrition — where science meets care.
        </motion.p>

        <motion.div variants={scaleUp} className="mt-10">
          <a
            href="#contact"
            className="inline-block rounded-full border-2 border-white px-10 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-violet-700 hover:scale-105"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Root export ───────────────────────────────────────────────────────────────

export function AboutSection() {
  return (
    <main style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
      <Hero />
      <StatsBand />
      <VisionMission />
      <CoreValues />
      <StrategicPillars />
      <GlobalPresence />
      <ClosingCTA />
    </main>
  );
}
