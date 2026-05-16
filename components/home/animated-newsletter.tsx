"use client";

import { motion } from "framer-motion";

type AnimatedNewsletterProps = {
  children: React.ReactNode;
  className?: string;
};

export function AnimatedNewsletter({ children, className = "" }: AnimatedNewsletterProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.97, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="newsletter-shimmer" />
      {children}
    </motion.div>
  );
}
