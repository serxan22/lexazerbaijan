"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  FileText,
  Landmark,
  Library,
  MessageSquareText,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const platformCards = [
  {
    title: "Articles",
    href: "/articles",
    description:
      "Publish legal analysis, research notes, commentary, and carefully written legal ideas.",
    icon: BookOpen,
  },
  {
    title: "Discussions",
    href: "/discussions",
    description:
      "Test arguments, exchange views, and debate difficult legal questions with the community.",
    icon: MessageSquareText,
  },
  {
    title: "Cases",
    href: "/cases",
    description:
      "Navigate judgments, legal reasoning, and case summaries through a modern interface.",
    icon: Landmark,
  },
];

const workflow = [
  {
    step: "01",
    title: "Write",
    body: "Turn legal thought into clear and visible publication.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Debate",
    body: "Challenge and refine arguments through discussions.",
    icon: Users,
  },
  {
    step: "03",
    title: "Research",
    body: "Move through topics, sources, and legal materials faster.",
    icon: Search,
  },
  {
    step: "04",
    title: "Understand",
    body: "Use structured legal tools and AI-assisted orientation.",
    icon: BrainCircuit,
  },
];

const frameVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 56,
    scale: 0.975,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.82,
      ease: EASE,
      staggerChildren: 0.08,
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.68,
      ease: EASE,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.975,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

function FrameReveal({
  children,
  className = "",
  amount = 0.24,
}: {
  children: ReactNode;
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

function SceneText({
  opacity,
  y,
  eyebrow,
  title,
  body,
}: {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center will-change-transform"
    >
      <p className="text-sm font-medium uppercase tracking-[0.26em] text-white/45">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
        {title}
      </h2>
      <p className="mt-6 max-w-xl text-base leading-8 text-white/62 md:text-lg">
        {body}
      </p>
    </motion.div>
  );
}

function LegalCore({
  rotate,
  y,
  scale,
  opacity,
}: {
  rotate: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ rotate, y, scale, opacity }}
      className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-[2.3rem] border border-white/15 bg-white/[0.08] shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl will-change-transform md:h-80 md:w-80"
    >
      <div className="absolute inset-0 rounded-[2.3rem] bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.28),transparent_34%)]" />
      <div className="absolute -inset-7 rounded-[2.8rem] border border-white/10" />
      <div className="absolute -inset-10 rounded-full bg-[rgba(212,163,90,0.10)] blur-3xl" />
      <div className="absolute inset-7 rounded-[1.8rem] border border-white/10 bg-white/[0.04]" />
      <div className="absolute inset-16 rounded-[1.4rem] border border-white/8" />

      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-1.2, 1.2, -1.2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <Scale className="h-24 w-24 text-white/90 md:h-36 md:w-36" />
      </motion.div>
    </motion.div>
  );
}

export function PremiumScrollShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cinematicRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: rawCinemaProgress } = useScroll({
    target: cinematicRef,
    offset: ["start start", "end end"],
  });

  const cinemaProgress = useSpring(rawCinemaProgress, {
    stiffness: 68,
    damping: 24,
    mass: 0.62,
  });

  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.28, 0.16]);
  const topGlowY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const bottomGlowY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // smoother overlapped frame timing — no visible break between frames
  const heroOpacity = useTransform(cinemaProgress, [0, 0.20, 0.34], [1, 1, 0]);
  const heroY = useTransform(cinemaProgress, [0, 0.34], [0, -68]);

  const sceneOneOpacity = useTransform(cinemaProgress, [0.14, 0.26, 0.40, 0.52], [0, 1, 1, 0]);
  const sceneTwoOpacity = useTransform(cinemaProgress, [0.32, 0.44, 0.58, 0.70], [0, 1, 1, 0]);
  const sceneThreeOpacity = useTransform(cinemaProgress, [0.50, 0.62, 0.76, 0.88], [0, 1, 1, 0]);
  const sceneFourOpacity = useTransform(cinemaProgress, [0.74, 0.88, 1], [0, 1, 1]);

  const sceneOneY = useTransform(cinemaProgress, [0.14, 0.26, 0.52], [64, 0, -48]);
  const sceneTwoY = useTransform(cinemaProgress, [0.32, 0.44, 0.70], [64, 0, -48]);
  const sceneThreeY = useTransform(cinemaProgress, [0.50, 0.62, 0.88], [64, 0, -48]);
  const sceneFourY = useTransform(cinemaProgress, [0.74, 0.88, 1], [64, 0, 0]);

  const coreOpacity = useTransform(cinemaProgress, [0, 0.10, 0.20, 1], [0, 0.28, 1, 1]);
  const coreRotate = useTransform(cinemaProgress, [0, 0.30, 0.65, 1], [-10, 3, 13, 19]);
  const coreY = useTransform(cinemaProgress, [0, 0.30, 0.65, 1], [90, 6, -22, -42]);
  const coreScale = useTransform(cinemaProgress, [0, 0.30, 0.65, 1], [0.72, 1.02, 1.08, 0.94]);

  // keep background image alive much longer so transition seam disappears
  const imageOpacity = useTransform(cinemaProgress, [0, 0.30, 0.65, 1], [0.96, 0.82, 0.56, 0.30]);
  const imageScale = useTransform(cinemaProgress, [0, 1], [1.06, 1.18]);
  const imageY = useTransform(cinemaProgress, [0, 1], [0, -90]);
  const vignetteOpacity = useTransform(cinemaProgress, [0, 0.5, 1], [0.48, 0.66, 0.82]);
  const progressWidth = useTransform(cinemaProgress, [0, 1], ["0%", "100%"]);

  const articleCardY = useTransform(cinemaProgress, [0.32, 0.44, 0.70], [26, 0, -14]);
  const caseCardY = useTransform(cinemaProgress, [0.50, 0.62, 0.88], [26, 0, -14]);
  const aiCardY = useTransform(cinemaProgress, [0.74, 0.88, 1], [24, 0, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#040816] text-white"
    >
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_8%,rgba(212,163,90,0.16),transparent_24%),radial-gradient(circle_at_78%_72%,rgba(70,95,200,0.16),transparent_28%),linear-gradient(180deg,#040816_0%,#071126_48%,#040816_100%)]" />

      <motion.div
        style={{ opacity: gridOpacity }}
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <motion.div
        style={{ y: topGlowY }}
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-[rgba(212,163,90,0.08)] blur-[120px]"
      />

      <motion.div
        style={{ y: bottomGlowY }}
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-[rgba(80,110,255,0.12)] blur-[120px]"
      />

      <div ref={cinematicRef} className="relative h-[620vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ opacity: imageOpacity, scale: imageScale, y: imageY }}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            initial={false}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=2000&q=90')",
                filter: "grayscale(8%) brightness(0.30) blur(1.1px)",
              }}
            />
          </motion.div>

          <motion.div
            style={{ opacity: vignetteOpacity }}
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,22,0.96),rgba(4,8,22,0.80),rgba(4,8,22,0.62)),radial-gradient(circle_at_76%_24%,rgba(212,163,90,0.14),transparent_28%)]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,8,22,0.10)_0%,rgba(4,8,22,0.26)_24%,rgba(4,8,22,0.48)_52%,rgba(4,8,22,0.70)_76%,rgba(4,8,22,0.92)_100%)]" />

          <div className="absolute left-0 right-0 top-0 z-50 h-1 bg-white/5">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-[#D4A35A] shadow-[0_0_24px_rgba(212,163,90,0.7)]"
            />
          </div>

          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="absolute inset-0 z-20 flex items-center"
          >
            <div className="legal-container">
              <div className="max-w-5xl">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/78 shadow-2xl shadow-black/20 backdrop-blur-xl">
                  <Sparkles className="h-4 w-4 text-[#D4A35A]" />
                  A premium legal home for writing, debate, and discovery
                </div>

                <h1 className="max-w-4xl text-balance font-serif text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
                  “LexAzerbaijan is where legal thought is written, tested in discussion,
                  and transformed into practical understanding.”
                </h1>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200">
                  Built for students, researchers, and lawyers who want a sharper way to
                  publish legal ideas, explore cases, and move through complex topics.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/articles"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4A35A] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_60px_rgba(212,163,90,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c89749]"
                  >
                    Explore articles
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/submit"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    Submit your article
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute inset-0 z-30">
            <div className="legal-container grid h-full items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[360px]">
                <SceneText
                  opacity={sceneOneOpacity}
                  y={sceneOneY}
                  eyebrow="Scroll-driven story"
                  title="The homepage becomes a legal story."
                  body="Instead of a static block, the first experience unfolds scene by scene. Scroll controls the narrative and the interface responds with smooth premium motion."
                />

                <SceneText
                  opacity={sceneTwoOpacity}
                  y={sceneTwoY}
                  eyebrow="Pinned narrative"
                  title="One fixed scene, several legal states."
                  body="The canvas remains anchored while new ideas, tools, and legal spaces appear through layered motion without a visible section break."
                />

                <SceneText
                  opacity={sceneThreeOpacity}
                  y={sceneThreeY}
                  eyebrow="3D visual feel"
                  title="A legal core rotates through the journey."
                  body="The balance scale behaves like a product object: rotating, floating, and guiding the eye while the story changes around it."
                />

                <SceneText
                  opacity={sceneFourOpacity}
                  y={sceneFourY}
                  eyebrow="Platform reveal"
                  title="The motion resolves into the platform itself."
                  body="The user is naturally led from story into structure: articles, discussions, cases, and AI-assisted discovery."
                />
              </div>

              <div className="relative flex min-h-[520px] items-center justify-center">
                <LegalCore
                  rotate={coreRotate}
                  y={coreY}
                  scale={coreScale}
                  opacity={coreOpacity}
                />

                <motion.div
                  style={{ opacity: sceneTwoOpacity, y: articleCardY }}
                  className="absolute left-0 top-10 hidden w-56 rounded-2xl border border-white/12 bg-white/[0.08] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl md:block"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-[#D4A35A]" />
                    <p className="font-medium text-white">Articles</p>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/55">
                    Publish legal research and public legal analysis.
                  </p>
                </motion.div>

                <motion.div
                  style={{ opacity: sceneThreeOpacity, y: caseCardY }}
                  className="absolute right-0 top-16 hidden w-56 rounded-2xl border border-white/12 bg-white/[0.08] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl md:block"
                >
                  <div className="flex items-center gap-3">
                    <Landmark className="h-5 w-5 text-[#D4A35A]" />
                    <p className="font-medium text-white">Cases</p>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/55">
                    Turn judgments and legal reasoning into clarity.
                  </p>
                </motion.div>

                <motion.div
                  style={{ opacity: sceneFourOpacity, y: aiCardY }}
                  className="absolute bottom-10 left-1/2 hidden w-64 -translate-x-1/2 rounded-2xl border border-white/12 bg-white/[0.08] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl md:block"
                >
                  <div className="flex items-center gap-3">
                    <BrainCircuit className="h-5 w-5 text-[#D4A35A]" />
                    <p className="font-medium text-white">LexAI</p>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/55">
                    AI-assisted legal orientation and faster understanding.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#040816] to-transparent" />
        </div>
      </div>

      <div className="legal-container flex min-h-screen items-center justify-center py-24">
        <FrameReveal className="w-full" amount={0.22}>
          <motion.div variants={lineVariants} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.26em] text-white/42">
              Explore the platform
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-white md:text-5xl">
              Three legal spaces, connected in one premium flow.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/58">
              Each part of the platform is designed to feel consistent, structured, and useful.
            </p>
          </motion.div>

          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } }}
            className="mt-12 grid gap-5 md:grid-cols-3"
          >
            {platformCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    scale: 1.018,
                    transition: { duration: 0.35, ease: EASE },
                  }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.09] p-7 text-left shadow-2xl shadow-black/40 backdrop-blur-2xl"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                    <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[rgba(212,163,90,0.15)] blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[rgba(80,110,255,0.12)] blur-3xl" />
                  </div>

                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.12),transparent)] transition duration-1000 group-hover:translate-x-full" />

                  <div className="relative mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 transition duration-500 group-hover:border-[#D4A35A]/30 group-hover:bg-[rgba(212,163,90,0.10)]">
                    <Icon className="h-6 w-6 text-white/88 transition duration-500 group-hover:text-[#D4A35A]" />
                  </div>

                  <h3 className="relative text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="relative mt-4 text-sm leading-7 text-white/64">
                    {feature.description}
                  </p>

                  <Link
                    href={feature.href}
                    className="relative mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition duration-300 group-hover:text-[#D4A35A]"
                  >
                    Open section
                    <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </FrameReveal>
      </div>

      <div className="legal-container flex min-h-screen items-center justify-center py-24">
        <FrameReveal className="w-full" amount={0.22}>
          <motion.div variants={lineVariants} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.26em] text-white/42">
              Legal workflow
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-white md:text-5xl">
              From legal idea to public legal contribution.
            </h2>
          </motion.div>

          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } }}
            className="mx-auto mt-14 max-w-5xl space-y-5"
          >
            {workflow.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  variants={cardVariants}
                  className="group relative grid gap-5 rounded-[2rem] border border-white/12 bg-white/[0.075] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl md:grid-cols-[0.22fr_0.78fr]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#D4A35A]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm tracking-[0.24em] text-white/38">
                      {item.step}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-white/60">{item.body}</p>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition duration-700 group-hover:opacity-100">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[rgba(212,163,90,0.10)] blur-3xl" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </FrameReveal>
      </div>

      <div className="legal-container flex min-h-screen items-center justify-center py-24">
        <FrameReveal
          amount={0.25}
          className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2.8rem] border border-white/12 bg-white/[0.10] p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-14"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_35%)]" />
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="relative">
            <motion.div
              variants={lineVariants}
              className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#D4A35A]"
            >
              <ShieldCheck className="h-7 w-7" />
            </motion.div>

            <motion.p
              variants={lineVariants}
              className="text-sm uppercase tracking-[0.32em] text-white/45"
            >
              LexAzerbaijan
            </motion.p>

            <motion.h2
              variants={lineVariants}
              className="mt-5 text-balance text-3xl font-semibold text-white md:text-6xl"
            >
              One platform for legal writing, dialogue, and discovery.
            </motion.h2>

            <motion.p
              variants={lineVariants}
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/62 md:text-base"
            >
              Built for those who want legal publishing in Azerbaijan to look sharper,
              move smoother, and feel more serious.
            </motion.p>

            <motion.div
              variants={lineVariants}
              className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/articles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4A35A] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_60px_rgba(212,163,90,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c89749]"
              >
                Explore articles
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/submit"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Submit your article
              </Link>
            </motion.div>

            <motion.div
              variants={lineVariants}
              className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3 text-xs text-white/45"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                <Library className="mx-auto mb-2 h-4 w-4 text-[#D4A35A]" />
                Publish
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                <Users className="mx-auto mb-2 h-4 w-4 text-[#D4A35A]" />
                Discuss
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                <BrainCircuit className="mx-auto mb-2 h-4 w-4 text-[#D4A35A]" />
                Discover
              </div>
            </motion.div>
          </div>
        </FrameReveal>
      </div>
    </section>
  );
}
