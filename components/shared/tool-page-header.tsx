"use client";

import { type LucideIcon, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";

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

  return (
    <GlassCard
      className={`mb-6 relative overflow-hidden p-5 sm:px-8 sm:py-6 border-border/80 bg-background/60 backdrop-blur-md shadow-xl rounded-2xl ${className}`}
    >
      {/* Background ambient radial glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl -z-10" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2 min-w-0 max-w-full">
          {/* Animated Shiny Text Pill */}
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
              <AnimatedShinyText className="inline-flex items-center gap-1">
                <span>{badgeText}</span>
              </AnimatedShinyText>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm">
              <LeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
              {title}
            </h1>
          </div>

          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
