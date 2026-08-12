"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Sparkles, type LucideIcon } from "lucide-react";
import React from "react";

type FeatureCard = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

type ToolFeatureGuidesProps = {
  title?: string;
  subtitle?: string;
  features: FeatureCard[];
  children?: React.ReactNode;
  className?: string;
};

export default function ToolFeatureGuides({
  title = "Key Features & Capabilities",
  subtitle = "Designed for accuracy, privacy, and maximum efficiency.",
  features,
  children,
  className = "",
}: ToolFeatureGuidesProps) {
  return (
    <section className={`mt-16 space-y-10 ${className}`}>
      {features && features.length > 0 && (
        <div className="space-y-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center justify-center md:justify-start gap-3">
              <div className="p-2.5 bg-primary/10 border border-primary/20 rounded-2xl text-primary shrink-0 shadow-sm">
                <Sparkles className="h-6 w-6" />
              </div>
              <span>{title}</span>
            </h2>
            {subtitle && (
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, idx) => {
              const Icon = feat.icon || Sparkles;
              return (
                <GlassCard
                  key={idx}
                  className="p-6 space-y-3 group hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-card/60 backdrop-blur-md border-border/80 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-muted/80 border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary transition-all shadow-sm group-hover:scale-105 duration-300">
                      <Icon className="h-5 w-5 shrink-0" />
                    </div>
                    <h3 className="font-extrabold text-foreground text-base group-hover:text-primary transition-colors">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {children && (
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
          <GlassCard className="relative p-6 sm:p-8 space-y-4 text-sm text-muted-foreground leading-relaxed bg-card/80 backdrop-blur-xl border border-border/80 rounded-2xl">
            {children}
          </GlassCard>
        </div>
      )}
    </section>
  );
}
