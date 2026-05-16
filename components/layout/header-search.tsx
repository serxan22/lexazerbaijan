"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Clock, Loader2, Search, Sparkles, X } from "lucide-react";

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
  searchingLabel: string;
  recentLabel: string;
  popularLabel: string;
};

const POPULAR_SEARCHES = [
  "AI criminal liability",
  "Human rights",
  "ECHR Article 6",
  "Constitutional law",
  "Negligence",
  "Corporate law"
];

export function HeaderSearch({ placeholder, noResults, searchingLabel, recentLabel, popularLabel }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const showSuggestions = open && expanded && query.trim().length < 2;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("lex-recent-searches") || "[]");
      if (Array.isArray(saved)) setRecent(saved.slice(0, 5));
    } catch {
      setRecent([]);
    }
  }, []);

  function saveRecentSearch(value: string) {
    const clean = value.trim();
    if (clean.length < 2) return;

    const next = [clean, ...recent.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 5);

    setRecent(next);
    localStorage.setItem("lex-recent-searches", JSON.stringify(next));
  }

  function handleSuggestion(value: string) {
    setQuery(value);
    saveRecentSearch(value);
    setOpen(true);
    setExpanded(true);
  }

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
      onMouseEnter={() => {
        setExpanded(true);
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (!query.trim()) {
          setExpanded(false);
          setOpen(false);
        }
      }}
      className={`relative transition-all duration-500 ease-out ${expanded ? "w-[280px]" : "w-11"}`}
    >
      <div
        className={`flex h-11 items-center gap-2 rounded-full border bg-background/70 px-3 shadow-sm backdrop-blur-xl transition dark:bg-slate-950/70 ${
          expanded ? "border-gold/35" : "justify-center border-border/70"
        }`}
      >
        <Search className="h-4 w-4 shrink-0 text-slate-600 dark:text-slate-200" />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            setExpanded(true);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && query.trim()) {
              saveRecentSearch(query);
            }
          }}
          placeholder={placeholder}
          className={`h-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 transition-all duration-300 dark:text-white dark:placeholder:text-slate-500 ${
            expanded ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />

        {expanded && query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setOpen(true);
            }}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {open && expanded ? (
        <div className="absolute right-0 top-14 z-50 w-[390px] overflow-hidden rounded-lg border border-border/80 bg-card/95 shadow-xl backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/95">
          {showSuggestions ? (
            <div className="p-4">
              {recent.length ? (
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    {recentLabel}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {recent.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSuggestion(item)}
                        className="rounded-full border px-3 py-1.5 text-xs text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className={recent.length ? "mt-5" : ""}>
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  {popularLabel}
                </p>

                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSuggestion(item)}
                      className="rounded-full border px-3 py-1.5 text-xs text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : loading ? (
            <div className="flex items-center gap-2 p-4 text-sm text-slate-500 dark:text-slate-300">
              <Loader2 className="h-4 w-4 animate-spin" />
              {searchingLabel}
            </div>
          ) : results.length ? (
            <div className="max-h-[420px] overflow-y-auto p-2">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/articles/${item.slug}`}
                  onClick={() => {
                    saveRecentSearch(query);
                    setOpen(false);
                    setExpanded(false);
                  }}
                  className="block rounded-xl p-3 transition hover:bg-slate-50 dark:hover:bg-slate-900"
                >
                  {item.category ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
                      {item.category}
                    </p>
                  ) : null}

                  <p className="mt-1 font-serif text-lg font-semibold text-slate-950 dark:text-white">
                    {item.title}
                  </p>

                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.abstract}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-slate-500 dark:text-slate-300">
              {noResults}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
