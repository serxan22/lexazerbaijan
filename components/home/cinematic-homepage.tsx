"use client";

import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, type Variants } from "framer-motion";
import {
  ArrowRight,
  Archive,
  BookOpenText,
  Bot,
  Eye,
  FileCheck2,
  Gavel,
  Heart,
  Landmark,
  MessageSquareText,
  PenLine,
  Scale,
  Search,
  ShieldCheck,
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
  language: string;
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

type HomeDiscussionPreview = {
  id: string;
  title: string;
  slug: string;
  body: string;
  authorName: string;
  repliesCount: number;
  updatedAt: string;
};

export type CinematicHomepageProps = {
  dictionary: Dictionary;
  locale: Locale;
  featuredArticles: HomeArticlePreview[];
  latestArticles: HomeArticlePreview[];
  categories: HomeCategoryPreview[];
  authors: HomeAuthorPreview[];
  discussions: HomeDiscussionPreview[];
};

type CinematicCopy = Dictionary["home"]["cinematic"];
type CinematicFrame = CinematicCopy["frames"][number];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const chapterNumerals = ["I", "II", "III", "IV", "V", "VI"] as const;
const chapterIcons = [BookOpenText, MessageSquareText, Bot, Landmark, UserRoundCheck, FileCheck2] as const;
const chapterLinks = ["/articles", "/discussions", "/lexai", "/cases", "/authors", "/submit"] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: EASE, staggerChildren: 0.07 }
  }
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.68, ease: EASE } }
};

export function CinematicHomepage({
  dictionary,
  locale,
  featuredArticles,
  latestArticles,
  categories,
  authors,
  discussions
}: CinematicHomepageProps) {
  const copy = dictionary.home.cinematic;
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const articles = useMemo(
    () => dedupeArticles([...featuredArticles, ...latestArticles]),
    [featuredArticles, latestArticles]
  );
  const chapterFrames = copy.frames.slice(1, 7);
  const heroStats = [
    { label: copy.statArticles, value: formatNumber(articles.length, locale), href: "/articles" },
    { label: copy.statAuthors, value: formatNumber(authors.length, locale), href: "/authors" },
    { label: copy.statDiscussions, value: formatNumber(discussions.length, locale), href: "/discussions" },
    { label: copy.statCases, value: "US / ECHR / EU", href: "/cases" }
  ];

  return (
    <main className="relative isolate overflow-hidden bg-[#f3ead6] text-[#16120c] dark:bg-[#050403] dark:text-[#e2e8f0]">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gradient-to-r from-[#1e3a8a] via-[#60a5fa] to-[#bfdbfe]"
        style={{ scaleX: scrollYProgress }}
      />
      <LegalGrainOverlay />
      <ArchiveAtmosphere reducedMotion={Boolean(reduceMotion)} />

      <section className="relative z-10 overflow-hidden border-b border-[#1e3a8a]/20">
        <div className="legal-container grid min-h-[calc(100svh-5rem)] gap-10 py-10 md:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div variants={reveal} initial="hidden" animate="visible" className="max-w-5xl">
            <motion.div variants={revealItem} className="inline-flex items-center gap-3 border-y border-[#1e3a8a]/40 bg-[#eff6ff]/70 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1e3a8a] shadow-sm backdrop-blur-xl dark:bg-[#020617]/70 dark:text-[#60a5fa]">
              <Scale className="h-4 w-4" />
              {copy.heroEyebrow}
            </motion.div>

            <motion.h1 variants={revealItem} className="mt-7 max-w-5xl font-serif text-5xl font-semibold leading-[0.92] tracking-tight text-[#16120c] dark:text-[#e2e8f0] md:text-7xl xl:text-8xl">
              {copy.heroTitle}
            </motion.h1>

            <motion.div variants={revealItem} className="mt-6 flex max-w-3xl items-start gap-4 border-l border-[#1e3a8a]/45 pl-5">
              <p className="text-base leading-8 text-[#334155] dark:text-[#cbd5e1]/80 md:text-lg">
                {copy.heroBody}
              </p>
            </motion.div>

            <motion.div variants={revealItem} className="mt-8 flex flex-wrap gap-3">
              <CinematicButton href="/articles" label={copy.ctaExplore} icon={ArrowRight} primary />
              <CinematicButton href="/submit" label={copy.ctaSubmit} icon={PenLine} />
              <CinematicButton href="/lexai" label={copy.ctaLexAi} icon={Bot} />
            </motion.div>

            <motion.div variants={revealItem} className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {heroStats.map((stat) => (
                <Link key={stat.label} href={stat.href} className="group border border-[#1e3a8a]/25 bg-[#eff6ff]/60 p-4 shadow-[0_20px_60px_rgba(15, 23, 42,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#2563eb]/70 dark:bg-[#020617]/70">
                  <p className="font-serif text-2xl font-semibold text-[#21170b] dark:text-[#e2e8f0]">{stat.value}</p>
                  <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#334155] dark:text-[#93c5fd]">{stat.label}</p>
                </Link>
              ))}
            </motion.div>

            <motion.div variants={revealItem} className="mt-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[#475569] dark:text-[#94a3b8]/70">
              <span className="h-px w-14 bg-[#1e3a8a]/50" />
              {copy.scrollHint}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE, delay: 0.1 }}
            className="relative min-h-[560px] lg:min-h-[660px]"
          >
            <HeroLegalArchive
              articles={articles}
              categories={categories}
              dictionary={dictionary}
              locale={locale}
              reducedMotion={Boolean(reduceMotion)}
            />
          </motion.div>
        </div>
      </section>

      <div className="relative z-10">
        <OrnamentDivider />
        <LegalStoryFrame
          numeral={chapterNumerals[0]}
          frame={chapterFrames[0]}
          copy={copy}
          icon={chapterIcons[0]}
          href={chapterLinks[0]}
          microtext={copy.latinLines[0]}
          visual={<ResearchArchiveScene articles={articles} dictionary={dictionary} locale={locale} copy={copy} />}
        />
        <OrnamentDivider />
        <LegalStoryFrame
          numeral={chapterNumerals[1]}
          frame={chapterFrames[1]}
          copy={copy}
          icon={chapterIcons[1]}
          href={chapterLinks[1]}
          microtext={copy.latinLines[1]}
          reverse
          visual={<DebateScene discussions={discussions} dictionary={dictionary} copy={copy} />}
        />
        <OrnamentDivider />
        <LegalStoryFrame
          numeral={chapterNumerals[2]}
          frame={chapterFrames[2]}
          copy={copy}
          icon={chapterIcons[2]}
          href={chapterLinks[2]}
          microtext={copy.latinLines[2]}
          visual={<LexAiScene dictionary={dictionary} copy={copy} reducedMotion={Boolean(reduceMotion)} />}
        />
        <OrnamentDivider />
        <LegalStoryFrame
          numeral={chapterNumerals[3]}
          frame={chapterFrames[3]}
          copy={copy}
          icon={chapterIcons[3]}
          href={chapterLinks[3]}
          microtext={copy.latinLines[3]}
          reverse
          visual={<CasesScene dictionary={dictionary} copy={copy} />}
        />
        <OrnamentDivider />
        <LegalStoryFrame
          numeral={chapterNumerals[4]}
          frame={chapterFrames[4]}
          copy={copy}
          icon={chapterIcons[4]}
          href={chapterLinks[4]}
          microtext={copy.latinLines[4]}
          visual={<AuthorsScene authors={authors} dictionary={dictionary} locale={locale} copy={copy} />}
        />
        <OrnamentDivider />
        <LegalStoryFrame
          numeral={chapterNumerals[5]}
          frame={chapterFrames[5]}
          copy={copy}
          icon={chapterIcons[5]}
          href={chapterLinks[5]}
          microtext={copy.latinLines[5]}
          reverse
          visual={<EditorialDeskScene dictionary={dictionary} copy={copy} />}
        />
      </div>

      <PlatformIndex
        dictionary={dictionary}
        locale={locale}
        latestArticles={latestArticles}
        categories={categories}
        authors={authors}
        discussions={discussions}
      />

      <FinalCta dictionary={dictionary} />
    </main>
  );
}

function dedupeArticles(articles: HomeArticlePreview[]) {
  const seen = new Set<string>();
  return articles.filter((article) => {
    if (seen.has(article.id)) return false;
    seen.add(article.id);
    return true;
  });
}

function LegalGrainOverlay() {
  return <div aria-hidden="true" className="legal-grain-overlay pointer-events-none fixed inset-0 z-[1]" />;
}

function ArchiveAtmosphere({ reducedMotion }: { reducedMotion: boolean }) {
  const floating = reducedMotion
    ? undefined
    : {
        y: [0, -18, 0],
        rotate: [0, 1.5, 0]
      };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(37, 99, 235,0.24),transparent_24rem),radial-gradient(circle_at_82%_18%,rgba(74,52,29,0.18),transparent_28rem),linear-gradient(180deg,rgba(255,255,255,0.16),transparent_24rem)] dark:bg-[radial-gradient(circle_at_16%_8%,rgba(37, 99, 235,0.16),transparent_26rem),radial-gradient(circle_at_82%_18%,rgba(54,37,20,0.45),transparent_28rem),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_26rem)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(143,99,49,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(143,99,49,0.09)_1px,transparent_1px)] bg-[size:88px_88px] opacity-30 dark:opacity-20" />
      <motion.div
        animate={floating}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 top-32 h-72 w-72 rounded-full border border-[#1e3a8a]/25"
      />
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, 22, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-9rem] top-[18rem] h-[30rem] w-[30rem] rounded-full border border-[#1e3a8a]/20"
      />
      <div className="absolute bottom-[20rem] left-[12%] h-px w-64 rotate-[-18deg] bg-gradient-to-r from-transparent via-[#1e3a8a]/30 to-transparent" />
      <div className="absolute right-[12%] top-[44rem] h-px w-72 rotate-[15deg] bg-gradient-to-r from-transparent via-[#1e3a8a]/30 to-transparent" />
    </div>
  );
}

function LegalStoryFrame({
  numeral,
  frame,
  copy,
  icon: Icon,
  href,
  visual,
  microtext,
  reverse = false
}: {
  numeral: string;
  frame: CinematicFrame;
  copy: CinematicCopy;
  icon: LucideIcon;
  href: string;
  visual: ReactNode;
  microtext: string;
  reverse?: boolean;
}) {
  return (
    <section id={`chapter-${numeral.toLowerCase()}`} className="relative overflow-hidden py-14 md:py-16 lg:py-20">
      <div className={`legal-container grid gap-8 lg:min-h-[78svh] lg:grid-cols-[0.86fr_1.14fr] lg:items-center ${reverse ? "lg:grid-flow-dense" : ""}`}>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.34 }}
          className={reverse ? "lg:col-start-2" : ""}
        >
          <motion.div variants={revealItem} className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center border border-[#1e3a8a]/45 bg-[#eff6ff]/70 font-serif text-4xl font-semibold text-[#1e3a8a] shadow-[0_18px_70px_rgba(15, 23, 42,0.12)] dark:bg-[#020617]/80 dark:text-[#60a5fa]">
              {numeral}
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#334155] dark:text-[#93c5fd]">
                {copy.chapterLabel}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#475569] dark:text-[#94a3b8]/65">
                {microtext}
              </p>
            </div>
          </motion.div>

          <motion.div variants={revealItem} className="mt-8 flex h-12 w-12 items-center justify-center border border-[#1e3a8a]/35 bg-[#0f172a] text-[#60a5fa] shadow-[0_0_42px_rgba(37, 99, 235,0.18)] dark:bg-[#60a5fa]/10">
            <Icon className="h-6 w-6" />
          </motion.div>
          <motion.p variants={revealItem} className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[#1e3a8a] dark:text-[#60a5fa]">
            {frame.eyebrow}
          </motion.p>
          <motion.h2 variants={revealItem} className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-[1.02] text-[#0f172a] dark:text-[#e2e8f0] md:text-6xl">
            {frame.title}
          </motion.h2>
          <motion.p variants={revealItem} className="mt-5 max-w-xl text-base leading-8 text-[#334155] dark:text-[#cbd5e1]/80">
            {frame.body}
          </motion.p>
          <motion.div variants={revealItem} className="mt-8">
            <CinematicButton href={href} label={frame.cta} icon={ArrowRight} primary />
          </motion.div>
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className={`relative min-h-[520px] ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}
        >
          {visual}
        </motion.div>
      </div>
    </section>
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
          ? "bg-[#2563eb] text-[#eff6ff] shadow-[0_18px_50px_rgba(37, 99, 235,0.26)] hover:bg-[#60a5fa]"
          : "border border-[#1e3a8a]/35 bg-[#eff6ff]/70 text-[#0f172a] backdrop-blur-xl hover:border-[#2563eb] hover:bg-[#eff6ff] dark:bg-[#020617]/70 dark:text-[#e0f2fe]"
      }`}
    >
      {label}
      <Icon className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </Link>
  );
}

function HeroLegalArchive({
  articles,
  categories,
  dictionary,
  locale,
  reducedMotion
}: {
  articles: HomeArticlePreview[];
  categories: HomeCategoryPreview[];
  dictionary: Dictionary;
  locale: Locale;
  reducedMotion: boolean;
}) {
  const copy = dictionary.home.cinematic;
  const topArticles = articles.slice(0, 3);

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-x-8 top-5 h-[34rem] border border-[#1e3a8a]/25 bg-[#fff5dd]/50 shadow-[0_40px_120px_rgba(45,30,14,0.16)] backdrop-blur-xl dark:bg-[#11100d]/75" />
      <div className="absolute left-10 top-12 h-[31rem] w-[24rem] rotate-[-5deg] border border-[#1e3a8a]/35 bg-[#dbeafe] shadow-[0_28px_90px_rgba(35,24,12,0.20)] dark:bg-[#19130b]">
        <div className="m-5 border-y border-[#1e3a8a]/25 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#334155] dark:text-[#93c5fd]">
          {copy.archiveLabel}
        </div>
        <div className="mx-5 space-y-3">
          {(topArticles.length ? topArticles : []).map((article) => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="block border border-[#1e3a8a]/20 bg-[#f8fafc]/70 p-4 transition hover:-translate-y-1 hover:border-[#2563eb] dark:bg-white/[0.04]">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1e3a8a]">{article.categoryName ?? dictionary.common.uncategorized}</p>
              <h3 className="mt-2 line-clamp-2 font-serif text-xl font-semibold leading-tight text-[#0f172a] dark:text-[#e2e8f0]">{article.title}</h3>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#475569] dark:text-[#cbd5e1]/55">
                {article.language.toUpperCase()} · {article.readingTime} {dictionary.common.minuteShort} · {formatDate(article.publishedAt ?? article.createdAt, undefined, locale)}
              </p>
            </Link>
          ))}
          {!topArticles.length ? (
            <div className="border border-[#1e3a8a]/20 bg-[#f8fafc]/70 p-4 text-sm leading-7 text-[#334155] dark:bg-white/[0.04] dark:text-[#cbd5e1]/70">
              {copy.archiveEmpty}
            </div>
          ) : null}
        </div>
      </div>

      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-10 top-14 flex h-64 w-64 items-center justify-center rounded-full border border-[#1e3a8a]/30 bg-[#020617]/90 text-[#60a5fa] shadow-[0_0_120px_rgba(37, 99, 235,0.24)]"
      >
        <ScaleIllustration className="h-44 w-44" />
      </motion.div>

      <div className="absolute bottom-10 right-4 w-[28rem] border border-[#1e3a8a]/30 bg-[#100c08]/95 p-5 text-[#e2e8f0] shadow-[0_34px_110px_rgba(0,0,0,0.34)]">
        <div className="flex items-center justify-between border-b border-[#2563eb]/20 pb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#60a5fa]">{copy.intelligenceLabel}</span>
          <span className="h-2 w-2 rounded-full bg-[#60a5fa] shadow-[0_0_22px_rgba(96, 165, 250,0.85)]" />
        </div>
        <p className="mt-4 text-sm leading-7 text-[#cbd5e1]/80">{copy.previewQuestion}</p>
        <p className="mt-3 border-l border-[#2563eb]/35 pl-4 text-sm leading-7 text-[#e2e8f0]/90">{copy.previewAnswer}</p>
      </div>

      <div className="absolute bottom-14 left-4 grid w-72 grid-cols-2 gap-2">
        {categories.slice(0, 4).map((category) => (
          <Link key={category.id} href={`/articles?category=${category.slug}`} className="border border-[#1e3a8a]/25 bg-[#eff6ff]/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#1e3a8a] backdrop-blur-xl transition hover:border-[#2563eb] dark:bg-[#020617]/80 dark:text-[#93c5fd]">
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ResearchArchiveScene({
  articles,
  dictionary,
  locale,
  copy
}: {
  articles: HomeArticlePreview[];
  dictionary: Dictionary;
  locale: Locale;
  copy: CinematicCopy;
}) {
  const displayArticles = articles.slice(0, 4);

  return (
    <SceneShell>
      <div className="absolute inset-x-8 top-8 flex items-center justify-between border-b border-[#2563eb]/20 pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#60a5fa]">{copy.archiveLabel}</p>
        <Archive className="h-5 w-5 text-[#60a5fa]" />
      </div>
      <div className="absolute left-8 top-24 grid w-[30rem] gap-3">
        {displayArticles.map((article, index) => (
          <ArticlePaper key={article.id} article={article} dictionary={dictionary} locale={locale} offset={index} />
        ))}
        {!displayArticles.length ? (
          <div className="border border-[#2563eb]/20 bg-[#dbeafe]/90 p-5 text-sm leading-7 text-[#334155] dark:bg-white/[0.055] dark:text-[#cbd5e1]/75">
            {copy.archiveEmpty}
          </div>
        ) : null}
      </div>
      <div className="absolute bottom-9 right-8 w-72 border border-[#2563eb]/30 bg-[#020617]/85 p-5 text-[#e2e8f0] shadow-[0_30px_100px_rgba(0,0,0,0.24)]">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#60a5fa]">{copy.sourceDeskLabel}</p>
        <div className="mt-4 grid gap-2">
          {copy.sourceMarkers.map((marker) => (
            <div key={marker} className="flex items-center justify-between border border-white/10 bg-white/[0.055] px-3 py-2 text-xs text-[#cbd5e1]">
              <span>{marker}</span>
              <BookOpenText className="h-3.5 w-3.5 text-[#60a5fa]" />
            </div>
          ))}
        </div>
      </div>
      <CitationCloud lines={copy.latinLines.slice(0, 4)} />
    </SceneShell>
  );
}

function ArticlePaper({
  article,
  dictionary,
  locale,
  offset
}: {
  article: HomeArticlePreview;
  dictionary: Dictionary;
  locale: Locale;
  offset: number;
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block border border-[#1e3a8a]/25 bg-[#eff6ff]/90 p-5 text-[#0f172a] shadow-[0_22px_70px_rgba(15, 23, 42,0.12)] transition hover:-translate-y-1 hover:border-[#2563eb] dark:bg-[#020617]/95 dark:text-[#e2e8f0]"
      style={{ transform: `translateX(${offset * 18}px)` }}
    >
      <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#1e3a8a] dark:text-[#60a5fa]">
        <span>{article.categoryName ?? dictionary.common.uncategorized}</span>
        <span>{article.language.toUpperCase()}</span>
      </div>
      <h3 className="mt-3 line-clamp-2 font-serif text-2xl font-semibold leading-tight">{article.title}</h3>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#334155] dark:text-[#cbd5e1]/70">{article.abstract}</p>
      <div className="mt-4 flex items-center justify-between border-t border-[#1e3a8a]/15 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#475569] dark:text-[#cbd5e1]/50">
        <span>{article.authorName}</span>
        <span>{formatDate(article.publishedAt ?? article.createdAt, undefined, locale)}</span>
      </div>
    </Link>
  );
}

function DebateScene({
  discussions,
  dictionary,
  copy
}: {
  discussions: HomeDiscussionPreview[];
  dictionary: Dictionary;
  copy: CinematicCopy;
}) {
  const fallback = copy.discussionCards.map((card, index) => ({
    id: card.title,
    title: card.title,
    slug: "",
    body: card.body,
    authorName: card.tag,
    repliesCount: Number.parseInt(card.meta, 10) || index + 3,
    updatedAt: ""
  }));
  const cards = discussions.length ? discussions.slice(0, 3) : fallback;

  return (
    <SceneShell>
      <div className="absolute inset-x-8 top-8 flex items-center justify-between border-b border-[#2563eb]/20 pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#60a5fa]">{copy.debateNoteLabel}</p>
        <Gavel className="h-5 w-5 text-[#60a5fa]" />
      </div>
      <div className="absolute inset-x-8 top-24 grid gap-3">
        {cards.map((thread, index) => (
          <Link
            key={thread.id}
            href={thread.slug ? `/discussions/${thread.slug}` : "/discussions"}
            className={`group border border-[#2563eb]/20 bg-[#eff6ff]/90 p-5 shadow-[0_22px_80px_rgba(15, 23, 42,0.14)] transition hover:-translate-y-1 hover:border-[#2563eb] dark:bg-[#020617]/90 ${index % 2 ? "ml-16" : "mr-16"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1e3a8a] dark:text-[#60a5fa]">{thread.authorName}</p>
                <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[#0f172a] dark:text-[#e2e8f0]">{thread.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#334155] dark:text-[#cbd5e1]/70">{thread.body}</p>
              </div>
              <div className="min-w-[4rem] border border-[#1e3a8a]/25 bg-[#dbeafe] px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[#1e3a8a] dark:bg-white/[0.055] dark:text-[#60a5fa]">
                {formatNumber(thread.repliesCount, "en")}
                <span className="block">{dictionary.common.comments}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-2">
        {copy.topicChips.map((chip) => (
          <span key={chip} className="border border-[#2563eb]/25 bg-[#020617]/85 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#60a5fa]">
            {chip}
          </span>
        ))}
      </div>
      <GavelSketch className="absolute bottom-24 right-12 h-32 w-32 text-[#60a5fa]/35" />
    </SceneShell>
  );
}

function LexAiScene({
  dictionary,
  copy,
  reducedMotion
}: {
  dictionary: Dictionary;
  copy: CinematicCopy;
  reducedMotion: boolean;
}) {
  return (
    <SceneShell>
      <motion.div
        animate={reducedMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.78, 1, 0.78] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-14 top-12 h-72 w-72 rounded-full border border-[#60a5fa]/30 bg-[radial-gradient(circle,rgba(96, 165, 250,0.34),rgba(96, 165, 250,0.08)_44%,transparent_70%)] shadow-[0_0_140px_rgba(37, 99, 235,0.30)]"
      />
      <div className="absolute left-8 top-10 w-[34rem] border border-[#2563eb]/25 bg-[#eff6ff]/90 p-5 shadow-[0_30px_100px_rgba(15, 23, 42,0.18)] dark:bg-[#020617]/95">
        <div className="flex items-center justify-between border-b border-[#1e3a8a]/20 pb-4">
          <div className="flex items-center gap-3">
            <Bot className="h-5 w-5 text-[#2563eb]" />
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#1e3a8a] dark:text-[#60a5fa]">{dictionary.pages.lexAiPanelTitle}</p>
          </div>
          <span className="h-2 w-2 rounded-full bg-[#60a5fa] shadow-[0_0_22px_rgba(96, 165, 250,0.8)]" />
        </div>
        <div className="mt-5 grid gap-4">
          <div className="ml-auto max-w-[78%] bg-[#2563eb] px-4 py-3 text-sm leading-6 text-[#eff6ff]">
            {copy.lexAiUserMessage}
          </div>
          <div className="max-w-[84%] border border-[#1e3a8a]/20 bg-[#fff9eb] px-4 py-3 text-sm leading-6 text-[#47351e] dark:bg-white/[0.055] dark:text-[#e2e8f0]/80">
            {copy.lexAiAnswer}
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-8 grid w-[34rem] grid-cols-2 gap-2">
        {copy.assistantModes.map((mode) => (
          <div key={mode} className="border border-[#2563eb]/20 bg-[#020617]/90 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.17em] text-[#60a5fa]">
            {mode}
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 right-8 w-72 border border-[#60a5fa]/25 bg-[#0f172a]/90 p-4 text-xs leading-6 text-[#e2e8f0]/80">
        {dictionary.pages.lexAiDisclaimer}
      </div>
    </SceneShell>
  );
}

function CasesScene({ dictionary, copy }: { dictionary: Dictionary; copy: CinematicCopy }) {
  return (
    <SceneShell>
      <div className="absolute left-8 right-8 top-8 flex items-center gap-3 border border-[#2563eb]/20 bg-[#eff6ff]/90 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#1e3a8a] dark:bg-[#020617]/95 dark:text-[#60a5fa]">
        <Search className="h-4 w-4" />
        {copy.caseSearchPlaceholder}
      </div>
      <div className="absolute left-8 top-24 grid w-[32rem] gap-3">
        {copy.caseCards.map((item) => (
          <Link key={item.title} href={item.href} className="group border border-[#2563eb]/25 bg-[#eff6ff]/90 p-5 transition hover:-translate-y-1 hover:border-[#2563eb] dark:bg-[#020617]/95">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center border border-[#1e3a8a]/35 bg-[#020617] font-serif text-lg font-semibold text-[#60a5fa]">
                {item.court}
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold leading-tight text-[#0f172a] dark:text-[#e2e8f0]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#334155] dark:text-[#cbd5e1]/70">{item.body}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-10 right-8 w-72 border border-[#2563eb]/30 bg-[#020617]/92 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#60a5fa]">{copy.caseTimelineLabel}</p>
        <div className="mt-5 space-y-4">
          {copy.caseCards.map((item, index) => (
            <div key={item.court} className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#60a5fa]/30 font-mono text-[10px] text-[#60a5fa]">0{index + 1}</span>
              <span className="text-sm text-[#e2e8f0]/80">{item.court} · {item.title}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#60a5fa]/30 bg-[#60a5fa]/10 px-4 py-2 text-sm font-semibold text-[#60a5fa]">
          <Sparkles className="h-4 w-4" />
          {dictionary.common.summarizeCase}
        </div>
      </div>
      <ColumnsSketch className="absolute bottom-8 left-10 h-36 w-36 text-[#60a5fa]/30" />
    </SceneShell>
  );
}

function AuthorsScene({
  authors,
  dictionary,
  locale,
  copy
}: {
  authors: HomeAuthorPreview[];
  dictionary: Dictionary;
  locale: Locale;
  copy: CinematicCopy;
}) {
  const displayAuthors = authors.slice(0, 3);

  return (
    <SceneShell>
      <div className="absolute inset-x-8 top-8 grid grid-cols-3 gap-4">
        {displayAuthors.map((author) => (
          <Link key={author.id} href={`/authors/${author.username}`} className="group border border-[#2563eb]/25 bg-[#eff6ff]/90 p-5 transition hover:-translate-y-1 hover:border-[#2563eb] dark:bg-[#020617]/95">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1e3a8a]/35 bg-[#020617] font-serif text-2xl font-semibold text-[#60a5fa]">
              {author.fullName.slice(0, 1)}
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1e3a8a] dark:text-[#60a5fa]">{copy.profileBadge}</p>
            <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[#0f172a] dark:text-[#e2e8f0]">{author.fullName}</h3>
            <p className="mt-2 line-clamp-1 text-xs text-[#475569] dark:text-[#cbd5e1]/60">{author.affiliation}</p>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#1e3a8a]/15 pt-4 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[#475569] dark:text-[#cbd5e1]/50">
              <span><strong className="block font-serif text-xl text-[#0f172a] dark:text-[#e2e8f0]">{formatNumber(author.publishedCount, locale)}</strong>{dictionary.common.articles}</span>
              <span><strong className="block font-serif text-xl text-[#0f172a] dark:text-[#e2e8f0]">{formatNumber(author.totalViews, locale)}</strong>{dictionary.common.views}</span>
              <span><strong className="block font-serif text-xl text-[#0f172a] dark:text-[#e2e8f0]">{formatNumber(author.totalLikes, locale)}</strong>{dictionary.common.likes}</span>
            </div>
          </Link>
        ))}
        {!displayAuthors.length ? (
          <div className="col-span-3 border border-[#2563eb]/25 bg-[#eff6ff]/90 p-5 text-sm leading-7 text-[#334155] dark:bg-[#020617]/95 dark:text-[#cbd5e1]/75">
            {copy.authorsEmpty}
          </div>
        ) : null}
      </div>
      <div className="absolute bottom-10 left-8 w-[34rem] border border-[#2563eb]/25 bg-[#020617]/90 p-5 text-sm leading-7 text-[#e2e8f0]/80">
        <ShieldCheck className="h-6 w-6 text-[#60a5fa]" />
        <p className="mt-4">{copy.portfolioSignal}</p>
      </div>
      <ShieldSketch className="absolute bottom-12 right-12 h-40 w-40 text-[#60a5fa]/30" />
    </SceneShell>
  );
}

function EditorialDeskScene({ dictionary, copy }: { dictionary: Dictionary; copy: CinematicCopy }) {
  return (
    <SceneShell>
      <div className="absolute inset-x-8 top-12 grid grid-cols-6 gap-2">
        {copy.pipelineSteps.map((step, index) => (
          <div key={step} className="relative border border-[#2563eb]/25 bg-[#eff6ff]/90 p-3 text-center dark:bg-[#020617]/95">
            {index < copy.pipelineSteps.length - 1 ? (
              <div className="absolute left-full top-1/2 z-10 hidden h-px w-2 bg-[#2563eb]/50 xl:block" />
            ) : null}
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#1e3a8a]/35 bg-[#020617] font-mono text-[11px] text-[#60a5fa]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <p className="mt-3 min-h-10 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-[#1e3a8a] dark:text-[#60a5fa]">{step}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 left-8 w-[30rem] border border-[#2563eb]/25 bg-[#eff6ff]/90 p-5 dark:bg-[#020617]/95">
        <FileCheck2 className="h-6 w-6 text-[#2563eb]" />
        <p className="mt-4 text-sm leading-7 text-[#334155] dark:text-[#cbd5e1]/75">{copy.reviewNote}</p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[dictionary.forms.sources, dictionary.forms.consentOriginal, dictionary.forms.consentAiReview].map((item) => (
            <div key={item} className="border border-[#1e3a8a]/20 bg-[#f8fafc] p-3 font-mono text-[9px] uppercase tracking-[0.13em] text-[#334155] dark:bg-white/[0.055] dark:text-[#60a5fa]">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-12 right-10 w-64 rotate-2 border border-[#2563eb]/25 bg-[#dbeafe] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] dark:bg-[#0f172a]">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1e3a8a] dark:text-[#60a5fa]">{copy.editorialStatusLabel}</p>
        <div className="mt-5 space-y-2">
          <div className="h-2 w-full bg-[#1e3a8a]/25" />
          <div className="h-2 w-10/12 bg-[#1e3a8a]/20" />
          <div className="h-2 w-8/12 bg-[#1e3a8a]/15" />
        </div>
        <PenLine className="mt-8 h-9 w-9 text-[#1e3a8a]" />
      </div>
    </SceneShell>
  );
}

function PlatformIndex({
  dictionary,
  locale,
  latestArticles,
  categories,
  authors,
  discussions
}: {
  dictionary: Dictionary;
  locale: Locale;
  latestArticles: HomeArticlePreview[];
  categories: HomeCategoryPreview[];
  authors: HomeAuthorPreview[];
  discussions: HomeDiscussionPreview[];
}) {
  const copy = dictionary.home.cinematic;

  return (
    <section className="relative z-10 border-y border-[#1e3a8a]/20 bg-[#eadcc0]/65 py-16 backdrop-blur-xl dark:bg-[#0d0a06]/80">
      <div className="legal-container grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#1e3a8a] dark:text-[#60a5fa]">{copy.commandEyebrow}</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight text-[#0f172a] dark:text-[#e2e8f0] md:text-5xl">
            {copy.commandTitle}
          </h2>
        <p className="mt-5 max-w-lg text-sm leading-7 text-[#334155] dark:text-[#cbd5e1]/80">
            {copy.commandBody}
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <IndexPanel title={dictionary.home.latestTitle} href="/articles" cta={dictionary.nav.exploreArticles}>
            {latestArticles.slice(0, 3).map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="block border border-[#1e3a8a]/20 bg-[#eff6ff]/65 p-4 transition hover:border-[#2563eb] dark:bg-white/[0.045]">
                <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-[#1e3a8a] dark:text-[#60a5fa]">{article.categoryName ?? dictionary.common.uncategorized}</p>
                <h3 className="mt-2 line-clamp-2 font-serif text-lg font-semibold text-[#0f172a] dark:text-[#e2e8f0]">{article.title}</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#475569] dark:text-[#cbd5e1]/50">{formatDate(article.publishedAt ?? article.createdAt, undefined, locale)}</p>
              </Link>
            ))}
          </IndexPanel>

          <IndexPanel title={dictionary.nav.discussions} href="/discussions" cta={dictionary.pages.startDiscussion}>
            {(discussions.length ? discussions.slice(0, 3) : []).map((thread) => (
              <Link key={thread.id} href={`/discussions/${thread.slug}`} className="block border border-[#1e3a8a]/20 bg-[#eff6ff]/65 p-4 transition hover:border-[#2563eb] dark:bg-white/[0.045]">
                <h3 className="line-clamp-2 font-serif text-lg font-semibold text-[#0f172a] dark:text-[#e2e8f0]">{thread.title}</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#475569] dark:text-[#cbd5e1]/50">{formatNumber(thread.repliesCount, locale)} {dictionary.common.comments}</p>
              </Link>
            ))}
            {!discussions.length ? (
              <p className="border border-[#1e3a8a]/20 bg-[#eff6ff]/65 p-4 text-sm leading-7 text-[#334155] dark:bg-white/[0.045] dark:text-[#cbd5e1]/75">
                {dictionary.pages.noDiscussions}
              </p>
            ) : null}
          </IndexPanel>

          <IndexPanel title={dictionary.home.topAuthorsTitle} href="/authors" cta={dictionary.home.viewAuthors}>
            {authors.slice(0, 3).map((author) => (
              <Link key={author.id} href={`/authors/${author.username}`} className="flex items-center justify-between border border-[#1e3a8a]/20 bg-[#eff6ff]/65 p-4 transition hover:border-[#2563eb] dark:bg-white/[0.045]">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#0f172a] dark:text-[#e2e8f0]">{author.fullName}</h3>
                  <p className="mt-1 text-xs text-[#475569] dark:text-[#cbd5e1]/55">{author.affiliation}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1e3a8a] dark:text-[#60a5fa]">{formatNumber(author.publishedCount, locale)}</span>
              </Link>
            ))}
          </IndexPanel>

          <IndexPanel title={dictionary.home.categoriesTitle} href="/categories" cta={dictionary.nav.categories}>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 12).map((category) => (
                <Link key={category.id} href={`/articles?category=${category.slug}`} className="border border-[#1e3a8a]/20 bg-[#eff6ff]/65 px-3 py-2 text-xs font-semibold text-[#334155] transition hover:border-[#2563eb] dark:bg-white/[0.045] dark:text-[#cbd5e1]/75">
                  {category.name}
                </Link>
              ))}
            </div>
          </IndexPanel>
        </div>
      </div>
    </section>
  );
}

function IndexPanel({
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
    <div className="border border-[#1e3a8a]/25 bg-[#f8edd8]/80 p-5 shadow-[0_24px_80px_rgba(50,33,14,0.10)] backdrop-blur-xl dark:bg-[#15100a]/80">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-[#1e3a8a]/15 pb-4">
        <h2 className="font-serif text-2xl font-semibold text-[#0f172a] dark:text-[#e2e8f0]">{title}</h2>
        <Link href={href} className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1e3a8a] dark:text-[#60a5fa]">
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}

function FinalCta({ dictionary }: { dictionary: Dictionary }) {
  const copy = dictionary.home.cinematic;
  const items = [
    dictionary.nav.articles,
    dictionary.nav.discussions,
    dictionary.nav.askLexAI,
    dictionary.nav.cases,
    dictionary.nav.authors,
    dictionary.nav.submitArticle
  ];

  return (
    <section className="relative z-10 overflow-hidden py-16 md:py-20">
      <div className="legal-container">
        <div className="relative overflow-hidden border border-[#1e3a8a]/30 bg-[#eff6ff] p-7 text-[#e2e8f0] shadow-[0_42px_140px_rgba(0,0,0,0.36)] md:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(96, 165, 250,0.26),transparent_28%),radial-gradient(circle_at_86%_64%,rgba(143,99,49,0.24),transparent_32%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#60a5fa]">{copy.finalEyebrow}</p>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-6xl">{copy.finalTitle}</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#cbd5e1]/80 md:text-base">{copy.finalBody}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CinematicButton href="/articles" label={copy.ctaExplore} icon={ArrowRight} primary />
                <CinematicButton href="/submit" label={copy.ctaSubmit} icon={PenLine} />
                <CinematicButton href="/lexai" label={copy.ctaLexAi} icon={Bot} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {items.map((item) => (
                <div key={item} className="border border-[#60a5fa]/20 bg-white/[0.055] p-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#cbd5e1] backdrop-blur-xl">
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

function SceneShell({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden border border-[#1e3a8a]/30 bg-[#f2e2c4]/75 shadow-[0_38px_130px_rgba(43,27,10,0.18)] backdrop-blur-xl dark:bg-[#0f0b07]/90">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_18%,rgba(37, 99, 235,0.22),transparent_32%),linear-gradient(rgba(143,99,49,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(143,99,49,0.12)_1px,transparent_1px)] bg-[size:auto,62px_62px,62px_62px] opacity-70 dark:opacity-45" />
      <div className="pointer-events-none absolute inset-4 border border-[#1e3a8a]/15" />
      {children}
    </div>
  );
}

function OrnamentDivider() {
  return (
    <div aria-hidden="true" className="legal-container relative z-10 flex items-center gap-4 py-3">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1e3a8a]/35 to-[#1e3a8a]/10" />
      <span className="font-serif text-2xl text-[#1e3a8a] dark:text-[#60a5fa]">§</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#1e3a8a]/35 to-[#1e3a8a]/10" />
    </div>
  );
}

function CitationCloud({ lines }: { lines: readonly string[] }) {
  return (
    <div aria-hidden="true" className="absolute right-10 top-28 grid gap-3">
      {lines.map((line, index) => (
        <span key={line} className="border border-[#2563eb]/20 bg-[#020617]/80 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#60a5fa]/80" style={{ transform: `translateX(${index % 2 ? 24 : 0}px)` }}>
          {line}
        </span>
      ))}
    </div>
  );
}

function ScaleIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
      <path d="M110 28v154" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M62 182h96" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M82 52h56" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M42 65h136" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M55 67 29 126h52L55 67Z" stroke="currentColor" strokeWidth="4" />
      <path d="M165 67 139 126h52L165 67Z" stroke="currentColor" strokeWidth="4" />
      <path d="M26 126c6 13 17 20 29 20s23-7 29-20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M136 126c6 13 17 20 29 20s23-7 29-20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="110" cy="52" r="11" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function GavelSketch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden="true">
      <path d="M54 42 84 12l20 20-30 30L54 42Z" stroke="currentColor" strokeWidth="7" />
      <path d="M42 54 62 74" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <path d="M93 43 142 92" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M24 122h74" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M34 104h54" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function ColumnsSketch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" fill="none" className={className} aria-hidden="true">
      <path d="M20 52 90 18l70 34H20Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      <path d="M34 64v74M66 64v74M114 64v74M146 64v74" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <path d="M24 146h132M14 162h152" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

function ShieldSketch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" fill="none" className={className} aria-hidden="true">
      <path d="M90 18 148 42v42c0 38-23 62-58 78-35-16-58-40-58-78V42l58-24Z" stroke="currentColor" strokeWidth="7" />
      <path d="M63 90h54M90 63v54" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}
