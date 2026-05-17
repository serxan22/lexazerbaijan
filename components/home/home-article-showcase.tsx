"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Eye, Heart, Timer } from "lucide-react";

import { HomeReveal, homeEase, useHomeMotion } from "@/components/home/home-motion";
import type { ArticleCardItem } from "@/lib/content-types";
import type { Dictionary } from "@/lib/i18n";

export type HomeArticleItem = ArticleCardItem & {
  displayDate: string;
  displayViews: string;
  displayLikes: string;
};

type HomeArticleShowcaseProps = {
  articles: HomeArticleItem[];
  copy: Dictionary["home"]["premium"];
};

export function HomeArticleShowcase({ articles, copy }: HomeArticleShowcaseProps) {
  const { canAnimate } = useHomeMotion();

  return (
    <section className="relative px-5 py-20 md:py-28">
      <div className="legal-container">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <HomeReveal y={32} mobileY={18}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a77738] dark:text-[#d6b574]">
                {copy.articlesEyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] text-[#111827] dark:text-white md:text-6xl">
                {copy.articlesTitle}
              </h2>
            </div>
          </HomeReveal>
          <HomeReveal className="lg:justify-self-end" delay={0.08} y={28} mobileY={18}>
            <div>
              <p className="max-w-2xl text-base leading-8 text-[#5f6877] dark:text-[#cbd5e1]">
                {copy.articlesLead}
              </p>
              <Link
                href="/articles"
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#c7aa73] bg-[#fff8e8]/80 px-5 text-sm font-semibold text-[#5d421f] hover:border-[#b8894a] hover:bg-[#fff3d4] dark:border-[#b8894a]/30 dark:bg-[#0b1728] dark:text-[#f1d79d] dark:hover:bg-[#111f34]"
              >
                {copy.ctas.viewAllArticles}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </HomeReveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article, index) => (
            <HomeReveal
              key={article.id}
              delay={Math.min(index * 0.06, 0.24)}
              duration={0.62}
              y={28}
              mobileY={16}
              blur={0}
              mobileBlur={0}
              hiddenOpacity={0.92}
              mobileHiddenOpacity={0.95}
              scale={0.995}
              mobileScale={0.998}
            >
              <motion.article
                whileHover={canAnimate ? { y: -7 } : undefined}
                transition={{ duration: 0.28, ease: homeEase }}
                className="group relative h-full overflow-hidden rounded-lg border border-[#d9c79f]/70 bg-[#fffdf8]/90 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-[#b8894a]/20 dark:bg-[#07111f]/90 dark:shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
              >
              <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-lg border border-[#b8894a]/70 shadow-[0_0_42px_rgba(184,137,74,0.22)]" />
              </div>

              <Link href={`/articles/${article.slug}`} aria-label={article.title} className="relative block">
                <div className="relative aspect-[1.75] overflow-hidden bg-[#101a2b]">
                  {article.coverImageUrl ? (
                    <Image
                      src={article.coverImageUrl}
                      alt={article.title}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover opacity-[0.92] saturate-[0.92] transition duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#081120,#20365c)] text-[#f1d79d]">
                      <BookOpen className="h-10 w-10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,22,0.04),rgba(4,10,22,0.58))]" />
                  <span className="absolute left-4 top-4 rounded-full border border-[#f1d79d]/50 bg-[#06101d]/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#f1d79d] backdrop-blur">
                    {article.category?.name ?? copy.articlesLabel}
                  </span>
                </div>
              </Link>

              <div className="relative flex min-h-[320px] flex-col p-5">
                <div className="flex items-center justify-between gap-3 text-xs text-[#7a8391] dark:text-[#aab6c8]">
                  <span>{article.displayDate}</span>
                  <span className="inline-flex items-center gap-1">
                    <Timer className="h-3.5 w-3.5" />
                    {article.readingTime}
                  </span>
                </div>

                <Link href={`/articles/${article.slug}`} className="mt-4 block">
                  <h3 className="font-serif text-2xl font-semibold leading-tight text-[#111827] dark:text-white">
                    {article.title}
                  </h3>
                  {article.subtitle ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#687385] dark:text-[#b8c2d0]">
                      {article.subtitle}
                    </p>
                  ) : null}
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#4e5969] dark:text-[#cbd5e1]">
                    {article.abstract}
                  </p>
                </Link>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#d9c79f]/60 pt-4 dark:border-[#b8894a]/20">
                  <Link
                    href={`/authors/${article.author.username}`}
                    className="min-w-0 text-sm font-semibold text-[#243044] hover:text-[#8a612f] dark:text-[#eef4ff] dark:hover:text-[#f1d79d]"
                  >
                    <span className="block truncate">{article.author.fullName}</span>
                    <span className="block text-xs font-normal text-[#7a8391] dark:text-[#aab6c8]">
                      {article.language.toUpperCase()}
                    </span>
                  </Link>
                  <div className="flex shrink-0 items-center gap-3 text-xs text-[#6b7280] dark:text-[#b8c2d0]">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {article.displayViews}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5" />
                      {article.displayLikes}
                    </span>
                  </div>
                </div>
              </div>
              </motion.article>
            </HomeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
