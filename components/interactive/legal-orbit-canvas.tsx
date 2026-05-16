"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function LegalOrbitCanvas() {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.35], [0.82, 1.22]);
  const rotate = useTransform(scrollYProgress, [0, 0.35], [-10, 8]);
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.42], [0.4, 0.82, 0.2]);
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 90]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ scale, rotate, opacity, y }}
        className="absolute left-1/2 top-[14%] h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-white/15 bg-[radial-gradient(circle,rgba(255,255,255,0.16),rgba(255,255,255,0.035)_42%,transparent_70%)] blur-0 md:h-[560px] md:w-[560px]"
      />

      <motion.div
        style={{ scale, rotate, opacity }}
        className="absolute left-1/2 top-[21%] h-[260px] w-[260px] -translate-x-1/2 rounded-full border border-white/20 md:h-[360px] md:w-[360px]"
      />

      <motion.div
        style={{ y, opacity }}
        className="absolute left-1/2 top-[32%] -translate-x-1/2 text-center"
      >
        <div className="text-[11px] uppercase tracking-[0.65em] text-white/35">
          LexAzerbaijan
        </div>
        <div className="mt-5 h-px w-[280px] bg-gradient-to-r from-transparent via-white/40 to-transparent md:w-[520px]" />
        <div className="mt-6 text-5xl font-semibold tracking-[-0.08em] text-white/10 md:text-8xl">
          Law • Ideas • Cases
        </div>
      </motion.div>
    </div>
  );
}
