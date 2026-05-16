"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
  ["01", "Articles", "Legal articles", "Academic notes", "Research opinions", "Student writing"],
  ["02", "Cases", "US cases", "ECHR cases", "EU cases", "Case summaries"],
  ["03", "Community", "Discussions", "Legal gaps", "Public comments", "Author profiles"],
  ["04", "LexAI", "Legal explanations", "Case summaries", "Research assistant", "Simple English"],
];

const showcase = [
  ["Legal Articles", "Publish and discover serious legal writing."],
  ["Case Library", "Read structured case summaries and legal reasoning."],
  ["Discussions", "Debate legal gaps, interpretations and reforms."],
  ["Today’s Terms", "Learn legal concepts one idea at a time."],
];

function SectionIndex({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/40">
      <span>{n}</span>
      <span className="h-px w-10 bg-white/25" />
      <span>{title}</span>
    </div>
  );
}

export function FromAnotherLegalHomepage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rootRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.25]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ duration: 0.85, smoothWheel: true, wheelMultiplier: 0.9 });
    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={rootRef} className="relative overflow-clip bg-[#050505] text-white">
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_20%_70%,rgba(148,163,184,0.1),transparent_26%),linear-gradient(180deg,#050505,#0b0b0c_50%,#050505)]"
      />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:38px_38px]" />

      <section className="relative z-10 flex min-h-screen items-center px-5 py-24 md:px-10">
        <motion.div style={{ opacity: heroOpacity }} className="mx-auto w-full max-w-[1500px]">
          <div className="mb-8 flex justify-between text-xs uppercase tracking-[0.35em] text-white/45">
            <span>LexAzerbaijan</span>
            <span>Since 2026</span>
          </div>

          <h1 className="max-w-[1400px] text-[16vw] font-semibold uppercase leading-[0.78] tracking-[-0.11em] md:text-[10vw]">
            Legal
            <span className="mx-4 inline-flex h-[0.7em] w-[1.2em] translate-y-[0.08em] items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 align-middle backdrop-blur-md">
              <span className="h-3 w-3 rounded-full bg-white/70 shadow-[0_0_34px_rgba(255,255,255,0.8)]" />
            </span>
            Ideas
            <br />
            Cases
            <br />
            Community
          </h1>

          <div className="mt-10 grid gap-5 md:grid-cols-[1fr_0.7fr] md:items-end">
            <p className="max-w-2xl text-lg leading-8 text-white/60">
              A modern legal platform for articles, case summaries, discussions and AI-assisted legal research in Azerbaijan.
            </p>
            <p className="border-l border-white/20 pl-5 text-base italic leading-7 text-white/45">
              “Legal knowledge should be visible, searchable and developed together.”
            </p>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <SectionIndex n="1" title="About" />
          <motion.h2
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-10 max-w-5xl text-5xl font-semibold tracking-[-0.06em] md:text-8xl"
          >
            We are building a serious legal knowledge hub for Azerbaijan’s new legal generation.
          </motion.h2>
        </div>
      </section>

      <section className="relative z-10 px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <SectionIndex n="2" title="What We Do" />
          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {services.map(([n, title, ...items]) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.65 }}
                className="group grid gap-6 py-8 md:grid-cols-[0.15fr_0.35fr_1fr] md:items-start"
              >
                <p className="text-white/35">{n}</p>
                <h3 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">{title}</h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition group-hover:border-white/25">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 h-[360vh] px-5 md:px-10">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1400px]">
            <SectionIndex n="3" title="Featured Platform Areas" />
            <div className="mt-12 flex gap-5 overflow-x-auto pb-6">
              {showcase.map(([title, text], i) => (
                <motion.a
                  key={title}
                  href={i === 0 ? "/articles" : i === 1 ? "/cases" : i === 2 ? "/discussions" : "/articles"}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10 }}
                  viewport={{ once: true }}
                  className="min-w-[78vw] rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-md md:min-w-[520px] md:p-10"
                >
                  <p className="text-sm text-white/35">0{i + 1}</p>
                  <h3 className="mt-24 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">{title}</h3>
                  <p className="mt-6 max-w-md text-lg leading-8 text-white/55">{text}</p>
                  <span className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
                    Open section
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 pb-32 md:px-10">
        <div className="mx-auto max-w-[1400px] overflow-hidden border-y border-white/10 py-5">
          <div className="flex w-max animate-[marquee_26s_linear_infinite] gap-12 text-sm uppercase tracking-[0.35em] text-white/35">
            <span>Legal articles</span><span>Case summaries</span><span>Discussions</span><span>LexAI</span><span>Today’s legal terms</span>
            <span>Legal articles</span><span>Case summaries</span><span>Discussions</span><span>LexAI</span><span>Today’s legal terms</span>
          </div>
        </div>
      </section>
    </main>
  );
}
