"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * ShimmerButton — a premium CTA button with an animated light-sweep shimmer.
 * Inspired by Magic UI shimmer-button pattern.
 * Use for primary actions: Download, Convert, Generate, Apply, etc.
 */
export function ShimmerButton({
  shimmerColor = "hsl(var(--primary-foreground) / 0.2)",
  shimmerSize = "0.05em",
  shimmerDuration = "2s",
  borderRadius = "12px",
  background = "hsl(var(--primary))",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      type="button"
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-[var(--radius)] border border-white/[0.1] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.25)]",
        "[background:var(--bg)]",
        "transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_4px_20px_hsl(var(--primary)/0.4)] active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      {/* Shimmer sweep */}
      <div
        className={cn(
          "absolute inset-0 overflow-hidden rounded-[var(--radius)] [container-type:size]",
        )}
      >
        <div className="absolute inset-0 h-full w-full rotate-[-45deg] translate-x-[-70%] animate-[shimmer-sweep_var(--speed)_ease-in-out_infinite] [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
      </div>

      {/* Cutout — hides shimmer behind content */}
      <div
        className={cn(
          "absolute [background:var(--bg)] [border-radius:calc(var(--radius)-var(--cut))] [inset:var(--cut)]",
        )}
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
