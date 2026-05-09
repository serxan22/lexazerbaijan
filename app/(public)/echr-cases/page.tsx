import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "ECHR Cases",
  description: "European Court of Human Rights case-law."
};

const echrExamples = [
  {
    title: "Handyside v. United Kingdom",
    year: "1976",
    topic: "Freedom of expression",
    href: "https://hudoc.echr.coe.int/"
  },
  {
    title: "Osman v. United Kingdom",
    year: "1998",
    topic: "Right to life",
    href: "https://hudoc.echr.coe.int/"
  },
  {
    title: "Soering v. United Kingdom",
    year: "1989",
    topic: "Extradition and human rights",
    href: "https://hudoc.echr.coe.int/"
  }
];

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
            Explore landmark European human rights judgments and decisions.
          </p>
        </div>
      </section>

      <section className="legal-container grid gap-5 py-8">
        {echrExamples.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  <Scale className="h-4 w-4" />
                  {item.topic}
                </div>

                <h2 className="mt-3 font-serif text-3xl font-semibold text-slate-950">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Judgment year: {item.year}
                </p>
              </div>

              <Link
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
              >
                Official source
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
