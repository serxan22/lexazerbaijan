import type { Metadata } from "next";

import { EchrCasesSearch } from "@/components/echr-cases/echr-cases-search";

export const metadata: Metadata = {
  title: "ECHR Cases",
  description: "Search European Court of Human Rights case-law inside LexAzerbaijan."
};

export default function EchrCasesPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-10">
        <div className="legal-container">
          <p className="eyebrow">European Court of Human Rights</p>

          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            ECHR Cases
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600">
            Search European Court of Human Rights judgments and decisions directly inside LexAzerbaijan. Results are powered by HUDOC, the official ECHR case-law database.
          </p>
        </div>
      </section>

      <section className="legal-container py-8">
        <EchrCasesSearch />
      </section>
    </div>
  );
}
