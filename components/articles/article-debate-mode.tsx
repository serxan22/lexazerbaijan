"use client";

import { useMemo, useState, useTransition } from "react";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import {
  DebateEntry,
  DebateSide,
  upsertArticleDebateEntry,
} from "@/lib/actions/debates";

type ArticleDebateModeProps = {
  articleId: string;
  slug: string;
  title: string;
  initialEntries: DebateEntry[];
};

export function ArticleDebateMode({
  articleId,
  slug,
  title,
  initialEntries,
}: ArticleDebateModeProps) {
  const [entries, setEntries] = useState<DebateEntry[]>(initialEntries);
  const [selectedSide, setSelectedSide] = useState<DebateSide | null>(null);
  const [argumentText, setArgumentText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const question = useMemo(() => {
    return `Should the main legal argument in “${title}” be accepted?`;
  }, [title]);

  const agreeCount = entries.filter((entry) => entry.side === "agree").length;
  const disagreeCount = entries.filter((entry) => entry.side === "disagree").length;

  function submit(side: DebateSide, argument?: string) {
    setSelectedSide(side);
    setMessage(null);

    startTransition(async () => {
      const result = await upsertArticleDebateEntry({
        articleId,
        slug,
        side,
        argument,
      });

      if (!result.ok) {
        setMessage(result.error);
        return;
      }

      setMessage("Your debate entry was saved.");

      const temporaryEntry: DebateEntry = {
        id: `local-${Date.now()}`,
        article_id: articleId,
        user_id: "current-user",
        side,
        argument: argument?.trim() || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setEntries((current) => {
        const withoutCurrentLocal = current.filter(
          (entry) => entry.user_id !== "current-user"
        );
        return [temporaryEntry, ...withoutCurrentLocal];
      });

      setArgumentText("");
    });
  }

  return (
    <section className="my-12 rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
          <MessageSquareText className="h-5 w-5 text-slate-900 dark:text-slate-100" aria-hidden="true" />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">
            Debate mode
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950 dark:text-slate-50">
            Start a debate
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {question}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => submit("agree")}
          disabled={isPending}
          className={`rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${
            selectedSide === "agree"
              ? "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950/40"
              : "bg-slate-50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          }`}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-slate-50">
            <ThumbsUp className="h-4 w-4" aria-hidden="true" />
            Agree
          </span>
          <span className="mt-2 block text-xs text-slate-500 dark:text-slate-400">
            {agreeCount} vote{agreeCount === 1 ? "" : "s"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => submit("disagree")}
          disabled={isPending}
          className={`rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${
            selectedSide === "disagree"
              ? "border-rose-500 bg-rose-50 dark:border-rose-400 dark:bg-rose-950/40"
              : "bg-slate-50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          }`}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-slate-50">
            <ThumbsDown className="h-4 w-4" aria-hidden="true" />
            Disagree
          </span>
          <span className="mt-2 block text-xs text-slate-500 dark:text-slate-400">
            {disagreeCount} vote{disagreeCount === 1 ? "" : "s"}
          </span>
        </button>
      </div>

      <div className="mt-5">
        <textarea
          value={argumentText}
          onChange={(event) => setArgumentText(event.target.value)}
          placeholder={
            selectedSide
              ? "Write a short legal argument..."
              : "Choose Agree or Disagree first..."
          }
          disabled={!selectedSide || isPending}
          className="min-h-28 w-full rounded-2xl border bg-white p-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
        />

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => selectedSide && submit(selectedSide, argumentText)}
            disabled={!selectedSide || argumentText.trim().length < 10 || isPending}
            className="rounded-full bg-slate-950 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            {isPending ? "Saving..." : "Add argument"}
          </button>
        </div>
      </div>

      {message ? (
        <p className="mt-4 rounded-2xl border bg-slate-50 p-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          {message}
        </p>
      ) : null}

      {entries.filter((entry) => entry.argument).length > 0 ? (
        <div className="mt-6 space-y-3">
          {entries
            .filter((entry) => entry.argument)
            .slice(0, 8)
            .map((entry) => (
              <div key={entry.id} className="rounded-2xl border bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {entry.side === "agree" ? "Agree" : "Disagree"}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                  {entry.argument}
                </p>
              </div>
            ))}
        </div>
      ) : null}
    </section>
  );
}
