"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { CheckCircle2, ShieldCheck, type LucideIcon } from "lucide-react";

type Step = {
  step: string;
  title: string;
  description: string;
  icon?: LucideIcon;
};

type ToolHowItWorksProps = {
  title?: string;
  subtitle?: string;
  steps: Step[];
  badges?: string[];
  className?: string;
};

export default function ToolHowItWorks({
  title = "How It Works",
  subtitle = "Simple, fast, and 100% secure in 3 steps.",
  steps,
  badges = [
    "100% Free Forever",
    "Client-Side Privacy",
    "Zero Server Uploads",
    "No Registration Needed",
  ],
  className = "",
}: ToolHowItWorksProps) {
  return (
    <section className={`mt-8 space-y-6 ${className}`}>
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map((item, idx) => {
          const Icon = item.icon || CheckCircle2;
          return (
            <GlassCard key={idx} className="p-5 relative overflow-hidden flex flex-col justify-between group hover:border-primary/50 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-black text-muted-foreground/30 group-hover:text-primary/20 transition-colors">
                    {item.step || `0${idx + 1}`}
                  </span>
                </div>
                <h3 className="font-semibold text-base text-foreground">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {badges && badges.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {badges.map((b, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground border border-border/50"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
