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
        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {loading ? loadingLabel : label}
      </button>

      {summary ? (
        <div className="mt-3 whitespace-pre-line rounded-xl border bg-slate-50 p-4 text-sm leading-7 text-slate-700">
          <p className="mb-2 font-semibold text-slate-950">{resultTitle}</p>
          {summary}
        </div>
      ) : null}
    </div>
  );
}
