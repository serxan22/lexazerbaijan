"use client";

import { useEffect } from "react";
import { animate, utils } from "animejs";

export function PremiumAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (reduceMotion) return;

    animate("main", {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 700,
      easing: "easeOutExpo",
    });

    animate("h1", {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 900,
      easing: "easeOutExpo",
    });

    const articleCards = Array.from(document.querySelectorAll<HTMLElement>(".article-card"));
    const cleanupHandlers: Array<() => void> = [];

    const onMouseMove = (e: MouseEvent) => {
      articleCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    };

    if (finePointer) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    const magneticItems = document.querySelectorAll<HTMLElement>(
      "button, a[href]"
    );

    if (finePointer) {
      magneticItems.forEach((item) => {
        if (item.closest(".header-search-shell, .profile-menu-shell") || item.matches(".premium-theme-toggle")) return;

        const handleMove = (event: MouseEvent) => {
          if (item.closest("input, textarea, select, [contenteditable='true']")) return;

          const e = event as MouseEvent;
          const rect = item.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.12;

          animate(item, {
            translateX: x,
            translateY: y,
            duration: 350,
            easing: "easeOutExpo",
          });
        };

        const handleLeave = () => {
          animate(item, {
            translateX: 0,
            translateY: 0,
            duration: 450,
            easing: "easeOutExpo",
          });
        };

        item.addEventListener("mousemove", handleMove);
        item.addEventListener("mouseleave", handleLeave);
        cleanupHandlers.push(() => {
          item.removeEventListener("mousemove", handleMove);
          item.removeEventListener("mouseleave", handleLeave);
        });
      });
    }

    articleCards.forEach((card) => {
      utils.set(card, {
        "--radius": "14px",
      });

      const handleEnter = () => {
        animate(card, {
          "--radius": "24px",
          scale: 1.015,
          duration: 350,
          easing: "easeOutExpo",
        });
      };

      const handleLeave = () => {
        animate(card, {
          "--radius": "14px",
          scale: 1,
          duration: 350,
          easing: "easeOutExpo",
        });
      };

      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);
      cleanupHandlers.push(() => {
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cleanupHandlers.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      <div className="premium-grid-bg" />
      <div className="premium-noise" />
      <div className="cursor-glow" />
      <div className="premium-orb premium-orb-one" />
      <div className="premium-orb premium-orb-two" />
    </>
  );
}
