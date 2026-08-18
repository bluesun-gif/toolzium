"use client";

import { type MotionProps, motion } from "framer-motion";
import type * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/magicui/border-beam";

type BaseProps = React.ComponentProps<typeof Card> & {
  sheen?: boolean;
  borderMuted?: boolean;
  /** Show animated BorderBeam on this card */
  beam?: boolean;
  beamDuration?: number;
  beamSize?: number;
  /** Elevated look with stronger shadow */
  elevated?: boolean;
};

export function GlassCard({
  className,
  sheen = true,
  borderMuted = true,
  beam = false,
  beamDuration = 10,
  beamSize = 180,
  elevated = false,
  children,
  ...props
}: BaseProps) {
  return (
    <Card
      {...props}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        // Glass morphism base
        "bg-card/60 backdrop-blur-md supports-[backdrop-filter]:bg-card/50",
        // Border
        borderMuted ? "border border-border/50" : "border border-border",
        // Elevated mode: stronger shadow for featured cards
        elevated
          ? "shadow-lg shadow-black/8 dark:shadow-black/20"
          : "shadow-sm shadow-black/5 dark:shadow-black/15",
        // Rounded
        "rounded-2xl",
        className,
      )}
    >
      {sheen && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
          {/* Top gloss bevel — brighter in light mode, subtler in dark */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/20" />
          {/* Soft inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent dark:from-white/[0.04]" />
        </div>
      )}
      {beam && (
        <BorderBeam
          size={beamSize}
          duration={beamDuration}
          colorFrom="var(--primary)"
          colorTo="color-mix(in oklch, var(--primary) 0%, transparent)"
        />
      )}
      {children}
    </Card>
  );
}

type MotionGlassProps = BaseProps & MotionProps;

export function MotionGlassCard({
  className,
  children,
  beam,
  beamDuration,
  beamSize,
  elevated,
  ...props
}: MotionGlassProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <GlassCard
        className={cn("p-6", className)}
        beam={beam}
        beamDuration={beamDuration}
        beamSize={beamSize}
        elevated={elevated}
        {...props}
      >
        {children}
      </GlassCard>
    </motion.div>
  );
}
