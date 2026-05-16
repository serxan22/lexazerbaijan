"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { PremiumMotionShell } from "@/components/interactive/premium-motion-shell";
import { LegalOrbitCanvas } from "@/components/interactive/legal-orbit-canvas";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  "Legal articles",
  "Case summaries",
  "AI legal assistant",
  "Multilingual discussion",
];

export function CinematicHomepage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animate(".anime-word", {
      y: [42, 0],
      opacity: [0, 1],
      delay: stagger(90),
      duration: 950,
      easing: "outExpo",
    });

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".premium-panel").forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 90, scale: 0.96, filter: "blur(14px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 82%",
              end: "bottom 55%",
              scrub: 0.7,
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
              Premium legal knowledge platform
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl">
              {["A", "cinematic", "legal", "platform", "for", "modern", "lawyers."].map((word) => (
                <span key={word} className="anime-word mr-3 inline-block opacity-0">
                  {word}
                </span>
              ))}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62">
              LexAzerbaijan brings legal articles, discussions, cases and AI assistance into one
              elegant research experience.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <motion.a
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/articles"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
              >
                Explore articles
              </motion.a>

              <motion.a
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/lexai"
                className="rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl"
              >
                Ask LexAI
              </motion.a>
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
            {cards.map((card, index) => (
              <motion.div
                key={card}
                whileHover={{ y: -8, scale: 1.025 }}
                className="premium-panel rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl"
              >
                <div className="mb-10 text-sm text-white/35">0{index + 1}</div>
                <h3 className="text-xl font-semibold text-white">{card}</h3>
                <p className="mt-4 text-sm leading-6 text-white/55">
                  Smooth motion, clean hierarchy and premium legal-tech feeling.
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-28">
          <div className="premium-panel mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl md:p-14">
            <p className="text-sm uppercase tracking-[0.35em] text-white/35">Next generation</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Scroll-driven legal experience with Anime.js, GSAP, Framer Motion, Lenis and Three.js.
            </h2>
          </div>
        </section>
      </main>
    </PremiumMotionShell>
  );
}
