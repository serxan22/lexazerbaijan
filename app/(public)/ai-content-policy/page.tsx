import type { Metadata } from "next";

import { getDictionary, getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "AI Content Policy",
  description: "LexAzerbaijan AI content policy."
};

export default async function AiContentPolicyPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-10">
        <div className="legal-container">
          <p className="eyebrow">{dictionary.pages.policyEyebrow}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            {dictionary.pages.aiTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            {dictionary.pages.aiIntro}
          </p>
        </div>
      </section>

      <article className="legal-container prose prose-slate max-w-4xl py-10">
        <h2>{dictionary.pages.aiPurposeTitle}</h2>
        <p>{dictionary.pages.aiPurposeBody}</p>

        <h2>{dictionary.pages.aiResponsibilityTitle}</h2>
        <p>{dictionary.pages.aiResponsibilityBody}</p>

        <h2>{dictionary.pages.aiProhibitedTitle}</h2>
        <p>{dictionary.pages.aiProhibitedBody}</p>

        <h2>{dictionary.pages.aiDisclaimerTitle}</h2>
        <p>{dictionary.pages.aiDisclaimerBody}</p>
      </article>
    </div>
  );
}
