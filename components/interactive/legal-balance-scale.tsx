"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const LEGAL_BALANCES = [
  {
    left: "Justice",
    right: "Evidence",
    note: "A strong legal system balances fairness with proof.",
  },
  {
    left: "Rights",
    right: "Duties",
    note: "Law protects freedoms while imposing responsibility.",
  },
  {
    left: "Freedom",
    right: "Order",
    note: "Legal institutions preserve liberty through structure.",
  },
  {
    left: "Reasoning",
    right: "Authority",
    note: "Persuasive legal analysis connects logic with sources.",
  },
];

export function LegalBalanceScale() {
  const [index, setIndex] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [rotateX, setRotateX] = useState(8);
  const [rotateY, setRotateY] = useState(-10);

  const current = useMemo(() => LEGAL_BALANCES[index], [index]);

  function nextConcept() {
    setIndex((value) => (value + 1) % LEGAL_BALANCES.length);
    setTilt((value) => (value <= 0 ? 10 : -10));
  }

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const newRotateY = ((x - midX) / midX) * 10;
    const newRotateX = -((y - midY) / midY) * 8;
    const newTilt = ((x - midX) / midX) * 12;

    setRotateY(newRotateY);
    setRotateX(newRotateX);
    setTilt(newTilt);
  }

  function handleLeave() {
    setRotateX(8);
    setRotateY(-10);
    setTilt(0);
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(254,243,199,0.75)_30%,_rgba(248,250,252,0.92)_60%,_rgba(226,232,240,0.96)_100%)] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-[radial-gradient(circle_at_top_left,_rgba(30,41,59,0.96),_rgba(15,23,42,0.96)_35%,_rgba(2,6,23,0.98)_100%)]">
      <div className="pointer-events-none absolute -left-16 top-10 h-48 w-48 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-400/10" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-slate-300/40 blur-3xl dark:bg-slate-500/10" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.35),transparent_35%,transparent_65%,rgba(255,255,255,0.18))]" />

      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300">
            Interactive legal symbol
          </p>

          <h3 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
            A premium 3D balance of law
          </h3>

          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            Move your cursor over the scale to explore a more immersive legal
            experience. Click the card to rotate through core legal values and
            ideas that define LexAzerbaijan.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-full border border-amber-300/70 bg-white/70 px-4 py-2 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-amber-400/20 dark:bg-white/5 dark:text-slate-200">
              {current.left}
            </div>
            <div className="rounded-full border border-slate-300/70 bg-white/70 px-4 py-2 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-white/5 dark:text-slate-200">
              {current.right}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/50 bg-white/70 p-5 text-sm leading-7 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            {current.note}
          </div>
        </div>

        <motion.button
          type="button"
          onClick={nextConcept}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          whileTap={{ scale: 0.99 }}
          className="group relative mx-auto flex h-[440px] w-full max-w-[560px] items-center justify-center rounded-[2rem] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55))] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_30px_70px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]"
          style={{ perspective: "1600px" }}
          aria-label="Interactive legal balance scale"
        >
          <div className="pointer-events-none absolute inset-x-10 bottom-7 h-7 rounded-full bg-slate-900/10 blur-2xl dark:bg-black/40" />

          <motion.div
            animate={{
              rotateX,
              rotateY,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="relative h-[360px] w-[320px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute left-1/2 top-2 h-6 w-6 -translate-x-1/2 rounded-full border border-amber-200 bg-[radial-gradient(circle_at_30%_30%,#fff7ed,#f59e0b_70%,#b45309)] shadow-[0_8px_18px_rgba(245,158,11,0.35)] dark:border-amber-300/30" />

            <div className="absolute left-1/2 top-7 h-[150px] w-[14px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#fff7ed,#fbbf24_35%,#b45309_70%,#78350f)] shadow-[inset_0_2px_6px_rgba(255,255,255,0.6),0_18px_20px_rgba(15,23,42,0.18)]" />

            <motion.div
              animate={{ rotate: tilt }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="absolute left-1/2 top-[72px] h-[14px] w-[250px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#fef3c7,#f59e0b_38%,#b45309_72%,#78350f)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_14px_25px_rgba(15,23,42,0.18)]"
              style={{ transformOrigin: "center center" }}
            >
              <div className="absolute left-[26px] top-[6px] h-[68px] w-[2px] bg-gradient-to-b from-amber-200 to-amber-900/70" />
              <div className="absolute left-[57px] top-[6px] h-[68px] w-[2px] bg-gradient-to-b from-amber-200 to-amber-900/70" />
              <div className="absolute left-[88px] top-[6px] h-[68px] w-[2px] bg-gradient-to-b from-amber-200 to-amber-900/70" />

              <div className="absolute right-[26px] top-[6px] h-[68px] w-[2px] bg-gradient-to-b from-amber-200 to-amber-900/70" />
              <div className="absolute right-[57px] top-[6px] h-[68px] w-[2px] bg-gradient-to-b from-amber-200 to-amber-900/70" />
              <div className="absolute right-[88px] top-[6px] h-[68px] w-[2px] bg-gradient-to-b from-amber-200 to-amber-900/70" />

              <motion.div
                animate={{
                  y: tilt > 0 ? 10 : tilt < 0 ? -6 : 0,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="absolute left-[-8px] top-[72px] flex h-[82px] w-[108px] items-center justify-center rounded-[999px_999px_35px_35px] border border-amber-200 bg-[linear-gradient(180deg,#fff7ed,#fde68a_35%,#f59e0b_75%,#b45309)] px-4 text-center shadow-[inset_0_6px_10px_rgba(255,255,255,0.65),0_16px_24px_rgba(15,23,42,0.16)] dark:border-amber-200/20"
              >
                <div className="absolute inset-x-3 top-2 h-3 rounded-full bg-white/40 blur-sm" />
                <span className="relative z-10 text-sm font-semibold text-slate-900">
                  {current.left}
                </span>
              </motion.div>

              <motion.div
                animate={{
                  y: tilt < 0 ? 10 : tilt > 0 ? -6 : 0,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="absolute right-[-8px] top-[72px] flex h-[82px] w-[108px] items-center justify-center rounded-[999px_999px_35px_35px] border border-slate-300 bg-[linear-gradient(180deg,#ffffff,#e2e8f0_40%,#94a3b8_72%,#475569)] px-4 text-center shadow-[inset_0_6px_10px_rgba(255,255,255,0.7),0_16px_24px_rgba(15,23,42,0.16)] dark:border-slate-500/40"
              >
                <div className="absolute inset-x-3 top-2 h-3 rounded-full bg-white/30 blur-sm" />
                <span className="relative z-10 text-sm font-semibold text-slate-900">
                  {current.right}
                </span>
              </motion.div>
            </motion.div>

            <div className="absolute bottom-[82px] left-1/2 h-[18px] w-[160px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#fef3c7,#f59e0b_45%,#92400e)] shadow-[inset_0_3px_4px_rgba(255,255,255,0.55),0_12px_20px_rgba(15,23,42,0.15)]" />

            <div className="absolute bottom-[30px] left-1/2 h-[66px] w-[220px] -translate-x-1/2 rounded-[2rem] bg-[linear-gradient(180deg,#fff7ed,#fcd34d_30%,#f59e0b_68%,#78350f)] shadow-[inset_0_6px_10px_rgba(255,255,255,0.65),0_20px_28px_rgba(15,23,42,0.18)]">
              <div className="absolute inset-x-6 top-3 h-4 rounded-full bg-white/40 blur-sm" />
            </div>

            <div className="absolute bottom-[18px] left-1/2 h-[18px] w-[260px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#e2e8f0,#64748b)] shadow-[0_10px_22px_rgba(15,23,42,0.22)] dark:bg-[linear-gradient(180deg,#94a3b8,#334155)]" />
          </motion.div>

          <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            Hover to tilt • Click to change concept
          </div>
        </motion.button>
      </div>
    </section>
  );
}
