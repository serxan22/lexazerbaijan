"use client";

import { motion } from "framer-motion";

type AnimatedSectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  className?: string;
};

export function AnimatedSectionHeading({
  eyebrow,
  title,
  body,
  className = "max-w-2xl",
}: AnimatedSectionHeadingProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-950 dark:text-white">
        {title}
      </h2>
      {body ? <p className="mt-4 text-slate-600 dark:text-slate-300">{body}</p> : null}
    </motion.div>
  );
}
