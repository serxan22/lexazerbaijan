"use client";

import { useEffect } from "react";

export function LenisSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");

    if (reduceMotion.matches || coarsePointer.matches) return;

    let cleanup: (() => void) | undefined;
    let mounted = true;

    async function setupLenis() {
      const [{ default: Lenis }, gsapModule, scrollTriggerModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (!mounted) return;

      const gsap = gsapModule.gsap;
      const { ScrollTrigger } = scrollTriggerModule;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.08,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.05
      });

      const updateScrollTrigger = () => ScrollTrigger.update();
      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };

      lenis.on("scroll", updateScrollTrigger);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    }

    setupLenis();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, []);

  return null;
}
