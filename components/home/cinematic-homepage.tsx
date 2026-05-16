"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants
} from "framer-motion";
import {
  ArrowRight,
  BookMarked,
  BookOpenText,
  Bot,
  FileCheck2,
  Files,
  Landmark,
  MessageSquareText,
  PenLine,
  Scale,
  Search,
  Sparkles,
  UserRoundCheck,
  type LucideIcon
} from "lucide-react";

import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";
import { formatDate, formatNumber } from "@/lib/utils";

type HomeArticlePreview = {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  categoryName: string | null;
  authorName: string;
  readingTime: number;
  viewsCount: number;
  likesCount: number;
  publishedAt: string | null;
  createdAt: string;
};

type HomeAuthorPreview = {
  id: string;
  fullName: string;
  username: string;
  role: string;
  affiliation: string;
  interests: string[];
  publishedCount: number;
  totalViews: number;
  totalLikes: number;
};

type HomeCategoryPreview = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  count: number;
};

export type CinematicHomepageProps = {
  dictionary: Dictionary;
  locale: Locale;
  featuredArticles: HomeArticlePreview[];
  latestArticles: HomeArticlePreview[];
  categories: HomeCategoryPreview[];
  authors: HomeAuthorPreview[];
};

const frameIcons = [Scale, BookOpenText, MessageSquareText, Bot, Landmark, UserRoundCheck, FileCheck2, Sparkles];
const frameLinks = ["/articles", "/submit", "/discussions", "/lexai", "/cases", "/authors", "/submit", "/articles"];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const reveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE, staggerChildren: 0.08 }
  }
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } }
};

export function CinematicHomepage({
  dictionary,
  locale,
  featuredArticles,
  latestArticles,
  categories,
  authors
}: CinematicHomepageProps) {
  const copy = dictionary.home.cinematic;
  const frames = copy.frames;
  const scrollerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [activeFrame, setActiveFrame] = useState(0);
  const { scrollYProgress } = useScroll({
    target: scrollerRef,
    offset: ["start start", "end end"]
  });

  const frameProgress = useTransform(scrollYProgress, [0, 1], [0, frames.length - 1]);
  const visualY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [34, -34]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.97, 1.02, 0.98]);

  useMotionValueEvent(frameProgress, "change", (latest) => {
    setActiveFrame(Math.min(frames.length - 1, Math.max(0, Math.round(latest))));
  });

  const stats = useMemo(
    () => [
      [copy.statArticles, featuredArticles.length + latestArticles.length],
      [copy.statAuthors, authors.length],
      [copy.statFields, categories.length]
    ],
    [authors.length, categories.length, copy.statArticles, copy.statAuthors, copy.statFields, featuredArticles.length, latestArticles.length]
  );

  const frame = frames[activeFrame];
  const FrameIcon = frameIcons[activeFrame] ?? Scale;

  return (
    <div className="relative overflow-hidden bg-[#f7f0e4] text-slate-950 dark:bg-[#030713] dark:text-white">
      <CinematicBackdrop />

      <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden">
        <div className="legal-container relative z-10 grid min-h-[calc(100svh-5rem)] items-center gap-12 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
          <motion.div variants={reveal} initial="hidden" animate="visible" className="max-w-4xl">
            <motion.div variants={revealItem} className="inline-flex items-center gap-3 rounded-full border border-slate-950/10 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.065] dark:text-white/60">
              <Scale className="h-4 w-4 text-gold" />
              {copy.heroEyebrow}
            </motion.div>

            <motion.h1 variants={revealItem} className="mt-7 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-slate-950 dark:text-white md:text-7xl xl:text-8xl">
              {copy.heroTitle}
            </motion.h1>

            <motion.p variants={revealItem} className="mt-7 max-w-2xl text-base leading-8 text-slate-700 dark:text-white/70 md:text-lg">
              {copy.heroBody}
            </motion.p>

            <motion.div variants={revealItem} className="mt-9 flex flex-wrap gap-3">
              <CinematicButton href="/articles" label={copy.ctaExplore} icon={ArrowRight} primary />
              <CinematicButton href="/submit" label={copy.ctaSubmit} icon={PenLine} />
              <CinematicButton href="/lexai" label={copy.ctaLexAi} icon={Bot} />
            </motion.div>

            <motion.div variants={revealItem} className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {stats.map(([label, value]) => (
                <div key={label} className="rounded-lg border border-slate-950/10 bg-white/50 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]">
                  <p className="font-serif text-3xl font-semibold text-slate-950 dark:text-white">{formatNumber(Number(value), locale)}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/40">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="relative min-h-[560px]"
          >
            <HeroArchive articles={featuredArticles} dictionary={dictionary} locale={locale} />
          </motion.div>
        </div>
      </section>

      <section ref={scrollerRef} className="relative hidden min-h-[760vh] lg:block">
        <div className="sticky top-0 min-h-screen overflow-hidden">
          <div className="legal-container relative z-10 grid min-h-screen items-center gap-10 py-24 lg:grid-cols-[0.44fr_0.56fr]">
            <div>
              <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-white/40">
                <span className="h-px w-12 bg-gold" />
                {copy.frameProgressLabel} {String(activeFrame + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
              </div>

              <motion.div
                key={`copy-${activeFrame}`}
                variants={reveal}
                initial="hidden"
                animate="visible"
                className="max-w-xl"
              >
                <motion.div variants={revealItem} className="flex h-14 w-14 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-gold shadow-[0_20px_70px_rgba(184,137,74,0.18)]">
                  <FrameIcon className="h-7 w-7" />
                </motion.div>
                <motion.p variants={revealItem} className="mt-7 text-xs font-semibold uppercase tracking-[0.26em] text-gold">
                  {frame.eyebrow}
                </motion.p>
                <motion.h2 variants={revealItem} className="mt-4 font-serif text-5xl font-semibold leading-[1.02] text-slate-950 dark:text-white">
                  {frame.title}
                </motion.h2>
                <motion.p variants={revealItem} className="mt-5 text-base leading-8 text-slate-700 dark:text-white/60">
                  {frame.body}
                </motion.p>
                <motion.div variants={revealItem} className="mt-8">
                  <CinematicButton href={frameLinks[activeFrame] ?? "/articles"} label={frame.cta} icon={ArrowRight} primary />
                </motion.div>
              </motion.div>

              <div className="mt-12 grid max-w-lg grid-cols-8 gap-2">
                {frames.map((storyFrame, index) => {
                  const Icon = frameIcons[index] ?? Files;
                  const active = index === activeFrame;

                  return (
                    <button
                      key={storyFrame.eyebrow}
                      type="button"
                      onClick={() => {
                        const section = scrollerRef.current;
                        if (!section) return;
                        const step = section.offsetHeight / frames.length;
                        window.scrollTo({
                          top: section.offsetTop + step * index,
                          behavior: reduceMotion ? "auto" : "smooth"
                        });
                      }}
                      className={`flex h-11 items-center justify-center rounded-md border transition ${
                        active
                          ? "border-gold/50 bg-gold/20 text-gold shadow-[0_0_28px_rgba(184,137,74,0.20)]"
                          : "border-slate-950/10 bg-white/40 text-slate-500 hover:border-gold/30 hover:text-gold dark:border-white/10 dark:bg-white/[0.045] dark:text-white/40"
                      }`}
                      aria-label={storyFrame.title}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.div style={{ y: visualY, scale: visualScale }} className="relative min-h-[650px]">
              <FrameVisual
                frameIndex={activeFrame}
                dictionary={dictionary}
                locale={locale}
                featuredArticles={featuredArticles}
                latestArticles={latestArticles}
                categories={categories}
                authors={authors}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 block px-4 py-16 lg:hidden">
        <div className="mx-auto grid max-w-2xl gap-5">
          {frames.map((mobileFrame, index) => {
            const Icon = frameIcons[index] ?? Scale;
            return (
              <motion.article
                key={mobileFrame.eyebrow}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="rounded-lg border border-slate-950/10 bg-white/70 p-5 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md border border-gold/25 bg-gold/10 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{mobileFrame.eyebrow}</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-slate-950 dark:text-white">{mobileFrame.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-white/60">{mobileFrame.body}</p>
                <div className="mt-5">
                  <CinematicButton href={frameLinks[index] ?? "/articles"} label={mobileFrame.cta} icon={ArrowRight} primary />
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <CommandCenter
        dictionary={dictionary}
        locale={locale}
        latestArticles={latestArticles}
        categories={categories}
        authors={authors}
      />

      <FinalCta dictionary={dictionary} />
    </div>
  );
}

function CinematicBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(184,137,74,0.13),transparent_28rem),radial-gradient(circle_at_80%_8%,rgba(11,18,32,0.12),transparent_24rem)] dark:bg-[linear-gradient(115deg,rgba(184,137,74,0.11),transparent_30rem),radial-gradient(circle_at_80%_8%,rgba(90,120,210,0.13),transparent_24rem)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-50 dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] dark:opacity-25" />
      <div className="absolute left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl dark:bg-gold/10" />
      <div className="absolute -right-40 top-1/3 h-[40rem] w-[40rem] rounded-full bg-slate-900/10 blur-3xl dark:bg-blue-900/10" />
    </div>
  );
}

function CinematicButton({
  href,
  label,
  icon: Icon,
  primary = false
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition ${
        primary
          ? "bg-gold text-slate-950 shadow-gold/20 hover:bg-[#D0A05E]"
          : "border border-slate-950/10 bg-white/60 text-slate-950 backdrop-blur-xl hover:border-gold/40 hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.07] dark:text-white dark:hover:bg-white/[0.12]"
      }`}
    >
      {label}
      <Icon className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </Link>
  );
}

function HeroArchive({
  articles,
  dictionary,
  locale
}: {
  articles: HomeArticlePreview[];
  dictionary: Dictionary;
  locale: Locale;
}) {
  const topArticles = articles.slice(0, 3);

  return (
    <div className="absolute inset-0">
      <div className="absolute left-6 top-8 h-[31rem] w-[31rem] rotate-[-8deg] rounded-lg border border-slate-950/10 bg-white/30 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]" />
      <div className="absolute right-4 top-16 h-[29rem] w-[29rem] rotate-[8deg] rounded-lg border border-gold/20 bg-gold/10 shadow-soft backdrop-blur-xl dark:bg-gold/[0.045]" />
      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30 bg-gold/20 blur-2xl dark:bg-gold/20" />

      <div className="absolute left-0 top-6 w-[24rem] rounded-lg border border-slate-950/10 bg-white/75 p-5 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[#071126]/80">
        <div className="flex items-center justify-between border-b border-slate-950/10 pb-4 dark:border-white/10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/40">
            {dictionary.home.cinematic.archiveLabel}
          </span>
          <BookMarked className="h-4 w-4 text-gold" />
        </div>
        <div className="mt-4 grid gap-3">
          {topArticles.map((article) => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="group rounded-md border border-slate-950/10 bg-white/60 p-3 transition hover:-translate-y-0.5 hover:border-gold/40 dark:border-white/10 dark:bg-white/[0.045]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{article.categoryName ?? dictionary.common.uncategorized}</p>
              <h3 className="mt-2 line-clamp-2 font-serif text-lg font-semibold text-slate-950 dark:text-white">{article.title}</h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
                {article.readingTime} {dictionary.common.minuteShort} · {formatDate(article.publishedAt ?? article.createdAt, undefined, locale)}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 right-0 w-[22rem] rounded-lg border border-slate-950/10 bg-slate-950 p-5 text-white shadow-2xl shadow-black/25 dark:border-white/10">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{dictionary.home.cinematic.intelligenceLabel}</span>
          <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_20px_rgba(184,137,74,0.75)]" />
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
          <p className="text-xs text-white/40">{dictionary.home.cinematic.previewQuestion}</p>
          <p className="mt-2 text-sm leading-6 text-white/80">{dictionary.home.cinematic.previewAnswer}</p>
        </div>
      </div>
    </div>
  );
}

function FrameVisual({
  frameIndex,
  dictionary,
  locale,
  featuredArticles,
  latestArticles,
  categories,
  authors
}: CinematicHomepageProps & {
  frameIndex: number;
}) {
  return (
    <motion.div
      key={`visual-${frameIndex}`}
      variants={reveal}
      initial="hidden"
      animate="visible"
      className="absolute inset-0"
    >
      {frameIndex === 0 ? <KnowledgeLayerVisual dictionary={dictionary} locale={locale} categories={categories} /> : null}
      {frameIndex === 1 ? <PublishVisual dictionary={dictionary} locale={locale} articles={[...featuredArticles, ...latestArticles]} /> : null}
      {frameIndex === 2 ? <DiscussionVisual dictionary={dictionary} /> : null}
      {frameIndex === 3 ? <LexAiVisual dictionary={dictionary} /> : null}
      {frameIndex === 4 ? <CasesVisual dictionary={dictionary} /> : null}
      {frameIndex === 5 ? <AuthorsVisual dictionary={dictionary} locale={locale} authors={authors} /> : null}
      {frameIndex === 6 ? <PipelineVisual dictionary={dictionary} /> : null}
      {frameIndex === 7 ? <ConvergenceVisual dictionary={dictionary} /> : null}
    </motion.div>
  );
}

function KnowledgeLayerVisual({ dictionary, categories, locale }: { dictionary: Dictionary; categories: HomeCategoryPreview[]; locale: Locale }) {
  return (
    <VisualShell>
      <div className="absolute left-8 top-8 w-[27rem] rounded-lg border border-white/10 bg-white/[0.07] p-5 backdrop-blur-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">{dictionary.home.cinematic.knowledgeMapLabel}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {categories.slice(0, 8).map((category) => (
            <Link key={category.id} href={`/articles?category=${category.slug}`} className="rounded-md border border-white/10 bg-white/[0.045] p-3 transition hover:border-gold/40 hover:bg-gold/10">
              <p className="line-clamp-1 text-sm font-semibold text-white">{category.name}</p>
              <p className="mt-1 text-xs text-white/40">{formatNumber(category.count, locale)} {dictionary.common.articles}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute bottom-12 right-8 flex h-52 w-52 items-center justify-center rounded-full border border-gold/25 bg-gold/10 shadow-[0_0_120px_rgba(184,137,74,0.16)]">
        <Scale className="h-20 w-20 text-gold" />
      </div>
    </VisualShell>
  );
}

function PublishVisual({
  dictionary,
  locale,
  articles
}: {
  dictionary: Dictionary;
  locale: Locale;
  articles: HomeArticlePreview[];
}) {
  return (
    <VisualShell>
      <div className="absolute left-7 top-10 grid w-[34rem] gap-4">
        {articles.slice(0, 3).map((article, index) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group rounded-lg border border-white/10 bg-white/[0.075] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-gold/40"
            style={{ transform: `translateX(${index * 26}px)` }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{article.categoryName ?? dictionary.common.uncategorized}</p>
            <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-white">{article.title}</h3>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/60">{article.abstract}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-white/40">
              <span>{article.authorName}</span>
              <span>{formatDate(article.publishedAt ?? article.createdAt, undefined, locale)}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-9 right-10 w-60 rounded-lg border border-gold/25 bg-gold/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{dictionary.home.cinematic.editorialStatusLabel}</p>
        <div className="mt-4 grid gap-2">
          {dictionary.home.cinematic.pipelineSteps.slice(0, 4).map((step, index) => (
            <div key={step} className="flex items-center gap-3 text-sm text-white/70">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs text-gold">0{index + 1}</span>
              {step}
            </div>
          ))}
        </div>
      </div>
    </VisualShell>
  );
}

function DiscussionVisual({ dictionary }: { dictionary: Dictionary }) {
  return (
    <VisualShell>
      <div className="absolute inset-x-10 top-12 grid gap-4">
        {dictionary.home.cinematic.discussionCards.map((card, index) => (
          <div
            key={card.title}
            className={`rounded-lg border border-white/10 bg-white/[0.07] p-5 backdrop-blur-2xl transition hover:border-gold/40 ${
              index % 2 ? "ml-24" : "mr-24"
            }`}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{card.tag}</p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{card.body}</p>
              </div>
              <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">
                {card.meta}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-12 left-12 flex flex-wrap gap-2">
        {dictionary.home.cinematic.topicChips.map((chip) => (
          <span key={chip} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-semibold text-white/60">
            {chip}
          </span>
        ))}
      </div>
    </VisualShell>
  );
}

function LexAiVisual({ dictionary }: { dictionary: Dictionary }) {
  return (
    <VisualShell>
      <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full border border-gold/25 bg-[radial-gradient(circle,rgba(184,137,74,0.24),rgba(255,255,255,0.04)_45%,transparent_68%)] shadow-[0_0_140px_rgba(184,137,74,0.22)]" />
      <div className="absolute left-8 top-20 w-[31rem] rounded-lg border border-white/10 bg-white/[0.075] p-5 backdrop-blur-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Bot className="h-5 w-5 text-gold" />
          <p className="text-sm font-semibold text-white">{dictionary.pages.lexAiPanelTitle}</p>
        </div>
        <div className="mt-5 grid gap-4">
          <div className="ml-auto max-w-[78%] rounded-lg bg-gold px-4 py-3 text-sm leading-6 text-slate-950">
            {dictionary.home.cinematic.lexAiUserMessage}
          </div>
          <div className="max-w-[82%] rounded-lg border border-white/10 bg-white/[0.065] px-4 py-3 text-sm leading-6 text-white/70">
            {dictionary.home.cinematic.lexAiAnswer}
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 right-8 w-80 rounded-lg border border-amber-300/25 bg-amber-300/10 p-4 text-xs leading-6 text-amber-100">
        {dictionary.pages.lexAiDisclaimer}
      </div>
    </VisualShell>
  );
}

function CasesVisual({ dictionary }: { dictionary: Dictionary }) {
  return (
    <VisualShell>
      <div className="absolute left-8 top-9 w-[31rem] rounded-lg border border-white/10 bg-white/[0.075] p-5 backdrop-blur-2xl">
        <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.045] px-4 py-3 text-white/50">
          <Search className="h-4 w-4 text-gold" />
          {dictionary.home.cinematic.caseSearchPlaceholder}
        </div>
        <div className="mt-5 grid gap-3">
          {dictionary.home.cinematic.caseCards.map((item) => (
            <Link key={item.title} href={item.href} className="rounded-lg border border-white/10 bg-white/[0.055] p-4 transition hover:border-gold/40 hover:bg-gold/10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{item.court}</p>
              <h3 className="mt-2 font-serif text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{item.body}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute bottom-10 right-10 rounded-full border border-gold/30 bg-gold/10 px-5 py-3 text-sm font-semibold text-gold">
        {dictionary.common.summarizeCase}
      </div>
    </VisualShell>
  );
}

function AuthorsVisual({
  dictionary,
  locale,
  authors
}: {
  dictionary: Dictionary;
  locale: Locale;
  authors: HomeAuthorPreview[];
}) {
  return (
    <VisualShell>
      <div className="absolute inset-x-8 top-8 grid grid-cols-3 gap-4">
        {authors.slice(0, 3).map((author) => (
          <Link key={author.id} href={`/authors/${author.username}`} className="rounded-lg border border-white/10 bg-white/[0.07] p-5 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-gold/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10 font-serif text-lg font-semibold text-gold">
              {author.fullName.slice(0, 1)}
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold text-white">{author.fullName}</h3>
            <p className="mt-1 line-clamp-1 text-xs text-white/40">{author.affiliation}</p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-white/40">
              <span><strong className="block text-base text-white">{formatNumber(author.publishedCount, locale)}</strong>{dictionary.common.articles}</span>
              <span><strong className="block text-base text-white">{formatNumber(author.totalViews, locale)}</strong>{dictionary.common.views}</span>
              <span><strong className="block text-base text-white">{formatNumber(author.totalLikes, locale)}</strong>{dictionary.common.likes}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-10 left-10 w-[28rem] rounded-lg border border-white/10 bg-white/[0.055] p-5 text-sm leading-7 text-white/60">
        {dictionary.home.cinematic.portfolioSignal}
      </div>
    </VisualShell>
  );
}

function PipelineVisual({ dictionary }: { dictionary: Dictionary }) {
  return (
    <VisualShell>
      <div className="absolute inset-x-8 top-1/2 flex -translate-y-1/2 items-center justify-between">
        {dictionary.home.cinematic.pipelineSteps.map((step, index) => (
          <div key={step} className="relative flex flex-col items-center">
            {index < dictionary.home.cinematic.pipelineSteps.length - 1 ? (
              <div className="absolute left-1/2 top-9 h-px w-24 bg-gradient-to-r from-gold/60 to-white/10" />
            ) : null}
            <div className="z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-lg font-semibold text-gold shadow-[0_0_60px_rgba(184,137,74,0.12)]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <p className="mt-4 max-w-[6rem] text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/60">{step}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 right-10 w-72 rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
        <FileCheck2 className="h-6 w-6 text-gold" />
        <p className="mt-4 text-sm leading-7 text-white/60">{dictionary.home.cinematic.reviewNote}</p>
      </div>
    </VisualShell>
  );
}

function ConvergenceVisual({ dictionary }: { dictionary: Dictionary }) {
  const items = [
    [dictionary.nav.articles, "/articles", BookOpenText],
    [dictionary.nav.discussions, "/discussions", MessageSquareText],
    [dictionary.nav.askLexAI, "/lexai", Bot],
    [dictionary.nav.cases, "/cases", Landmark],
    [dictionary.nav.authors, "/authors", UserRoundCheck]
  ] as const;

  return (
    <VisualShell>
      <div className="absolute left-1/2 top-1/2 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-gold/10 shadow-[0_0_160px_rgba(184,137,74,0.20)]">
        <Scale className="h-20 w-20 text-gold" />
      </div>
      {items.map(([label, href, Icon], index) => {
        const positions = [
          "left-12 top-10",
          "right-10 top-24",
          "left-20 bottom-14",
          "right-20 bottom-10",
          "left-1/2 top-[8%] -translate-x-1/2"
        ];
        return (
          <Link key={href} href={href} className={`absolute ${positions[index]} rounded-lg border border-white/10 bg-white/[0.07] p-4 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-gold/40`}>
            <Icon className="h-5 w-5 text-gold" />
            <p className="mt-3 text-sm font-semibold text-white">{label}</p>
          </Link>
        );
      })}
    </VisualShell>
  );
}

function VisualShell({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050917]/90 shadow-2xl shadow-black/30 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(184,137,74,0.16),transparent_34%),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,54px_54px,54px_54px]" />
      {children}
    </div>
  );
}

function CommandCenter({
  dictionary,
  locale,
  latestArticles,
  categories,
  authors
}: {
  dictionary: Dictionary;
  locale: Locale;
  latestArticles: HomeArticlePreview[];
  categories: HomeCategoryPreview[];
  authors: HomeAuthorPreview[];
}) {
  const copy = dictionary.home.cinematic;

  return (
    <section className="relative z-10 border-y border-slate-950/10 bg-white/50 py-20 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]">
      <div className="legal-container">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{copy.commandEyebrow}</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold text-slate-950 dark:text-white md:text-5xl">
              {copy.commandTitle}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-700 dark:text-white/60">
              {copy.commandBody}
            </p>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-5 xl:grid-cols-2">
              <Panel title={dictionary.home.latestTitle} href="/articles" cta={dictionary.nav.exploreArticles}>
                <div className="grid gap-3">
                  {latestArticles.slice(0, 4).map((article) => (
                    <Link key={article.id} href={`/articles/${article.slug}`} className="rounded-md border border-slate-950/10 bg-white/60 p-4 transition hover:-translate-y-0.5 hover:border-gold/40 dark:border-white/10 dark:bg-white/[0.045]">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{article.categoryName ?? dictionary.common.uncategorized}</p>
                      <h3 className="mt-2 line-clamp-2 font-serif text-lg font-semibold text-slate-950 dark:text-white">{article.title}</h3>
                      <p className="mt-2 text-xs text-slate-500 dark:text-white/40">{formatDate(article.publishedAt ?? article.createdAt, undefined, locale)}</p>
                    </Link>
                  ))}
                </div>
              </Panel>

              <Panel title={dictionary.home.topAuthorsTitle} href="/authors" cta={dictionary.home.viewAuthors}>
                <div className="grid gap-3">
                  {authors.slice(0, 4).map((author) => (
                    <Link key={author.id} href={`/authors/${author.username}`} className="flex items-center justify-between rounded-md border border-slate-950/10 bg-white/60 p-4 transition hover:-translate-y-0.5 hover:border-gold/40 dark:border-white/10 dark:bg-white/[0.045]">
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-slate-950 dark:text-white">{author.fullName}</h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-white/40">{author.affiliation}</p>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">{formatNumber(author.publishedCount, locale)}</span>
                    </Link>
                  ))}
                </div>
              </Panel>
            </div>

            <Panel title={dictionary.home.categoriesTitle} href="/categories" cta={dictionary.nav.categories}>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 12).map((category) => (
                  <Link key={category.id} href={`/articles?category=${category.slug}`} className="rounded-full border border-slate-950/10 bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-gold/40 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.045] dark:text-white/60 dark:hover:text-white">
                    {category.name}
                  </Link>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  title,
  href,
  cta,
  children
}: {
  title: string;
  href: string;
  cta: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-950/10 bg-white/60 p-5 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-semibold text-slate-950 dark:text-white">{title}</h2>
        <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {children}
    </div>
  );
}

function FinalCta({ dictionary }: { dictionary: Dictionary }) {
  const copy = dictionary.home.cinematic;

  return (
    <section className="relative z-10 overflow-hidden py-20">
      <div className="legal-container">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-950/10 bg-slate-950 p-8 text-white shadow-2xl shadow-black/25 dark:border-white/10 md:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(184,137,74,0.25),transparent_32%),radial-gradient(circle_at_88%_58%,rgba(70,95,180,0.16),transparent_30%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{copy.finalEyebrow}</p>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-6xl">{copy.finalTitle}</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base">{copy.finalBody}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CinematicButton href="/articles" label={copy.ctaExplore} icon={ArrowRight} primary />
                <CinematicButton href="/submit" label={copy.ctaSubmit} icon={PenLine} />
                <CinematicButton href="/lexai" label={copy.ctaLexAi} icon={Bot} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[dictionary.nav.articles, dictionary.nav.discussions, dictionary.nav.askLexAI, dictionary.nav.cases, dictionary.nav.authors, dictionary.nav.submitArticle].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.055] p-4 text-sm font-semibold text-white/70 backdrop-blur-xl">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
