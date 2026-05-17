import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ExternalLink, Eye, Heart, Linkedin, MapPin } from "lucide-react";

import { ArticleCard } from "@/components/articles/article-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAuthorArticles, getAuthorByUsername } from "@/lib/data";
import { getDictionary, getLocale } from "@/lib/i18n";
import { formatNumber, initials } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const author = await getAuthorByUsername(params.username);
  if (!author) return { title: dictionary.empty.pageTitle };
  return {
    title: author.fullName,
    description: author.bio ?? `${author.fullName} on LexAzerbaijan.`
  };
}

export default async function AuthorProfilePage({ params }: { params: { username: string } }) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const author = await getAuthorByUsername(params.username);
  if (!author) notFound();

  const articles = await getAuthorArticles(author.id);

  return (
    <div className="premium-page">
      <section className="premium-hero py-14">
        <div className="legal-container grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-6 md:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={author.avatarUrl ?? undefined} alt={author.fullName} />
              <AvatarFallback className="text-2xl">{initials(author.fullName)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="eyebrow">{dictionary.nav.publicProfile}</p>
              <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">{author.fullName}
              {author.verifiedWriter ? (
                <span
                  title="Verified Writer"
                  className="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#b8894a] text-sm font-bold text-white shadow-sm"
                >
                  ✓
                </span>
              ) : null}</h1>
              <p className="mt-3 flex flex-wrap items-center gap-2 text-slate-500">
                <MapPin className="h-4 w-4" />
                {author.workplace ?? author.university ?? dictionary.site.legalCommunity}
              </p>
              {author.bio ? <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{author.bio}</p> : null}
              <div className="mt-5 flex flex-wrap gap-2">
                {author.interests.map((interest) => (
                  <Badge key={interest} variant="blue">
                    {interest}
                  </Badge>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {author.socialLinks.linkedin ? (
                  <Button variant="outline" asChild>
                    <Link href={author.socialLinks.linkedin} target="_blank">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Link>
                  </Button>
                ) : null}
                {author.socialLinks.website ? (
                  <Button variant="outline" asChild>
                    <Link href={author.socialLinks.website} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                      {dictionary.forms.website}
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
          <Card className="self-start">
            <CardContent className="grid grid-cols-3 gap-4 p-6 text-center">
              <div>
                <BookOpen className="mx-auto h-5 w-5 text-gold" />
                <p className="mt-2 text-2xl font-semibold text-slate-950">{formatNumber(author.publishedCount, locale)}</p>
                <p className="text-xs text-slate-500">{dictionary.common.articles}</p>
              </div>
              <div>
                <Eye className="mx-auto h-5 w-5 text-gold" />
                <p className="mt-2 text-2xl font-semibold text-slate-950">{formatNumber(author.totalViews, locale)}</p>
                <p className="text-xs text-slate-500">{dictionary.common.views}</p>
              </div>
              <div>
                <Heart className="mx-auto h-5 w-5 text-gold" />
                <p className="mt-2 text-2xl font-semibold text-slate-950">{formatNumber(author.totalLikes, locale)}</p>
                <p className="text-xs text-slate-500">{dictionary.common.likes}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="legal-container py-10">
        <h2 className="font-serif text-3xl font-semibold text-slate-950">{dictionary.common.published} {dictionary.common.articles}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} dictionary={dictionary} locale={locale} />
          ))}
        </div>
        {!articles.length ? (
          <div className="premium-surface mt-8 border-dashed p-10 text-center text-slate-500 dark:text-slate-400">
            {dictionary.pages.noArticlesTitle}
          </div>
        ) : null}
      </section>
    </div>
  );
}
