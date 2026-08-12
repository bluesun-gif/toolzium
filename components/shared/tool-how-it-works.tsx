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
    <section className={`mt-12 space-y-8 ${className}`}>
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3 relative">
        {/* Decorative connecting line for desktop */}
        <div className="hidden sm:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10" />
        
        {steps.map((item, idx) => {
          const Icon = item.icon || CheckCircle2;
          return (
            <GlassCard 
              key={idx} 
              className="p-6 relative overflow-hidden flex flex-col group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 bg-background/40 backdrop-blur"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Icon className="w-24 h-24 text-primary" />
              </div>
              
              <div className="space-y-4 z-10 relative">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-black text-muted-foreground/30 group-hover:text-primary/30 transition-colors">
                    {item.step || `0${idx + 1}`}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {badges && badges.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {badges.map((b, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-muted/80 text-muted-foreground border border-border shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
