"use client";

import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EuCasesSearch() {
  const [query, setQuery] = useState("");

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = query.trim();

    if (!value) return;

    const url = `https://infocuria.curia.europa.eu/search?text=${encodeURIComponent(value)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search EU cases, e.g. Van Gend en Loos, Costa v ENEL, Commission v Italy..."
            className="h-12"
          />

          <Button type="submit" variant="gold" className="h-12 md:w-44">
            <Search className="h-4 w-4" />
            Search InfoCuria
          </Button>
        </div>
      </form>

      <div className="rounded-2xl border bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm">
        <p>
          EU case-law is searched through InfoCuria, the official Court of Justice of the European Union database.
        </p>
        <a
          href="https://infocuria.curia.europa.eu/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
        >
          Open InfoCuria directly
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
