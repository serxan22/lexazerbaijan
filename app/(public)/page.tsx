import Link from "next/link";
import { Bot, ArrowRight, BookOpen, CheckCircle2, GraduationCap, Library, PenSquare, ShieldCheck, Sparkles, Users } from "lucide-react";

import { ArticleCard } from "@/components/articles/article-card";
import { AuthorCard } from "@/components/articles/author-card";
import { CategoryCard } from "@/components/articles/category-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { DailyLegalTerms } from "@/components/home/daily-legal-terms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { getArticles, getCategories, getFeaturedArticles, getLatestArticles, getTopAuthors } from "@/lib/data";
import { getDictionary, getLocale } from "@/lib/i18n";

const reasonIcons = [GraduationCap, ShieldCheck, Library];

export default async function HomePage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const [featured, latest, mostRead, mostLiked, categories, authors] = await Promise.all([
    getFeaturedArticles(),
    getLatestArticles(6),
    getArticles({ sort: "most_viewed" }),
    getArticles({ sort: "most_liked" }),
    getCategories(),
    getTopAuthors()
  ]);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-34"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1800&q=80')"
          }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,18,32,0.96),rgba(11,18,32,0.78),rgba(11,18,32,0.28))]" />
        <div className="legal-container grid min-h-[74vh] items-center py-20">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow">{dictionary.home.eyebrow}</p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.04] text-white md:text-7xl">
              {dictionary.home.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              {dictionary.home.subheadline}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="gold" asChild>
                <Link href="/articles">
                  {dictionary.nav.exploreArticles}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-slate-950" asChild>
                <Link href="/submit">
                  {dictionary.nav.submitYourArticle}
                  <PenSquare className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-white py-8">
        <div className="legal-container grid gap-4 md:grid-cols-3">
          {dictionary.home.proof.map(([title, body]) => (
            <div key={title} className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="font-medium text-slate-950">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DailyLegalTerms
        dictionary={dictionary}
        locale={locale}
      />

      <section className="section-shell bg-slate-50">
        <div className="legal-container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">{dictionary.home.featuredEyebrow}</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-950">{dictionary.home.featuredTitle}</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/articles">{dictionary.nav.exploreArticles}</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featured.map((article) => (
              <ArticleCard key={article.id} article={article} featured dictionary={dictionary} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="legal-container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">{dictionary.home.latestEyebrow}</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-950">{dictionary.home.latestTitle}</h2>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.id} article={article} dictionary={dictionary} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-slate-50">
        <div className="legal-container">
          <div className="max-w-2xl">
            <p className="eyebrow">Recommended reading</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-950">
              Popular with readers
            </h2>
            <p className="mt-4 text-slate-600">
              Discover the most read and most liked legal analysis on LexAzerbaijan.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-slate-950">
                Most read
              </h3>
              <div className="mt-5 grid gap-5">
                {mostRead.slice(0, 3).map((article) => (
                  <ArticleCard key={article.id} article={article} dictionary={dictionary} locale={locale} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-semibold text-slate-950">
                Most liked
              </h3>
              <div className="mt-5 grid gap-5">
                {mostLiked.slice(0, 3).map((article) => (
                  <ArticleCard key={article.id} article={article} dictionary={dictionary} locale={locale} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <section className="section-shell bg-slate-50">
        <div className="legal-container">
          <div className="max-w-2xl">
            <p className="eyebrow">{dictionary.home.categoriesEyebrow}</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-950">{dictionary.home.categoriesTitle}</h2>
            <p className="mt-4 text-slate-600">
              {dictionary.home.categoriesBody}
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...categories]
              .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
              .slice(0, 8)
              .map((category) => (
              <CategoryCard key={category.id} category={category} dictionary={dictionary} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="legal-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">{dictionary.home.whyEyebrow}</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-950">
              {dictionary.home.whyTitle}
            </h2>
            <p className="mt-5 text-slate-600">
              {dictionary.home.whyBody}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {dictionary.home.whyCards.map(([title, body], index) => {
              const Icon = reasonIcons[index] ?? Library;
              return (
              <Card key={title}>
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-blue-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-semibold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell bg-slate-50">
        <div className="legal-container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">{dictionary.home.topAuthorsEyebrow}</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-950">{dictionary.home.topAuthorsTitle}</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/authors">{dictionary.home.viewAuthors}</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {authors.slice(0, 3).map((author) => (
              <AuthorCard key={author.id} author={author} dictionary={dictionary} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="legal-container">
          <div className="grid gap-8 rounded-lg border bg-slate-950 p-8 text-white shadow-soft md:grid-cols-[1fr_0.9fr] md:p-10">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-gold">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-serif text-3xl font-semibold">{dictionary.home.newsletterTitle}</h2>
              <p className="mt-3 max-w-xl text-slate-300">
                {dictionary.home.newsletterBody}
              </p>
            </div>
            <div className="self-center">
              <NewsletterForm dictionary={dictionary} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
