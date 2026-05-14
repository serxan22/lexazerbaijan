"use client";

import { useEffect } from "react";
import { animate, stagger } from "animejs";

export function ArticleCardsAnimation() {
  useEffect(() => {
    animate(".article-card", {
      opacity: [0, 1],
      translateY: [40, 0],
      delay: stagger(120),
      duration: 1200,
      easing: "easeOutExpo",
    });
  }, []);

  return null;
}
