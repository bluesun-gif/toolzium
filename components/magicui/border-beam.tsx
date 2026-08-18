"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

/**
 * BorderBeam — an animated conic-gradient beam that orbits the card border.
 * Drop it as the first child inside a `relative overflow-hidden` container.
 */
export function BorderBeam({
  className,
  size = 200,
  duration = 12,
  delay = 0,
  colorFrom = "hsl(var(--primary))",
  colorTo = "hsl(var(--primary) / 0)",
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className,
      )}
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--delay": `-${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-width": `${borderWidth}px`,
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: "exclude",
          padding: "var(--border-width)",
          background: `conic-gradient(from calc(270deg - (360deg * 0.25)) at 50% 50%, var(--color-to), var(--color-from) var(--beam-spread, 10%), var(--color-to) var(--beam-end, 40%))`,
          animation: `border-beam var(--duration) var(--delay) linear infinite`,
        } as React.CSSProperties
      }
    />
  );
}
