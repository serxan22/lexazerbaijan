"use client";

import { useLayoutEffect } from "react";

export function HomeScrollStorytelling() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-homepage-root]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!root || reduceMotion.matches) return;

    const rootElement = root;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const y = isMobile ? 22 : 42;
    const blur = isMobile ? 3 : 10;
    const rotateX = isMobile ? 0 : 5;
    let cleanup: (() => void) | undefined;
    let mounted = true;

    async function setupStorytelling() {
      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (!mounted) return;

      const gsap = gsapModule.gsap;
      const { ScrollTrigger } = scrollTriggerModule;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const storyItems = gsap.utils.toArray<HTMLElement>("[data-story]:not([data-story-card])");

        storyItems.forEach((element) => {
          gsap.fromTo(
            element,
            {
              autoAlpha: 0,
              y,
              scale: isMobile ? 0.985 : 0.972,
              rotateX,
              filter: `blur(${blur}px)`,
              transformPerspective: 1200,
              transformOrigin: "center top",
              willChange: "transform, opacity"
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 0.68,
              ease: "power3.out",
              force3D: true,
              immediateRender: false,
              overwrite: "auto",
              scrollTrigger: {
                trigger: element,
                start: "top 84%",
                end: "bottom 16%",
                markers: false,
                toggleActions: "play reverse play reverse"
              }
            }
          );
        });

        const storyGroups = gsap.utils.toArray<HTMLElement>("[data-story-group]");

        storyGroups.forEach((group) => {
          const cards = gsap.utils.toArray<HTMLElement>(group.querySelectorAll("[data-story-card]"));

          if (!cards.length) return;

          gsap.fromTo(
            cards,
            {
              autoAlpha: 0,
              y: isMobile ? 18 : 34,
              scale: isMobile ? 0.99 : 0.975,
              rotateX: isMobile ? 0 : 4,
              filter: `blur(${isMobile ? 0 : 6}px)`,
              transformPerspective: 1200,
              transformOrigin: "center top",
              willChange: "transform, opacity"
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 0.82,
              ease: "power3.out",
              force3D: true,
              immediateRender: false,
              stagger: isMobile ? 0.04 : 0.08,
              overwrite: "auto",
              scrollTrigger: {
                trigger: group,
                start: "top 82%",
                end: "bottom 18%",
                markers: false,
                toggleActions: "play reverse play reverse"
              }
            }
          );
        });

        const parallaxItems = gsap.utils.toArray<HTMLElement>("[data-story-parallax]");

        parallaxItems.forEach((element) => {
          const section = element.closest<HTMLElement>("[data-story-section]") ?? element;

          gsap.to(element, {
            yPercent: Number(element.dataset.storyParallaxY ?? -9),
            rotate: Number(element.dataset.storyParallaxRotate ?? 0),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              markers: false
            }
          });
        });

        ScrollTrigger.refresh();
      }, rootElement);

      cleanup = () => ctx.revert();
    }

    setupStorytelling();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, []);

  return null;
}
