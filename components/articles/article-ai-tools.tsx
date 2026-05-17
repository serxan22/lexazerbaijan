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
    <div className="premium-surface sticky top-24 p-5">
      <h3 className="text-lg font-semibold text-slate-950">
        ✨ AI Article Tools
      </h3>

      <div className="mt-4 grid gap-2">
        <button
          onClick={() => runTool("summarize")}
          className="rounded-lg border border-[#d9c79f]/70 px-4 py-2 text-left text-sm hover:bg-[#f5efe5] dark:border-[#b8894a]/20 dark:hover:bg-[#172033]"
        >
          ✨ Summarize article
        </button>

        <button
          onClick={() => runTool("simple")}
          className="rounded-lg border border-[#d9c79f]/70 px-4 py-2 text-left text-sm hover:bg-[#f5efe5] dark:border-[#b8894a]/20 dark:hover:bg-[#172033]"
        >
          ✨ Explain in simple English
        </button>

        <button
          onClick={() => runTool("irac")}
          className="rounded-lg border border-[#d9c79f]/70 px-4 py-2 text-left text-sm hover:bg-[#f5efe5] dark:border-[#b8894a]/20 dark:hover:bg-[#172033]"
        >
          ✨ Convert to IRAC
        </button>

        <button
          onClick={() => runTool("counter")}
          className="rounded-lg border border-[#d9c79f]/70 px-4 py-2 text-left text-sm hover:bg-[#f5efe5] dark:border-[#b8894a]/20 dark:hover:bg-[#172033]"
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
        <div className="premium-panel mt-4 whitespace-pre-line p-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
          {result}
        </div>
      ) : null}
    </div>
  );
}
