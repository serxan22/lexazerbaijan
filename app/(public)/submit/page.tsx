import type { Metadata } from "next";

import { ArticleForm } from "@/components/forms/article-form";
import { requireProfile } from "@/lib/auth";
import { getCategories } from "@/lib/data";
import { getDictionary, getLocale } from "@/lib/i18n";
import { LegalWritingScore } from "@/components/articles/legal-writing-score";

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
      <section className="premium-hero py-12">
        <div className="legal-container">
          <p className="eyebrow">{dictionary.nav.submitArticle}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">{dictionary.pages.submitTitle}</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
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
