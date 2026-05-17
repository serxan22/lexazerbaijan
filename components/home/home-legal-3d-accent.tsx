"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Bot, Landmark, Scale } from "lucide-react";
import { useEffect } from "react";

import { useHomeMotion } from "@/components/home/home-motion";
import { cn } from "@/lib/utils";

type HomeLegal3DAccentProps = {
  variant?: "scales" | "orb" | "seal";
  className?: string;
  intensity?: number;
};

export function HomeLegal3DAccent({
  variant = "scales",
  className,
  intensity = 1
}: HomeLegal3DAccentProps) {
  const { canAnimate, isMobile } = useHomeMotion();
  const { scrollYProgress } = useScroll();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerY, { stiffness: 70, damping: 28, mass: 0.45 });
  const rotateY = useSpring(pointerX, { stiffness: 70, damping: 28, mass: 0.45 });
  const scrollRotate = useTransform(scrollYProgress, [0, 1], variant === "orb" ? [-7, 9] : [8, -9]);
  const scrollY = useTransform(scrollYProgress, [0, 1], variant === "seal" ? [22, -24] : [-16, 24]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.48, 1], [0.96, 1.035, 0.985]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.18, 0.86, 1], [0.56, 0.86, 0.72, 0.44]);

  useEffect(() => {
    if (!canAnimate || isMobile) return;

    const updatePointer = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 5 * intensity;
      const y = (0.5 - event.clientY / window.innerHeight) * 4 * intensity;

      pointerX.set(x);
      pointerY.set(y);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      window.removeEventListener("pointermove", updatePointer);
    };
  }, [canAnimate, intensity, isMobile, pointerX, pointerY]);

  if (isMobile) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute z-0 hidden h-48 w-48 md:block [perspective:900px]", className)}
      style={
        canAnimate
          ? {
              rotateX,
              rotateY,
              rotateZ: scrollRotate,
              y: scrollY,
              scale: scrollScale,
              opacity: scrollOpacity,
              willChange: "transform, opacity"
            }
          : undefined
      }
    >
      <div className="relative h-full w-full [transform-style:preserve-3d]">
        {variant === "orb" ? <OrbAccent canAnimate={canAnimate} /> : null}
        {variant === "seal" ? <SealAccent canAnimate={canAnimate} /> : null}
        {variant === "scales" ? <ScalesAccent canAnimate={canAnimate} /> : null}
      </div>
    </motion.div>
  );
}

function ScalesAccent({ canAnimate }: { canAnimate: boolean }) {
  return (
    <>
      <div className="absolute inset-4 rounded-full border border-[#c7aa73]/45 bg-[#fff8e8]/45 shadow-[0_22px_54px_rgba(184,137,74,0.18)] backdrop-blur-sm dark:border-[#b8894a]/35 dark:bg-[#06101d]/58 dark:shadow-[0_22px_54px_rgba(184,137,74,0.12)]" />
      <div className="absolute inset-10 rounded-full border border-[#b8894a]/35 bg-[radial-gradient(circle_at_35%_25%,rgba(255,238,192,0.72),rgba(184,137,74,0.16)_40%,rgba(7,17,31,0.02)_70%)] dark:bg-[radial-gradient(circle_at_35%_25%,rgba(241,215,157,0.26),rgba(184,137,74,0.12)_42%,rgba(7,17,31,0.22)_72%)]" />
      <div className="absolute left-1/2 top-11 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-[#f1d79d] via-[#b8894a] to-transparent" />
      <div className="absolute left-[23%] right-[23%] top-[43%] h-px bg-gradient-to-r from-transparent via-[#b8894a] to-transparent" />
      <div className="absolute left-[26%] top-[47%] h-8 w-px bg-[#b8894a]/60" />
      <div className="absolute right-[26%] top-[47%] h-8 w-px bg-[#b8894a]/60" />
      <div
        className="absolute left-[13%] top-[63%] h-7 w-16 rounded-[50%] border border-[#b8894a]/50 bg-[#fff8e8]/75 shadow-[0_18px_35px_rgba(184,137,74,0.16)] dark:bg-[#0b1728]/75"
        style={{ transform: "translateZ(30px) rotateX(62deg)" }}
      />
      <div
        className="absolute right-[13%] top-[63%] h-7 w-16 rounded-[50%] border border-[#b8894a]/50 bg-[#fff8e8]/75 shadow-[0_18px_35px_rgba(184,137,74,0.16)] dark:bg-[#0b1728]/75"
        style={{ transform: "translateZ(30px) rotateX(62deg)" }}
      />
      <div
        className="absolute left-1/2 top-[26%] flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border border-[#f1d79d]/70 bg-[#111827] text-[#f1d79d] shadow-[0_14px_34px_rgba(17,24,39,0.22)]"
        style={{ transform: "translateX(-50%) translateZ(46px)" }}
      >
        <Scale className="h-7 w-7" />
      </div>
      <span
        className={cn(
          "absolute right-9 top-8 h-2 w-2 rounded-full bg-[#f1d79d] shadow-[0_0_18px_rgba(241,215,157,0.9)]",
          canAnimate ? "motion-safe:animate-pulse" : ""
        )}
      />
      <span className="absolute bottom-12 left-10 h-1.5 w-1.5 rounded-full bg-[#b8894a]/80 shadow-[0_0_14px_rgba(184,137,74,0.8)]" />
    </>
  );
}

function OrbAccent({ canAnimate }: { canAnimate: boolean }) {
  return (
    <>
      <div className="absolute inset-3 rounded-full border border-[#b8894a]/25 bg-[radial-gradient(circle_at_32%_24%,rgba(241,215,157,0.54),rgba(38,72,112,0.16)_38%,transparent_72%)] shadow-[0_22px_52px_rgba(38,72,112,0.16)] backdrop-blur-sm dark:bg-[radial-gradient(circle_at_32%_24%,rgba(241,215,157,0.22),rgba(38,72,112,0.22)_40%,transparent_72%)]" />
      <div className="absolute inset-11 rounded-full border border-[#f1d79d]/45 bg-[#111827]/90 shadow-[inset_0_0_34px_rgba(241,215,157,0.16),0_0_44px_rgba(184,137,74,0.14)]" />
      <div
        className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#b8894a]/65 bg-[#07111f] text-[#f1d79d]"
        style={{ transform: "translate3d(-50%, -50%, 42px)" }}
      >
        <Bot className="h-8 w-8" />
      </div>
      <div className="absolute inset-[18%] rounded-full border border-dashed border-[#b8894a]/35" />
      <div className="absolute inset-[31%] rounded-full border border-[#f1d79d]/25" />
      <span
        className={cn(
          "absolute left-8 top-11 h-2 w-2 rounded-full bg-[#f1d79d] shadow-[0_0_18px_rgba(241,215,157,0.82)]",
          canAnimate ? "motion-safe:animate-pulse" : ""
        )}
      />
      <span className="absolute bottom-10 right-10 h-1.5 w-1.5 rounded-full bg-[#b8894a]/90 shadow-[0_0_16px_rgba(184,137,74,0.88)]" />
      <span className="absolute right-14 top-7 h-1 w-1 rounded-full bg-[#264870]/80 shadow-[0_0_14px_rgba(38,72,112,0.8)] dark:bg-[#f1d79d]/70" />
    </>
  );
}

function SealAccent({ canAnimate }: { canAnimate: boolean }) {
  return (
    <>
      <div className="absolute inset-3 rounded-full border border-[#c7aa73]/45 bg-[#fff8e8]/55 shadow-[0_22px_54px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-[#b8894a]/35 dark:bg-[#06101d]/60 dark:shadow-[0_22px_54px_rgba(184,137,74,0.1)]" />
      <div className="absolute inset-8 rounded-full border border-dashed border-[#b8894a]/45" />
      <div className="absolute inset-14 rounded-full bg-[linear-gradient(145deg,#f6e2ad,#b8894a_54%,#6f4c20)] shadow-[inset_0_1px_20px_rgba(255,255,255,0.34),0_22px_50px_rgba(184,137,74,0.2)]" />
      <div
        className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#fff3cf]/55 bg-[#111827] text-[#f1d79d]"
        style={{ transform: "translate3d(-50%, -50%, 44px)" }}
      >
        <Landmark className="h-8 w-8" />
      </div>
      <span
        className={cn(
          "absolute left-11 top-10 h-1.5 w-1.5 rounded-full bg-[#f1d79d] shadow-[0_0_18px_rgba(241,215,157,0.9)]",
          canAnimate ? "motion-safe:animate-pulse" : ""
        )}
      />
      <span className="absolute bottom-9 right-12 h-2 w-2 rounded-full bg-[#b8894a]/75 shadow-[0_0_16px_rgba(184,137,74,0.75)]" />
    </>
  );
}
