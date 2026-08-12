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
    <section className={`mt-14 space-y-8 ${className}`}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3 relative">
        {/* Connecting gradient line on desktop */}
        <div className="hidden sm:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />

        {steps.map((item, idx) => {
          const Icon = item.icon || CheckCircle2;
          const isFirst = idx === 0;
          return (
            <GlassCard
              key={idx}
              className={`p-6 relative overflow-hidden flex flex-col group transition-all duration-300 rounded-2xl bg-card/60 backdrop-blur-md border ${
                isFirst
                  ? "border-primary/40 shadow-lg shadow-primary/5"
                  : "border-border/70 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              }`}
            >
              <div className="space-y-4 z-10 relative">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-sm shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-3xl font-black text-muted-foreground/20 group-hover:text-primary/40 transition-colors">
                    {item.step || `0${idx + 1}`}
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {badges && badges.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          {badges.map((b, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-muted/60 text-muted-foreground border border-border/80 shadow-sm hover:border-primary/30 transition-colors cursor-default"
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
