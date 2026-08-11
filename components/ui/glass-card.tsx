"use client";

import { type MotionProps, motion } from "framer-motion";
import type * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type BaseProps = React.ComponentProps<typeof Card> & {
  sheen?: boolean;
  borderMuted?: boolean;
};

export function GlassCard({
  className,
  sheen = true,
  borderMuted = true,
  children,
  ...props
}: BaseProps) {
  return (
    <Card
      {...props}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        // Crisp, high-contrast light and dark styling
        "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl",
        borderMuted ? "border border-slate-200/80 dark:border-slate-800" : "border border-slate-200 dark:border-slate-700",
        "shadow-md shadow-slate-200/50 dark:shadow-black/40 rounded-2xl",
        className,
      )}
    >
      {sheen && (
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute inset-[-1px] rounded-[inherit] bg-gradient-to-br from-white/60 via-white/10 to-transparent dark:from-white/10 dark:to-transparent" />
        </div>
      )}
      {children}
    </Card>
  );
}

type MotionGlassProps = BaseProps & MotionProps;

export function MotionGlassCard({ className, children, ...props }: MotionGlassProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <GlassCard className={cn("p-6", className)} {...props}>
        {children}
      </GlassCard>
    </motion.div>
  );
}
