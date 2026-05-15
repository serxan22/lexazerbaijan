"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, BookOpen, Landmark, MessageSquareText, Scale, Sparkles } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Articles",
    href: "/articles",
    description:
      "Publish legal ideas, case notes, opinions, and research in a polished public space.",
    icon: BookOpen,
  },
  {
    title: "Discussions",
    href: "/discussions",
    description:
      "Debate legal questions, compare arguments, and build a serious legal community.",
    icon: MessageSquareText,
  },
  {
    title: "Cases",
    href: "/cases",
    description:
      "Explore judgments, legal reasoning, and case summaries in one modern platform.",
    icon: Landmark,
  },
];

const frameVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 72,
    scale: 0.96,
    filter: "blur(18px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 42,
    scale: 0.96,
    filter: "blur(14px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      delay: index * 0.13,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function PremiumScrollShowcase() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_10%,rgba(180,140,70,0.20),transparent_23%),radial-gradient(circle_at_78%_72%,rgba(70,95,200,0.16),transparent_28%),linear-gradient(180deg,#050816_0%,#071126_46%,#050816_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-blue-900/20 blur-[120px]" />

      <div className="legal-container flex min-h-[calc(100vh-5rem)] items-center justify-center py-24 text-center">
        <motion.div
          variants={frameVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.42 }}
          className="mx-auto max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.82, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mb-9 flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/15 bg-white/[0.08] shadow-2xl shadow-black/40 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_32%)]" />
            <div className="absolute -inset-3 rounded-[2.4rem] border border-white/10" />
            <motion.div
              animate={{ y: [0, -7, 0], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Scale className="h-14 w-14 text-white/88" />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/75 shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4 text-gold" />
            Modern legal publishing for Azerbaijan
          </motion.p>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
            Legal knowledge, transformed into a premium digital experience.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
            Scroll down to discover articles, discussions, and case exploration through
            a cinematic legal interface built for serious legal minds.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-full border border-white/12 bg-white/[0.07] px-5 py-3 text-sm text-white/62 backdrop-blur-xl"
          >
            <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_24px_rgba(212,163,90,0.75)]" />
            Frame-by-frame legal storytelling
          </motion.div>
        </motion.div>
      </div>

      <div className="legal-container flex min-h-screen items-center justify-center py-24">
        <motion.div
          variants={frameVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="w-full"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-white/55">Explore the platform</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-white md:text-5xl">
              Three legal spaces, revealed with purpose.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/58">
              Each area is designed to make legal writing, debate, and case discovery feel
              structured, elegant, and easy to navigate.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{
                    y: -10,
                    scale: 1.018,
                    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.095] p-7 text-left shadow-2xl shadow-black/40 backdrop-blur-2xl"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                    <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gold/15 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
                  </div>

                  <div className="relative mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 transition duration-500 group-hover:border-gold/30 group-hover:bg-gold/10">
                    <Icon className="h-6 w-6 text-white/85 transition duration-500 group-hover:text-gold" />
                  </div>

                  <h3 className="relative text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="relative mt-4 text-sm leading-7 text-white/64">
                    {feature.description}
                  </p>

                  <Link
                    href={feature.href}
                    className="relative mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition duration-300 group-hover:text-gold"
                  >
                    Open section
                    <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="legal-container flex min-h-screen items-center justify-center py-24">
        <motion.div
          variants={frameVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.42 }}
          className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[2.4rem] border border-white/12 bg-white/[0.10] p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_35%)]" />
          <div className="relative">
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

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-slate-950 shadow-2xl shadow-gold/20 transition hover:-translate-y-0.5 hover:bg-gold/90"
              >
                Explore articles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Submit your article
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
