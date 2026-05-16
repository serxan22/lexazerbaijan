"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  FileText,
  Landmark,
  Library,
  MessageSquareText,
  Scale,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 42,
    scale: 0.98,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: EASE,
      staggerChildren: 0.08,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

const card: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.975,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

const platformCards = [
  {
    title: "Articles",
    href: "/articles",
    description: "Publish legal analysis, research notes, commentary, and case-focused ideas.",
    icon: BookOpen,
  },
  {
    title: "Discussions",
    href: "/discussions",
    description: "Debate legal questions and test arguments with the legal community.",
    icon: MessageSquareText,
  },
  {
    title: "Cases",
    href: "/cases",
    description: "Explore judgments, legal reasoning, and case summaries in a modern format.",
    icon: Landmark,
  },
];

const workflow = [
  {
    step: "01",
    title: "Write",
    body: "Turn legal thought into publication.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Debate",
    body: "Refine arguments through discussion.",
    icon: Users,
  },
  {
    step: "03",
    title: "Research",
    body: "Move through legal materials faster.",
    icon: Search,
  },
  {
    step: "04",
    title: "Understand",
    body: "Use AI-assisted legal orientation.",
    icon: BrainCircuit,
  },
];

export function PremiumScrollShowcase() {
  return (
    <section className="relative isolate overflow-hidden bg-[#040816] text-white">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_10%,rgba(212,163,90,0.15),transparent_25%),radial-gradient(circle_at_78%_72%,rgba(70,95,200,0.13),transparent_28%),linear-gradient(180deg,#040816_0%,#071126_48%,#040816_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />

      <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-[#040816] pb-32">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-75 blur-[1.5px] scale-[1.04]"
          style={{
            backgroundImage: "url('/brand/lady-justice-bg.svg')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(212,163,90,0.10),transparent_32%),linear-gradient(180deg,rgba(4,8,22,0.50),rgba(4,8,22,0.88))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-0 h-64 bg-gradient-to-b from-transparent via-[#040816]/92 to-[#040816]" />

        <div className="legal-container flex min-h-[calc(100vh-4.5rem)] items-center justify-center py-24 text-center">
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-5xl"
          >
            <motion.div
              variants={item}
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-white/15 bg-white/[0.08] shadow-2xl shadow-black/40 backdrop-blur-2xl"
            >
              <Scale className="h-10 w-10 text-[#D4A35A]" />
            </motion.div>

            <motion.p
              variants={item}
              className="mb-6 text-sm font-medium uppercase tracking-[0.32em] text-white/50"
            >
              LexAzerbaijan
            </motion.p>

            <motion.h1
              variants={item}
              className="mx-auto max-w-4xl text-balance font-serif text-5xl font-semibold leading-[1.04] tracking-tight text-white md:text-7xl"
            >
              Law becomes clearer when ideas are shared.
            </motion.h1>

            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/66 md:text-lg"
            >
              A premium legal platform for publishing, discussion, case discovery, and legal research.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/articles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4A35A] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_60px_rgba(212,163,90,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c89749]"
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="legal-container relative -mt-32 flex min-h-screen items-center justify-center pb-24 pt-56">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-[#040816] via-[#040816]/96 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-[#D4A35A]/8 blur-3xl" />
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="w-full"
        >
          <motion.div variants={item} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/42">
              Platform structure
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-white md:text-5xl">
              One legal ecosystem, three clear paths.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/58">
              Write, discuss, and discover legal knowledge through a single modern interface.
            </p>
          </motion.div>

          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } }}
            className="mt-12 grid gap-5 md:grid-cols-3"
          >
            {platformCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  variants={card}
                  whileHover={{
                    y: -10,
                    scale: 1.018,
                    transition: { duration: 0.35, ease: EASE },
                  }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.09] p-7 text-left shadow-2xl shadow-black/40 backdrop-blur-2xl"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                    <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[rgba(212,163,90,0.15)] blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[rgba(80,110,255,0.12)] blur-3xl" />
                  </div>

                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.12),transparent)] transition duration-1000 group-hover:translate-x-full" />

                  <div className="relative mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 transition duration-500 group-hover:border-[#D4A35A]/30 group-hover:bg-[rgba(212,163,90,0.10)]">
                    <Icon className="h-6 w-6 text-white/88 transition duration-500 group-hover:text-[#D4A35A]" />
                  </div>

                  <h3 className="relative text-2xl font-semibold text-white">{feature.title}</h3>
                  <p className="relative mt-4 text-sm leading-7 text-white/64">{feature.description}</p>

                  <Link
                    href={feature.href}
                    className="relative mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition duration-300 group-hover:text-[#D4A35A]"
                  >
                    Open section
                    <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      <section className="legal-container flex min-h-screen items-center justify-center py-24">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
          className="w-full"
        >
          <motion.div variants={item} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/42">
              Legal workflow
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-white md:text-5xl">
              From legal idea to public contribution.
            </h2>
          </motion.div>

          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } }}
            className="mx-auto mt-14 max-w-5xl space-y-5"
          >
            {workflow.map((step) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.step}
                  variants={card}
                  className="group relative grid gap-5 rounded-[2rem] border border-white/12 bg-white/[0.075] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl md:grid-cols-[0.22fr_0.78fr]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#D4A35A]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm tracking-[0.24em] text-white/38">{step.step}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-white/60">{step.body}</p>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition duration-700 group-hover:opacity-100">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[rgba(212,163,90,0.10)] blur-3xl" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      <section className="legal-container flex min-h-screen items-center justify-center py-24">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2.8rem] border border-white/12 bg-white/[0.10] p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-14"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_35%)]" />

          <div className="relative">
            <motion.div
              variants={item}
              className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#D4A35A]"
            >
              <ShieldCheck className="h-7 w-7" />
            </motion.div>

            <motion.p variants={item} className="text-sm uppercase tracking-[0.32em] text-white/45">
              LexAzerbaijan
            </motion.p>

            <motion.h2 variants={item} className="mt-5 text-balance text-3xl font-semibold text-white md:text-6xl">
              Publish better. Discuss deeper. Discover faster.
            </motion.h2>

            <motion.p variants={item} className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/62 md:text-base">
              Built for those who want legal publishing in Azerbaijan to look sharper,
              move smoother, and feel more serious.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4A35A] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_60px_rgba(212,163,90,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c89749]"
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
            </motion.div>

            <motion.div variants={item} className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3 text-xs text-white/45">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                <Library className="mx-auto mb-2 h-4 w-4 text-[#D4A35A]" />
                Publish
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                <Users className="mx-auto mb-2 h-4 w-4 text-[#D4A35A]" />
                Discuss
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                <BrainCircuit className="mx-auto mb-2 h-4 w-4 text-[#D4A35A]" />
                Discover
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </section>
  );
}
