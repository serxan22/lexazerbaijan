"use client";

import { useEffect } from "react";
import { animate, utils } from "animejs";

export function PremiumAnimations() {
  useEffect(() => {
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

    const glow = document.querySelector(".cursor-glow") as HTMLElement | null;

    const onMouseMove = (e: MouseEvent) => {
      if (glow) {
        animate(glow, {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`,
          duration: 500,
          easing: "easeOutExpo",
        });
      }

      document.querySelectorAll<HTMLElement>(".article-card").forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      animate(".scroll-progress", {
        scaleX: progress,
        duration: 250,
        easing: "easeOutQuad",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    onScroll();

    const magneticItems = document.querySelectorAll<HTMLElement>(
      "button, a[href]"
    );

    magneticItems.forEach((item) => {
      item.addEventListener("mousemove", (event) => {
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
      });

      item.addEventListener("mouseleave", () => {
        animate(item, {
          translateX: 0,
          translateY: 0,
          duration: 450,
          easing: "easeOutExpo",
        });
      });
    });

    document.querySelectorAll<HTMLElement>(".article-card").forEach((card) => {
      utils.set(card, {
        "--radius": "14px",
      });

      card.addEventListener("mouseenter", () => {
        animate(card, {
          "--radius": "24px",
          scale: 1.015,
          duration: 350,
          easing: "easeOutExpo",
        });
      });

      card.addEventListener("mouseleave", () => {
        animate(card, {
          "--radius": "14px",
          scale: 1,
          duration: 350,
          easing: "easeOutExpo",
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" />
      <div className="premium-grid-bg" />
      <div className="premium-noise" />
      <div className="cursor-glow" />
      <div className="premium-orb premium-orb-one" />
      <div className="premium-orb premium-orb-two" />
    </>
  );
}
