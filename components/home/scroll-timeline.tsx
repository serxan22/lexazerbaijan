"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ScrollTimelineProps = {
  children: ReactNode;
};

export function ScrollTimeline({ children }: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      <div
        aria-hidden="true"
        className="absolute left-6 top-0 hidden h-full w-px overflow-hidden bg-slate-200 md:block"
      >
        <motion.div style={{ height: lineHeight }} className="w-full bg-slate-950" />
      </div>

      {children}
    </div>
  );
}
