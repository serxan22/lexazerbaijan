"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { PremiumMotionShell } from "@/components/interactive/premium-motion-shell";
import { LegalOrbitCanvas } from "@/components/interactive/legal-orbit-canvas";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: "Publish legal ideas",
    href: "/articles",
    button: "Open articles",
    quote: "A legal platform becomes powerful when students, researchers and lawyers can be heard.",
    text: "Share articles, legal opinions and research notes in a professional space built for Azerbaijani legal thought.",
  },
  {
    title: "Discover cases",
    href: "/cases",
    button: "Explore cases",
    quote: "Cases are not just judgments; they are the language of legal reasoning.",
    text: "Explore court decisions, summaries and comparative legal materials with a cleaner research experience.",
  },
  {
    title: "Discuss legal gaps",
    href: "/discussions",
    button: "Join discussions",
    quote: "Law develops when people question unclear rules instead of silently accepting them.",
    text: "Use discussions to raise legal problems, interpretations and reform ideas with the community.",
  },
  {
    title: "Ask LexAI",
    href: "/lexai",
    button: "Ask LexAI",
    quote: "AI should not replace legal reasoning; it should make research faster and clearer.",
    text: "Get structured explanations, summaries and starting points for legal research through LexAI.",
  },
];

const legalTerms = [
  {
    term: "Rule of law",
    meaning: "Public power must be exercised through law, not personal discretion.",
  },
  {
    term: "Legal certainty",
    meaning: "People should be able to understand the legal consequences of their actions.",
  },
  {
    term: "Proportionality",
    meaning: "State action should not go further than necessary to achieve a legitimate aim.",
  },
];

const sections = [
  {
    kicker: "Purpose",
    title: "LexAzerbaijan is built to become a modern legal knowledge hub for Azerbaijan.",
    text: "The aim is to connect legal articles, case analysis, academic discussion and AI-assisted research in one premium platform.",
    quote: "“Legal knowledge should not stay hidden in private notes. It should be searchable, readable and useful.”",
  },
  {
    kicker: "Community",
    title: "A space for students, lawyers, researchers and young legal writers.",
    text: "Users can publish their legal views, discover other authors and build a visible legal profile through meaningful contributions.",
    quote: "“A strong legal community begins when people start sharing serious ideas publicly.”",
  },
  {
    kicker: "Research",
    title: "From articles to cases, the homepage should feel like a legal research gateway.",
    text: "The design keeps the animated premium feeling, but the content now explains what LexAzerbaijan actually does.",
    quote: "“Good design brings attention; good content gives that attention a reason to stay.”",
  },
];

export function CinematicHomepage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animate(".anime-word", {
      y: [34, 0],
      opacity: [0, 1],
      delay: stagger(70),
      duration: 800,
      easing: "outExpo",
    });

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".premium-panel").forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 56, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <PremiumMotionShell>
      <main ref={rootRef}>
        <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 py-24">
          <LegalOrbitCanvas />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-5 inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
              Legal articles • Case summaries • Discussions • LexAI
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl">
              {["A", "premium", "legal", "platform", "for", "Azerbaijan’s", "new", "legal", "generation."].map((word) => (
                <span key={word} className="anime-word mr-3 inline-block opacity-0">
                  {word}
                </span>
              ))}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62">
              LexAzerbaijan brings legal writing, case analysis, public discussion and AI-assisted research into one modern legal ecosystem.
            </p>

            <p className="mt-6 max-w-2xl border-l border-white/20 pl-5 text-base italic leading-7 text-white/55">
              “Law becomes stronger when knowledge is shared, challenged and developed together.”
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <motion.a whileHover={{ y: -3 }} href="/articles" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">
                Explore articles
              </motion.a>
              <motion.a whileHover={{ y: -3 }} href="/lexai" className="rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl">
                Ask LexAI
              </motion.a>
            </div>
          </div>
        </section>

        <section className="premium-panel px-6 py-20">
          <div className="mb-10 overflow-hidden border-y border-white/10 py-4">
            <div className="flex w-max animate-[marquee_24s_linear_infinite] gap-10 text-sm uppercase tracking-[0.35em] text-white/35">
              <span>Latest legal ideas</span>
              <span>Case analysis</span>
              <span>Legal discussions</span>
              <span>LexAI research</span>
              <span>Today’s legal terms</span>
              <span>Latest legal ideas</span>
              <span>Case analysis</span>
              <span>Legal discussions</span>
              <span>LexAI research</span>
              <span>Today’s legal terms</span>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
            {pillars.map((item, index) => (
              <motion.div key={item.title} whileHover={{ y: -8, scale: 1.015 }} className="premium-panel group rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:border-white/30 hover:shadow-[0_0_45px_rgba(255,255,255,0.08)]">
                <div className="mb-8 text-sm text-white/35">0{index + 1}</div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm italic leading-6 text-white/45">{item.quote}</p>
                <p className="mt-4 text-sm leading-6 text-white/58">{item.text}</p>
                <motion.a
                  whileHover={{ x: 4 }}
                  href={item.href}
                  className="mt-6 inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/75 transition hover:bg-white hover:text-black"
                >
                  {item.button}
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>


        <section className="px-6 pb-24">
          <div className="premium-panel mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl md:p-14">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/35">Today’s legal terms</p>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Learn one legal idea at a time.
                </h2>
              </div>
              <motion.a
                whileHover={{ y: -3 }}
                href="/articles"
                className="w-fit rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
              >
                Read related articles
              </motion.a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {legalTerms.map((item) => (
                <motion.div
                  key={item.term}
                  whileHover={{ y: -7 }}
                  className="premium-panel group rounded-[1.8rem] border border-white/10 bg-black/25 p-6 transition duration-300 hover:border-white/30 hover:shadow-[0_0_35px_rgba(255,255,255,0.08)]"
                >
                  <h3 className="text-2xl font-semibold text-white">{item.term}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/55">{item.meaning}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="premium-panel px-6 pb-24">
          <div className="sticky top-24 mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-8 backdrop-blur-xl md:p-14">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/35">Pinned research gateway</p>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Scroll through the legal ecosystem.
                </h2>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-3">
                {["Articles", "Cases", "Discussions", "LexAI"].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ y: -6 }}
                    className="min-w-[240px] rounded-[1.8rem] border border-white/10 bg-black/25 p-6"
                  >
                    <div className="text-2xl font-semibold">{item}</div>
                    <p className="mt-4 text-sm leading-6 text-white/55">
                      A focused entry point for legal research, writing and community discussion.
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="premium-panel px-6 pb-24">
          <div className="sticky top-24 mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-8 backdrop-blur-xl md:p-14">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/35">Pinned research gateway</p>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Scroll through the legal ecosystem.
                </h2>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-3">
                {["Articles", "Cases", "Discussions", "LexAI"].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ y: -6 }}
                    className="min-w-[240px] rounded-[1.8rem] border border-white/10 bg-black/25 p-6"
                  >
                    <div className="text-2xl font-semibold">{item}</div>
                    <p className="mt-4 text-sm leading-6 text-white/55">
                      A focused entry point for legal research, writing and community discussion.
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8 px-6 pb-28">
          {sections.map((section) => (
            <div key={section.title} className="premium-panel mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl md:p-14">
              <p className="text-sm uppercase tracking-[0.35em] text-white/35">{section.kicker}</p>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                {section.title}
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/58">{section.text}</p>
              <p className="mt-7 max-w-3xl border-l border-white/20 pl-5 text-base italic leading-7 text-white/48">
                {section.quote}
              </p>
            </div>
          ))}
        </section>
      </main>
    </PremiumMotionShell>
  );
}
