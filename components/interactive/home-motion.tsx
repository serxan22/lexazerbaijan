"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 58,
    scale: 0.985,
    filter: "blur(14px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: EASE,
      staggerChildren: 0.1,
    },
  },
};

const softSectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 42,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.82,
      ease: EASE,
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 38,
    scale: 0.965,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

export function TermsMotionFrame({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.22, margin: "-8% 0px -8% 0px" }}
      variants={sectionVariants}
      className="relative isolate overflow-hidden"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-[#D4A35A]/8 blur-3xl" />
      <motion.div variants={softSectionVariants} className="relative z-10">
        {children}
      </motion.div>
    </motion.div>
  );
}

export function FeaturedMotionSection({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.18, margin: "-8% 0px -8% 0px" }}
      variants={sectionVariants}
      className="section-shell relative isolate overflow-hidden bg-slate-50"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-28 bg-gradient-to-b from-[#040816]/12 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(212,163,90,0.13),transparent_26%),radial-gradient(circle_at_86%_50%,rgba(45,70,160,0.10),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:54px_54px]" />
      {children}
    </motion.section>
  );
}

export function FeaturedHeaderMotion({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={softSectionVariants}>
      {children}
    </motion.div>
  );
}

export function FeaturedCardMotion({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -8,
        scale: 1.012,
        transition: { duration: 0.32, ease: EASE },
      }}
      className="group relative"
    >
      <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-[#D4A35A]/0 via-[#D4A35A]/0 to-blue-900/0 opacity-0 blur-2xl transition duration-700 group-hover:from-[#D4A35A]/12 group-hover:to-blue-900/10 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}
