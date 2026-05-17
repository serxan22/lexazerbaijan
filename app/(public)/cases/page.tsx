import type { Metadata } from "next";

import { CasesSearch } from "@/components/cases/cases-search";

export const metadata: Metadata = {
  title: "Cases",
  description: "Search case-law inside LexAzerbaijan."
};

export default function CasesPage() {
  return (
    <div className="premium-page">
      <section className="premium-hero py-10">
        <div className="legal-container">
          <p className="eyebrow">Case-law research</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            Cases
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Search selected case-law sources directly inside LexAzerbaijan. Current search is powered by CourtListener for US case-law.
          </p>
        </div>
      </section>

      <section className="legal-container py-8">
        <CasesSearch />
      </section>
    </div>
  );
}
