"use client";

import { MouseEvent, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ArticleCard } from "@/components/articles/article-card";

gsap.registerPlugin(ScrollTrigger);

type Locale = "en" | "az" | "ru";

type LatestSectionProps = {
  articles: any[];
  dictionary: any;
  locale: Locale;
};

export function LatestSection({ articles, dictionary, locale }: LatestSectionProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".latest-card-item");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 78%",
            end: "bottom 10%",
            once: false,
            onLeaveBack: () => {
              gsap.to(cards, {
                opacity: 0.3,
                y: -20,
                duration: 0.4,
                stagger: 0.06,
              });
            },
            onEnter: () => {
              gsap.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
              });
            },
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    event.currentTarget.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale(1.012)`;
  }

  function handleLeave(event: MouseEvent<HTMLDivElement>) {
    event.currentTarget.style.transform =
      "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div ref={gridRef} className="mt-10 grid gap-6 lg:grid-cols-3">
      {articles.map((article) => (
        <div
          key={article.id}
          className="latest-card-item"
          style={{ transition: "transform 0.3s ease" }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <ArticleCard
            article={article}
            dictionary={dictionary}
            locale={locale}
          />
        </div>
      ))}
    </div>
  );
}
