"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";

export function PremiumMotionShell({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#050505] text-white">
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none fixed left-1/2 top-[-20%] z-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]"
      />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(148,163,184,0.12),transparent_30%),linear-gradient(180deg,#050505,#09090b_45%,#020202)]" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
