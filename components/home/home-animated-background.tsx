"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HomeAnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let animationFrame = 0;
    let particles: Particle[] = [];
    const reduceMotion = prefersReducedMotion();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = reduceMotion ? 22 : Math.min(58, Math.max(26, Math.floor(rect.width / 30)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16
      }));
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        if (!reduceMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, 1.2, 0, Math.PI * 2);
        context.fillStyle = "rgba(184, 137, 74, 0.34)";
        context.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > 118) continue;

          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.strokeStyle = `rgba(184, 137, 74, ${0.12 * (1 - distance / 118)})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }

      if (!reduceMotion) animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const light = lightRef.current;
    if (!light || prefersReducedMotion()) return;

    const moveLight = (event: PointerEvent) => {
      light.style.transform = `translate3d(${event.clientX - 220}px, ${event.clientY - 220}px, 0)`;
      light.style.opacity = "1";
    };

    const hideLight = () => {
      light.style.opacity = "0";
    };

    window.addEventListener("pointermove", moveLight, { passive: true });
    window.addEventListener("pointerleave", hideLight);

    return () => {
      window.removeEventListener("pointermove", moveLight);
      window.removeEventListener("pointerleave", hideLight);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60 dark:opacity-75" />
      <div className="absolute left-[-12%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(184,137,74,0.20),transparent_62%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(184,137,74,0.24),transparent_62%)]" />
      <div className="absolute bottom-[4%] right-[-8%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(20,40,82,0.18),transparent_64%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(74,104,160,0.20),transparent_64%)]" />
      <div
        ref={lightRef}
        className="absolute h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),rgba(184,137,74,0.12)_32%,transparent_68%)] opacity-0 blur-xl mix-blend-soft-light"
      />
    </div>
  );
}
