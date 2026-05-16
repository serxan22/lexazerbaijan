"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const featured = [
  {
    title: "AI and Criminal Liability",
    cat: "Technology Law",
    href: "/articles",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Corporate Governance in Emerging Markets",
    cat: "Corporate Law",
    href: "/articles",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "European Court Case Notes",
    cat: "Cases",
    href: "/cases",
    img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1400&auto=format&fit=crop",
  },
];

const blocks = [
  ["Articles", "Long-form legal analysis and academic writing.", "/articles"],
  ["Cases", "US, ECHR and EU case summaries in one place.", "/cases"],
  ["Discussions", "Debate legal gaps, reforms and interpretations.", "/discussions"],
  ["Today’s Terms", "Learn legal concepts with clean explanations.", "/articles"],
];

export function LuxuryLegalMagazineHomepage() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ duration: 0.9, smoothWheel: true, wheelMultiplier: 0.9 });
    let frame = 0;

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <section className="px-5 pt-28 md:px-10">
        <div className="mx-auto max-w-7xl border-b border-white/10 pb-10">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.45em] text-white/40"
          >
            LexAzerbaijan Magazine
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-8 max-w-6xl text-6xl font-semibold uppercase leading-[0.9] tracking-[-0.075em] md:text-[8.5rem]"
          >
            Legal stories for research, practice and public debate.
          </motion.h1>

          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_0.45fr] md:items-end">
            <p className="max-w-2xl text-lg leading-8 text-white/58">
              A premium legal platform for articles, case summaries, discussions and AI-assisted research.
            </p>
            <Link
              href="/articles"
              className="w-fit rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.03]"
            >
              Read articles
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Swiper slidesPerView={1.08} spaceBetween={18} breakpoints={{ 768: { slidesPerView: 2.15 }, 1100: { slidesPerView: 3 } }}>
            {featured.map((item) => (
              <SwiperSlide key={item.title}>
                <Link href={item.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white/5">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 33vw"
                      className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-0 p-7">
                      <p className="text-xs uppercase tracking-[0.35em] text-white/45">{item.cat}</p>
                      <h2 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-[-0.05em]">{item.title}</h2>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {blocks.map(([title, text, href], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={href}
                className="group flex min-h-[300px] flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.075]"
              >
                <span className="text-sm text-white/35">0{i + 1}</span>
                <div>
                  <h3 className="text-3xl font-semibold tracking-[-0.04em]">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/55">{text}</p>
                  <span className="mt-6 inline-flex text-sm font-semibold text-white/70 group-hover:text-white">
                    Open →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-28 md:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden border-y border-white/10 py-5">
          <div className="flex w-max animate-[lex-marquee_24s_linear_infinite] gap-12 text-sm uppercase tracking-[0.35em] text-white/35">
            <span>Legal articles</span><span>Case summaries</span><span>Discussions</span><span>LexAI</span><span>Today’s legal terms</span>
            <span>Legal articles</span><span>Case summaries</span><span>Discussions</span><span>LexAI</span><span>Today’s legal terms</span>
          </div>
        </div>
      </section>
    </main>
  );
}
