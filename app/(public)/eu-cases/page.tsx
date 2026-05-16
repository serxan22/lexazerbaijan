import type { Metadata } from "next";

import { EuCasesSearch } from "@/components/eu-cases/eu-cases-search";

export const metadata: Metadata = {
  title: "EU Cases",
  description: "Search Court of Justice of the European Union case-law."
};

export default function EuCasesPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-10">
        <div className="legal-container">
          <p className="eyebrow">Court of Justice of the European Union</p>

          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            EU Cases
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600">
            Search CJEU and General Court case-law, including Commission infringement cases, preliminary references, annulment actions, and EU institutional disputes.
          </p>
        </div>
      </section>

      <section className="legal-container py-8">
        <EuCasesSearch />
      </section>
    </div>
  );
}
