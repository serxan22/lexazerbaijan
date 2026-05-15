import { ArticleAudioPlayer } from "@/components/articles/article-audio-player";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Eye, Heart, Timer } from "lucide-react";

import { ArticleActions } from "@/components/articles/article-actions";
import { CitationGenerator } from "@/components/articles/citation-generator";
import { ArticleCard } from "@/components/articles/article-card";
import { CommentsSection } from "@/components/articles/comments-section";
import { ArticleViewTracker } from "@/components/articles/article-view-tracker";
import { ReadingProgressBar } from "@/components/articles/reading-progress-bar";
import { TableOfContents } from "@/components/articles/table-of-contents";
import { ArticleReferences } from "@/components/articles/article-references";
import { ArticleCardAiButton } from "@/components/articles/article-card-ai-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { Separator } from "@/components/ui/separator";
import { getArticleBySlug } from "@/lib/data";
import { getDictionary, getLocale, localizeCategory } from "@/lib/i18n";
import { sanitizeArticleContent } from "@/lib/sanitize";
import { formatDate, formatNumber, initials } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const article = await getArticleBySlug(params.slug, { incrementViews: false });

  if (!article) {
    return { title: dictionary.article.notFound };
  }

  return {
    title: article.title,
    description: article.abstract,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexazerbaijan.az"}/articles/${article.slug}`
    },
    openGraph: {
      title: article.title,
      description: article.abstract,
      type: "article",
      publishedTime: article.publishedAt ?? undefined,
      authors: [article.author.fullName],
      images: article.coverImageUrl ? [article.coverImageUrl] : undefined
    }
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const article = await getArticleBySlug(params.slug, { incrementViews: false });
  if (!article) notFound();

  const content = sanitizeArticleContent(article.content);
  const category = localizeCategory(article.category, dictionary);
  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexazerbaijan.az"}/articles/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.abstract,
    image: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author.fullName
    },
    publisher: {
      "@type": "Organization",
      name: "LexAzerbaijan"
    },
    mainEntityOfPage: articleUrl
  };

  return (
    <article className="bg-white dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ReadingProgressBar />
      <ArticleViewTracker slug={params.slug} />
      <header className="border-b bg-slate-50">
        <div className="legal-container grid gap-10 py-14 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {category ? <Badge variant="gold">{category.name}</Badge> : null}
              {article.tags?.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="blue">
                  {tag}
                </Badge>
              ))}
              <Badge variant="outline">{dictionary.languages[article.language]}</Badge>
            </div>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-tight text-slate-950 md:text-6xl">
              {article.title}
            </h1>
            {article.subtitle ? <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-600">{article.subtitle}</p> : null}
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <Link href={`/authors/${article.author.username}`} className="flex items-center gap-3 text-slate-800">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={article.author.avatarUrl ?? undefined} alt={article.author.fullName} />
                  <AvatarFallback>{initials(article.author.fullName)}</AvatarFallback>
                </Avatar>
                <span>
                  <span className="flex items-center gap-2 font-medium">
                    {article.author.fullName}
                    {article.author.verifiedWriter ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        🛡️ Verified
                      </span>
                    ) : null}
                  </span>
                  <span className="block text-xs text-slate-500">{article.author.workplace ?? article.author.university ?? dictionary.site.legalAuthor}</span>
                </span>
              </Link>
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {formatDate(article.publishedAt, undefined, locale)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Timer className="h-4 w-4" />
                {article.readingTime} {dictionary.common.minuteShort}
              </span>
              <span className="inline-flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {formatNumber(article.viewsCount, locale)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {formatNumber(article.likesCount, locale)}
              </span>
            </div>
            <div className="mt-8">
              <ArticleActions
                articleId={article.id}
                slug={article.slug}
                title={article.title}
                likesCount={article.likesCount}
                dictionary={dictionary}
                locale={locale}
              />
            </div>
          </div>
          {article.coverImageUrl ? (
            <div className="overflow-hidden rounded-lg border bg-white shadow-soft">
              <Image
                src={article.coverImageUrl}
                alt={`${article.title} article cover`}
                width={900}
                height={720}
                priority
                sizes="(min-width: 1024px) 420px, 100vw"
                className="aspect-[1.25] w-full object-cover"
              />
            </div>
          ) : null}
        </div>
      </header>

      <div className="legal-container grid gap-10 py-12 lg:grid-cols-[1fr_280px]">
        <div className="mx-auto w-full max-w-3xl">
          <div className="rounded-lg border bg-gold-muted p-5 text-sm leading-6 text-slate-700">
            {dictionary.article.disclaimer}
          </div>

          <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
            <ArticleCardAiButton
              slug={article.slug}
              label={dictionary.common.summarizeArticle}
              loadingLabel={dictionary.common.loadingSummary}
              resultTitle={dictionary.common.articleSummary}
            />
          </div>
        <ArticleAudioPlayer
          title={article.title}
          content={article.content ?? ""}
        />


          <div className="article-prose prose prose-slate mt-8 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
          <Separator className="my-12" />

          <ArticleReferences slug={article.slug} />

          <Separator className="my-12" />

          <section className="rounded-lg border bg-slate-50 p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={article.author.avatarUrl ?? undefined} alt={article.author.fullName} />
                <AvatarFallback>{initials(article.author.fullName)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-400">{dictionary.article.aboutAuthor}</p>
                <Link href={`/authors/${article.author.username}`} className="mt-1 block font-serif text-2xl font-semibold text-slate-950">
                  {article.author.fullName}
                </Link>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {article.author.bio ?? dictionary.article.authorFallback}
                </p>
              </div>
            </div>
          </section>
          <CitationGenerator
            title={article.title}
            author={article.author.fullName}
            publishedAt={article.publishedAt}
            url={`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexazerbaijan.az"}/articles/${article.slug}`}
          />

          <CommentsSection articleId={article.id} slug={article.slug} dictionary={dictionary} locale={locale} />
        </div>
        <div>
          <TableOfContents content={content} label={dictionary.article.contents} />
        </div>
      </div>

      {article.related.length ? (
        <section className="section-shell bg-slate-50">
          <div className="legal-container">
            <p className="eyebrow">{dictionary.article.relatedEyebrow}</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-950">{dictionary.article.relatedTitle}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {article.related.map((related) => (
                <ArticleCard key={related.id} article={related} dictionary={dictionary} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
