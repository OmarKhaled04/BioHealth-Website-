"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type AboutListItem = {
  title: string;
  body: string;
};

type PartnerItem = {
  country: string;
  note: string;
};

const CERTS = [
  "FSSC 22000",
  "ISO 9001:2015",
  "IFS Certified",
  "HALAL Assurance",
  "OGS Trademark",
  "GLP & GSP",
];

const PARTNER_FLAGS = ["🍁", "🇸🇦", "🇪🇬", "🇰🇼"];
const VIDEO_CERTS = ["GMP / EU", "ISO 9001", "HALAL"];

const EASE = [0, 0, 0.2, 1] as const;
const SPRING = { type: "spring", stiffness: 260, damping: 28 } as const;
const VIEWPORT = { once: true, margin: "-80px" } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function WaveMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" fill="none">
      {[80, 120, 160, 200, 240].map((r, i) => (
        <motion.ellipse
          key={r}
          cx="200"
          cy="200"
          rx={r}
          ry={r * 0.55}
          stroke="rgba(255,255,255,0.20)"
          strokeWidth="1.5"
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        />
      ))}
    </svg>
  );
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;

    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

function Hero() {
  const t = useTranslations("about");
  const statsT = useTranslations("about.stats");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardX = useSpring(useTransform(mouseX, [-1, 1], [-14, 14]), {
    stiffness: 120,
    damping: 20,
  });
  const cardY = useSpring(useTransform(mouseY, [-1, 1], [-9, 9]), {
    stiffness: 120,
    damping: 20,
  });

  const stats = [
    { value: 40, suffix: "+", label: statsT("nutrientsLabel") },
    { value: 4, suffix: "", label: statsT("marketsLabel") },
    { value: 8, suffix: "+", label: statsT("productLinesLabel") },
    { value: 5, suffix: "", label: statsT("certificationsLabel") },
  ];

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  return (
    <section
      className="grid min-h-[92vh] lg:grid-cols-2"
      onMouseMove={onMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <div className="flex flex-col justify-center bg-slate-900 px-10 py-20 lg:px-20">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-xl">
          <motion.div variants={fadeDown} className="mb-6 flex items-center gap-3">
            <motion.span
              className="block h-px bg-amber-400"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              BioHealth Prodentia - BHP
            </span>
          </motion.div>

          <motion.h1
            variants={staggerFast}
            className="overflow-hidden text-5xl font-extrabold leading-tight text-white lg:text-6xl"
          >
            {[t("hero.line1"), t("hero.line2"), t("hero.line3")].map((line, i) => (
              <motion.span
                key={`${line}-${i}`}
                variants={fadeDown}
                className={`block ${i === 2 ? "text-violet-400" : ""}`}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-slate-400">
            {t("hero.body")}
          </motion.p>

          <motion.div
            variants={scaleUp}
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-violet-700 bg-violet-950 px-5 py-2.5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-500" />
            </span>
            <span className="text-sm font-medium text-violet-300">{t("hero.badge")}</span>
          </motion.div>
        </motion.div>
      </div>

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
            <Image
              src="/logo/dolphine.png"
              alt="BHP logo"
              width={36}
              height={36}
              className="object-contain drop-shadow-lg"
            />
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
              {statsT("atAGlance")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatsBand() {
  const t = useTranslations("about.stats");
  const stats = [
    { value: 40, suffix: "+", label: t("nutrientsLabel") },
    { value: 4, suffix: "", label: t("marketsLabel") },
    { value: 8, suffix: "+", label: t("productLinesLabel") },
    { value: 5, suffix: "", label: t("certificationsLabel") },
  ];

  return (
    <section className="bg-slate-900 py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 lg:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <motion.div key={stat.label} variants={fadeUp} className="text-center">
            <p className="text-5xl font-extrabold text-white">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </p>
            <motion.div
              className="mx-auto mt-3 h-0.5 bg-violet-500"
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            />
            <p className="mt-3 text-sm text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function VisionMission() {
  const t = useTranslations("about.visionMission");
  const [tab, setTab] = useState<"vision" | "mission">("vision");

  const content = {
    vision: { label: t("visionLabel"), text: t("visionText") },
    mission: { label: t("missionLabel"), text: t("missionText") },
  };

  return (
    <section className="relative overflow-hidden bg-violet-700 py-24">
      <WaveMotif className="absolute inset-0 h-full w-full opacity-40" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="mb-8 text-4xl font-bold text-white">{t("heading")}</h2>

          <div className="mb-8 flex w-fit rounded-xl border border-white/20 bg-white/10 p-1 backdrop-blur-sm">
            {(["vision", "mission"] as const).map((currentTab) => (
              <button
                key={currentTab}
                onClick={() => setTab(currentTab)}
                className="relative px-8 py-2.5 text-sm font-semibold capitalize"
              >
                {tab === currentTab && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-lg bg-white shadow"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    tab === currentTab ? "text-violet-700" : "text-white/70"
                  }`}
                >
                  {currentTab === "vision" ? t("visionTab") : t("missionTab")}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                {content[tab].label}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-violet-100">{content[tab].text}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative pb-10 pl-8 lg:pb-12 lg:pl-10"
        >
          <div className="relative flex h-72 flex-col justify-between overflow-hidden rounded-2xl lg:h-96">
            <video
              src="/videos/Lactonic Commercial movie.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-violet-900/60" />

            <div className="relative z-10 flex h-full flex-col justify-between p-10">
              <div>
                <span className="select-none text-4xl leading-none text-white/30">&ldquo;</span>
                <p className="-mt-2 text-xl font-bold leading-snug text-white">
                  {t("videoQuote")}
                </p>
                <p className="mt-3 text-sm text-violet-200">{t("videoSubtext")}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {VIDEO_CERTS.map((cert) => (
                  <div
                    key={cert}
                    className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm"
                  >
                    <p className="text-xs font-semibold text-white">{cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 rounded-xl border border-white/20 bg-violet-900/80 px-5 py-4 shadow-2xl backdrop-blur-sm">
            <p className="text-xs text-violet-300">{t("partnerLabel")}</p>
            <p className="mt-1 font-semibold text-white">{t("partnerName")}</p>
            <p className="text-xs text-violet-300">{t("partnerSub")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CoreValues() {
  const t = useTranslations("about.coreValues");
  const items = t.raw("items") as AboutListItem[];

  return (
    <section className="relative overflow-hidden bg-violet-700 py-24">
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
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              {t("eyebrow")}
            </span>
            <span className="h-px w-8 bg-amber-400" />
          </div>
          <h2 className="text-4xl font-bold text-white">{t("heading")}</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-violet-600 hover:shadow-2xl"
            >
              <span className="absolute -right-2 -top-4 select-none text-7xl font-black text-white/10 transition-colors duration-300 group-hover:text-white/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative mb-3 text-lg font-bold text-white">{item.title}</h3>
              <p className="relative text-sm leading-relaxed text-violet-100 transition-colors duration-300 group-hover:text-white">
                {item.body}
              </p>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StrategicPillars() {
  const t = useTranslations("about.pillars");
  const items = t.raw("items") as AboutListItem[];

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
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white">{t("heading")}</h2>
        </motion.div>

        <div className="space-y-0">
          {items.map((item, i) => (
            <motion.div
              key={`${item.title}-${i}`}
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              transition={{ delay: i * 0.1 }}
              className="group flex items-start gap-6 border-b border-white/10 py-7 last:border-0"
            >
              <span className="mt-1.5 flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-violet-500 ring-4 ring-violet-500/20 transition-all duration-300 group-hover:ring-violet-500/50" />
              <span className="w-8 flex-shrink-0 text-sm font-bold text-violet-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold text-white transition-colors duration-200 group-hover:text-violet-300">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlobalPresence() {
  const t = useTranslations("about.globalPresence");
  const visionT = useTranslations("about.visionMission");
  const partners = t.raw("partners") as PartnerItem[];

  return (
    <section className="relative overflow-hidden bg-violet-700 py-24">
      <WaveMotif className="absolute inset-0 h-full w-full opacity-40" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-14 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              {t("eyebrow")}
            </span>
            <span className="h-px w-8 bg-amber-400" />
          </div>
          <h2 className="text-4xl font-bold text-white">{t("heading")}</h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-white/60">
              {t("partnersLabel")}
            </h3>
            <div className="space-y-3">
              {partners.map((partner, i) => (
                <motion.div
                  key={partner.country}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/25 hover:shadow-xl"
                >
                  <span className="text-2xl">{PARTNER_FLAGS[i] ?? "•"}</span>
                  <div>
                    <p className="font-semibold text-white">{partner.country}</p>
                    <p className="text-xs text-violet-200 transition-colors duration-300 group-hover:text-white/80">
                      {partner.note}
                    </p>
                  </div>
                  <span className="ml-auto text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-300">
                    →
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-white/60">
              {t("certsLabel")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {CERTS.map((cert, i) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ delay: i * 0.08, duration: 0.45, ease: EASE }}
                  className="group flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/25 hover:shadow-lg"
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400 transition-colors duration-300 group-hover:bg-white" />
                  <span className="text-sm font-medium text-violet-100 transition-colors duration-300 group-hover:text-white">
                    {cert}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                {t("manufacturedByLabel")}
              </p>
              <p className="mt-2 font-semibold text-white">{visionT("partnerName")}</p>
              <p className="text-sm text-violet-200">{t("manufacturerSub")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  const t = useTranslations("about.cta");

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
          <Image
            src="/logo/dolphine.png"
            alt="BioHealth Prodentia"
            width={72}
            height={72}
            className="object-contain drop-shadow-2xl"
          />
        </motion.div>

        <motion.div variants={fadeDown} className="mb-4 flex items-center justify-center gap-3">
          <motion.span
            className="block h-px bg-amber-400"
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
          />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
            BioHealth Prodentia
          </span>
          <motion.span
            className="block h-px bg-amber-400"
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </motion.div>

        <motion.h2 variants={scaleUp} className="text-5xl font-bold italic text-white lg:text-6xl">
          {t("heading")}
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-6 text-lg text-violet-200">
          {t("body")}
        </motion.p>

        <motion.div variants={scaleUp} className="mt-10">
          <Link
            href="/contact"
            className="inline-block rounded-full border-2 border-white px-10 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-violet-700"
          >
            {t("button")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

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
