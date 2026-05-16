import type { Metadata } from "next";

import { EchrCasesSearch } from "@/components/echr-cases/echr-cases-search";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary(await getLocale());
  return {
    title: dictionary.nav.echrCases,
    description: dictionary.pages.echrCasesBody
  };
}

export default async function EchrCasesPage() {
  const dictionary = await getDictionary(await getLocale());

  return (
    <div className="premium-page">
      <section className="premium-hero">
        <div className="premium-hero-inner">
          <p className="eyebrow">{dictionary.nav.echrCases}</p>

          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950 dark:text-white">
            {dictionary.nav.echrCases}
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            {dictionary.pages.echrCasesBody}
          </p>
        </div>
      </section>

      <section className="legal-container py-8">
        <EchrCasesSearch dictionary={dictionary} />
      </section>
    </div>
  );
}
