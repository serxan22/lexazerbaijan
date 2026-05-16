"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function PremiumAnimations() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progress = document.querySelector<HTMLElement>(".scroll-progress");

    const updateProgress = () => {
      if (!progress) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      progress.style.transform = `scaleX(${value})`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    document.querySelectorAll<HTMLElement>(".article-card").forEach((card) => {
      const handleMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      };

      card.addEventListener("mousemove", handleMove);
      card.dataset.lexHover = "true";
    });

    let lenis: Lenis | null = null;
    let rafId = 0;

    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.12,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      rafId = window.requestAnimationFrame(raf);
    }

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (rafId) window.cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" />
      <div className="premium-grid-bg" aria-hidden="true" />
      <div className="premium-noise" aria-hidden="true" />
    </>
  );
}
