"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const homeEase = [0.22, 1, 0.36, 1] as const;

export const homeViewport = {
  once: false,
  amount: 0.25,
  margin: "0px 0px -12% 0px"
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
  hiddenOpacity?: number;
  mobileHiddenOpacity?: number;
  isMobile?: boolean;
}): Variants {
  const isMobile = Boolean(options?.isMobile);

  return {
    hidden: {
      opacity: isMobile ? options?.mobileHiddenOpacity ?? 0.9 : options?.hiddenOpacity ?? 0.86,
      y: isMobile ? options?.mobileY ?? 12 : options?.y ?? 18,
      scale: isMobile ? options?.mobileScale ?? 0.996 : options?.scale ?? 0.992,
      filter: `blur(${isMobile ? options?.mobileBlur ?? 0 : options?.blur ?? 0}px)`
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
  amount = homeViewport.amount,
  exitDelay = 220,
  y,
  mobileY,
  scale,
  mobileScale,
  blur,
  mobileBlur,
  hiddenOpacity,
  mobileHiddenOpacity
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number;
  exitDelay?: number;
  y?: number;
  mobileY?: number;
  scale?: number;
  mobileScale?: number;
  blur?: number;
  mobileBlur?: number;
  hiddenOpacity?: number;
  mobileHiddenOpacity?: number;
}) {
  const { canAnimate, isMobile } = useHomeMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    amount,
    margin: homeViewport.margin,
    once: false
  });
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (!canAnimate) {
      setShown(true);
      return;
    }

    if (inView) {
      setShown(true);
      return;
    }

    const timeout = window.setTimeout(() => {
      setShown(false);
    }, exitDelay);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [canAnimate, exitDelay, inView]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={canAnimate ? (shown ? "visible" : "hidden") : "visible"}
      variants={homeRevealVariants({
        y,
        mobileY,
        scale,
        mobileScale,
        blur,
        mobileBlur,
        hiddenOpacity,
        mobileHiddenOpacity,
        isMobile
      })}
      transition={{ delay, duration, ease: homeEase }}
      className={className}
      style={canAnimate ? { willChange: "transform, opacity" } : undefined}
    >
      {children}
    </motion.div>
  );
}
