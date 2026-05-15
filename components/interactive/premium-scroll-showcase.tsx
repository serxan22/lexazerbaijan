"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { BookOpen, Landmark, MessageSquareText, Scale, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Articles",
    description: "Publish legal ideas, case notes, opinions, and research in a polished public space.",
    icon: BookOpen,
  },
  {
    title: "Discussions",
    description: "Debate legal questions, compare arguments, and build a serious legal community.",
    icon: MessageSquareText,
  },
  {
    title: "Cases",
    description: "Explore judgments, legal reasoning, and case summaries in one modern platform.",
    icon: Landmark,
  },
];

export function PremiumScrollShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const scaleRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      gsap.set(featuresRef.current, { opacity: 0, y: 130, scale: 0.96 });
      gsap.set(finalRef.current, { opacity: 0, y: 120, scale: 0.96 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2600",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          introRef.current,
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0.12, y: -120, scale: 0.92, ease: "power2.out" },
          0
        )
        .fromTo(
          scaleRef.current,
          { opacity: 0.22, scale: 0.75, rotate: -5, y: 70 },
          { opacity: 1, scale: 1.2, rotate: 0, y: -10, ease: "power2.out" },
          0
        )
        .to(
          scaleRef.current,
          { scale: 0.82, opacity: 0.28, y: -190, rotate: 5, ease: "power2.inOut" },
          0.38
        )
        .to(
          featuresRef.current,
          { opacity: 1, y: 0, scale: 1, ease: "power3.out" },
          0.34
        )
        .to(
          featuresRef.current,
          { opacity: 0.16, y: -120, scale: 0.96, ease: "power2.inOut" },
          0.68
        )
        .to(
          finalRef.current,
          { opacity: 1, y: 0, scale: 1, ease: "power3.out" },
          0.72
        );

      gsap.from(".premium-feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden bg-[#050505] text-white"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,#050505,#090909_48%,#020202)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.025] blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-24">
        <motion.div
          ref={introRef}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="relative z-20 mx-auto max-w-5xl text-center"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/72 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Modern legal publishing for Azerbaijan
          </p>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
            Legal knowledge, transformed into a premium digital experience.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/64 md:text-lg">
            Scroll down to discover articles, discussions, and case exploration through
            a cinematic legal interface built for the next generation of lawyers.
          </p>
        </motion.div>

        <div
          ref={scaleRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] shadow-2xl shadow-white/10 backdrop-blur-2xl md:h-80 md:w-80"
        >
          <div className="absolute inset-5 rounded-full border border-white/10" />
          <div className="absolute inset-10 rounded-full bg-white/[0.045] blur-xl" />
          <Scale className="relative h-24 w-24 text-white/85 md:h-36 md:w-36" />
        </div>

        <div
          ref={featuresRef}
          className="absolute left-1/2 top-1/2 z-30 grid w-[min(1120px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 gap-5 md:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="premium-feature-card group rounded-[2rem] border border-white/12 bg-white/[0.085] p-7 text-left shadow-2xl shadow-black/40 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:bg-white/[0.12]"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                  <Icon className="h-6 w-6 text-white/85" />
                </div>

                <h2 className="text-2xl font-semibold text-white">
                  {feature.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/64">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div
          ref={finalRef}
          className="absolute left-1/2 top-1/2 z-40 w-[min(900px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-[2.3rem] border border-white/12 bg-white/[0.08] p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-12"
        >
          <p className="text-sm uppercase tracking-[0.32em] text-white/45">
            LexAzerbaijan
          </p>

          <h2 className="mt-5 text-balance text-3xl font-semibold text-white md:text-5xl">
            One platform for legal writing, dialogue, and discovery.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/62 md:text-base">
            Designed for students, researchers, lawyers, and legal minds who want their
            ideas to be visible, searchable, and useful for the wider community.
          </p>
        </div>
      </div>
    </section>
  );
}
