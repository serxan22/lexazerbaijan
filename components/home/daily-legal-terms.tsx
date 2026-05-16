"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, BookOpen, Gavel, Landmark, Scale, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const terms = [
  {
    term: "Rule of Law",
    meaning: "Power must be exercised through law, not personal will.",
    detail: "A foundation for accountability, legal certainty, and fair institutions.",
    icon: Scale,
  },
  {
    term: "Due Process",
    meaning: "No one should be affected by legal power without fair procedure.",
    detail: "It protects the right to be heard, reasoned decisions, and equal treatment.",
    icon: ShieldCheck,
  },
  {
    term: "Precedent",
    meaning: "Past judgments can guide the reasoning of future cases.",
    detail: "It helps courts develop consistency, predictability, and legal stability.",
    icon: Landmark,
  },
  {
    term: "Legal Standing",
    meaning: "A person must have a sufficient connection to bring a claim.",
    detail: "It answers whether the claimant is legally entitled to appear before the court.",
    icon: Gavel,
  },
];

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 72,
    scale: 0.985,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: EASE,
      staggerChildren: 0.11,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(4px)",
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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 44,
    scale: 0.955,
    rotateX: 8,
    filter: "blur(5px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.78,
      delay: index * 0.09,
      ease: EASE,
    },
  }),
};

type DailyLegalTermsProps = {
  dictionary?: any;
  locale?: string;
};

export function DailyLegalTerms({ dictionary }: DailyLegalTermsProps) {
  const title =
    dictionary?.home?.dailyTermsTitle ??
    dictionary?.home?.dailyLegalTermsTitle ??
    "Today’s Legal Terms";

  const eyebrow =
    dictionary?.home?.dailyTermsEyebrow ??
    "Legal vocabulary";

  const body =
    dictionary?.home?.dailyTermsBody ??
    "Build your legal language through short, practical explanations of important legal ideas.";

  return (
    <section className="relative isolate -mt-px overflow-hidden bg-[#040816] py-28 text-white">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_18%_18%,rgba(212,163,90,0.16),transparent_26%),radial-gradient(circle_at_82%_72%,rgba(70,95,200,0.14),transparent_28%),linear-gradient(180deg,#040816_0%,#061024_34%,#071126_62%,#040816_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 -top-1 z-0 h-40 bg-gradient-to-b from-[#040816] via-[#040816]/95 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-[#040816] via-[#040816]/88 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:58px_58px] opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-[#D4A35A]/10 blur-3xl" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22, margin: "-8% 0px -8% 0px" }}
        className="legal-container relative z-10"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div variants={itemVariants}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2 text-sm text-white/68 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-[#D4A35A]" />
              {eyebrow}
            </div>

            <h2 className="font-serif text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {title}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-white/62">
              {body}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-[2rem] border border-white/12 bg-white/[0.075] p-5 shadow-2xl shadow-black/35 backdrop-blur-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/10 text-[#D4A35A]">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/38">
                  Daily learning
                </p>
                <p className="mt-1 text-sm text-white/62">
                  Short terms, clear meaning, better legal thinking.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.12,
              },
            },
          }}
          className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {terms.map((term, index) => {
            const Icon = term.icon;

            return (
              <motion.article
                key={term.term}
                custom={index}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.018,
                  transition: { duration: 0.32, ease: EASE },
                }}
                className="group relative min-h-[285px] overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.085] p-6 shadow-2xl shadow-black/35 backdrop-blur-2xl"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                  <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#D4A35A]/15 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-blue-600/10 blur-3xl" />
                </div>

                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.12),transparent)] transition duration-1000 group-hover:translate-x-full" />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/10 text-[#D4A35A] transition duration-500 group-hover:border-[#D4A35A]/35 group-hover:bg-[#D4A35A]/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs tracking-[0.24em] text-white/30">
                    0{index + 1}
                  </span>
                </div>

                <div className="relative mt-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {term.term}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/68">
                    {term.meaning}
                  </p>

                  <p className="mt-4 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:100%_1px] bg-top bg-no-repeat pt-4 text-xs leading-6 text-white/45">
                    {term.detail}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-5 py-3 text-sm font-medium text-white/70 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#D4A35A]/30 hover:bg-[#D4A35A]/10 hover:text-[#D4A35A]"
          >
            Explore legal analysis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
