"use client";

import { type LucideIcon, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { motion } from "framer-motion";
import { useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";

type ToolPageHeaderProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  badgeText?: string;
  className?: string;
};

export default function ToolPageHeader({
  title,
  description,
  icon: Icon,
  actions,
  badgeText = "✨ Fast • Free • Privacy-Friendly",
  className = "",
}: ToolPageHeaderProps) {
  const LeftIcon: LucideIcon = Icon ?? Sparkles;

  // Spotlight mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.07), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div
        onMouseMove={handleMouseMove}
        className={`mb-6 relative overflow-hidden rounded-2xl border border-border/80 bg-background/60 backdrop-blur-md shadow-xl ${className}`}
      >
        {/* Spotlight overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{ background: spotlight }}
          aria-hidden="true"
        />

        {/* Ambient corner glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl -z-10" />
        <div className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-primary/8 blur-2xl -z-10" />

        <div className="p-5 sm:px-8 sm:py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2 min-w-0 max-w-full">
              {/* Animated Shiny Badge */}
              {badgeText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm"
                >
                  <AnimatedShinyText className="inline-flex items-center gap-1">
                    <span>{badgeText}</span>
                  </AnimatedShinyText>
                </motion.div>
              )}

              <div className="flex items-center gap-3">
                {/* Animated icon container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm"
                >
                  <LeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>

                {/* Title with fade-in */}
                <motion.h1
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                  className="text-xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight"
                >
                  {title}
                </motion.h1>
              </div>

              {description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl"
                >
                  {description}
                </motion.p>
              )}
            </div>

            {actions && (
              <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0 shrink-0">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
