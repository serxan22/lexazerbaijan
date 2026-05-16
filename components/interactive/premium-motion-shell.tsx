"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export function PremiumMotionShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    let frame = 0;

    function raf(time: number) {
      frame = requestAnimationFrame(raf);
      lenis.raf(time);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[#050505]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
