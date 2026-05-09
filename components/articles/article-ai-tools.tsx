"use client";

import { useState } from "react";

type Props = {
  title: string;
  content: string;
};

export function ArticleAiTools({
  title,
  content
}: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function runTool(mode: string) {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/article-tools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mode,
          title,
          content
        })
      });

      const data = await response.json();

      setResult(data.result || data.error || "No response.");
    } catch {
      setResult("AI request failed.");
    }

    setLoading(false);
  }

  return (
    <div className="sticky top-24 rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">
        ✨ AI Article Tools
      </h3>

      <div className="mt-4 grid gap-2">
        <button
          onClick={() => runTool("summarize")}
          className="rounded-lg border px-4 py-2 text-left text-sm hover:bg-slate-50"
        >
          ✨ Summarize article
        </button>

        <button
          onClick={() => runTool("simple")}
          className="rounded-lg border px-4 py-2 text-left text-sm hover:bg-slate-50"
        >
          ✨ Explain in simple English
        </button>

        <button
          onClick={() => runTool("irac")}
          className="rounded-lg border px-4 py-2 text-left text-sm hover:bg-slate-50"
        >
          ✨ Convert to IRAC
        </button>

        <button
          onClick={() => runTool("counter")}
          className="rounded-lg border px-4 py-2 text-left text-sm hover:bg-slate-50"
        >
          ✨ Generate counterarguments
        </button>
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-slate-500">
          LexAI is analyzing the article...
        </p>
      ) : null}

      {result ? (
        <div className="mt-4 whitespace-pre-line rounded-xl border bg-slate-50 p-4 text-sm leading-7 text-slate-700">
          {result}
        </div>
      ) : null}
    </div>
  );
}
