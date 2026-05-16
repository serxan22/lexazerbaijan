"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpenText,
  Bot,
  FileCheck2,
  Files,
  Landmark,
  MessageSquareText,
  Scale,
  ShieldCheck,
  UserRoundCheck
} from "lucide-react";

import type { Dictionary } from "@/lib/i18n";

const icons = [Scale, BookOpenText, MessageSquareText, Bot, Landmark, UserRoundCheck, FileCheck2, ShieldCheck];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const reveal: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, staggerChildren: 0.08 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE } }
};

export function PremiumScrollShowcase({ dictionary }: { dictionary: Dictionary }) {
  const targetRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [activeFrame, setActiveFrame] = useState(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const frameValue = useTransform(scrollYProgress, [0, 1], [0, dictionary.home.storyFrames.length - 1]);
  const visualY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [28, -28]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.96, 1.02, 0.98]);

  useMotionValueEvent(frameValue, "change", (latest) => {
    const next = Math.min(dictionary.home.storyFrames.length - 1, Math.max(0, Math.round(latest)));
    setActiveFrame(next);
  });

  const frame = dictionary.home.storyFrames[activeFrame];
  const ActiveIcon = icons[activeFrame] ?? Scale;

  return (
    <section ref={targetRef} className="relative min-h-[760vh] bg-[#040816] text-white">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#040816_0%,#071126_44%,#040816_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
        <div className="pointer-events-none absolute inset-x-0 top-[-16%] h-[58rem] bg-[url('/justice-hero-bg.svg')] bg-top bg-no-repeat opacity-[0.18] mix-blend-screen" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#040816] to-transparent" />

        <div className="legal-container relative z-10 grid min-h-screen items-center gap-10 py-24 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            key={activeFrame}
            variants={reveal}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={item} className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.065] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/58 backdrop-blur-xl">
              <Scale className="h-4 w-4 text-gold" />
              {dictionary.home.storyKicker}
            </motion.div>

            <motion.h1 variants={item} className="mt-7 font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl">
              {activeFrame === 0 ? dictionary.home.storyHeadline : frame.title}
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
              {activeFrame === 0 ? dictionary.home.storyBody : frame.body}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_60px_rgba(184,137,74,0.24)] hover:bg-[#D0A05E]"
              >
                {dictionary.home.storyPrimaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/[0.075] px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/20 backdrop-blur-xl hover:bg-white/[0.12]"
              >
                {dictionary.home.storySecondaryCta}
              </Link>
            </motion.div>

            <motion.div variants={item} className="mt-10 grid max-w-xl grid-cols-4 gap-2">
              {dictionary.home.storyFrames.map((storyFrame, index) => {
                const Icon = icons[index] ?? Files;
                const active = index === activeFrame;

                return (
                  <button
                    key={storyFrame.eyebrow}
                    type="button"
                    onClick={() => {
                      const section = targetRef.current;
                      if (!section) return;
                      const step = section.offsetHeight / dictionary.home.storyFrames.length;
                      window.scrollTo({ top: section.offsetTop + step * index, behavior: reduceMotion ? "auto" : "smooth" });
                    }}
                    className={`group flex h-12 items-center justify-center rounded-md border text-xs font-semibold transition ${
                      active
                        ? "border-gold/50 bg-gold/20 text-gold"
                        : "border-white/10 bg-white/[0.045] text-white/42 hover:border-white/20 hover:text-white/75"
                    }`}
                    aria-label={storyFrame.title}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div style={{ y: visualY, scale: visualScale }} className="relative hidden min-h-[620px] lg:block">
            <div className="absolute left-8 top-8 h-[34rem] w-[34rem] rotate-[-7deg] rounded-lg border border-white/8 bg-white/[0.025]" />
            <div className="absolute right-4 top-20 h-[30rem] w-[30rem] rotate-[8deg] rounded-lg border border-gold/12 bg-gold/[0.035]" />

            <motion.div
              key={`visual-${activeFrame}`}
              variants={reveal}
              initial="hidden"
              animate="visible"
              className="absolute inset-0"
            >
              <div className="premium-glass absolute left-2 top-10 w-[25rem] p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/42">
                      {frame.eyebrow}
                    </p>
                    <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white">
                      {frame.title}
                    </h2>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-gold/25 bg-gold/10 text-gold">
                    <ActiveIcon className="h-7 w-7" />
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-white/62">{frame.body}</p>
              </div>

              <div className="premium-glass absolute bottom-14 right-0 w-[28rem] p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/42">
                    {frame.signal}
                  </p>
                  <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_22px_rgba(184,137,74,0.75)]" />
                </div>
                <div className="mt-5 grid gap-3">
                  {[dictionary.nav.articles, dictionary.nav.discussions, dictionary.nav.askLexAI, dictionary.nav.cases].map((label, index) => (
                    <div key={label} className="flex items-center gap-3 rounded-md border border-white/8 bg-white/[0.045] p-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/8 text-xs font-semibold text-gold">
                        0{index + 1}
                      </span>
                      <span className="text-sm text-white/72">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute right-24 top-4 grid w-44 gap-3">
                {["RLS", "Auth", "i18n", "AI"].map((label) => (
                  <div key={label} className="rounded-md border border-white/10 bg-white/[0.05] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/45 backdrop-blur-xl">
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/36 backdrop-blur-xl md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {dictionary.home.storyScrollHint}
        </div>
      </div>
    </section>
  );
}
