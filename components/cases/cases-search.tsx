"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CaseResult = {
  id: number | string;
  caseName: string;
  court: string;
  dateFiled: string | null;
  snippet: string;
  absoluteUrl: string;
};

export function CasesSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CaseResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (query.trim().length < 2) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/cases?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      setResults(data.results ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search US cases, e.g. freedom of speech, due process, Miranda..."
            className="h-12"
          />
          <Button type="submit" variant="gold" className="h-12 md:w-40" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Search
          </Button>
        </div>
      </form>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="space-y-4">
        {results.map((item) => (
          <article key={item.id} className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  {item.court}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950">
                  {item.caseName}
                </h2>
                {item.dateFiled ? (
                  <p className="mt-1 text-sm text-slate-500">
                    Date filed: {item.dateFiled}
                  </p>
                ) : null}
              </div>

              <Button variant="outline" asChild>
                <Link href={item.absoluteUrl} target="_blank" rel="noreferrer">
                  Official source
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {item.snippet ? (
              <p
                className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600"
                dangerouslySetInnerHTML={{ __html: item.snippet }}
              />
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
