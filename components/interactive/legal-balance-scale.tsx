"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";

const VALUES = [
  {
    left: "Rights",
    right: "Duties",
    note: "Law balances individual freedoms with legal responsibilities.",
  },
  {
    left: "Justice",
    right: "Evidence",
    note: "A legal argument becomes stronger when fairness meets proof.",
  },
  {
    left: "Freedom",
    right: "Order",
    note: "Legal systems protect liberty while maintaining social stability.",
  },
  {
    left: "Reasoning",
    right: "Authority",
    note: "Good legal writing connects clear reasoning with legal sources.",
  },
];

export function LegalBalanceScale() {
  const [index, setIndex] = useState(0);
  const [tilt, setTilt] = useState(0);

  const item = useMemo(() => VALUES[index], [index]);

  function nextValue() {
    setIndex((current) => (current + 1) % VALUES.length);
    setTilt((current) => (current <= 0 ? 7 : -7));
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-br from-white via-amber-50/70 to-slate-50 p-6 shadow-sm dark:border-amber-400/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-slate-400/20 blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
            Interactive legal balance
          </p>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-slate-950 dark:text-slate-50">
            Where legal ideas find balance
          </h3>
        </div>

        <div className="rounded-2xl border bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <Scale className="h-5 w-5 text-amber-700 dark:text-amber-300" aria-hidden="true" />
        </div>
      </div>

      <button
        type="button"
        onClick={nextValue}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const middle = rect.left + rect.width / 2;
          setTilt(event.clientX < middle ? -7 : 7);
        }}
        onMouseLeave={() => setTilt(0)}
        className="relative mt-8 w-full rounded-3xl border border-slate-200 bg-white/70 p-6 text-left shadow-inner outline-none transition hover:border-amber-300 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-amber-400/50"
        aria-label="Change legal balance concept"
      >
        <div className="mx-auto flex max-w-md flex-col items-center">
          <motion.div
            animate={{ rotate: tilt }}
            transition={{ type: "spring", stiffness: 140, damping: 12 }}
            className="relative h-40 w-full"
          >
            <div className="absolute left-1/2 top-2 h-28 w-1 -translate-x-1/2 rounded-full bg-slate-800 dark:bg-slate-200" />
            <div className="absolute left-1/2 top-2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-amber-500 bg-white dark:bg-slate-950" />

            <div className="absolute left-1/2 top-12 h-1 w-72 -translate-x-1/2 rounded-full bg-slate-800 dark:bg-slate-200" />

            <div className="absolute left-[14%] top-12 h-16 w-px bg-slate-400 dark:bg-slate-600" />
            <div className="absolute right-[14%] top-12 h-16 w-px bg-slate-400 dark:bg-slate-600" />

            <motion.div
              animate={{ y: tilt > 0 ? 8 : tilt < 0 ? -6 : 0 }}
              className="absolute left-0 top-28 w-32 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center shadow-sm dark:border-amber-400/30 dark:bg-amber-950/30"
            >
              <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                {item.left}
              </p>
            </motion.div>

            <motion.div
              animate={{ y: tilt < 0 ? 8 : tilt > 0 ? -6 : 0 }}
              className="absolute right-0 top-28 w-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                {item.right}
              </p>
            </motion.div>
          </motion.div>

          <div className="mt-6 rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm leading-6 text-white shadow-sm dark:bg-white dark:text-slate-950">
            {item.note}
          </div>

          <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            Move your cursor or click to explore another legal balance.
          </p>
        </div>
      </button>
    </div>
  );
}
