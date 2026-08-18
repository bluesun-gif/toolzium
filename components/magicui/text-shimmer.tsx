"use client";

import { cn } from "@/lib/utils";

interface TextShimmerProps {
  children: string;
  className?: string;
  duration?: number;
}

/**
 * TextShimmer — a gradient that sweeps across text, creating a shimmer/glint effect.
 * Uses pure CSS animation for compatibility — no framer-motion custom property conflicts.
 */
export function TextShimmer({ children, className, duration = 2.5 }: TextShimmerProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "bg-[length:200%_auto]",
        "bg-gradient-to-r from-foreground via-primary to-foreground",
        className,
      )}
      style={{
        animation: `text-shimmer-sweep ${duration}s linear infinite`,
        backgroundSize: "200% auto",
      }}
    >
      {children}
    </span>
  );
}
