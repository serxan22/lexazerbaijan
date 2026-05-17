import type { Metadata } from "next";

import { getDictionary, getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Author Agreement",
  description: "LexAzerbaijan author submission agreement."
};

export default async function AuthorAgreementPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="premium-page">
      <section className="premium-hero py-10">
        <div className="legal-container">
          <p className="eyebrow">{dictionary.pages.policyEyebrow}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            {dictionary.pages.authorTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            {dictionary.pages.authorIntro}
          </p>
        </div>
      </section>

      <article className="legal-container prose prose-slate max-w-4xl py-10">
        <p>{dictionary.pages.authorBody}</p>
        <ol>
          {dictionary.pages.authorTerms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ol>
      </article>
    </div>
  );
}
