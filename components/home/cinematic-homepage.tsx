"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpenText,
  Bot,
  Gavel,
  Landmark,
  Mail,
  MessageSquareText,
  Scale,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";

type AnyRecord = Record<string, any>;

export type CinematicHomepageProps = {
  dictionary?: AnyRecord;
  locale?: string;
  featuredArticles?: AnyRecord[];
  latestArticles?: AnyRecord[];
  articles?: AnyRecord[];
  categories?: AnyRecord[];
  topAuthors?: AnyRecord[];
  authors?: AnyRecord[];
  discussions?: AnyRecord[];
  stats?: AnyRecord;
};

const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

function safeArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

function pickText(value: any, fallback: string) {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function getArticleTitle(article: AnyRecord, fallback: string) {
  return pickText(article?.title, fallback);
}

function getArticleSlug(article: AnyRecord) {
  return article?.slug ? `/articles/${article.slug}` : "/articles";
}

function getAuthorName(author: AnyRecord, fallback = "Contributor") {
  return pickText(author?.fullName ?? author?.name ?? author?.username, fallback);
}

function formatNumber(value: number | undefined | null) {
  const n = Number(value ?? 0);
  return new Intl.NumberFormat("en").format(Number.isFinite(n) ? n : 0);
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedNumber({ value }: { value: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.45);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const frames = 72;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1200);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      frame += 1;
      if (t < 1 && frame < frames) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{formatNumber(display)}</span>;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.18);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 760ms ${ease} ${delay}ms, transform 900ms ${ease} ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed left-0 top-0 z-[80] h-[3px] w-full bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-blue-950 via-blue-600 to-sky-300 shadow-[0_0_30px_rgba(37,99,235,0.45)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.24),transparent_34%),radial-gradient(circle_at_80%_35%,rgba(14,165,233,0.13),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.15),rgba(2,6,23,0.92))]" />
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.18] [background-image:linear-gradient(rgba(96,165,250,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.16)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute left-1/2 top-28 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-blue-400/15" />
      <div className="absolute left-1/2 top-6 h-[58rem] w-[58rem] -translate-x-1/2 rounded-full border border-blue-400/10" />
    </div>
  );
}

function HeroVisual({ articles }: { articles: AnyRecord[] }) {
  const first = articles[0];
  const second = articles[1];
  const third = articles[2];

  return (
    <div className="relative min-h-[520px] w-full">
      <div className="absolute left-1/2 top-1/2 h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/20 bg-blue-950/30 shadow-[0_0_120px_rgba(37,99,235,0.22)] backdrop-blur-2xl" />
      <div className="absolute left-1/2 top-1/2 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-300/25 bg-slate-950/80 text-blue-200 shadow-[0_0_90px_rgba(59,130,246,0.24)]">
        <Scale className="h-20 w-20" strokeWidth={1.1} />
      </div>

      <Link
        href={getArticleSlug(first)}
        className="group absolute left-0 top-8 w-[21rem] rounded-[2rem] border border-blue-300/25 bg-white/85 p-5 text-slate-950 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-blue-500/55 dark:bg-slate-950/80 dark:text-white"
      >
        <div className="flex items-center justify-between border-b border-blue-500/15 pb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
          <span>Featured brief</span>
          <BookOpenText className="h-4 w-4" />
        </div>
        <h3 className="mt-4 line-clamp-3 font-serif text-2xl leading-7">{getArticleTitle(first, "Legal research, written with authority")}</h3>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {pickText(first?.abstract, "Discover legal articles, structured analysis, and research notes from the LexAzerbaijan community.")}
        </p>
      </Link>

      <Link
        href={getArticleSlug(second)}
        className="group absolute right-0 top-24 w-[18rem] rounded-[1.6rem] border border-blue-300/25 bg-blue-50/90 p-5 text-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-blue-500/55 dark:bg-slate-900/90 dark:text-white"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">Case note</p>
        <h3 className="mt-3 line-clamp-2 font-serif text-xl leading-6">{getArticleTitle(second, "From cases to legal meaning")}</h3>
      </Link>

      <Link
        href={getArticleSlug(third)}
        className="group absolute bottom-16 left-20 w-[19rem] rounded-[1.6rem] border border-blue-300/25 bg-slate-950/90 p-5 text-white shadow-[0_30px_90px_rgba(2,6,23,0.28)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-blue-400/65"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">Editorial archive</p>
        <h3 className="mt-3 line-clamp-2 font-serif text-xl leading-6">{getArticleTitle(third, "Publish, debate, and build your legal voice")}</h3>
      </Link>

      <div className="absolute bottom-6 right-8 w-64 rounded-[1.5rem] border border-blue-300/25 bg-white/80 p-4 shadow-[0_22px_70px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:bg-slate-950/80">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">LexAI ready</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Research assistant preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection({ copy, articles }: { copy: AnyRecord; articles: AnyRecord[] }) {
  return (
    <section className="relative flex min-h-[calc(100vh+40px)] items-center overflow-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <GridBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 pb-20 pt-32 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-500/25 bg-blue-50/80 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-800 shadow-sm backdrop-blur-xl dark:bg-blue-950/30 dark:text-blue-200">
              <Sparkles className="h-4 w-4" />
              {copy.heroEyebrow}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-8 max-w-4xl font-serif text-[clamp(3.6rem,9vw,8.8rem)] font-semibold leading-[0.86] tracking-[-0.07em]">
              {copy.heroTitleA}
              <span className="block bg-gradient-to-r from-blue-950 via-blue-700 to-sky-500 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-sky-300">
                {copy.heroTitleB}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
              {copy.heroBody}
            </p>
          </Reveal>

          <Reveal delay={230}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(37,99,235,0.26)] transition duration-300 hover:-translate-y-1 hover:bg-blue-600"
              >
                {copy.exploreArticles}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-white/70 px-6 py-3 text-sm font-semibold text-blue-950 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              >
                {copy.submitArticle}
              </Link>
              <Link
                href="/lexai"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-white/70 px-6 py-3 text-sm font-semibold text-blue-950 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              >
                {copy.tryLexAI}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
              {copy.heroStats.map((stat: AnyRecord) => (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="rounded-2xl border border-blue-500/20 bg-white/70 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 dark:bg-white/[0.06]"
                >
                  <p className="font-serif text-2xl font-semibold">{stat.value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{stat.label}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <HeroVisual articles={articles} />
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400 md:flex">
        <span>{copy.scroll}</span>
        <span className="h-16 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
    </section>
  );
}

function TimelineSection({
  copy,
  articles,
  categories,
  authors,
  discussions,
}: {
  copy: AnyRecord;
  articles: AnyRecord[];
  categories: AnyRecord[];
  authors: AnyRecord[];
  discussions: AnyRecord[];
}) {
  const frames = useMemo(
    () => [
      {
        icon: BookOpenText,
        kicker: "I",
        title: copy.timelineArticlesTitle,
        body: copy.timelineArticlesBody,
        href: "/articles",
        cta: copy.exploreArticles,
        visual: <ArticleArchive articles={articles} copy={copy} />,
      },
      {
        icon: MessageSquareText,
        kicker: "II",
        title: copy.timelineDiscussionsTitle,
        body: copy.timelineDiscussionsBody,
        href: "/discussions",
        cta: copy.openDiscussions,
        visual: <DebateVisual discussions={discussions} copy={copy} />,
      },
      {
        icon: Bot,
        kicker: "III",
        title: copy.timelineLexAITitle,
        body: copy.timelineLexAIBody,
        href: "/lexai",
        cta: copy.tryLexAI,
        visual: <LexAIVisual categories={categories} copy={copy} />,
      },
      {
        icon: Landmark,
        kicker: "IV",
        title: copy.timelineCasesTitle,
        body: copy.timelineCasesBody,
        href: "/cases",
        cta: copy.exploreCases,
        visual: <CasesVisual copy={copy} />,
      },
      {
        icon: UserRound,
        kicker: "V",
        title: copy.timelineAuthorsTitle,
        body: copy.timelineAuthorsBody,
        href: "/authors",
        cta: copy.viewAuthors,
        visual: <AuthorsVisual authors={authors} copy={copy} />,
      },
    ],
    [articles, authors, categories, copy, discussions],
  );

  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const center = window.innerHeight * 0.48;
      let next = 0;

      itemRefs.current.forEach((node, index) => {
        if (!node) return;
        const box = node.getBoundingClientRect();
        if (box.top <= center) next = index;
      });

      setActive(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const ActiveIcon = frames[active]?.icon ?? Scale;

  return (
    <section className="relative bg-slate-100 py-24 text-slate-950 dark:bg-[#020617] dark:text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.15),transparent_32%),radial-gradient(circle_at_90%_50%,rgba(14,165,233,0.10),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 dark:text-blue-300">{copy.timelineEyebrow}</p>
            <h2 className="mt-5 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">{copy.timelineTitle}</h2>
            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">{copy.timelineBody}</p>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-8">
            {frames.map((frame, index) => {
              const Icon = frame.icon;
              const isActive = active === index;

              return (
                <div
                  key={frame.kicker}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className={`group relative rounded-[2rem] border p-6 transition duration-500 ${
                    isActive
                      ? "border-blue-500/50 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.12)] dark:bg-slate-950"
                      : "border-blue-500/15 bg-white/55 dark:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition duration-500 ${
                        isActive
                          ? "border-blue-500/50 bg-blue-700 text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)]"
                          : "border-blue-500/20 bg-blue-50 text-blue-800 dark:bg-blue-950/35 dark:text-blue-200"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700 dark:text-blue-300">Frame {frame.kicker}</p>
                      <h3 className="mt-2 font-serif text-3xl leading-8">{frame.title}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">{frame.body}</p>
                      <Link href={frame.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
                        {frame.cta}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]">
            <div className="relative h-[640px] overflow-hidden rounded-[2.5rem] border border-blue-400/25 bg-slate-950 p-5 text-white shadow-[0_40px_140px_rgba(2,6,23,0.35)] lg:h-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.26),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.35),rgba(2,6,23,0.96))]" />
              <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(147,197,253,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.18)_1px,transparent_1px)] [background-size:54px_54px]" />

              <div className="relative z-10 flex items-center justify-between border-b border-blue-300/15 pb-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-blue-300">{copy.rightPanelLabel}</p>
                  <p className="mt-1 text-sm text-slate-400">{copy.rightPanelBody}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/25 bg-blue-500/10 text-blue-200">
                  <ActiveIcon className="h-6 w-6" />
                </div>
              </div>

              <div key={active} className="relative z-10 h-[calc(100%-5rem)] animate-[panelIn_680ms_cubic-bezier(0.22,1,0.36,1)_both]">
                {frames[active]?.visual}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleArchive({ articles, copy }: { articles: AnyRecord[]; copy: AnyRecord }) {
  const list = articles.slice(0, 4);

  return (
    <div className="relative h-full pt-10">
      <div className="absolute left-10 top-14 h-72 w-72 rounded-full border border-blue-300/20 bg-blue-500/10 blur-sm" />
      <div className="relative mx-auto max-w-xl space-y-4 pt-12">
        {(list.length ? list : [{ title: copy.emptyArticleA }, { title: copy.emptyArticleB }, { title: copy.emptyArticleC }]).map((article, index) => (
          <Link
            key={article.id ?? index}
            href={getArticleSlug(article)}
            className="block rounded-[1.6rem] border border-blue-300/20 bg-white/[0.08] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300/50"
            style={{ transform: `translateX(${index % 2 ? 34 : 0}px)` }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-300">{article.categoryName ?? copy.articleLabel}</p>
            <h4 className="mt-2 line-clamp-2 font-serif text-2xl leading-7 text-white">{getArticleTitle(article, copy.emptyArticleA)}</h4>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">{pickText(article.abstract, copy.articleFallback)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function DebateVisual({ discussions, copy }: { discussions: AnyRecord[]; copy: AnyRecord }) {
  const list = discussions.slice(0, 3);

  return (
    <div className="relative h-full pt-14">
      <Gavel className="absolute right-10 top-16 h-32 w-32 text-blue-300/20" strokeWidth={1} />
      <div className="space-y-5">
        {(list.length ? list : [{ title: copy.debateA }, { title: copy.debateB }, { title: copy.debateC }]).map((thread, index) => (
          <Link
            key={thread.id ?? index}
            href={thread.slug ? `/discussions/${thread.slug}` : "/discussions"}
            className={`block rounded-[1.6rem] border border-blue-300/20 bg-white/[0.08] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300/50 ${index % 2 ? "ml-16" : "mr-16"}`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-300">{copy.discussionLabel}</p>
            <h4 className="mt-2 line-clamp-2 font-serif text-2xl leading-7">{pickText(thread.title, copy.debateA)}</h4>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">{pickText(thread.body, copy.debateFallback)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function LexAIVisual({ categories, copy }: { categories: AnyRecord[]; copy: AnyRecord }) {
  return (
    <div className="relative h-full pt-16">
      <div className="absolute right-10 top-12 h-72 w-72 rounded-full border border-blue-300/25 bg-[radial-gradient(circle,rgba(59,130,246,0.34),rgba(37,99,235,0.10)_46%,transparent_72%)] shadow-[0_0_130px_rgba(37,99,235,0.25)]" />
      <div className="relative z-10 max-w-xl rounded-[2rem] border border-blue-300/20 bg-white/[0.08] p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-blue-300/15 pb-4">
          <div className="flex items-center gap-3">
            <Bot className="h-5 w-5 text-blue-300" />
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-blue-300">LexAI</p>
          </div>
          <span className="h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_20px_rgba(96,165,250,0.8)]" />
        </div>

        <div className="mt-6 space-y-4">
          <div className="ml-auto max-w-[82%] rounded-2xl bg-blue-600 px-4 py-3 text-sm leading-6 text-white">
            {copy.aiQuestion}
          </div>
          <div className="max-w-[88%] rounded-2xl border border-blue-300/15 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-200">
            {copy.aiAnswer}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-5 flex flex-wrap gap-2">
        {(categories.slice(0, 5).length ? categories.slice(0, 5) : [{ name: "EU Law" }, { name: "Corporate" }, { name: "Criminal" }]).map((category, index) => (
          <Link
            key={category.id ?? index}
            href={category.slug ? `/articles?category=${category.slug}` : "/articles"}
            className="rounded-full border border-blue-300/20 bg-white/[0.07] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-blue-200 transition hover:border-blue-300/50"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function CasesVisual({ copy }: { copy: AnyRecord }) {
  const cases = [
    { title: "US Cases", href: "/cases", meta: "CourtListener concept" },
    { title: "ECHR Cases", href: "/echr-cases", meta: "Human rights archive" },
    { title: "EU Cases", href: "/eu-cases", meta: "Union law research" },
  ];

  return (
    <div className="relative h-full pt-16">
      <div className="rounded-[1.5rem] border border-blue-300/20 bg-white/[0.08] px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
          <Search className="h-4 w-4" />
          {copy.caseSearchLabel}
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {cases.map((item, index) => (
          <Link key={item.title} href={item.href} className="group rounded-[1.6rem] border border-blue-300/20 bg-white/[0.08] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300/50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-300">0{index + 1}</p>
                <h4 className="mt-2 font-serif text-3xl">{item.title}</h4>
                <p className="mt-2 text-sm text-slate-300">{item.meta}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-blue-300 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200">
        <Sparkles className="h-4 w-4" />
        {copy.summarizeCase}
      </div>
    </div>
  );
}

function AuthorsVisual({ authors, copy }: { authors: AnyRecord[]; copy: AnyRecord }) {
  const list = authors.slice(0, 4);

  return (
    <div className="relative h-full pt-16">
      <div className="grid grid-cols-2 gap-4">
        {(list.length ? list : [{ name: "Legal Author" }, { name: "Research Contributor" }, { name: "Case Analyst" }, { name: "Student Writer" }]).map((author, index) => (
          <Link
            key={author.id ?? index}
            href={author.username ? `/authors/${author.username}` : "/authors"}
            className="rounded-[1.6rem] border border-blue-300/20 bg-white/[0.08] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300/50"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-300/25 bg-blue-500/10 font-serif text-2xl text-blue-200">
              {getAuthorName(author, "A").charAt(0).toUpperCase()}
            </div>
            <h4 className="mt-4 line-clamp-1 font-serif text-2xl">{getAuthorName(author, "Contributor")}</h4>
            <p className="mt-2 line-clamp-1 text-xs text-slate-400">{author.affiliation ?? copy.authorFallback}</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-blue-300">{copy.profileBadge}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FeaturedCards({ copy, articles }: { copy: AnyRecord; articles: AnyRecord[] }) {
  const main = articles[0] ?? {};
  const secondary = articles.slice(1, 5);

  return (
    <section className="bg-white py-24 text-slate-950 dark:bg-slate-950 dark:text-white md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 dark:text-blue-300">{copy.featuredEyebrow}</p>
              <h2 className="mt-5 font-serif text-5xl font-semibold leading-none tracking-[-0.04em] md:text-7xl">{copy.featuredTitle}</h2>
            </div>
            <Link href="/articles" className="inline-flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300">
              {copy.exploreArticles}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Link href={getArticleSlug(main)} className="group block min-h-[520px] rounded-[2.5rem] border border-blue-500/20 bg-slate-100 p-8 shadow-[0_30px_120px_rgba(15,23,42,0.10)] transition duration-500 hover:-translate-y-2 hover:border-blue-500/55 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-blue-500/15 pb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
                <span>{main.categoryName ?? copy.articleLabel}</span>
                <BookOpenText className="h-5 w-5" />
              </div>
              <h3 className="mt-12 max-w-2xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-6xl">
                {getArticleTitle(main, copy.emptyArticleA)}
              </h3>
              <p className="mt-8 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                {pickText(main.abstract, copy.articleFallback)}
              </p>
              <span className="mt-10 inline-flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300">
                {copy.readArticle}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>

          <div className="grid gap-5">
            {(secondary.length ? secondary : [{}, {}, {}, {}]).map((article, index) => (
              <Reveal key={article.id ?? index} delay={index * 70}>
                <Link href={getArticleSlug(article)} className="group block rounded-[1.8rem] border border-blue-500/20 bg-slate-50 p-6 transition duration-500 hover:-translate-y-1 hover:border-blue-500/55 dark:bg-slate-900/80">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">{article.categoryName ?? copy.articleLabel}</p>
                  <h3 className="mt-3 line-clamp-2 font-serif text-3xl leading-8">{getArticleTitle(article, copy.emptyArticleB)}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{pickText(article.abstract, copy.articleFallback)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection({ copy, articles, authors, categories, discussions }: { copy: AnyRecord; articles: AnyRecord[]; authors: AnyRecord[]; categories: AnyRecord[]; discussions: AnyRecord[] }) {
  const stats = [
    { value: Math.max(articles.length, 12), label: copy.statArticles },
    { value: Math.max(authors.length, 8), label: copy.statAuthors },
    { value: Math.max(categories.length, 6), label: copy.statTopics },
    { value: Math.max(discussions.length, 10), label: copy.statDiscussions },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-100 py-24 text-slate-950 dark:bg-[#020617] dark:text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.18),transparent_38%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 dark:text-blue-300">{copy.statsEyebrow}</p>
            <h2 className="mt-5 font-serif text-5xl font-semibold leading-none tracking-[-0.04em] md:text-7xl">{copy.statsTitle}</h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80}>
              <div className="rounded-[2rem] border border-blue-500/20 bg-white/70 p-8 text-center shadow-[0_25px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/[0.06]">
                <p className="font-serif text-6xl font-semibold tracking-[-0.05em] text-blue-800 dark:text-blue-200">
                  <AnimatedNumber value={stat.value} />
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterCTA({ copy }: { copy: AnyRecord }) {
  return (
    <section className="bg-white px-5 py-24 text-slate-950 dark:bg-slate-950 dark:text-white md:px-8 md:py-32">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-blue-500/25 bg-slate-950 p-8 text-white shadow-[0_40px_140px_rgba(2,6,23,0.38)] md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.26),transparent_34%),linear-gradient(135deg,rgba(30,64,175,0.18),transparent_50%)]" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
          <div className="absolute inset-y-8 right-0 w-px bg-gradient-to-b from-transparent via-blue-300 to-transparent" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-blue-300">{copy.newsletterEyebrow}</p>
              <h2 className="mt-5 font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.04em] md:text-7xl">{copy.newsletterTitle}</h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">{copy.newsletterBody}</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-300" />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-300">{copy.newsletterPanel}</p>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="/submit" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
                  {copy.submitArticle}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/lexai" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-blue-300/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                  {copy.tryLexAI}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function buildCopy(dictionary: AnyRecord | undefined) {
  const d = dictionary ?? {};
  const home = d.home ?? {};
  const common = d.common ?? {};
  const pages = d.pages ?? {};

  return {
    heroEyebrow: pickText(home.cinematicEyebrow, "Legal knowledge. Structured debate. Research intelligence."),
    heroTitleA: pickText(home.cinematicHeroA, "Law,"),
    heroTitleB: pickText(home.cinematicHeroB, "frame by frame."),
    heroBody: pickText(
      home.cinematicHeroBody,
      "LexAzerbaijan is a premium legal platform for articles, discussions, case-law exploration, author portfolios, and LexAI-powered research assistance.",
    ),
    exploreArticles: pickText(home.exploreArticles ?? common.articles, "Explore Articles"),
    submitArticle: pickText(home.submitArticle ?? common.submitArticle, "Submit Article"),
    tryLexAI: pickText(home.tryLexAI ?? pages.lexAiTitle, "Try LexAI"),
    scroll: pickText(home.scroll, "Scroll"),
    heroStats: [
      { value: "01", label: pickText(common.articles, "Articles"), href: "/articles" },
      { value: "02", label: pickText(common.discussions, "Discussions"), href: "/discussions" },
      { value: "03", label: pickText(common.cases, "Cases"), href: "/cases" },
      { value: "04", label: pickText(common.authors, "Authors"), href: "/authors" },
    ],

    timelineEyebrow: "Motion chapter system",
    timelineTitle: "A legal platform revealed through scroll.",
    timelineBody: "Each frame introduces one layer of the platform with controlled motion, sticky context, and precise visual hierarchy.",
    timelineArticlesTitle: "Publish legal research",
    timelineArticlesBody: "Articles appear as structured legal papers: title, abstract, sources, categories, and editorial visibility.",
    timelineDiscussionsTitle: "Turn legal questions into debate",
    timelineDiscussionsBody: "Discussions are presented as professional legal argument threads, not casual social noise.",
    timelineLexAITitle: "Research with LexAI",
    timelineLexAIBody: "LexAI supports legal concept explanation, article drafting structure, and case summarization previews.",
    timelineCasesTitle: "Explore case-law",
    timelineCasesBody: "US, ECHR, and EU case areas are presented as a searchable legal archive.",
    timelineAuthorsTitle: "Build your legal voice",
    timelineAuthorsBody: "Author profiles turn writing into a visible legal portfolio for contributors.",
    rightPanelLabel: "Sticky detail panel",
    rightPanelBody: "Crossfade follows the active chapter.",
    openDiscussions: "Open Discussions",
    exploreCases: "Explore Cases",
    viewAuthors: "View Authors",

    articleLabel: "Legal article",
    emptyArticleA: "A new legal argument begins here",
    emptyArticleB: "Structured research for modern legal readers",
    emptyArticleC: "Legal notes, cases, and analysis",
    articleFallback: "A concise legal research preview from the LexAzerbaijan archive.",
    readArticle: "Read Article",

    debateA: "Should courts expand digital evidence standards?",
    debateB: "How should private international law classify hybrid claims?",
    debateC: "What makes legal reasoning persuasive?",
    debateFallback: "A professional legal discussion designed for structured argument and reply.",
    discussionLabel: "Legal debate",

    aiQuestion: "Explain choice of law under Article 24 in simple legal structure.",
    aiAnswer: "Start with party autonomy, then test formal validity, mandatory rules, and public policy limits. Apply the selected law only if the choice is valid.",
    caseSearchLabel: "Search across legal archives",
    summarizeCase: "Summarize case with LexAI",
    authorFallback: "Legal contributor",
    profileBadge: "Research Contributor",

    featuredEyebrow: pickText(home.featuredEyebrow, "Featured legal writing"),
    featuredTitle: pickText(home.featuredTitle, "Research that deserves attention."),
    statsEyebrow: "Credibility layer",
    statsTitle: "A platform built for legal visibility.",
    statArticles: "Articles",
    statAuthors: "Authors",
    statTopics: "Topics",
    statDiscussions: "Discussions",

    newsletterEyebrow: "Final frame",
    newsletterTitle: "Write, debate, research, and be discovered.",
    newsletterBody: "Join LexAzerbaijan as a reader, author, researcher, or contributor. Build legal visibility through structured legal writing.",
    newsletterPanel: "Editorial entry point",
  };
}

export function CinematicHomepage(props: CinematicHomepageProps) {
  const copy = buildCopy(props.dictionary);

  const articles = useMemo(
    () => [
      ...safeArray(props.featuredArticles),
      ...safeArray(props.latestArticles),
      ...safeArray(props.articles),
    ].filter(Boolean),
    [props.articles, props.featuredArticles, props.latestArticles],
  );

  const categories = safeArray(props.categories);
  const authors = [...safeArray(props.topAuthors), ...safeArray(props.authors)].filter(Boolean);
  const discussions = safeArray(props.discussions);

  return (
    <main className="min-h-screen overflow-hidden">
      <ScrollProgress />
      <HeroSection copy={copy} articles={articles} />
      <TimelineSection copy={copy} articles={articles} categories={categories} authors={authors} discussions={discussions} />
      <FeaturedCards copy={copy} articles={articles} />
      <StatsSection copy={copy} articles={articles} authors={authors} categories={categories} discussions={discussions} />
      <NewsletterCTA copy={copy} />

      <style jsx global>{`
        @keyframes panelIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.985);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
