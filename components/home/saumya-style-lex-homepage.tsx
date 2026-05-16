"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import {
  Bot,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Gavel,
  Home,
  MessageSquare,
  Newspaper,
  Quote,
  Scale,
} from "lucide-react";

const articles = [
  {
    title: "AI and Criminal Liability",
    meta: "Technology Law",
    href: "/articles",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Corporate Governance and Legal Accountability",
    meta: "Corporate Law",
    href: "/articles",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Human Rights Reasoning in Modern Courts",
    meta: "Case Analysis",
    href: "/articles",
    img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1400&auto=format&fit=crop",
  },
];

const sideProjects = [
  {
    title: "Cases",
    text: "US, ECHR and EU case summaries in clean legal format.",
    href: "/cases",
    icon: Gavel,
  },
  {
    title: "Discussions",
    text: "Debate legal gaps, interpretation problems and reforms.",
    href: "/discussions",
    icon: MessageSquare,
  },
  {
    title: "Today’s Legal Terms",
    text: "Short, elegant explanations of important legal concepts.",
    href: "/articles",
    icon: BookOpen,
  },
  {
    title: "LexAI",
    text: "AI-assisted legal explanations, summaries and research support.",
    href: "/lexai",
    icon: Bot,
  },
];

const nav = [
  { label: "Home", href: "#intro", icon: Home },
  { label: "Articles", href: "#articles", icon: Newspaper },
  { label: "Cases", href: "#cases", icon: Gavel },
  { label: "Community", href: "#community", icon: MessageSquare },
  { label: "LexAI", href: "/lexai", icon: Bot },
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-12%" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SaumyaStyleLexHomepage() {
  const [active, setActive] = useState(0);
  const article = articles[active];

  const next = () => setActive((prev) => (prev + 1) % articles.length);
  const prev = () => setActive((prev) => (prev - 1 + articles.length) % articles.length);

  return (
    <>
      <FloatingHomepageDock />

      <Link
        href="/lexai"
        className="fixed bottom-7 right-7 z-[9999] hidden rounded-3xl border border-black/10 bg-white/80 px-8 py-5 text-xl font-semibold text-black shadow-2xl shadow-black/10 backdrop-blur-2xl transition hover:scale-105 hover:bg-black hover:text-white dark:border-white/10 dark:bg-white/[0.07] dark:text-white dark:shadow-black/40 dark:hover:bg-white dark:hover:text-black md:block"
      >
        ✌️ Ask LexAI
      </Link>

      <main className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-100 text-neutral-950 dark:from-black dark:via-[#050505] dark:to-[#0d0d0d] dark:text-white">
        <div className="mx-auto w-full max-w-[840px] px-5 pb-28 pt-20">
          <section id="intro" className="mb-24">
            <Reveal className="rounded-[2.2rem] border border-black/10 bg-white/70 p-8 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/30 md:p-10">
              <p className="text-lg font-semibold text-black/70 dark:text-white/70">Hey, LexAzerbaijan here</p>
              <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.07em] md:text-7xl">
                How’s your legal research today?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-black/55 dark:text-white/52">
                A modern legal platform for articles, case summaries, discussions, legal terms and AI-assisted research in Azerbaijan.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/articles" className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black">
                  Read Articles
                </Link>
                <Link href="/lexai" className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-black/70 dark:border-white/15 dark:text-white/75">
                  Ask LexAI
                </Link>
              </div>
            </Reveal>
          </section>

          <section id="articles" className="mb-24">
            <h2 className="mb-6 text-4xl font-semibold tracking-[-0.05em]">Articles</h2>

            <Reveal className="overflow-hidden rounded-[2rem] border border-black/15 bg-gradient-to-br from-black/[0.06] via-black/[0.03] to-neutral-200 p-5 shadow-2xl shadow-black/10 dark:border-white/15 dark:from-white/10 dark:via-white/[0.04] dark:to-blue-950/30 dark:shadow-black/40">
              <Link href={article.href} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.6rem]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={article.img}
                      initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image src={article.img} alt={article.title} fill sizes="840px" className="object-cover opacity-90 transition duration-700 group-hover:scale-105" />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
              </Link>
            </Reveal>

            <div className="mt-5 flex items-center justify-between gap-4">
              <Link href={article.href} className="flex min-w-0 items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                  <Newspaper className="h-6 w-6" />
                </span>
                <span className="min-w-0 text-xl font-semibold">
                  {article.title} <span className="font-normal text-black/40 dark:text-white/35">({article.meta})</span>
                </span>
              </Link>

              <div className="flex shrink-0 gap-3">
                <button onClick={prev} className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10 text-black/70 transition hover:scale-110 hover:bg-black hover:text-white dark:bg-white/10 dark:text-white/70 dark:hover:bg-white dark:hover:text-black">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={next} className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10 text-black/70 transition hover:scale-110 hover:bg-black hover:text-white dark:bg-white/10 dark:text-white/70 dark:hover:bg-white dark:hover:text-black">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>

          <section id="cases" className="mb-24">
            <h2 className="mb-6 text-4xl font-semibold tracking-[-0.05em]">Side Projects</h2>

            <div className="space-y-5">
              {sideProjects.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title}>
                    <Link href={item.href} className="group flex items-center justify-between rounded-2xl px-1 py-2">
                      <div className={`flex items-center gap-5 transition duration-500 ${i > 0 ? "opacity-45 blur-[1.3px] group-hover:opacity-100 group-hover:blur-0" : ""}`}>
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10 text-black/60 dark:bg-white/15 dark:text-white/70">
                          <Icon className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold text-black/75 dark:text-white/75">{item.title}</h3>
                          <p className="text-sm text-black/40 dark:text-white/35">{item.text}</p>
                        </div>
                      </div>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-black/70 transition group-hover:bg-black group-hover:text-white dark:bg-white/10 dark:text-white/70 dark:group-hover:bg-white dark:group-hover:text-black">
                        ›
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="community" className="mb-24">
            <h2 className="mb-6 text-4xl font-semibold tracking-[-0.05em]">Community</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Reveal className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/20">
                <Quote className="h-7 w-7 text-black/40 dark:text-white/35" />
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Social Validation</h3>
                <p className="mt-4 text-sm leading-6 text-black/55 dark:text-white/50">
                  A legal community where students, lawyers and researchers can build visibility through serious contributions.
                </p>
              </Reveal>

              <Reveal className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/20">
                <Scale className="h-7 w-7 text-black/40 dark:text-white/35" />
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Legal Newsletter</h3>
                <p className="mt-4 text-sm leading-6 text-black/55 dark:text-white/50">
                  Legal updates, case notes and platform highlights. No spam. Straight value.
                </p>
              </Reveal>
            </div>
          </section>

          <section className="pb-10 text-center">
            <Reveal>
              <p className="text-sm uppercase tracking-[0.35em] text-black/35 dark:text-white/30">
                Thanks for visiting. Explore around. Until next time.
              </p>
            </Reveal>
          </section>
        </div>
      </main>
    </>
  );
}
