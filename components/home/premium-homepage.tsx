"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
import { HomeLegal3DAccent } from "@/components/home/home-legal-3d-accent";
import { HomeLexAiPreview } from "@/components/home/home-lexai-preview";
import { HomeMarquee } from "@/components/home/home-marquee";
import { HomeReveal, homeEase, useHomeMotion } from "@/components/home/home-motion";
import { HomeScrollProgress } from "@/components/home/home-scroll-progress";
import { HomeScrollStorytelling } from "@/components/interactive/home-scroll-storytelling";
import type { HomeArticleItem } from "@/components/home/home-article-showcase";
import type { Dictionary } from "@/lib/i18n";

type PremiumHomepageProps = {
  dictionary: Dictionary;
  articles: HomeArticleItem[];
};

export function PremiumHomepage({ dictionary, articles }: PremiumHomepageProps) {
  const copy = dictionary.home.premium;
  const { canAnimate } = useHomeMotion();
  const caseIcons = [Scale, Landmark, Library];
  const missionIcons = [GraduationCap, BriefcaseBusiness, Search, PenLine];
  const heroTiles = [
    { title: dictionary.nav.articles, body: copy.stats[0][2], Icon: BookOpenText },
    { title: dictionary.nav.cases, body: copy.stats[1][2], Icon: Landmark },
    { title: dictionary.nav.askLexAI, body: copy.stats[3][2], Icon: Bot }
  ];

  return (
    <motion.div
      data-homepage-root
      initial={canAnimate ? { opacity: 0.96 } : false}
      animate={canAnimate ? { opacity: 1 } : undefined}
      transition={{ duration: 0.45, ease: homeEase }}
      className="relative isolate overflow-hidden bg-[#f8f5ef] text-[#121827] dark:bg-[#020611] dark:text-[#f8fafc]"
    >
      <HomeScrollStorytelling />
      <HomeScrollProgress />
      <HomeAnimatedBackground />

      <section data-story-section className="relative scroll-mt-28 px-5 pb-12 pt-16 md:pb-16 md:pt-20">
        <HomeLegal3DAccent variant="scales" className="right-[2%] top-24 xl:right-[7%]" />
        <div className="legal-container relative z-10 grid min-h-[calc(100svh-5rem)] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-4xl">
            <motion.p
              data-story="hero-eyebrow"
              initial={canAnimate ? { opacity: 0.86, y: 14 } : false}
              animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55, ease: homeEase }}
              className="inline-flex items-center gap-2 rounded-full border border-[#c7aa73]/70 bg-[#fff8e8]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#805b2c] shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur dark:border-[#b8894a]/30 dark:bg-[#07111f]/70 dark:text-[#e5c98f]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {copy.heroEyebrow}
            </motion.p>

            <motion.h1
              data-story="hero-title"
              initial={canAnimate ? { opacity: 0.86, y: 30, filter: "blur(0px)" } : false}
              animate={canAnimate ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ delay: 0.08, duration: 0.78, ease: homeEase }}
              className="mt-7 max-w-5xl font-serif text-4xl font-semibold leading-[0.98] text-[#111827] dark:text-white md:text-5xl xl:text-6xl"
            >
              {copy.heroTitle}
            </motion.h1>

            <motion.p
              data-story="hero-copy"
              initial={canAnimate ? { opacity: 0.86, y: 24 } : false}
              animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.18, duration: 0.65, ease: homeEase }}
              className="mt-7 max-w-3xl text-lg leading-8 text-[#4e5969] dark:text-[#cbd5e1] md:text-xl"
            >
              {copy.heroLead}
            </motion.p>

            <motion.div
              data-story="hero-actions"
              initial={canAnimate ? { opacity: 0.9, y: 18 } : false}
              animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.26, duration: 0.6, ease: homeEase }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                href="/articles"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#111827] px-5 text-sm font-semibold shadow-[0_18px_42px_rgba(17,24,39,0.22)] hover:bg-[#243044] dark:bg-[#f3d28d] dark:hover:bg-[#ffe2a4] gold-hero-btn dark:text-[#071a33] lex-gold-cta"
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
              data-story-group
              initial={canAnimate ? { opacity: 0.9, y: 20 } : false}
              animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.34, duration: 0.64, ease: homeEase }}
              className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            >
              {copy.stats.map(([value, label, detail]) => (
                <div
                  data-story-card
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
            data-story="hero-panel"
            initial={canAnimate ? { opacity: 0.9, x: 34, scale: 0.97, filter: "blur(0px)" } : false}
            animate={canAnimate ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" } : undefined}
            transition={{ delay: 0.18, duration: 0.84, ease: homeEase }}
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

            <div data-story-group className="relative mt-5 grid gap-3">
              {heroTiles.map(({ title, body, Icon }) => (
                <div
                  data-story-card
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

      <section data-story-section className="relative scroll-mt-28 px-5 py-12 md:py-16">
        <div className="legal-container">
          <HomeReveal className="grid gap-10 rounded-lg border border-[#d9c79f]/70 bg-[#fffdf8]/80 p-5 shadow-[0_26px_80px_rgba(15,23,42,0.09)] backdrop-blur dark:border-[#b8894a]/20 dark:bg-[#07111f]/80 md:p-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div>
              <HomeReveal y={24} mobileY={16}>
                <p data-story="cases-eyebrow" className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a77738] dark:text-[#d6b574]">
                  {copy.casesEyebrow}
                </p>
              </HomeReveal>
              <HomeReveal delay={0.05} y={28} mobileY={18}>
                <h2 data-story="cases-title" className="mt-4 font-serif text-4xl font-semibold leading-[1.05] text-[#111827] dark:text-white md:text-6xl">
                  {copy.casesTitle}
                </h2>
              </HomeReveal>
              <HomeReveal delay={0.1} y={24} mobileY={16}>
                <p data-story="cases-copy" className="mt-5 text-base leading-8 text-[#5f6877] dark:text-[#cbd5e1]">
                  {copy.casesLead}
                </p>
              </HomeReveal>
              <HomeReveal delay={0.15} y={20} mobileY={14}>
                <Link
                  data-story="cases-action"
                  href="/cases"
                  className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#b8894a] px-5 text-sm font-semibold text-white hover:bg-[#a77738]"
                >
                  {copy.ctas.exploreCases}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </HomeReveal>
            </div>

            <div data-story-group className="grid gap-4">
              {copy.cases.map(([title, body, href], index) => {
                const Icon = caseIcons[index] ?? Scale;
                return (
                  <HomeReveal key={href} delay={index * 0.08} y={30} mobileY={18} blur={0} mobileBlur={0} rotateX={2}>
                    <motion.div
                      data-story-card
                      whileHover={canAnimate ? { x: 6, scale: 1.01 } : undefined}
                      transition={{ duration: 0.28, ease: homeEase }}
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
                  </HomeReveal>
                );
              })}
            </div>
          </HomeReveal>
        </div>
      </section>

      <section data-story-section className="relative scroll-mt-28 px-5 py-12 md:py-16">
        <div className="legal-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <HomeReveal>
            <p data-story="discussions-eyebrow" className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a77738] dark:text-[#d6b574]">
              {copy.discussionsEyebrow}
            </p>
            <h2 data-story="discussions-title" className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] text-[#111827] dark:text-white md:text-6xl">
              {copy.discussionsTitle}
            </h2>
            <p data-story="discussions-copy" className="mt-5 max-w-xl text-base leading-8 text-[#5f6877] dark:text-[#cbd5e1]">
              {copy.discussionsLead}
            </p>
            <Link
              data-story="discussions-action"
              href="/discussions"
              className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#c7aa73] bg-[#fff8e8]/80 px-5 text-sm font-semibold text-[#5d421f] hover:bg-[#fff1cf] dark:border-[#b8894a]/30 dark:bg-[#0b1728] dark:text-[#f1d79d] dark:hover:bg-[#111f34]"
            >
              <MessageSquareText className="h-4 w-4" />
              {copy.ctas.joinDiscussions}
            </Link>
          </HomeReveal>

          <div data-story-group className="grid gap-4">
            {copy.discussionCards.map(([title, body], index) => (
              <HomeReveal key={title} delay={index * 0.08} blur={0} mobileBlur={0} rotateX={2}>
                <div data-story-card className="group rounded-lg border border-[#d9c79f]/70 bg-[#fffdf8]/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)] dark:border-[#b8894a]/20 dark:bg-[#07111f]/80">
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
              </HomeReveal>
            ))}
          </div>
        </div>
      </section>

      <section data-story-section className="relative scroll-mt-28 px-5 py-12 md:py-16">
        <HomeLegal3DAccent variant="orb" className="left-[3%] top-12 xl:left-[7%]" intensity={0.72} />
        <div className="legal-container relative z-10">
          <HomeReveal>
            <HomeLexAiPreview copy={copy} />
          </HomeReveal>
        </div>
      </section>

      <section data-story-section className="relative scroll-mt-28 px-5 py-12 md:py-16">
        <HomeLegal3DAccent variant="seal" className="bottom-10 right-[3%] xl:right-[7%]" intensity={0.62} />
        <div className="legal-container relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <HomeReveal y={22} mobileY={14}>
                <p data-story="mission-eyebrow" className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a77738] dark:text-[#d6b574]">
                  {copy.missionEyebrow}
                </p>
              </HomeReveal>
              <HomeReveal delay={0.06} y={30} mobileY={18}>
                <h2 data-story="mission-title" className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] text-[#111827] dark:text-white md:text-6xl">
                  {copy.missionTitle}
                </h2>
              </HomeReveal>
              <HomeReveal delay={0.12} y={24} mobileY={16}>
                <p data-story="mission-copy" className="mt-5 max-w-xl text-base leading-8 text-[#5f6877] dark:text-[#cbd5e1]">
                  {copy.missionLead}
                </p>
              </HomeReveal>
              <HomeReveal delay={0.18} y={20} mobileY={14}>
                <Link
                  data-story="mission-action"
                  href="/about"
                  className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#c7aa73] bg-[#fff8e8]/80 px-5 text-sm font-semibold text-[#5d421f] hover:bg-[#fff1cf] dark:border-[#b8894a]/30 dark:bg-[#0b1728] dark:text-[#f1d79d] dark:hover:bg-[#111f34]"
                >
                  {copy.ctas.readMission}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </HomeReveal>
            </div>

            <div data-story-group className="grid gap-4 sm:grid-cols-2">
              {copy.missionCards.map(([title, body], index) => {
                const Icon = missionIcons[index] ?? Sparkles;
                return (
                  <HomeReveal key={title} delay={index * 0.07} y={32} mobileY={18} blur={0} mobileBlur={0} rotateX={2}>
                    <motion.div
                      data-story-card
                      whileHover={canAnimate ? { y: -5 } : undefined}
                      transition={{ duration: 0.28, ease: homeEase }}
                      className="rounded-lg border border-[#d9c79f]/70 bg-[#fffdf8]/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)] dark:border-[#b8894a]/20 dark:bg-[#07111f]/80"
                    >
                      <Icon className="h-6 w-6 text-[#b8894a]" />
                      <h3 className="mt-5 font-serif text-2xl font-semibold text-[#111827] dark:text-white">{title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#5f6877] dark:text-[#cbd5e1]">{body}</p>
                    </motion.div>
                  </HomeReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section data-story-section className="relative scroll-mt-28 px-5 py-12 md:py-16">
        <div className="legal-container">
          <HomeReveal className="overflow-hidden rounded-lg border border-[#d9c79f]/70 bg-[#111827] p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] dark:border-[#b8894a]/25 dark:bg-[#07111f] md:p-10" y={42} mobileY={22} scale={0.97}>
            <div className="relative">
              <div className="absolute inset-y-[-40%] right-[-10%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(184,137,74,0.34),transparent_66%)] blur-2xl" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p data-story="final-eyebrow" className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f1d79d]">
                    {copy.finalEyebrow}
                  </p>
                  <h2 data-story="final-title" className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.02] md:text-6xl">
                    {copy.finalTitle}
                  </h2>
                  <p data-story="final-copy" className="mt-5 max-w-2xl text-base leading-8 text-[#d8e0ec]">
                    {copy.finalLead}
                  </p>
                </div>
                <div data-story="final-actions" className="flex flex-wrap gap-3">
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
          </HomeReveal>
        </div>
      </section>
    </motion.div>
  );
}
