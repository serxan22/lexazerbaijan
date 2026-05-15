"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Scale, BookOpen, MessageSquareText, Landmark } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Articles",
    description: "Publish legal ideas, analysis, and research in a polished public space.",
    icon: BookOpen,
  },
  {
    title: "Discussions",
    description: "Exchange arguments, interpretations, and opinions with the legal community.",
    icon: MessageSquareText,
  },
  {
    title: "Cases",
    description: "Explore court decisions and understand legal reasoning through modern summaries.",
    icon: Landmark,
  },
];

export function PremiumScrollShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scaleRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      timeline
        .fromTo(
          titleRef.current,
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0.15, y: -90, scale: 0.94, ease: "power2.out" },
          0
        )
        .fromTo(
          scaleRef.current,
          {
            scale: 0.82,
            rotate: -3,
            y: 30,
            filter: "blur(0px)",
          },
          {
            scale: 1.35,
            rotate: 3,
            y: -40,
            filter: "blur(0px)",
            ease: "power2.out",
          },
          0
        )
        .fromTo(
          cardsRef.current,
          { opacity: 0, y: 120, scale: 0.92 },
          { opacity: 1, y: -10, scale: 1, ease: "power3.out" },
          0.45
        );

      gsap.from(".premium-feature-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 82%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden border-y border-white/10 bg-[#050505] text-white"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_20%_70%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(180deg,#050505,#090909_45%,#020202)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.025] blur-2xl" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
            Modern legal publishing for Azerbaijan
          </p>

          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
            Legal knowledge, transformed into a premium digital experience.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
            Scroll through a cinematic legal interface where articles, discussions,
            and cases become part of one intelligent platform.
          </p>
        </motion.div>

        <div
          ref={scaleRef}
          className="pointer-events-none absolute left-1/2 top-1/2 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] shadow-2xl shadow-white/10 backdrop-blur-2xl md:h-72 md:w-72"
        >
          <div className="absolute inset-5 rounded-full border border-white/10" />
          <Scale className="h-24 w-24 text-white/85 md:h-32 md:w-32" />
        </div>

        <div
          ref={cardsRef}
          className="mt-[34rem] grid w-full gap-5 md:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="premium-feature-card group rounded-[2rem] border border-white/12 bg-white/[0.075] p-7 text-left shadow-2xl shadow-black/40 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:bg-white/[0.105]"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                  <Icon className="h-6 w-6 text-white/85" />
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/62">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
