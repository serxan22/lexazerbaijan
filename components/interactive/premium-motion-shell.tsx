"use client";

import { ReactNode, useEffect, useState } from "react";
import Lenis from "lenis";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function PremiumMotionShell({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 80, damping: 22 });
  const y = useSpring(mouseY, { stiffness: 80, damping: 22 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setReduced(reduce || coarse);

    if (reduce || coarse) return;

    const lenis = new Lenis({
      duration: 0.8,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      onMouseMove={(e) => {
        if (reduced) return;
        mouseX.set(e.clientX - 180);
        mouseY.set(e.clientY - 180);
      }}
      className="relative overflow-hidden bg-[#050505] text-white"
    >
      <div className="pointer-events-none fixed inset-0 z-0 bg-[#050505]" />

      {!reduced && (
        <>
          <motion.div
            style={{ x, y }}
            className="pointer-events-none fixed z-0 h-[360px] w-[360px] rounded-full bg-white/[0.055] blur-3xl"
          />
          <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.13] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:34px_34px]" />
        </>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
