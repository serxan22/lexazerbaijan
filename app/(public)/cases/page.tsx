import type { Metadata } from "next";

import { CasesSearch } from "@/components/cases/cases-search";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary(await getLocale());
  return {
    title: dictionary.pages.casesTitle,
    description: dictionary.pages.casesBody
  };
}

export default async function CasesPage() {
  const dictionary = await getDictionary(await getLocale());

  return (
    <div className="premium-page">
      <section className="premium-hero">
        <div className="premium-hero-inner">
          <p className="eyebrow">{dictionary.pages.casesEyebrow}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950 dark:text-white">
            {dictionary.pages.casesTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            {dictionary.pages.casesBody}
          </p>
        </div>
      </section>

      <section className="legal-container py-8">
        <CasesSearch dictionary={dictionary} />
      </section>
    </div>
  );
}
