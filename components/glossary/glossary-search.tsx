"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import type { Locale } from "@/lib/i18n-config";
import { legalTerms } from "@/lib/legal-terms";
import { Input } from "@/components/ui/input";

type Props = {
  locale: Locale;
  placeholder: string;
  noResults: string;
};

export function GlossarySearch({ locale, placeholder, noResults }: Props) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return legalTerms;

    return legalTerms.filter((item) =>
      `${item.term[locale]} ${item.term.en} ${item.definition[locale]} ${item.definition.en}`
        .toLowerCase()
        .includes(value)
    );
  }, [query, locale]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className="h-12 pl-11"
          />
        </label>
      </div>

      {results.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <article
              key={item.term.en}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                Legal term
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-slate-950">
                {item.term[locale]}
              </h2>
              {item.term[locale] !== item.term.en ? (
                <p className="mt-1 text-sm text-slate-400">{item.term.en}</p>
              ) : null}
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.definition[locale]}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed bg-white p-10 text-center text-sm text-slate-500">
          {noResults}
        </div>
      )}
    </div>
  );
}
