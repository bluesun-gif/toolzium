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
        // Reverted to original glass background styling
        "bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/30",
        borderMuted ? "border-muted/40" : "",
        className,
      )}
    >
      {sheen && (
        <div className="pointer-events-none absolute inset-0 opacity-70">
          {/* soft gradient bevel */}
          <div className="absolute inset-[-1px] rounded-[inherit] bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
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
