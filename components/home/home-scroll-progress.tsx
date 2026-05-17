"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform } from "framer-motion";

export function HomeScrollProgress() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      aria-hidden="true"
      className="homepage-scroll-progress pointer-events-none fixed left-0 top-[var(--site-header-height)] z-[998] h-[2px] w-full origin-left bg-[linear-gradient(90deg,#b8894a,#f4dfac,#264870)]"
      style={{ scaleX: progressScale }}
    />,
    document.body
  );
}
