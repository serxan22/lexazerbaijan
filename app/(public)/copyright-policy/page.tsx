import type { Metadata } from "next";

import { getDictionary, getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Copyright Policy",
  description: "LexAzerbaijan copyright policy."
};

export default async function CopyrightPolicyPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-10">
        <div className="legal-container">
          <p className="eyebrow">{dictionary.pages.policyEyebrow}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            {dictionary.pages.copyrightTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            {dictionary.pages.copyrightIntro}
          </p>
        </div>
      </section>

      <article className="legal-container prose prose-slate max-w-4xl py-10">
        <h2>{dictionary.pages.copyrightOwnershipTitle}</h2>
        <p>{dictionary.pages.copyrightOwnershipBody}</p>

        <h2>{dictionary.pages.copyrightResponsibilitiesTitle}</h2>
        <p>{dictionary.pages.copyrightResponsibilitiesBody}</p>

        <h2>{dictionary.pages.copyrightProhibitedTitle}</h2>
        <p>{dictionary.pages.copyrightProhibitedBody}</p>

        <h2>{dictionary.pages.copyrightComplaintsTitle}</h2>
        <p>{dictionary.pages.copyrightComplaintsBody}</p>
      </article>
    </div>
  );
}
