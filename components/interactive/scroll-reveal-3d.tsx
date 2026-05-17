"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ScrollReveal3DProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  rotateX?: number;
  rotateY?: number;
  scale?: number;
  amount?: number;
  hiddenOpacity?: number;
  blur?: number;
};

const revealEase = [0.22, 1, 0.36, 1] as const;

export function ScrollReveal3D({
  children,
  className,
  delay = 0,
  y = 34,
  rotateX = 5,
  rotateY = 0,
  scale = 0.982,
  amount = 0.18,
  hiddenOpacity = 0.88,
  blur = 3
}: ScrollReveal3DProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: hiddenOpacity,
        y,
        scale,
        rotateX,
        rotateY,
        filter: `blur(${blur}px)`
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        filter: "blur(0px)"
      }}
      viewport={{ once: false, amount, margin: "80px 0px -12% 0px" }}
      transition={{ duration: 0.76, delay, ease: revealEase }}
      style={{ transformPerspective: 1200, transformStyle: "preserve-3d", willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
