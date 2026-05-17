"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

export const homeEase = [0.22, 1, 0.36, 1] as const;

export const homeViewport = {
  once: false,
  amount: 0.22,
  margin: "0px 0px -8% 0px"
} as const;

export function useHomeMotion() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const media = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setIsMobile(media.matches);

    updateMobile();
    media.addEventListener("change", updateMobile);

    return () => {
      media.removeEventListener("change", updateMobile);
    };
  }, []);

  return {
    canAnimate: mounted && !reduceMotion,
    isMobile
  };
}

export function homeRevealVariants(options?: {
  y?: number;
  mobileY?: number;
  scale?: number;
  mobileScale?: number;
  blur?: number;
  mobileBlur?: number;
  isMobile?: boolean;
}): Variants {
  const isMobile = Boolean(options?.isMobile);

  return {
    hidden: {
      opacity: 0,
      y: isMobile ? options?.mobileY ?? 22 : options?.y ?? 36,
      scale: isMobile ? options?.mobileScale ?? 0.99 : options?.scale ?? 0.98,
      filter: `blur(${isMobile ? options?.mobileBlur ?? 7 : options?.blur ?? 10}px)`
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)"
    }
  };
}

export function HomeReveal({
  children,
  className,
  delay = 0,
  duration = 0.72,
  amount = 0.22,
  y,
  mobileY,
  scale,
  mobileScale,
  blur,
  mobileBlur
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number;
  y?: number;
  mobileY?: number;
  scale?: number;
  mobileScale?: number;
  blur?: number;
  mobileBlur?: number;
}) {
  const { canAnimate, isMobile } = useHomeMotion();

  return (
    <motion.div
      initial={canAnimate ? "hidden" : false}
      whileInView={canAnimate ? "visible" : undefined}
      viewport={{ ...homeViewport, amount }}
      variants={homeRevealVariants({ y, mobileY, scale, mobileScale, blur, mobileBlur, isMobile })}
      transition={{ delay, duration, ease: homeEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
