import type { Metadata } from "next";

import { LexAiForm } from "@/components/lexai/lexai-form";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.pages.lexAiTitle,
    description: dictionary.pages.lexAiBody
  };
}

export default async function LexAiPage() {
  const dictionary = await getDictionary(await getLocale());

  return (
    <div className="premium-page">
      <section className="premium-hero">
        <div className="premium-hero-inner">
          <p className="eyebrow">{dictionary.pages.lexAiEyebrow}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950 dark:text-white">
            {dictionary.pages.lexAiTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            {dictionary.pages.lexAiBody}
          </p>
        </div>
      </section>

      <section className="legal-container py-8">
        <LexAiForm dictionary={dictionary} />
      </section>
    </div>
  );
}
