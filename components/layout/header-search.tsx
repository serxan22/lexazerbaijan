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
  const [expanded, setExpanded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
        if (!query) setExpanded(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [query]);

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
    <div
      ref={wrapperRef}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        if (!query.trim()) {
          setExpanded(false);
          setOpen(false);
        }
      }}
      className={`relative transition-all duration-300 ${
        expanded ? "w-[300px]" : "w-12"
      }`}
    >
      <div
        className={`flex h-12 items-center gap-2 rounded-xl border bg-white px-4 shadow-sm transition ${
          expanded ? "border-slate-300" : "justify-center border-slate-200"
        }`}
      >
        <Search className="h-4 w-4 shrink-0 text-slate-600" />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            setExpanded(true);
            if (query.trim().length >= 2) setOpen(true);
          }}
          placeholder={placeholder}
          className={`h-full bg-transparent text-sm outline-none placeholder:text-slate-400 transition-all duration-300 ${
            expanded ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />

        {expanded && query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setOpen(false);
              setExpanded(false);
            }}
            className="text-slate-400 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {open && expanded ? (
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
                  onClick={() => {
                    setOpen(false);
                    setExpanded(false);
                  }}
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
