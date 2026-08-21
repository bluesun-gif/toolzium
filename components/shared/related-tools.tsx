"use client";

import React, { useMemo } from "react";
import { ToolsData } from "@/data/tools";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/i18n-context";

type RelatedToolsProps = {
  /** Current tool's URL path, e.g. "/tools/text/morse-code" */
  currentToolUrl: string;
  /** Max number of related tools to show */
  max?: number;
};

/**
 * Shows related tools from the same category as the current tool.
 * Deterministic and safe against React hydration errors.
 */
export function RelatedTools({ currentToolUrl, max = 6 }: RelatedToolsProps) {
  const { t } = useTranslation();

  const displayedTools = useMemo(() => {
    // Find which category the current tool belongs to
    const currentCategory = ToolsData.find((cat) =>
      cat.items.some((item) => item.url === currentToolUrl)
    );

    if (!currentCategory) return [];

    // Get sibling tools (same category, excluding current + "All Tools")
    let related = currentCategory.items.filter(
      (item) => item.url !== currentToolUrl && item.url !== "/tools"
    );

    // If not enough siblings, pull popular tools from other categories
    if (related.length < max) {
      const otherPopular = ToolsData.flatMap((cat) =>
        cat === currentCategory
          ? []
          : cat.items.filter(
              (item) =>
                item.popular && item.url !== "/tools" && item.url !== currentToolUrl
            )
      );
      related = [...related, ...otherPopular];
    }

    return related.slice(0, max);
  }, [currentToolUrl, max]);

  if (!displayedTools || displayedTools.length === 0) return null;

  return (
    <section
      className="col-span-full mt-16 pt-8 border-t border-border/60"
      style={{ gridColumn: "1 / -1" }}
      aria-label="Related Tools"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-foreground">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          {t("related_tools", "Related Tools You Might Like")}
        </h2>
        <Link
          href="/tools"
          className="text-sm font-semibold text-primary hover:text-primary flex items-center gap-1 group transition-colors"
        >
          {t("view_all_tools", "View all tools")}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedTools.map((tool) => (
          <Link key={tool.url} href={tool.url} className="group outline-none">
            <GlassCard className="p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/10 group-focus-visible:ring-2 group-focus-visible:ring-primary group-hover:border-primary/50 bg-background/40 backdrop-blur">
              <div className="flex flex-col h-full justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base group-hover:text-primary transition-colors text-foreground mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                  Try it out <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedTools;
