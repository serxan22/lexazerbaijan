import type { Metadata } from "next";
import Link from "next/link";
import { Bookmark } from "lucide-react";

import { ArticleCard } from "@/components/articles/article-card";
import { Button } from "@/components/ui/button";
import { requireProfile } from "@/lib/auth";
import { getUserBookmarkedArticles } from "@/lib/data";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary(await getLocale());
  return {
    title: dictionary.dashboard.savedArticles
  };
}

export default async function BookmarksPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  const { user } = await requireProfile("/dashboard/bookmarks");

  const articles = await getUserBookmarkedArticles(user.id);

  return (
    <div className="premium-page min-h-screen">
      <section className="premium-hero">
        <div className="premium-hero-inner flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold text-slate-950">
              {dictionary.dashboard.savedArticles}
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              {dictionary.dashboard.savedArticlesBody}
            </p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/dashboard">
              {dictionary.dashboard.backToDashboard}
            </Link>
          </Button>
        </div>
      </section>

      <section className="legal-container py-8">
        {articles.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                dictionary={dictionary}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed bg-card/80 p-10 text-center">
            <Bookmark className="mx-auto h-10 w-10 text-slate-400" />
            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              {dictionary.dashboard.noSavedArticles}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {dictionary.dashboard.noSavedArticlesBody}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
