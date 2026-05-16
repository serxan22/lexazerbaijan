"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function AnimatedNewsletter({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.97, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="newsletter-shimmer" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
