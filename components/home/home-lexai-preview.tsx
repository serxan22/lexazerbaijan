"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, BrainCircuit, Sparkles } from "lucide-react";

import { HomeReveal, homeEase, useHomeMotion } from "@/components/home/home-motion";
import type { Dictionary } from "@/lib/i18n";

type LexAiCopy = Dictionary["home"]["premium"];

export function HomeLexAiPreview({ copy }: { copy: LexAiCopy }) {
  const { canAnimate } = useHomeMotion();

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div>
        <HomeReveal y={22} mobileY={14}>
          <p data-story="lexai-eyebrow" className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a77738] dark:text-[#d6b574]">
            {copy.lexaiEyebrow}
          </p>
        </HomeReveal>
        <HomeReveal delay={0.06} y={30} mobileY={18}>
          <h2 data-story="lexai-title" className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-[1.05] text-[#111827] dark:text-white md:text-6xl">
            {copy.lexaiTitle}
          </h2>
        </HomeReveal>
        <HomeReveal delay={0.12} y={24} mobileY={16}>
          <p data-story="lexai-copy" className="mt-5 max-w-xl text-base leading-8 text-[#5f6877] dark:text-[#cbd5e1]">
            {copy.lexaiLead}
          </p>
        </HomeReveal>
        <HomeReveal delay={0.18} y={20} mobileY={14}>
          <Link
            data-story="lexai-action"
            href="/lexai"
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#b8894a] px-5 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(184,137,74,0.22)] hover:bg-[#a77738]"
          >
            {copy.ctas.askLexAI}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </HomeReveal>
      </div>

      <HomeReveal
        amount={0.35}
        duration={0.78}
        y={28}
        mobileY={16}
        scale={0.985}
        mobileScale={0.995}
        blur={0}
        mobileBlur={0}
        className="relative overflow-hidden rounded-lg border border-[#d9c79f]/70 bg-[#fffdf8]/90 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur dark:border-[#b8894a]/25 dark:bg-[#07111f]/90 dark:shadow-[0_30px_90px_rgba(0,0,0,0.34)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(184,137,74,0.18),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(63,94,151,0.18),transparent_28%)]" />
        <div data-story="lexai-preview-header" className="relative flex items-center justify-between border-b border-[#d9c79f]/60 pb-4 dark:border-[#b8894a]/20">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#b8894a]/50 bg-[#111827] text-[#f5d89b]">
              <motion.span
                animate={canAnimate ? { scale: [1, 1.24, 1], opacity: [0.4, 0.08, 0.4] } : undefined}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[-8px] rounded-full border border-[#b8894a]/60"
              />
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827] dark:text-white">{copy.lexaiDesk}</p>
              <p className="text-xs text-[#687385] dark:text-[#aab6c8]">{copy.lexaiStatus}</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-[#d9c79f]/70 px-3 py-1 text-xs font-semibold text-[#7a5a2d] dark:border-[#b8894a]/25 dark:text-[#e2c88f] sm:inline-flex">
            <Sparkles className="h-3.5 w-3.5" />
            {copy.lexaiEyebrow}
          </div>
        </div>

        <div data-story-group className="relative mt-5 space-y-4">
          <HomeReveal
            delay={0.1}
            duration={0.56}
            y={14}
            mobileY={10}
            scale={0.992}
            mobileScale={0.998}
            blur={0}
            mobileBlur={0}
            hiddenOpacity={0.92}
            mobileHiddenOpacity={0.95}
            className="ml-auto max-w-[86%]"
          >
            <div data-story-card className="rounded-lg rounded-tr-sm border border-[#d6c399] bg-[#10213a] p-4 text-sm leading-6 text-white shadow-[0_14px_38px_rgba(16,33,58,0.20)]">
              {copy.lexaiUser}
            </div>
          </HomeReveal>

          <HomeReveal
            delay={0.22}
            duration={0.58}
            y={16}
            mobileY={10}
            scale={0.992}
            mobileScale={0.998}
            blur={0}
            mobileBlur={0}
            hiddenOpacity={0.92}
            mobileHiddenOpacity={0.95}
            className="max-w-[90%]"
          >
            <div data-story-card className="rounded-lg rounded-tl-sm border border-[#d9c79f]/70 bg-[#fff8e8] p-4 text-sm leading-6 text-[#233044] dark:border-[#b8894a]/25 dark:bg-[#0d1a2d] dark:text-[#e8eef8]">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9b6d31] dark:text-[#dec18f]">
                <BrainCircuit className="h-4 w-4" />
                {copy.lexaiAnswerLabel}
              </div>
              {copy.lexaiAnswer}
            </div>
          </HomeReveal>

          <div data-story-group className="grid grid-cols-3 gap-3 pt-2">
            {copy.lexaiSteps.map((item) => (
              <div
                data-story-card
                key={item}
                className="rounded-lg border border-[#d9c79f]/70 bg-[#fffdf8]/80 px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#7a5a2d] dark:border-[#b8894a]/20 dark:bg-[#081120]/80 dark:text-[#d8bd82]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </HomeReveal>
    </div>
  );
}
