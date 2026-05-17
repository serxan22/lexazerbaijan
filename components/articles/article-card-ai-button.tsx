"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

type Props = {
  slug: string;
  label: string;
  loadingLabel: string;
  resultTitle: string;
};

export function ArticleCardAiButton({
  slug,
  label,
  loadingLabel,
  resultTitle
}: Props) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  async function summarizeArticle() {
    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("/api/article-tools/summary-by-slug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ slug })
      });

      const data = await response.json();

      setSummary(data.summary || data.error || "Summary failed.");
    } catch {
      setSummary("Summary failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={summarizeArticle}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg border border-[#d9c79f]/80 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#f5efe5] disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#b8894a]/30 dark:text-slate-200 dark:hover:bg-[#172033]"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {loading ? loadingLabel : label}
      </button>

      {summary ? (
        <div className="premium-panel mt-3 whitespace-pre-line p-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
          <p className="mb-2 font-semibold text-slate-950">{resultTitle}</p>
          {summary}
        </div>
      ) : null}
    </div>
  );
}
