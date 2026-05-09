import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Cases",
  description: "Explore selected international and comparative case-law sources."
};

const caseSources = [
  {
    title: "US Cases",
    description:
      "Search American federal and state case-law through CourtListener and Free Law Project resources.",
    href: "https://www.courtlistener.com/",
    tag: "CourtListener"
  },
  {
    title: "ECHR Cases",
    description:
      "Explore European Court of Human Rights judgments, decisions and legal summaries through HUDOC.",
    href: "https://hudoc.echr.coe.int/",
    tag: "HUDOC"
  },
  {
    title: "EU Cases",
    description:
      "Find Court of Justice of the European Union case-law through InfoCuria.",
    href: "https://curia.europa.eu/juris/recherche.jsf",
    tag: "InfoCuria"
  }
];

export default function CasesPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-10">
        <div className="legal-container">
          <p className="eyebrow">Case-law research</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            Cases
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Access reliable foreign and comparative case-law sources for legal research, study notes, and article preparation.
          </p>
        </div>
      </section>

      <section className="legal-container grid gap-5 py-8 md:grid-cols-3">
        {caseSources.map((source) => (
          <Link
            key={source.title}
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="rounded-xl bg-slate-100 p-3">
                <Scale className="h-5 w-5 text-slate-700" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:text-slate-900" />
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              {source.tag}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950">
              {source.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {source.description}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
