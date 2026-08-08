"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Sparkles, type LucideIcon } from "lucide-react";

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
    <section className={`mt-10 space-y-8 ${className}`}>
      {/* Features Grid */}
      {features && features.length > 0 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary shrink-0" />
              <span>{title}</span>
            </h2>
            {subtitle && <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, idx) => {
              const Icon = feat.icon || Sparkles;
              return (
                <GlassCard key={idx} className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <Icon className="h-4 w-4 shrink-0" />
                    <h3>{feat.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* SEO Deep Content Children */}
      {children && (
        <GlassCard className="p-6 sm:p-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
          {children}
        </GlassCard>
      )}
    </section>
  );
}
