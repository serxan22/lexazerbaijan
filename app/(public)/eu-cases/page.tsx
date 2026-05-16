import type { Metadata } from "next";

import { EuCasesSearch } from "@/components/eu-cases/eu-cases-search";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary(await getLocale());
  return {
    title: dictionary.nav.euCases,
    description: dictionary.pages.euCasesBody
  };
}

export default async function EuCasesPage() {
  const dictionary = await getDictionary(await getLocale());

  return (
    <div className="premium-page">
      <section className="premium-hero">
        <div className="premium-hero-inner">
          <p className="eyebrow">{dictionary.nav.euCases}</p>

          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950 dark:text-white">
            {dictionary.nav.euCases}
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            {dictionary.pages.euCasesBody}
          </p>
        </div>
      </section>

      <section className="legal-container py-8">
        <EuCasesSearch dictionary={dictionary} />
      </section>
    </div>
  );
}
