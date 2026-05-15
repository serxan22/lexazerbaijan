"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Landmark, MessageSquareText, Scale } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Articles",
    description:
      "Publish legal ideas, case notes, opinions, and research in a polished public space.",
    icon: BookOpen,
  },
  {
    title: "Discussions",
    description:
      "Debate legal questions, compare arguments, and build a serious legal community.",
    icon: MessageSquareText,
  },
  {
    title: "Cases",
    description:
      "Explore judgments, legal reasoning, and case summaries in one modern platform.",
    icon: Landmark,
  },
];

export function PremiumScrollShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLDivElement | null>(null);
  const scaleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(introRef.current, { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(cardsRef.current, { autoAlpha: 0, y: 48, scale: 0.98 });
      gsap.set(finalRef.current, { autoAlpha: 0, y: 48, scale: 0.98 });
      gsap.set(scaleRef.current, {
        autoAlpha: 0.9,
        y: 40,
        scale: 0.82,
        rotate: -4,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".premium-scroll-sticky",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        scaleRef.current,
        {
          y: 0,
          scale: 1,
          rotate: 0,
          autoAlpha: 1,
          ease: "none",
        },
        0
      )
        .to(
          introRef.current,
          {
            y: -80,
            scale: 0.96,
            autoAlpha: 0,
            ease: "none",
          },
          0.18
        )
        .to(
          cardsRef.current,
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "none",
          },
          0.28
        )
        .to(
          scaleRef.current,
          {
            y: -120,
            scale: 0.72,
            autoAlpha: 0.16,
            ease: "none",
          },
          0.45
        )
        .to(
          cardsRef.current,
          {
            y: -80,
            scale: 0.97,
            autoAlpha: 0,
            ease: "none",
          },
          0.62
        )
        .to(
          finalRef.current,
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "none",
          },
          0.74
        );

      gsap.fromTo(
        ".premium-card",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=280 top",
            end: "top+=900 top",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] overflow-clip bg-[#050816] text-white"
    >
      <div className="premium-scroll-sticky sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(84,110,255,0.22),transparent_20%),radial-gradient(circle_at_70%_70%,rgba(84,110,255,0.10),transparent_24%),linear-gradient(180deg,#050816_0%,#07102a_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_58%,rgba(5,8,22,0.35)_100%)]" />

        <div
          ref={scaleRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] shadow-2xl shadow-blue-950/40 backdrop-blur-2xl md:h-80 md:w-80"
        >
          <div className="absolute inset-5 rounded-full border border-white/10" />
          <div className="absolute inset-10 rounded-full bg-white/[0.05] blur-xl" />
          <Scale className="relative h-24 w-24 text-white/85 md:h-36 md:w-36" />
        </div>

        <div
          ref={introRef}
          className="absolute inset-0 z-30 flex items-center justify-center px-6"
        >
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/75 backdrop-blur-xl">
              Modern legal publishing for Azerbaijan
            </p>

            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
              Legal knowledge, transformed into a premium digital experience.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              Scroll down to discover articles, discussions, and case exploration
              through a cinematic legal interface.
            </p>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="absolute inset-0 z-40 flex items-center justify-center px-6"
        >
          <div className="grid w-full max-w-6xl gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="premium-card rounded-[2rem] border border-white/12 bg-white/[0.10] p-7 text-left shadow-2xl shadow-black/40 backdrop-blur-2xl"
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
        </div>

        <div
          ref={finalRef}
          className="absolute inset-0 z-50 flex items-center justify-center px-6"
        >
          <div className="w-full max-w-4xl rounded-[2.2rem] border border-white/12 bg-white/[0.10] p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-12">
            <p className="text-sm uppercase tracking-[0.32em] text-white/45">
              LexAzerbaijan
            </p>

            <h2 className="mt-5 text-balance text-3xl font-semibold text-white md:text-5xl">
              One platform for legal writing, dialogue, and discovery.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/62 md:text-base">
              Designed for students, researchers, lawyers, and legal minds who want
              their ideas to be visible, searchable, and useful for the wider community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
