"use client";
import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const move = (e: MouseEvent) => {
      glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };

    document.addEventListener("mousemove", move, { passive: true });
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 w-[400px] h-[400px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 70%)",
        willChange: "transform",
        transition: "transform 120ms ease-out",
      }}
    />
  );
}
