"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Sparkles, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

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
    <section className={cn("col-span-full mt-16 space-y-10", className)} style={{ gridColumn: "1 / -1" }}>
      {features && features.length > 0 && (
        <div className="space-y-8">
          {/* Section header */}
          <BlurFade delay={0.05} inView>
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center justify-center md:justify-start gap-3">
                <div className="p-2.5 bg-primary/10 border border-primary/20 rounded-2xl text-primary shrink-0 shadow-sm">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span>{title}</span>
              </h2>
              {subtitle && (
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </BlurFade>

          {/* Feature cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, idx) => {
              const Icon = feat.icon || Sparkles;
              return (
                <BlurFade key={idx} delay={0.07 + idx * 0.05} inView>
                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.18 } }}
                    className="h-full"
                  >
                    <GlassCard className="h-full p-5 space-y-3 group hover:border-primary/40 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300 cursor-default">
                      <div className="flex items-start gap-3">
                        {/* Icon badge */}
                        <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-sm group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                          <Icon className="h-5 w-5 shrink-0" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-foreground text-sm md:text-base group-hover:text-primary transition-colors leading-tight">
                            {feat.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-[52px]">
                        {feat.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      )}

      {/* Educational prose content */}
      {children && (
        <BlurFade delay={0.1} inView>
          <div className="relative group">
            {/* Ambient glow behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/15 via-primary/8 to-transparent rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
            <GlassCard
              elevated
              className="relative p-6 sm:p-8 rounded-2xl border-border/60"
            >
              <div className="prose prose-sm dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
                prose-h4:text-sm prose-h4:mt-4 prose-h4:mb-1.5
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-2
                prose-li:text-muted-foreground prose-li:leading-relaxed
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:text-primary prose-code:bg-primary/8 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
                prose-table:text-sm prose-th:font-semibold prose-th:text-foreground prose-td:text-muted-foreground
                prose-ul:pl-4 prose-ol:pl-4
                [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:border [&_table]:border-border/50
                [&_th]:bg-muted/60 [&_th]:p-2.5 [&_th]:border-border/40
                [&_td]:p-2.5 [&_td]:border-border/30
                [&_tr:nth-child(even)_td]:bg-muted/20
              ">
                {children}
              </div>
            </GlassCard>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
