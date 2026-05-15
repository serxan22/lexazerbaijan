"use client";

import { motion } from "framer-motion";
import { BookOpen, Landmark, MessageSquareText, Scale } from "lucide-react";

const features = [
  {
    title: "Articles",
    description:
      "Publish legal ideas, case notes, opinions, and research in a polished public space.",
    icon: BookOpen,
  },
  {
    title: "Discussions",
    description:
      "Debate legal questions, compare arguments, and build a serious legal community.",
    icon: MessageSquareText,
  },
  {
    title: "Cases",
    description:
      "Explore judgments, legal reasoning, and case summaries in one modern platform.",
    icon: Landmark,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.45 },
  transition: { duration: 0.75 },
};

export function PremiumScrollShowcase() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_12%,rgba(84,110,255,0.22),transparent_24%),radial-gradient(circle_at_76%_72%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(180deg,#050816_0%,#07102a_48%,#050816_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />

      <div className="legal-container flex min-h-screen items-center justify-center py-24 text-center">
        <motion.div {...fadeUp} className="mx-auto max-w-5xl">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/15 bg-white/[0.08] shadow-2xl shadow-blue-950/40 backdrop-blur-2xl">
            <Scale className="h-12 w-12 text-white/85" />
          </div>

          <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/75 backdrop-blur-xl">
            Modern legal publishing for Azerbaijan
          </p>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
            Legal knowledge, transformed into a premium digital experience.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
            Scroll down to discover articles, discussions, and case exploration
            through a cinematic legal interface.
          </p>
        </motion.div>
      </div>

      <div className="legal-container flex min-h-screen items-center justify-center py-24">
        <motion.div {...fadeUp} className="w-full">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-white/55">Explore the platform</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-white md:text-5xl">
              Three legal spaces. One serious platform.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                  className="rounded-[2rem] border border-white/12 bg-white/[0.10] p-7 text-left shadow-2xl shadow-black/40 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:bg-white/[0.14]"
                >
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                    <Icon className="h-6 w-6 text-white/85" />
                  </div>

                  <h3 className="text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/64">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="legal-container flex min-h-screen items-center justify-center py-24">
        <motion.div
          {...fadeUp}
          className="mx-auto w-full max-w-4xl rounded-[2.2rem] border border-white/12 bg-white/[0.10] p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-12"
        >
          <p className="text-sm uppercase tracking-[0.32em] text-white/45">
            LexAzerbaijan
          </p>

          <h2 className="mt-5 text-balance text-3xl font-semibold text-white md:text-5xl">
            One platform for legal writing, dialogue, and discovery.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/62 md:text-base">
            Designed for students, researchers, lawyers, and legal minds who want
            their ideas to be visible, searchable, and useful for the wider community.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
