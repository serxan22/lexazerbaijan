"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { BookOpen, Bot, Gavel, Home, MessageSquare, Newspaper } from "lucide-react";

const articleImages = [
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400&auto=format&fit=crop",
];

const projects = [
  ["Discussions", "Debate legal gaps and legal reforms.", "/discussions"],
  ["Case summaries", "US, ECHR and EU cases in clean format.", "/cases"],
  ["Today’s Legal Terms", "Short legal concepts with simple explanations.", "/articles"],
];

const tools = ["Articles", "Cases", "Discussions", "LexAI", "Legal Terms", "Authors"];

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ duration: 0.55 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SaumyaStyleLexHomepage() {
  const [articleImageIndex, setArticleImageIndex] = useState(0);
  const currentArticleImage = articleImages[articleImageIndex];

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-100 text-neutral-950 dark:from-[#050505] dark:via-[#080808] dark:to-[#101010] dark:text-white">
      <aside className="fixed left-8 top-1/2 z-[9999] hidden -translate-y-1/2 rounded-[2rem] border border-black/10 bg-black/[0.055] px-3 py-6 shadow-2xl shadow-black/10 backdrop-blur-2xl transition-all duration-500 ease-out hover:border-black/20 hover:bg-black/[0.075] dark:border-white/10 dark:bg-white/[0.065] dark:shadow-black/40 dark:hover:border-white/20 dark:hover:bg-white/[0.085] lg:block">
        <nav className="flex flex-col items-center gap-6 text-black/40 dark:text-white/35">
          {[
            { icon: Home, label: "Home", href: "#intro" },
            { icon: Newspaper, label: "Articles", href: "/articles" },
            { icon: Gavel, label: "Cases", href: "/cases" },
            { icon: MessageSquare, label: "Discussions", href: "/discussions" },
            { icon: Bot, label: "LexAI", href: "/lexai" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="group relative flex h-11 w-11 items-center justify-center rounded-full text-black/40 transition-all duration-300 ease-out hover:scale-110 hover:bg-black/10 hover:text-black dark:text-white/35 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-black/80 opacity-0 shadow-2xl shadow-black/10 backdrop-blur-xl transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:opacity-100 dark:border-white/10 dark:bg-white/[0.09] dark:text-white/80 dark:shadow-black/40">
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      </aside>

      <Link
        href="/lexai"
        className="fixed bottom-7 right-7 z-50 hidden rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.05] dark:bg-white/[0.07] px-8 py-5 text-xl font-semibold shadow-2xl shadow-black/10 dark:shadow-black/40 backdrop-blur-2xl transition hover:scale-105 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black md:block"
      >
        ✌️ Ask LexAI
      </Link>

      <div className="mx-auto w-full max-w-[920px] px-5 pb-28 pt-20">
        <section id="intro" className="mb-24">
          <Card className="rounded-[2.2rem] border border-black/10 dark:border-white/10 bg-black/[0.035] dark:bg-white/[0.045] p-8 backdrop-blur-xl md:p-10">
            <p className="text-lg font-semibold text-black/70 dark:text-white/70">Hey, LexAzerbaijan here</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.07em] md:text-7xl">
              How’s your legal research today?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/55 dark:text-white/52">
              A modern legal platform for articles, case summaries, discussions, legal terms and AI-assisted research in Azerbaijan.
            </p>
          </Card>
        </section>

        <section id="work" className="mb-24">
          <h2 className="mb-6 text-4xl font-semibold tracking-[-0.05em]">Articles</h2>

          <Card className="overflow-hidden rounded-[2rem] border border-black/15 bg-gradient-to-br from-black/[0.06] via-black/[0.03] to-neutral-200 p-5 shadow-2xl shadow-black/10 dark:border-white/15 dark:from-white/10 dark:via-white/[0.04] dark:to-blue-950/30 dark:shadow-black/40">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.6rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentArticleImage}
                  initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentArticleImage}
                    alt="Submitted article preview"
                    fill
                    sizes="900px"
                    className="object-cover opacity-85"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              <button
                type="button"
                onClick={() => setArticleImageIndex((prev) => (prev + 1) % articleImages.length)}
                className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/35 text-2xl text-white shadow-2xl backdrop-blur-xl transition hover:scale-110 hover:bg-white hover:text-black"
                aria-label="Change article image"
              >
                ↻
              </button>
            </div>
          </Card>

          <div className="mt-5 flex items-center justify-between">
            <Link href="/articles" className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                <BookOpen className="h-6 w-6" />
              </span>
              <span className="text-xl font-semibold">
                Submitted Articles <span className="font-normal text-black/40 dark:text-white/35">(Research & opinions)</span>
              </span>
            </Link>

            <div className="flex gap-3">
              <button className="h-12 w-12 rounded-full bg-white/10 text-xl text-black/70 dark:text-white/70">‹</button>
              <button className="h-12 w-12 rounded-full bg-white/10 text-xl text-black/70 dark:text-white/70">›</button>
            </div>
          </div>
        </section>

        <section id="projects" className="mb-24">
          <h2 className="mb-6 text-4xl font-semibold tracking-[-0.05em]">Side Projects</h2>

          <div className="space-y-5">
            {projects.map(([title, text, href], i) => (
              <Card key={title}>
                <Link href={href} className="group flex items-center justify-between rounded-2xl px-1 py-2">
                  <div className={`flex items-center gap-5 ${i > 0 ? "opacity-45 blur-[1.4px] transition group-hover:opacity-100 group-hover:blur-0" : ""}`}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                      <MessageSquare className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-black/75 dark:text-white/75">{title}</h3>
                      <p className="text-sm text-black/40 dark:text-white/35">{text}</p>
                    </div>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-black/70 dark:text-white/70 transition group-hover:bg-white group-hover:text-black">›</span>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        
        <section id="terms" className="mb-24">
          <h2 className="mb-6 text-4xl font-semibold tracking-[-0.05em]">Today’s Legal Terms</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Rule of Law", "Power must be exercised through law, not personal will."],
              ["Legal Certainty", "People should understand the legal effect of their actions."],
              ["Proportionality", "State action should not go further than necessary."],
            ].map(([term, meaning], index) => (
              <Card key={term} className="rounded-[2rem] border border-black/10 bg-black/[0.035] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/20">
                <p className="text-sm text-black/40 dark:text-white/35">0{index + 1}</p>
                <h3 className="mt-12 text-2xl font-semibold tracking-[-0.04em]">{term}</h3>
                <p className="mt-4 text-sm leading-6 text-black/55 dark:text-white/50">{meaning}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="spotlight" className="mb-24">
          <h2 className="mb-6 text-4xl font-semibold tracking-[-0.05em]">Spotlight</h2>
          <Card className="rounded-[2rem] border border-black/10 dark:border-white/10 bg-black/[0.035] dark:bg-white/[0.045] p-8">
            <h3 className="text-4xl font-semibold tracking-[-0.05em]">
              Build your legal visibility through serious writing.
            </h3>
            <p className="mt-5 text-lg leading-8 text-black/55 dark:text-white/50">
              Publish articles, join discussions, explore cases and use LexAI as your research assistant.
            </p>
          </Card>
        </section>

        <section id="stack">
          <h2 className="mb-6 text-4xl font-semibold tracking-[-0.05em]">Tool Stack</h2>
          <div className="flex flex-wrap gap-3">
            {tools.map((item) => (
              <motion.span
                key={item}
                whileHover={{ y: -4 }}
                className="rounded-full border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.06] px-5 py-3 text-sm text-black/60 dark:text-white/60"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
