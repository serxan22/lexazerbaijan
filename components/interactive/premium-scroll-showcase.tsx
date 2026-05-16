"use client";

import { motion, useScroll, useTransform, type MotionValue, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CircleDot,
  FileText,
  Landmark,
  MessageSquareText,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const features = [
  {
    title: "Articles",
    href: "/articles",
    description: "Publish legal ideas, research notes, case comments, and legal opinions.",
    icon: BookOpen,
  },
  {
    title: "Discussions",
    href: "/discussions",
    description: "Debate legal questions and build structured arguments with the community.",
    icon: MessageSquareText,
  },
  {
    title: "Cases",
    href: "/cases",
    description: "Explore judgments, legal reasoning, and case summaries in one place.",
    icon: Landmark,
  },
];

const journey = [
  {
    label: "01",
    title: "Write",
    body: "Turn legal ideas into visible publications.",
    icon: FileText,
  },
  {
    label: "02",
    title: "Discuss",
    body: "Test arguments with students, lawyers, and researchers.",
    icon: Users,
  },
  {
    label: "03",
    title: "Discover",
    body: "Find legal materials, cases, and analysis faster.",
    icon: Search,
  },
  {
    label: "04",
    title: "Understand",
    body: "Use AI-assisted summaries for quicker legal orientation.",
    icon: BrainCircuit,
  },
];

const frameVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.96,
    filter: "blur(18px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.78,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 44,
    scale: 0.96,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.78,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function PremiumFrame({
  children,
  className = "",
  amount = 0.28,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      variants={frameVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount, margin: "-8% 0px -8% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LegalCore({
  rotate,
  y,
  scale,
}: {
  rotate: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ rotate, y, scale }}
      className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-[2.4rem] border border-white/15 bg-white/[0.075] shadow-2xl shadow-black/45 backdrop-blur-2xl md:h-72 md:w-72"
    >
      <div className="absolute inset-0 rounded-[2.4rem] bg-[radial-gradient(circle_at_25%_18%,rgba(255,255,255,0.32),transparent_34%)]" />
      <div className="absolute -inset-6 rounded-[3rem] border border-white/10" />
      <div className="absolute -inset-14 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute inset-8 rounded-[2rem] border border-white/10 bg-white/[0.035]" />

      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <Scale className="h-24 w-24 text-white/88 md:h-32 md:w-32" />
      </motion.div>
    </motion.div>
  );
}

export function PremiumScrollShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: stickyProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"],
  });

  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.22, 0.36, 0.2]);
  const topGlowY = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const bottomGlowY = useTransform(scrollYProgress, [0, 1], [0, -240]);

  const coreRotate = useTransform(stickyProgress, [0, 1], [-8, 18]);
  const coreY = useTransform(stickyProgress, [0, 0.5, 1], [70, -10, -70]);
  const coreScale = useTransform(stickyProgress, [0, 0.5, 1], [0.78, 1.08, 0.86]);

  // Overlapped frame transitions: no dead/blank zone between scenes.
  const sceneOneOpacity = useTransform(stickyProgress, [0, 0.16, 0.28], [1, 1, 0]);
  const sceneTwoOpacity = useTransform(stickyProgress, [0.18, 0.32, 0.48], [0, 1, 0]);
  const sceneThreeOpacity = useTransform(stickyProgress, [0.40, 0.56, 0.72], [0, 1, 0]);
  const sceneFourOpacity = useTransform(stickyProgress, [0.64, 0.80, 1], [0, 1, 1]);

  const sceneOneY = useTransform(stickyProgress, [0, 0.16, 0.28], [0, 0, -70]);
  const sceneTwoY = useTransform(stickyProgress, [0.18, 0.32, 0.48], [70, 0, -60]);
  const sceneThreeY = useTransform(stickyProgress, [0.40, 0.56, 0.72], [70, 0, -60]);
  const sceneFourY = useTransform(stickyProgress, [0.64, 0.80, 1], [70, 0, 0]);

  const progressWidth = useTransform(stickyProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_8%,rgba(212,163,90,0.20),transparent_24%),radial-gradient(circle_at_78%_70%,rgba(70,95,200,0.18),transparent_28%),linear-gradient(180deg,#050816_0%,#071126_45%,#050816_100%)]" />

      <motion.div
        style={{ opacity: gridOpacity }}
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <motion.div
        style={{ y: topGlowY }}
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-gold/10 blur-[125px]"
      />

      <motion.div
        style={{ y: bottomGlowY }}
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-blue-900/20 blur-[125px]"
      />

      {/* FRAME 1 — Intro scrollytelling */}
      <div className="legal-container flex min-h-[calc(100vh-5rem)] items-center justify-center py-24 text-center">
        <PremiumFrame className="mx-auto max-w-5xl" amount={0.32}>
          <motion.div variants={lineVariants} className="relative mx-auto mb-9 flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/15 bg-white/[0.08] shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.32),transparent_34%)]" />
            <div className="absolute -inset-3 rounded-[2.4rem] border border-white/10" />
            <div className="absolute -inset-8 rounded-full bg-gold/10 blur-2xl" />
            <motion.div animate={{ y: [0, -7, 0], rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
              <Scale className="h-14 w-14 text-white/88" />
            </motion.div>
          </motion.div>

          <motion.p variants={lineVariants} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/75 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-gold" />
            Modern legal publishing for Azerbaijan
          </motion.p>

          <motion.h1 variants={lineVariants} className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
            Legal knowledge, transformed into a cinematic digital experience.
          </motion.h1>

          <motion.p variants={lineVariants} className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
            A legal platform where articles, discussions, cases, and AI-assisted discovery move through one premium scroll story.
          </motion.p>

          <motion.div variants={lineVariants} className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-full border border-white/12 bg-white/[0.07] px-5 py-3 text-sm text-white/62 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_24px_rgba(212,163,90,0.75)]" />
            Scroll to enter the legal interface
          </motion.div>
        </PremiumFrame>
      </div>

      {/* FRAME 2-5 — Sticky scroll-driven scene */}
      <div ref={stickyRef} className="relative h-[340vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            style={{ opacity: sceneOneOpacity }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(212,163,90,0.12),transparent_30%)]"
          />
          <motion.div
            style={{ opacity: sceneTwoOpacity }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_64%_42%,rgba(80,120,255,0.14),transparent_32%)]"
          />
          <motion.div
            style={{ opacity: sceneThreeOpacity }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_58%,rgba(255,255,255,0.10),transparent_28%)]"
          />
          <motion.div
            style={{ opacity: sceneFourOpacity }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,163,90,0.13),transparent_34%)]"
          />

          <div className="absolute left-0 right-0 top-0 z-50 h-1 bg-white/5">
            <motion.div style={{ width: progressWidth }} className="h-full bg-gold shadow-[0_0_24px_rgba(212,163,90,0.7)]" />
          </div>

          <div className="legal-container relative grid w-full gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative min-h-[420px]">
              <motion.div style={{ opacity: sceneOneOpacity, y: sceneOneY }} className="absolute inset-0 flex flex-col justify-center will-change-transform">
                <p className="eyebrow text-white/50">Scroll-driven scene</p>
                <h2 className="mt-4 text-balance text-4xl font-semibold text-white md:text-6xl">
                  The homepage becomes a legal story.
                </h2>
                <p className="mt-6 max-w-xl leading-8 text-white/62">
                  Instead of a normal static hero, the interface reacts to the user’s scroll and changes frame by frame.
                </p>
              </motion.div>

              <motion.div style={{ opacity: sceneTwoOpacity, y: sceneTwoY }} className="absolute inset-0 flex flex-col justify-center will-change-transform">
                <p className="eyebrow text-white/50">Pinned section</p>
                <h2 className="mt-4 text-balance text-4xl font-semibold text-white md:text-6xl">
                  One fixed scene, many legal states.
                </h2>
                <p className="mt-6 max-w-xl leading-8 text-white/62">
                  The scene stays pinned while text, legal objects, and content layers transform around it.
                </p>
              </motion.div>

              <motion.div style={{ opacity: sceneThreeOpacity, y: sceneThreeY }} className="absolute inset-0 flex flex-col justify-center will-change-transform">
                <p className="eyebrow text-white/50">3D legal motion</p>
                <h2 className="mt-4 text-balance text-4xl font-semibold text-white md:text-6xl">
                  A legal core rotates with the journey.
                </h2>
                <p className="mt-6 max-w-xl leading-8 text-white/62">
                  The scale object behaves like a controlled 3D product visual, but remains lightweight for your site.
                </p>
              </motion.div>

              <motion.div style={{ opacity: sceneFourOpacity, y: sceneFourY }} className="absolute inset-0 flex flex-col justify-center will-change-transform">
                <p className="eyebrow text-white/50">Morphing transition</p>
                <h2 className="mt-4 text-balance text-4xl font-semibold text-white md:text-6xl">
                  The object becomes the platform.
                </h2>
                <p className="mt-6 max-w-xl leading-8 text-white/62">
                  The motion leads naturally into articles, discussions, cases, and legal discovery.
                </p>
              </motion.div>
            </div>

            <div className="relative flex min-h-[520px] items-center justify-center">
              <LegalCore rotate={coreRotate} y={coreY} scale={coreScale} />

              <motion.div
                style={{ opacity: sceneTwoOpacity }}
                className="absolute left-0 top-10 hidden w-56 rounded-2xl border border-white/12 bg-white/[0.08] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl md:block"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-gold" />
                  <p className="font-medium text-white">Articles</p>
                </div>
                <p className="mt-2 text-xs leading-5 text-white/55">Publish legal research and opinion.</p>
              </motion.div>

              <motion.div
                style={{ opacity: sceneThreeOpacity }}
                className="absolute right-0 top-16 hidden w-56 rounded-2xl border border-white/12 bg-white/[0.08] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl md:block"
              >
                <div className="flex items-center gap-3">
                  <Landmark className="h-5 w-5 text-gold" />
                  <p className="font-medium text-white">Cases</p>
                </div>
                <p className="mt-2 text-xs leading-5 text-white/55">Turn judgments into understanding.</p>
              </motion.div>

              <motion.div
                style={{ opacity: sceneFourOpacity }}
                className="absolute bottom-12 left-1/2 hidden w-64 -translate-x-1/2 rounded-2xl border border-white/12 bg-white/[0.08] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl md:block"
              >
                <div className="flex items-center gap-3">
                  <BrainCircuit className="h-5 w-5 text-gold" />
                  <p className="font-medium text-white">LexAI</p>
                </div>
                <p className="mt-2 text-xs leading-5 text-white/55">AI-assisted legal orientation.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* FRAME 6 — Platform cards */}
      <div className="legal-container flex min-h-screen items-center justify-center py-24">
        <PremiumFrame className="w-full" amount={0.26}>
          <motion.div variants={lineVariants} className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-white/55">Explore the platform</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-white md:text-5xl">
              Three legal spaces, connected in one premium flow.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/58">
              Each area is designed as part of the same legal ecosystem: writing, discussion, and case discovery.
            </p>
          </motion.div>

          <motion.div variants={{ visible: { transition: { staggerChildren: 0.13, delayChildren: 0.12 } } }} className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    scale: 1.018,
                    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.095] p-7 text-left shadow-2xl shadow-black/40 backdrop-blur-2xl"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                    <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gold/15 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
                  </div>

                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.12),transparent)] transition duration-1000 group-hover:translate-x-full" />

                  <div className="relative mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 transition duration-500 group-hover:border-gold/30 group-hover:bg-gold/10">
                    <Icon className="h-6 w-6 text-white/85 transition duration-500 group-hover:text-gold" />
                  </div>

                  <h3 className="relative text-2xl font-semibold text-white">{feature.title}</h3>
                  <p className="relative mt-4 text-sm leading-7 text-white/64">{feature.description}</p>

                  <Link href={feature.href} className="relative mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition duration-300 group-hover:text-gold">
                    Open section
                    <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </PremiumFrame>
      </div>

      {/* FRAME 7 — Journey timeline */}
      <div className="legal-container flex min-h-screen items-center justify-center py-24">
        <PremiumFrame className="w-full" amount={0.25}>
          <motion.div variants={lineVariants} className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-white/55">Legal workflow</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-white md:text-5xl">
              From idea to public legal contribution.
            </h2>
          </motion.div>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:block" />
            <div className="grid gap-5">
              {journey.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={cardVariants}
                    className="group relative grid gap-5 rounded-[2rem] border border-white/12 bg-white/[0.075] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl md:grid-cols-[0.2fr_0.8fr]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-sm tracking-[0.25em] text-white/38">{item.label}</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-white/60">{item.body}</p>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition duration-700 group-hover:opacity-100">
                      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </PremiumFrame>
      </div>

      {/* FRAME 8 — Final CTA */}
      <div className="legal-container flex min-h-screen items-center justify-center py-24">
        <PremiumFrame
          amount={0.32}
          className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2.8rem] border border-white/12 bg-white/[0.10] p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-14"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_35%)]" />
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="relative">
            <motion.div variants={lineVariants} className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-gold">
              <ShieldCheck className="h-7 w-7" />
            </motion.div>

            <motion.p variants={lineVariants} className="text-sm uppercase tracking-[0.32em] text-white/45">
              LexAzerbaijan
            </motion.p>

            <motion.h2 variants={lineVariants} className="mt-5 text-balance text-3xl font-semibold text-white md:text-6xl">
              One platform for legal writing, dialogue, and discovery.
            </motion.h2>

            <motion.p variants={lineVariants} className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/62 md:text-base">
              Designed for students, researchers, lawyers, and legal minds who want their ideas to be visible, searchable, and useful for the wider community.
            </motion.p>

            <motion.div variants={lineVariants} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/articles" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-slate-950 shadow-2xl shadow-gold/20 transition hover:-translate-y-0.5 hover:bg-gold/90">
                Explore articles
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link href="/submit" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/15">
                Submit your article
              </Link>
            </motion.div>

            <motion.div variants={lineVariants} className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3 text-xs text-white/45">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                <CircleDot className="mx-auto mb-2 h-4 w-4 text-gold" />
                Articles
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                <CircleDot className="mx-auto mb-2 h-4 w-4 text-gold" />
                Cases
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                <CircleDot className="mx-auto mb-2 h-4 w-4 text-gold" />
                LexAI
              </div>
            </motion.div>
          </div>
        </PremiumFrame>
      </div>
    </section>
  );
}
