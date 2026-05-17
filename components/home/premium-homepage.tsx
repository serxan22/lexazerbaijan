"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowRight,
  BookOpenText,
  Bot,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  Library,
  MessageSquareText,
  PenLine,
  Scale,
  Search,
  Sparkles,
  UsersRound
} from "lucide-react";

import { HomeAnimatedBackground } from "@/components/home/home-animated-background";
import { HomeArticleShowcase } from "@/components/home/home-article-showcase";
import { HomeLexAiPreview } from "@/components/home/home-lexai-preview";
import { HomeMarquee } from "@/components/home/home-marquee";
import type { HomeArticleItem } from "@/components/home/home-article-showcase";
import type { Dictionary } from "@/lib/i18n";

type PremiumHomepageProps = {
  dictionary: Dictionary;
  articles: HomeArticleItem[];
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const canAnimate = mounted && !reduceMotion;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={canAnimate ? { opacity: 0, y: 36, scale: 0.98, filter: "blur(10px)" } : false}
      whileInView={canAnimate ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : undefined}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ delay, duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PremiumHomepage({ dictionary, articles }: PremiumHomepageProps) {
  const copy = dictionary.home.premium;
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const canAnimate = mounted && !reduceMotion;
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const caseIcons = [Scale, Landmark, Library];
  const missionIcons = [GraduationCap, BriefcaseBusiness, Search, PenLine];
  const heroTiles = [
    { title: dictionary.nav.articles, body: copy.stats[0][2], Icon: BookOpenText },
    { title: dictionary.nav.cases, body: copy.stats[1][2], Icon: Landmark },
    { title: dictionary.nav.askLexAI, body: copy.stats[3][2], Icon: Bot }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.04,
      smoothWheel: true,
      wheelMultiplier: 0.86
    });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return (
    <motion.div
      initial={canAnimate ? { opacity: 0 } : false}
      animate={canAnimate ? { opacity: 1 } : undefined}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative isolate overflow-hidden bg-[#f8f5ef] text-[#121827] dark:bg-[#020611] dark:text-[#f8fafc]"
    >
      <HomeAnimatedBackground />
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-20 z-30 h-[2px] w-full origin-left bg-[linear-gradient(90deg,#b8894a,#f4dfac,#264870)]"
        style={{ scaleX: progressScale }}
      />

      <section className="relative px-5 pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="legal-container grid min-h-[82svh] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-4xl">
            <motion.p
              initial={canAnimate ? { opacity: 0, y: 14 } : false}
              animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#c7aa73]/70 bg-[#fff8e8]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#805b2c] shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur dark:border-[#b8894a]/30 dark:bg-[#07111f]/70 dark:text-[#e5c98f]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {copy.heroEyebrow}
            </motion.p>

            <motion.h1
              initial={canAnimate ? { opacity: 0, y: 30, filter: "blur(10px)" } : false}
              animate={canAnimate ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ delay: 0.08, duration: 0.78, ease: "easeOut" }}
              className="mt-7 max-w-5xl font-serif text-4xl font-semibold leading-[0.98] text-[#111827] dark:text-white md:text-5xl xl:text-6xl"
            >
              {copy.heroTitle}
            </motion.h1>

            <motion.p
              initial={canAnimate ? { opacity: 0, y: 24 } : false}
              animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.18, duration: 0.65 }}
              className="mt-7 max-w-3xl text-lg leading-8 text-[#4e5969] dark:text-[#cbd5e1] md:text-xl"
            >
              {copy.heroLead}
            </motion.p>

            <motion.div
              initial={canAnimate ? { opacity: 0, y: 18 } : false}
              animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.26, duration: 0.6 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                href="/articles"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#111827] px-5 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(17,24,39,0.22)] hover:bg-[#243044] dark:bg-[#f3d28d] dark:text-[#111827] dark:hover:bg-[#ffe2a4]"
              >
                <BookOpenText className="h-4 w-4" />
                {copy.ctas.exploreArticles}
              </Link>
              <Link
                href="/submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#b8894a]/70 bg-[#fff8e8]/80 px-5 text-sm font-semibold text-[#6f4c20] shadow-[0_18px_42px_rgba(184,137,74,0.12)] hover:bg-[#fff1cf] dark:border-[#b8894a]/40 dark:bg-[#0b1728] dark:text-[#f1d79d] dark:hover:bg-[#111f34]"
              >
                <PenLine className="h-4 w-4" />
                {copy.ctas.submitArticle}
              </Link>
              <Link
                href="/lexai"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#cfd8e3] bg-[#ffffff]/50 px-5 text-sm font-semibold text-[#243044] backdrop-blur hover:border-[#b8894a] dark:border-[#263852] dark:bg-[#07111f]/60 dark:text-[#f8fafc] dark:hover:border-[#b8894a]/60"
              >
                <Bot className="h-4 w-4" />
                {copy.ctas.askLexAI}
              </Link>
            </motion.div>

            <motion.div
              initial={canAnimate ? { opacity: 0, y: 20 } : false}
              animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.34, duration: 0.64 }}
              className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            >
              {copy.stats.map(([value, label, detail]) => (
                <div
                  key={label}
                  className="rounded-lg border border-[#d9c79f]/70 bg-[#fffdf8]/75 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.06)] backdrop-blur dark:border-[#b8894a]/20 dark:bg-[#07111f]/70"
                >
                  <p className="font-serif text-3xl font-semibold text-[#111827] dark:text-white">{value}</p>
                  <p className="mt-2 text-sm font-semibold text-[#243044] dark:text-[#f8fafc]">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-[#687385] dark:text-[#aab6c8]">{detail}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={canAnimate ? { opacity: 0, x: 34, scale: 0.97, filter: "blur(12px)" } : false}
            animate={canAnimate ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" } : undefined}
            transition={{ delay: 0.18, duration: 0.84, ease: "easeOut" }}
            className="relative overflow-hidden rounded-lg border border-[#d9c79f]/70 bg-[#fffdf8]/80 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur dark:border-[#b8894a]/25 dark:bg-[#07111f]/80 dark:shadow-[0_30px_90px_rgba(0,0,0,0.34)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(184,137,74,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.36),transparent_42%)] dark:bg-[radial-gradient(circle_at_14%_10%,rgba(184,137,74,0.18),transparent_34%)]" />
            <div className="relative border-b border-[#d9c79f]/60 pb-4 dark:border-[#b8894a]/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b6d31] dark:text-[#d8bd82]">
                    LexAzerbaijan
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-[#111827] dark:text-white">
                    {copy.heroNote}
                  </h2>
                </div>
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#111827] text-[#f1d79d]">
                  <motion.span
                    animate={canAnimate ? { scale: [1, 1.3, 1], opacity: [0.34, 0.08, 0.34] } : undefined}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-[-10px] rounded-full border border-[#b8894a]/60"
                  />
                  <Scale className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="relative mt-5 grid gap-3">
              {heroTiles.map(({ title, body, Icon }) => (
                <div
                  key={title}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border border-[#d9c79f]/60 bg-[#fff8e8]/60 p-4 dark:border-[#b8894a]/20 dark:bg-[#0a1627]/70"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-[#f1d79d] dark:bg-[#f1d79d] dark:text-[#111827]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#111827] dark:text-white">{title}</span>
                    <span className="mt-1 block text-xs leading-5 text-[#687385] dark:text-[#aab6c8]">{body}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#b8894a]" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <HomeMarquee phrases={copy.marquee} />
      <HomeArticleShowcase articles={articles} copy={copy} />

      <section className="relative px-5 py-20 md:py-28">
        <div className="legal-container">
          <Reveal className="grid gap-10 rounded-lg border border-[#d9c79f]/70 bg-[#fffdf8]/80 p-5 shadow-[0_26px_80px_rgba(15,23,42,0.09)] backdrop-blur dark:border-[#b8894a]/20 dark:bg-[#07111f]/80 md:p-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a77738] dark:text-[#d6b574]">
                {copy.casesEyebrow}
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] text-[#111827] dark:text-white md:text-6xl">
                {copy.casesTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#5f6877] dark:text-[#cbd5e1]">
                {copy.casesLead}
              </p>
              <Link
                href="/cases"
                className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#b8894a] px-5 text-sm font-semibold text-white hover:bg-[#a77738]"
              >
                {copy.ctas.exploreCases}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4">
              {copy.cases.map(([title, body, href], index) => {
                const Icon = caseIcons[index] ?? Scale;
                return (
                  <motion.div
                    key={href}
                    whileHover={canAnimate ? { x: 6, scale: 1.01 } : undefined}
                    className="rounded-lg border border-[#d9c79f]/70 bg-[#fff8e8]/75 p-5 dark:border-[#b8894a]/20 dark:bg-[#0a1627]/70"
                  >
                    <Link href={href} className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#111827] text-[#f1d79d] dark:bg-[#f1d79d] dark:text-[#111827]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-serif text-2xl font-semibold text-[#111827] dark:text-white">{title}</span>
                        <span className="mt-2 block text-sm leading-6 text-[#5f6877] dark:text-[#cbd5e1]">{body}</span>
                      </span>
                      <ArrowRight className="hidden h-5 w-5 text-[#b8894a] sm:block" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative px-5 py-20 md:py-28">
        <div className="legal-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a77738] dark:text-[#d6b574]">
              {copy.discussionsEyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] text-[#111827] dark:text-white md:text-6xl">
              {copy.discussionsTitle}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#5f6877] dark:text-[#cbd5e1]">
              {copy.discussionsLead}
            </p>
            <Link
              href="/discussions"
              className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#c7aa73] bg-[#fff8e8]/80 px-5 text-sm font-semibold text-[#5d421f] hover:bg-[#fff1cf] dark:border-[#b8894a]/30 dark:bg-[#0b1728] dark:text-[#f1d79d] dark:hover:bg-[#111f34]"
            >
              <MessageSquareText className="h-4 w-4" />
              {copy.ctas.joinDiscussions}
            </Link>
          </Reveal>

          <div className="grid gap-4">
            {copy.discussionCards.map(([title, body], index) => (
              <Reveal key={title} delay={index * 0.08}>
                <div className="group rounded-lg border border-[#d9c79f]/70 bg-[#fffdf8]/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)] dark:border-[#b8894a]/20 dark:bg-[#07111f]/80">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#111827] text-[#f1d79d] dark:bg-[#f1d79d] dark:text-[#111827]">
                      <UsersRound className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold text-[#111827] dark:text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#5f6877] dark:text-[#cbd5e1]">{body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-20 md:py-28">
        <div className="legal-container">
          <Reveal>
            <HomeLexAiPreview copy={copy} />
          </Reveal>
        </div>
      </section>

      <section className="relative px-5 py-20 md:py-28">
        <div className="legal-container">
          <Reveal className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a77738] dark:text-[#d6b574]">
                {copy.missionEyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] text-[#111827] dark:text-white md:text-6xl">
                {copy.missionTitle}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#5f6877] dark:text-[#cbd5e1]">
                {copy.missionLead}
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#c7aa73] bg-[#fff8e8]/80 px-5 text-sm font-semibold text-[#5d421f] hover:bg-[#fff1cf] dark:border-[#b8894a]/30 dark:bg-[#0b1728] dark:text-[#f1d79d] dark:hover:bg-[#111f34]"
              >
                {copy.ctas.readMission}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {copy.missionCards.map(([title, body], index) => {
                const Icon = missionIcons[index] ?? Sparkles;
                return (
                  <motion.div
                    key={title}
                    whileHover={canAnimate ? { y: -5 } : undefined}
                    className="rounded-lg border border-[#d9c79f]/70 bg-[#fffdf8]/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)] dark:border-[#b8894a]/20 dark:bg-[#07111f]/80"
                  >
                    <Icon className="h-6 w-6 text-[#b8894a]" />
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-[#111827] dark:text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#5f6877] dark:text-[#cbd5e1]">{body}</p>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative px-5 py-20 md:py-28">
        <div className="legal-container">
          <Reveal className="overflow-hidden rounded-lg border border-[#d9c79f]/70 bg-[#111827] p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] dark:border-[#b8894a]/25 dark:bg-[#07111f] md:p-10">
            <div className="relative">
              <div className="absolute inset-y-[-40%] right-[-10%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(184,137,74,0.34),transparent_66%)] blur-2xl" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f1d79d]">
                    {copy.finalEyebrow}
                  </p>
                  <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.02] md:text-6xl">
                    {copy.finalTitle}
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-[#d8e0ec]">
                    {copy.finalLead}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/submit"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#f3d28d] px-5 text-sm font-semibold text-[#111827] hover:bg-[#ffe2a4]"
                  >
                    {copy.ctas.submitArticle}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/lexai"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
                  >
                    {copy.ctas.askLexAI}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </motion.div>
  );
}
