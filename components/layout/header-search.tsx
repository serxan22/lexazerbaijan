"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Loader2, Search, X } from "lucide-react";

type SearchResult = {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  category: string | null;
};

type Props = {
  placeholder: string;
  noResults: string;
};

export function HeaderSearch({ placeholder, noResults }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const value = query.trim();

    if (value.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timer = window.setTimeout(async () => {
      setLoading(true);
      setOpen(true);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
        const data = await response.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [query]);

  return (
    <div ref={wrapperRef} className="relative w-[320px]">
      <div className="flex h-12 items-center gap-2 rounded-xl border bg-white px-4 shadow-sm transition focus-within:border-slate-400">
        <Search className="h-4 w-4 text-slate-500" />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            if (query.trim().length >= 2) setOpen(true);
          }}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setOpen(false);
            }}
            className="text-slate-400 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {open ? (
        <div className="absolute right-0 top-14 z-50 w-[420px] overflow-hidden rounded-2xl border bg-white shadow-xl">
          {loading ? (
            <div className="flex items-center gap-2 p-4 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching...
            </div>
          ) : results.length ? (
            <div className="max-h-[420px] overflow-y-auto p-2">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/articles/${item.slug}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl p-3 transition hover:bg-slate-50"
                >
                  {item.category ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
                      {item.category}
                    </p>
                  ) : null}

                  <p className="mt-1 font-serif text-lg font-semibold text-slate-950">
                    {item.title}
                  </p>

                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
                    {item.abstract}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-slate-500">
              {noResults}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
