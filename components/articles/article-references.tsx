"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, FileText, Gavel, Loader2, Sparkles } from "lucide-react";

type References = {
  cases: string[];
  laws: string[];
  conventions: string[];
};

type Props = {
  slug: string;
};

function searchHref(type: "case" | "law" | "convention", value: string) {
  const q = encodeURIComponent(value);

  if (type === "case") return `/cases?q=${q}`;
  if (value.toLowerCase().includes("echr") || value.toLowerCase().includes("european convention")) {
    return `/echr-cases?q=${q}`;
  }

  return `/eu-cases?q=${q}`;
}

export function ArticleReferences({ slug }: Props) {
  const [loading, setLoading] = useState(false);
  const [references, setReferences] = useState<References | null>(null);
  const [error, setError] = useState("");

  async function extractReferences() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/article-tools/extract-references", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ slug })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Extraction failed");
      }

      setReferences(data.references);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Extraction failed");
    } finally {
      setLoading(false);
    }
  }

  const hasResults =
    references &&
    (references.cases.length || references.laws.length || references.conventions.length);

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <p className="eyebrow">Referenced materials</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-slate-950">
            Cases and laws mentioned
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            LexAI can extract cases, laws, treaty provisions, and conventions discussed in this article.
          </p>
        </div>

        <button
          type="button"
          onClick={extractReferences}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Scanning..." : "Find references"}
        </button>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {references && !hasResults ? (
        <div className="mt-5 rounded-xl border bg-slate-50 p-4 text-sm text-slate-600">
          No clear legal references were detected in this article.
        </div>
      ) : null}

      {hasResults ? (
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <ReferenceColumn
            title="Cases"
            icon="case"
            items={references.cases}
            type="case"
          />
          <ReferenceColumn
            title="Laws"
            icon="law"
            items={references.laws}
            type="law"
          />
          <ReferenceColumn
            title="Conventions"
            icon="convention"
            items={references.conventions}
            type="convention"
          />
        </div>
      ) : null}
    </section>
  );
}

function ReferenceColumn({
  title,
  icon,
  items,
  type
}: {
  title: string;
  icon: "case" | "law" | "convention";
  items: string[];
  type: "case" | "law" | "convention";
}) {
  const Icon = icon === "case" ? Gavel : icon === "law" ? FileText : BookOpen;

  return (
    <div className="rounded-xl border bg-slate-50 p-4">
      <div className="flex items-center gap-2 font-semibold text-slate-950">
        <Icon className="h-4 w-4 text-blue-700" />
        {title}
      </div>

      <div className="mt-4 space-y-2">
        {items.length ? (
          items.map((item) => (
            <Link
              key={item}
              href={searchHref(type, item)}
              className="flex items-start justify-between gap-3 rounded-lg bg-white p-3 text-sm leading-6 text-slate-700 transition hover:text-blue-700"
            >
              <span>{item}</span>
              <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" />
            </Link>
          ))
        ) : (
          <p className="text-sm text-slate-500">No items detected.</p>
        )}
      </div>
    </div>
  );
}
