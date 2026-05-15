"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";

type ArticleDebateModeProps = {
  slug: string;
  title: string;
};

type DebateArgument = {
  id: string;
  side: "agree" | "disagree";
  text: string;
  createdAt: string;
};

type DebateState = {
  agree: number;
  disagree: number;
  selectedSide: "agree" | "disagree" | null;
  arguments: DebateArgument[];
};

function createInitialState(): DebateState {
  return {
    agree: 0,
    disagree: 0,
    selectedSide: null,
    arguments: [],
  };
}

export function ArticleDebateMode({ slug, title }: ArticleDebateModeProps) {
  const storageKey = `lexazerbaijan-debate-${slug}`;
  const [state, setState] = useState<DebateState>(createInitialState);
  const [argumentText, setArgumentText] = useState("");

  const question = useMemo(() => {
    return `Should the main legal argument in “${title}” be accepted?`;
  }, [title]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        setState(JSON.parse(saved));
      }
    } catch {
      setState(createInitialState());
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // localStorage may be unavailable in private mode
    }
  }, [state, storageKey]);

  function vote(side: "agree" | "disagree") {
    setState((current) => {
      if (current.selectedSide === side) {
        return current;
      }

      const next = { ...current };

      if (current.selectedSide === "agree") {
        next.agree = Math.max(0, next.agree - 1);
      }

      if (current.selectedSide === "disagree") {
        next.disagree = Math.max(0, next.disagree - 1);
      }

      next[side] = next[side] + 1;
      next.selectedSide = side;

      return next;
    });
  }

  function submitArgument() {
    const cleaned = argumentText.trim();

    if (cleaned.length < 10 || !state.selectedSide) {
      return;
    }

    const newArgument: DebateArgument = {
      id: crypto.randomUUID(),
      side: state.selectedSide,
      text: cleaned,
      createdAt: new Date().toISOString(),
    };

    setState((current) => ({
      ...current,
      arguments: [newArgument, ...current.arguments].slice(0, 8),
    }));

    setArgumentText("");
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
          onClick={() => vote("agree")}
          className={`rounded-2xl border p-4 text-left transition ${
            state.selectedSide === "agree"
              ? "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950/40"
              : "bg-slate-50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          }`}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-slate-50">
            <ThumbsUp className="h-4 w-4" aria-hidden="true" />
            Agree
          </span>
          <span className="mt-2 block text-xs text-slate-500 dark:text-slate-400">
            {state.agree} vote{state.agree === 1 ? "" : "s"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => vote("disagree")}
          className={`rounded-2xl border p-4 text-left transition ${
            state.selectedSide === "disagree"
              ? "border-rose-500 bg-rose-50 dark:border-rose-400 dark:bg-rose-950/40"
              : "bg-slate-50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          }`}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-slate-50">
            <ThumbsDown className="h-4 w-4" aria-hidden="true" />
            Disagree
          </span>
          <span className="mt-2 block text-xs text-slate-500 dark:text-slate-400">
            {state.disagree} vote{state.disagree === 1 ? "" : "s"}
          </span>
        </button>
      </div>

      <div className="mt-5">
        <textarea
          value={argumentText}
          onChange={(event) => setArgumentText(event.target.value)}
          placeholder={
            state.selectedSide
              ? "Write a short legal argument..."
              : "Choose Agree or Disagree first..."
          }
          disabled={!state.selectedSide}
          className="min-h-28 w-full rounded-2xl border bg-white p-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
        />

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={submitArgument}
            disabled={!state.selectedSide || argumentText.trim().length < 10}
            className="rounded-full bg-slate-950 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Add argument
          </button>
        </div>
      </div>

      {state.arguments.length > 0 ? (
        <div className="mt-6 space-y-3">
          {state.arguments.map((argument) => (
            <div key={argument.id} className="rounded-2xl border bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                {argument.side === "agree" ? "Agree" : "Disagree"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                {argument.text}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
        MVP note: debates are saved in this browser. We can connect this to Supabase later for public debates.
      </p>
    </section>
  );
}
