import type { Metadata } from "next";

import { ArticleForm } from "@/components/forms/article-form";
import { requireProfile } from "@/lib/auth";
import { getCategories } from "@/lib/data";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.nav.submitArticle,
    description: dictionary.pages.submitBody
  };
}

export const dynamic = "force-dynamic";

export default async function SubmitArticlePage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  await requireProfile("/submit");
  const categories = await getCategories();

  return (
    <div className="premium-page">
      <section className="premium-hero">
        <div className="premium-hero-inner">
          <p className="eyebrow">{dictionary.nav.submitArticle}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950 dark:text-white">{dictionary.pages.submitTitle}</h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            {dictionary.pages.submitBody}
          </p>
        </div>
      </section>
      <section className="legal-container py-8">
        <ArticleForm categories={categories} dictionary={dictionary} defaults={{ language: locale }} />
      </section>
    </div>
  );
}
