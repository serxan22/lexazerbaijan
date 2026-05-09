import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";

import { legalTerms } from "@/lib/legal-terms";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
};

export function DailyLegalTerms({
  dictionary,
  locale
}: Props) {
  const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

  const selected = [
    legalTerms[daySeed % legalTerms.length],
    legalTerms[(daySeed + 2) % legalTerms.length],
    legalTerms[(daySeed + 4) % legalTerms.length]
  ];

  return (
    <section className="section-shell bg-white">
      <div className="legal-container">
        <div className="max-w-2xl">
          <p className="eyebrow">
            {dictionary.home.dailyTermsEyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-950">
            {dictionary.home.dailyTermsTitle}
          </h2>

          <p className="mt-4 text-slate-600">
            {dictionary.home.dailyTermsBody}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {selected.map((item) => (
            <div
              key={item.term.en}
              className="rounded-2xl border bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-sm"
            >
              <h3 className="font-serif text-2xl font-semibold text-slate-950">
                {item.term[locale]}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.definition[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
