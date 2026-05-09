import type { Metadata } from "next";

import { GlossarySearch } from "@/components/glossary/glossary-search";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.pages.glossaryTitle,
    description: dictionary.pages.glossaryBody
  };
}

export default async function GlossaryPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-12">
        <div className="legal-container">
          <p className="eyebrow">{dictionary.common.glossary}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            {dictionary.pages.glossaryTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            {dictionary.pages.glossaryBody}
          </p>
        </div>
      </section>

      <section className="legal-container py-10">
        <GlossarySearch
          locale={locale}
          placeholder={dictionary.pages.glossarySearchPlaceholder}
          noResults={dictionary.pages.glossaryNoResults}
        />
      </section>
    </div>
  );
}
