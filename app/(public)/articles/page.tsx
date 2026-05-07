import type { Metadata } from "next";

import { ArticleCard } from "@/components/articles/article-card";
import { ArticleFilters } from "@/components/articles/article-filters";
import { getArticles, getCategories } from "@/lib/data";
import { getDictionary, getLocale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n-config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.nav.articles,
    description: dictionary.pages.articlesDescription
  };
}

function param(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ArticlesPage({
  searchParams
}: {
  searchParams: { search?: string | string[]; category?: string | string[]; language?: string | string[]; sort?: string | string[] };
}) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const search = param(searchParams.search);
  const category = param(searchParams.category);
  const languageParam = param(searchParams.language);
  const language = isLocale(languageParam) ? languageParam : undefined;
  const sort = param(searchParams.sort) as "latest" | "most_liked" | "most_viewed" | undefined;
  const [categories, articles] = await Promise.all([
    getCategories(),
    getArticles({ search, category, language, sort: sort ?? "latest" })
  ]);

  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-14">
        <div className="legal-container">
          <p className="eyebrow">{dictionary.nav.articles}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">{dictionary.pages.articlesTitle}</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            {dictionary.pages.articlesBody}
          </p>
        </div>
      </section>
      <section className="legal-container py-8">
        <ArticleFilters categories={categories} search={search} category={category} language={language} sort={sort} dictionary={dictionary} />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} dictionary={dictionary} locale={locale} />
          ))}
        </div>
        {!articles.length ? (
          <div className="mt-8 rounded-lg border border-dashed bg-white p-10 text-center">
            <h2 className="font-serif text-2xl font-semibold text-slate-950">{dictionary.pages.noArticlesTitle}</h2>
            <p className="mt-2 text-slate-500">{dictionary.pages.noArticlesBody}</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
