"use client";

import React, { useMemo } from "react";
import { ToolsData } from "@/data/tools";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <section className="mt-10" aria-label="Related Tools">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
        <ArrowRight className="h-5 w-5 text-purple-600" />
        Related Tools You Might Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedTools.map((tool) => (
          <Link key={tool.url} href={tool.url} className="group">
            <GlassCard className="p-4 h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg">
              <h3 className="font-medium text-sm group-hover:text-purple-600 transition-colors text-slate-900 dark:text-slate-100">
                {tool.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {tool.description?.slice(0, 100)}
                {(tool.description?.length ?? 0) > 100 ? "…" : ""}
              </p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedTools;
