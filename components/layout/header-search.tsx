"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
};

const POPULAR_SEARCHES = [
  "AI criminal liability",
  "Human rights",
  "ECHR Article 6",
  "Constitutional law",
  "Negligence",
  "Corporate law"
];

export function HeaderSearch({ placeholder, noResults }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const clearSearchTimers = useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openSearchSmoothly = useCallback(() => {
    clearSearchTimers();

    setClosing(false);
    setExpanded(true);

    openTimerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, 180);
  }, [clearSearchTimers]);

  const closeSearchSmoothly = useCallback(({ force = false }: { force?: boolean } = {}) => {
    clearSearchTimers();

    if (!force && query.trim()) return;
    const activeElement = document.activeElement;
    if (!force && activeElement && wrapperRef.current?.contains(activeElement)) return;

    setClosing(true);

    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      setExpanded(false);
      setClosing(false);
    }, 380);
  }, [clearSearchTimers, query]);

  const closeSearchImmediately = useCallback(() => {
    clearSearchTimers();
    setClosing(false);
    setOpen(false);
    setExpanded(false);
  }, [clearSearchTimers]);

  const renderPanel = expanded && (open || closing);
  const showSuggestions = renderPanel && query.trim().length < 2;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("lex-recent-searches") || "[]");
      if (Array.isArray(saved)) setRecent(saved.slice(0, 5));
    } catch {
      setRecent([]);
    }
  }, []);

  useEffect(() => {
    return () => clearSearchTimers();
  }, [clearSearchTimers]);

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
    setClosing(false);
    setOpen(true);
    setExpanded(true);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        closeSearchSmoothly({ force: true });
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [closeSearchSmoothly]);

  useEffect(() => {
    const value = query.trim();

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const timer = window.setTimeout(async () => {
      setLoading(true);
      setClosing(false);
      setExpanded(true);
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
      onMouseEnter={openSearchSmoothly}
      onMouseLeave={() => closeSearchSmoothly()}
      className={`header-search-shell relative ${expanded ? "w-[260px]" : "w-11"}`}
    >
      <div
        className={`header-search-control flex h-11 items-center gap-2 rounded-xl border px-3 ${
          expanded ? "border-[#b8894a]/70 dark:border-[#b8894a]/35" : "justify-center border-[#d9c79f]/70 dark:border-[#b8894a]/25"
        }`}
      >
        <Search className="h-4 w-4 shrink-0 text-slate-600 dark:text-slate-200" />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            openSearchSmoothly();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && query.trim()) {
              saveRecentSearch(query);
            }

            if (event.key === "Escape") {
              closeSearchSmoothly({ force: true });
            }
          }}
          placeholder={placeholder}
          className={`header-search-input h-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500 ${
            expanded ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />

        {expanded && query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              openSearchSmoothly();
            }}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {renderPanel ? (
        <div
          className={`search-panel-smooth absolute right-0 top-14 z-50 w-[390px] overflow-hidden rounded-2xl ${
            closing ? "search-panel-closing" : ""
          }`}
        >
          {showSuggestions ? (
            <div className="p-4">
              {recent.length ? (
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    Recently searched
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {recent.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSuggestion(item)}
                        className="rounded-full border border-[#d9c79f]/70 px-3 py-1.5 text-xs text-slate-700 transition hover:bg-[#f5efe5] dark:border-[#b8894a]/20 dark:text-slate-200 dark:hover:bg-[#172033]"
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
                  Popular searches
                </p>

                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSuggestion(item)}
                      className="rounded-full border border-[#d9c79f]/70 px-3 py-1.5 text-xs text-slate-700 transition hover:bg-[#f5efe5] dark:border-[#b8894a]/20 dark:text-slate-200 dark:hover:bg-[#172033]"
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
              Searching...
            </div>
          ) : results.length ? (
            <div className="max-h-[420px] overflow-y-auto p-2">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/articles/${item.slug}`}
                  onClick={() => {
                    saveRecentSearch(query);
                    closeSearchImmediately();
                  }}
                  className="block rounded-xl p-3 transition hover:bg-[#f5efe5] dark:hover:bg-[#172033]"
                >
                  {item.category ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a612f] dark:text-[#f1d79d]">
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
