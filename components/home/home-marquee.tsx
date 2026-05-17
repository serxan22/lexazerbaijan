"use client";

import { HomeReveal } from "@/components/home/home-motion";

type HomeMarqueeProps = {
  phrases: readonly string[];
};

export function HomeMarquee({ phrases }: HomeMarqueeProps) {
  const loop = [...phrases, ...phrases];

  return (
    <HomeReveal y={16} mobileY={10} scale={0.995} mobileScale={1} blur={0} mobileBlur={0} amount={0.35} hiddenOpacity={0.92} mobileHiddenOpacity={0.95}>
      <div className="relative overflow-hidden border-y border-[#d9c79f]/60 bg-[#fffaf0]/70 py-4 text-[#1b2230] shadow-[0_16px_60px_rgba(15,23,42,0.05)] backdrop-blur dark:border-[#b8894a]/20 dark:bg-[#07111f]/75 dark:text-[#f8fafc]">
        <div className="home-marquee-track flex w-max items-center gap-5 px-5">
          {loop.map((phrase, index) => (
            <span
              key={`${phrase}-${index}`}
              className="inline-flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#6f5730] dark:text-[#dec18f]"
            >
              {phrase}
              <span className="h-1.5 w-1.5 rounded-full bg-[#b8894a]" />
            </span>
          ))}
        </div>

        <style jsx>{`
          .home-marquee-track {
            animation: home-marquee 34s linear infinite;
          }

          @keyframes home-marquee {
            from {
              transform: translate3d(0, 0, 0);
            }

            to {
              transform: translate3d(-50%, 0, 0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .home-marquee-track {
              animation: none;
              transform: translate3d(0, 0, 0);
            }
          }
        `}</style>
      </div>
    </HomeReveal>
  );
}
