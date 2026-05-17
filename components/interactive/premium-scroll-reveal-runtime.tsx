"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = [
  "main .article-card",
  "main .discussion-card",
  "main .case-card",
  "main .lexai-card",
  "main .premium-surface:not(.sticky)",
  "main .premium-panel:not(.sticky)",
  "main [data-premium-reveal]"
].join(",");

export function PremiumScrollRevealRuntime() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) return;

    const seen = new WeakSet<Element>();
    let revealIndex = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.classList.add("is-visible");
            return;
          }

          const rect = element.getBoundingClientRect();
          const safelyOutside = rect.bottom < -160 || rect.top > window.innerHeight + 180;

          if (safelyOutside) {
            element.classList.remove("is-visible");
          }
        });
      },
      {
        rootMargin: "120px 0px -8% 0px",
        threshold: [0, 0.12, 0.28]
      }
    );

    const bindElements = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        if (seen.has(element)) return;
        if (element.closest("[data-homepage-root]")) return;
        if (element.closest(".article-prose, .ProseMirror, header, footer")) return;
        if (element.matches("[data-no-premium-reveal]")) return;

        seen.add(element);
        element.classList.add("premium-scroll-reveal");
        element.style.setProperty("--premium-reveal-delay", `${Math.min(revealIndex % 6, 5) * 42}ms`);
        revealIndex += 1;
        observer.observe(element);
      });
    };

    const mutationObserver = new MutationObserver(bindElements);

    bindElements();
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
