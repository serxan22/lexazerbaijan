"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const nav = ["Intro", "Work", "Projects", "Spotlight", "Stack", "Community"];
const work = [
  ["Legal Articles", "Publish serious legal research and opinions.", "/articles"],
  ["Case Library", "US, ECHR and EU case summaries.", "/cases"],
];
const projects = [
  ["Discussions", "Debate legal gaps and interpretations.", "/discussions"],
  ["Today’s Legal Terms", "Learn one legal concept at a time.", "/articles"],
  ["LexAI", "AI-assisted legal explanations.", "/lexai"],
  ["Author Profiles", "Build a visible legal identity.", "/articles"],
];
const stack = ["Articles", "Cases", "Discussions", "LexAI", "Multilingual", "Research"];

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.45 }}
      className={`rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function SaumyaStyleLexHomepage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <aside className="fixed left-5 top-5 z-50 hidden h-[calc(100vh-40px)] w-[210px] rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl lg:block">
        <Link href="/" className="block text-xl font-semibold tracking-[-0.04em]">
          LexAzerbaijan
        </Link>
        <nav className="mt-10 space-y-3">
          {nav.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="block rounded-full px-3 py-2 text-sm text-white/55 transition hover:bg-white/10 hover:text-white">
              {item}
            </a>
          ))}
        </nav>
        <Link href="/articles" className="absolute bottom-5 left-5 right-5 rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-black">
          Start reading
        </Link>
      </aside>

      <div className="mx-auto max-w-6xl px-5 py-6 lg:ml-[260px] lg:mr-8">
        <section id="intro" className="grid min-h-screen gap-5 py-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-8 backdrop-blur-xl md:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-white/35">Hey, LexAzerbaijan here</p>
            <h1 className="mt-8 text-6xl font-semibold leading-[0.9] tracking-[-0.08em] md:text-8xl">
              How’s your legal research today?
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
              We are building a modern legal platform for Azerbaijan: articles, cases, discussions, legal terms and AI-assisted research in one premium space.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/articles" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">Articles</Link>
              <Link href="/lexai" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/75">Ask LexAI</Link>
            </div>
          </motion.div>

          <Card className="relative min-h-[520px] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_35%)]" />
            <div className="relative flex h-full min-h-[470px] flex-col justify-between">
              <div className="text-sm uppercase tracking-[0.35em] text-white/35">Legal Hub</div>
              <div>
                <div className="text-[6rem] font-semibold leading-none tracking-[-0.1em] text-white/10 md:text-[8rem]">LAW</div>
                <p className="mt-4 max-w-sm text-white/58">
                  Legal knowledge should be visible, searchable and developed together.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section id="work" className="py-12">
          <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Work</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {work.map(([title, text, href]) => (
              <Link key={title} href={href}>
                <Card className="min-h-[260px]">
                  <p className="text-sm text-white/35">Platform area</p>
                  <h3 className="mt-16 text-4xl font-semibold tracking-[-0.05em]">{title}</h3>
                  <p className="mt-4 text-white/55">{text}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section id="projects" className="py-12">
          <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Side Projects</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-4">
            {projects.map(([title, text, href]) => (
              <Link key={title} href={href}>
                <Card className="min-h-[220px]">
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/55">{text}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section id="spotlight" className="py-12">
          <Card className="min-h-[360px]">
            <p className="text-sm uppercase tracking-[0.35em] text-white/35">Spotlight</p>
            <h2 className="mt-10 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
              A legal platform for people who want their ideas to be discovered.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">
              Publish, discuss, summarize and explore legal knowledge with a clean editorial experience.
            </p>
          </Card>
        </section>

        <section id="stack" className="py-12">
          <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Tool Stack</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {stack.map((item) => (
              <motion.span whileHover={{ y: -4 }} key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm text-white/65">
                {item}
              </motion.span>
            ))}
          </div>
        </section>

        <section id="community" className="py-12 pb-24">
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <h3 className="text-3xl font-semibold tracking-[-0.04em]">Social Validation</h3>
              <p className="mt-5 text-white/55">A community where students, lawyers and researchers can build legal visibility through serious contributions.</p>
            </Card>
            <Card>
              <h3 className="text-3xl font-semibold tracking-[-0.04em]">Newsletter</h3>
              <p className="mt-5 text-white/55">Legal updates, case notes and platform highlights. No spam. Straight value.</p>
            </Card>
          </div>
          <p className="mt-16 text-center text-sm uppercase tracking-[0.35em] text-white/30">
            Thanks for visiting. Explore around. Until next time.
          </p>
        </section>
      </div>
    </main>
  );
}
