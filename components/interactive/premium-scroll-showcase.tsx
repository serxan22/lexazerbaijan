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
      lerp: 0.08,
      smoothWheel: true,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      gsap.set(introRef.current, { opacity: 1, y: 0, scale: 1 });
      gsap.set(scaleRef.current, { opacity: 0.9, y: 150, scale: 0.82, rotate: -5 });
      gsap.set(featuresRef.current, { opacity: 0, y: 80, scale: 0.98 });
      gsap.set(finalRef.current, { opacity: 0, y: 80, scale: 0.98 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2100",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          scaleRef.current,
          {
            y: 0,
            scale: 1.04,
            rotate: 0,
            opacity: 1,
            ease: "power2.out",
          },
          0
        )
        .to(
          introRef.current,
          {
            y: -95,
            scale: 0.94,
            opacity: 0.2,
            ease: "power2.out",
          },
          0.08
        )
        .to(
          featuresRef.current,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power3.out",
          },
          0.22
        )
        .to(
          scaleRef.current,
          {
            y: -170,
            scale: 0.72,
            opacity: 0.22,
            rotate: 4,
            ease: "power2.inOut",
          },
          0.36
        )
        .to(
          featuresRef.current,
          {
            y: -105,
            scale: 0.96,
            opacity: 0.18,
            ease: "power2.inOut",
          },
          0.66
        )
        .to(
          finalRef.current,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power3.out",
          },
          0.72
        );

      gsap.fromTo(
        ".premium-feature-card",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 82%",
          },
        }
      );
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(frame);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden bg-[#050505] text-white"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(180deg,#050505,#090909_48%,#020202)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-45" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.025] blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-20">
        <motion.div
          ref={introRef}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative z-30 mx-auto max-w-5xl text-center"
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
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] shadow-2xl shadow-white/10 backdrop-blur-2xl md:h-80 md:w-80"
        >
          <div className="absolute inset-5 rounded-full border border-white/10" />
          <div className="absolute inset-10 rounded-full bg-white/[0.05] blur-xl" />
          <Scale className="relative h-24 w-24 text-white/85 md:h-36 md:w-36" />
        </div>

        <div
          ref={featuresRef}
          className="absolute left-1/2 top-1/2 z-40 grid w-[min(1120px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 gap-5 md:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="premium-feature-card group rounded-[2rem] border border-white/12 bg-white/[0.095] p-7 text-left shadow-2xl shadow-black/40 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:bg-white/[0.13]"
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
          className="absolute left-1/2 top-1/2 z-50 w-[min(900px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-[2.3rem] border border-white/12 bg-white/[0.09] p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-12"
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
