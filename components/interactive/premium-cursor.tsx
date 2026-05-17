"use client";

import { useEffect, useRef } from "react";

export function PremiumCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");

    if (reduceMotion.matches || coarsePointer.matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let frame = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let renderedX = pointerX;
    let renderedY = pointerY;
    let visible = false;

    const render = () => {
      renderedX += (pointerX - renderedX) * 0.18;
      renderedY += (pointerY - renderedY) * 0.18;

      cursor.style.transform = `translate3d(${renderedX - 7}px, ${renderedY - 7}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!visible) {
        visible = true;
        cursor.classList.add("premium-cursor--visible");
      }
    };

    const handlePointerLeave = () => {
      visible = false;
      cursor.classList.remove("premium-cursor--visible");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return <div ref={cursorRef} className="premium-cursor" aria-hidden="true" />;
}
