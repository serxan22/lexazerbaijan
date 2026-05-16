"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { BookOpen, Briefcase, Home, MessageSquare, Newspaper, Sparkles } from "lucide-react";

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
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SaumyaStyleLexHomepage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <aside className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-8 shadow-2xl shadow-black/40 backdrop-blur-2xl lg:block">
        <nav className="flex flex-col items-center gap-9 text-white/35">
          {[
            [Home, "#intro"],
            [Briefcase, "#work"],
            [BookOpen, "#projects"],
            [Newspaper, "#spotlight"],
            [Sparkles, "#stack"],
          ].map(([Icon, href], i) => (
            <a key={i} href={href as string} className="transition hover:scale-110 hover:text-white">
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </nav>
      </aside>

      <Link
        href="/lexai"
        className="fixed bottom-7 right-7 z-50 hidden rounded-3xl border border-white/10 bg-white/[0.07] px-8 py-5 text-xl font-semibold shadow-2xl shadow-black/40 backdrop-blur-2xl transition hover:scale-105 hover:bg-white hover:text-black md:block"
      >
        ✌️ Ask LexAI
      </Link>

      <div className="mx-auto w-full max-w-[920px] px-5 pb-28 pt-20">
        <section id="intro" className="mb-24">
          <Card className="rounded-[2.2rem] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl md:p-10">
            <p className="text-lg font-semibold text-white/70">Hey, LexAzerbaijan here</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.07em] md:text-7xl">
              How’s your legal research today?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/52">
              A modern legal platform for articles, case summaries, discussions, legal terms and AI-assisted research in Azerbaijan.
            </p>
          </Card>
        </section>

        <section id="work" className="mb-24">
          <h2 className="mb-6 text-4xl font-semibold tracking-[-0.05em]">Work</h2>

          <Card className="overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/10 via-white/[0.04] to-blue-950/30 p-5 shadow-2xl shadow-black/40">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.6rem]">
              <Image
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1400&auto=format&fit=crop"
                alt="Legal articles"
                fill
                sizes="900px"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </Card>

          <div className="mt-5 flex items-center justify-between">
            <Link href="/articles" className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
                <BookOpen className="h-6 w-6" />
              </span>
              <span className="text-xl font-semibold">
                Legal Articles <span className="font-normal text-white/35">(Research & opinions)</span>
              </span>
            </Link>

            <div className="flex gap-3">
              <button className="h-12 w-12 rounded-full bg-white/10 text-xl text-white/70">‹</button>
              <button className="h-12 w-12 rounded-full bg-white/10 text-xl text-white/70">›</button>
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
                      <h3 className="text-xl font-semibold text-white/75">{title}</h3>
                      <p className="text-sm text-white/35">{text}</p>
                    </div>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition group-hover:bg-white group-hover:text-black">›</span>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section id="spotlight" className="mb-24">
          <h2 className="mb-6 text-4xl font-semibold tracking-[-0.05em]">Spotlight</h2>
          <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8">
            <h3 className="text-4xl font-semibold tracking-[-0.05em]">
              Build your legal visibility through serious writing.
            </h3>
            <p className="mt-5 text-lg leading-8 text-white/50">
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
                className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm text-white/60"
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
