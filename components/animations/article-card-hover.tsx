"use client";

import { useEffect } from "react";
import { animate, utils } from "animejs";

export function ArticleCardHover() {
  useEffect(() => {
    const cards = document.querySelectorAll(".article-card");

    cards.forEach((card) => {
      utils.set(card, {
        "--radius": "12px",
      });

      card.addEventListener("mouseenter", () => {
        animate(card, {
          "--radius": "24px",
          scale: 1.02,
          duration: 350,
          easing: "easeOutExpo",
        });
      });

      card.addEventListener("mouseleave", () => {
        animate(card, {
          "--radius": "12px",
          scale: 1,
          duration: 350,
          easing: "easeOutExpo",
        });
      });
    });
  }, []);

  return null;
}
