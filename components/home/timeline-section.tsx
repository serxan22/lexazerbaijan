"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

type TimelineSectionProps = {
  children: ReactNode;
  align?: "left" | "right";
  index?: number;
};

export function TimelineSection({
  children,
  align = "left",
  index = 0,
}: TimelineSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-15% 0px -20% 0px",
  });

  const fromX = align === "left" ? -42 : 42;

  return (
    <div ref={ref} className="relative">
      <motion.span
        aria-hidden="true"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 0.45,
          delay: Math.min(index * 0.04, 0.2),
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-6 top-16 z-20 hidden h-4 w-4 -translate-x-1/2 rounded-full border border-white bg-slate-950 shadow-[0_0_0_8px_rgba(15,23,42,0.08)] md:block"
      />

      <motion.div
        initial={{ opacity: 0, x: fromX, y: 24, filter: "blur(10px)" }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
            : { opacity: 0, x: fromX, y: 24, filter: "blur(10px)" }
        }
        transition={{
          duration: 0.75,
          delay: Math.min(index * 0.05, 0.25),
          ease: [0.22, 1, 0.36, 1],
        }}
        className="md:pl-16"
      >
        {children}
      </motion.div>
    </div>
  );
}
