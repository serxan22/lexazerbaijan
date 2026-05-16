"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ArticleCard } from "@/components/articles/article-card";

gsap.registerPlugin(ScrollTrigger);

type FeaturedSectionProps = {
  featured: any[];
  dictionary: any;
  locale: string;
};

export function FeaturedSection({ featured, dictionary, locale }: FeaturedSectionProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".article-card-item");

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

  return (
    <div ref={gridRef} className="mt-10 grid gap-6 lg:grid-cols-3">
      {featured.map((article) => (
        <div key={article.id} className="article-card-item">
          <ArticleCard
            article={article}
            featured
            dictionary={dictionary}
            locale={locale}
          />
        </div>
      ))}
    </div>
  );
}
