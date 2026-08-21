"use client";

import React, { useMemo, useEffect, useState } from "react";
import { ToolsData } from "@/data/tools";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, History, Zap } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/i18n-context";
import { ToolFavoriteButton } from "@/components/shared/tool-favorite-button";

type RelatedToolsProps = {
  /** Current tool's URL path, e.g. "/tools/text/morse-code" */
  currentToolUrl: string;
  /** Max number of related tools to show */
  max?: number;
};

interface RecentItem {
  title: string;
  url: string;
  description?: string;
  timestamp?: number;
}

export function RelatedTools({ currentToolUrl, max = 6 }: RelatedToolsProps) {
  const { t } = useTranslation();
  const [recents, setRecents] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("toolzium:recent-items-v1");
      if (stored) {
        const list: RecentItem[] = JSON.parse(stored);
        // Exclude current tool from recent switcher
        setRecents(list.filter((r) => r.url !== currentToolUrl).slice(0, 5));
      }
    } catch {}
  }, [currentToolUrl]);

  const { categoryTitle, displayedTools } = useMemo(() => {
    // Find which category the current tool belongs to
    const currentCategory = ToolsData.find((cat) =>
      cat.items.some((item) => item.url === currentToolUrl)
    );

    if (!currentCategory) return { categoryTitle: "", displayedTools: [] };

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

    return {
      categoryTitle: currentCategory.title,
      displayedTools: related.slice(0, max),
    };
  }, [currentToolUrl, max]);

  if (!displayedTools || displayedTools.length === 0) return null;

  return (
    <section
      className="col-span-full mt-16 pt-8 border-t border-border/60 space-y-8"
      style={{ gridColumn: "1 / -1" }}
      aria-label="Related Tools and Recent Navigation"
    >
      {/* Quick Jump: Recently Used Tools Bar */}
      {recents.length > 0 && (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-3.5 sm:p-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground mr-1 shrink-0">
              <History className="h-3.5 w-3.5 text-primary" />
              <span>Recently Used:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {recents.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-background/80 hover:bg-primary/10 border border-border/70 hover:border-primary/40 text-foreground transition-all duration-200"
                >
                  <Zap className="h-3 w-3 text-amber-500" />
                  <span className="truncate max-w-[160px]">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Related Tools Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-foreground">
              <div className="p-1.5 bg-primary/10 rounded-xl">
                <Sparkles className="h-4.5 w-4.5 text-primary" />
              </div>
              {categoryTitle ? `More Free ${categoryTitle}` : t("related_tools", "Related Tools You Might Like")}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Explore companion utilities from the same suite — fast, free, and private.
            </p>
          </div>

          <Link
            href="/tools"
            className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 group transition-colors self-start sm:self-center"
          >
            {t("view_all_tools", "View all 570+ tools")}
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedTools.map((tool) => (
            <div key={tool.url} className="relative group">
              <Link
                href={tool.url}
                className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
              >
                <GlassCard className="p-5 h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-primary/5 group-hover:border-primary/50 bg-background/50 backdrop-blur flex flex-col justify-between">
                  <div className="space-y-2.5 pr-8">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm sm:text-base group-hover:text-primary transition-colors text-foreground leading-snug line-clamp-2">
                        {tool.title}
                      </h3>
                      {tool.popular && (
                        <Badge
                          variant="secondary"
                          className="shrink-0 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        >
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-auto flex items-center justify-between text-xs font-medium text-primary">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Open Tool
                    </span>
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors ml-auto">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </GlassCard>
              </Link>

              {/* Star bookmark button */}
              <div className="absolute top-3.5 right-3.5 z-20">
                <ToolFavoriteButton
                  tool={{ title: tool.title, url: tool.url, description: tool.description }}
                  size="icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedTools;
