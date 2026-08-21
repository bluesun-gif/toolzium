"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  Flame,
  Layers,
  ChevronRight,
  HelpCircle,
  Star,
  LucideIcon,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { useFavorites } from "@/lib/hooks/use-favorites";
import { ToolFavoriteButton } from "@/components/shared/tool-favorite-button";

export interface ToolItem {
  title: string;
  url: string;
  description: string;
  popular?: boolean;
}

export interface RelatedCategory {
  title: string;
  url: string;
  count: number;
}

export interface CategoryHubProps {
  title: string;
  description: string;
  slug: string;
  tools: ToolItem[];
  relatedCategories?: RelatedCategory[];
  faqs?: { question: string; answer: string }[];
}

export function CategoryHubClient({
  title,
  description,
  slug,
  tools,
  relatedCategories = [],
  faqs = [],
}: CategoryHubProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "popular" | "favorites">("all");
  const { isFavorite, favorites } = useFavorites();

  const favoriteCount = useMemo(() => {
    return tools.filter((t) => isFavorite(t.url)).length;
  }, [tools, isFavorite]);

  const popularCount = useMemo(() => tools.filter((t) => t.popular).length, [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesFilter = true;
      if (filterMode === "popular") {
        matchesFilter = !!tool.popular;
      } else if (filterMode === "favorites") {
        matchesFilter = isFavorite(tool.url);
      }

      return matchesSearch && matchesFilter;
    });
  }, [tools, searchQuery, filterMode, isFavorite]);

  // Default SEO FAQs if none provided
  const categoryFaqs = useMemo(() => {
    if (faqs && faqs.length > 0) return faqs;
    return [
      {
        question: `Are all ${title} tools on Toolzium completely free?`,
        answer: `Yes, 100% free with no hidden paywalls, no credits system, and no account creation required.`,
      },
      {
        question: `Does Toolzium save or track my input data?`,
        answer: `No. All operations run directly on your device via client-side JavaScript. Your data remains entirely private and never leaves your computer.`,
      },
      {
        question: `Can I use these tools on mobile devices?`,
        answer: `Yes! All Toolzium tools are fully responsive and optimized for mobile screens, tablets, and desktops. You can also install Toolzium as a Progressive Web App (PWA).`,
      },
    ];
  }, [faqs, title]);

  return (
    <div className="relative space-y-10 pb-16">
      <ToolBackground />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="relative z-10 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground pt-1">
        <Link href="/" className="hover:text-foreground transition-colors shrink-0">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
        <Link href="/tools" className="hover:text-foreground transition-colors shrink-0">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
        <span className="font-medium text-foreground truncate">{title}</span>
      </nav>

      {/* Hero Header */}
      <header className="relative z-10 space-y-4 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border-primary/20 flex items-center gap-1.5 shrink-0">
            <Sparkles className="h-3.5 w-3.5" />
            {tools.length} Free Online Tools
          </Badge>
          <Badge variant="outline" className="px-2.5 py-1 text-xs text-muted-foreground shrink-0">
            100% Client-Side Private
          </Badge>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
          {title}
        </h1>

        <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="flex items-center gap-2 rounded-xl bg-card/60 border border-border/50 p-2.5 text-xs font-medium text-muted-foreground">
            <Zap className="h-4 w-4 text-amber-500 shrink-0" />
            <span>Instant Execution</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-card/60 border border-border/50 p-2.5 text-xs font-medium text-muted-foreground">
            <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>No Data Stored</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-card/60 border border-border/50 p-2.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary shrink-0" />
            <span>No Signup Needed</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-card/60 border border-border/50 p-2.5 text-xs font-medium text-muted-foreground">
            <Layers className="h-4 w-4 text-blue-500 shrink-0" />
            <span>Always Free</span>
          </div>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search all ${tools.length} ${title.toLowerCase()}...`}
            className="pl-9 bg-card/80 border-border/70 focus-visible:ring-primary/50 text-sm h-10 rounded-xl"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Button
            size="sm"
            variant={filterMode === "all" ? "default" : "outline"}
            onClick={() => setFilterMode("all")}
            className="rounded-lg text-xs h-9"
          >
            All ({tools.length})
          </Button>
          {popularCount > 0 && (
            <Button
              size="sm"
              variant={filterMode === "popular" ? "default" : "outline"}
              onClick={() => setFilterMode("popular")}
              className="rounded-lg text-xs gap-1.5 h-9"
            >
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              Popular ({popularCount})
            </Button>
          )}
          {favoriteCount > 0 && (
            <Button
              size="sm"
              variant={filterMode === "favorites" ? "default" : "outline"}
              onClick={() => setFilterMode("favorites")}
              className="rounded-lg text-xs gap-1.5 h-9 bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20"
            >
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              Starred ({favoriteCount})
            </Button>
          )}
        </div>
      </div>

      {/* Tools Grid */}
      <section aria-label={`${title} listing`} className="relative z-10">
        {filteredTools.length > 0 ? (
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <div key={tool.url} className="relative group">
                <Link
                  href={tool.url}
                  className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                >
                  <GlassCard className="h-full transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/5 flex flex-col justify-between p-5">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2 pr-8">
                        <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base leading-snug line-clamp-2">
                          {tool.title}
                        </h2>
                        {tool.popular && (
                          <Badge
                            variant="secondary"
                            className="shrink-0 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          >
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {tool.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-auto flex items-center justify-between text-xs font-medium text-primary">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        Open Tool
                      </span>
                      <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors ml-auto">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>

                {/* Floating Star Button */}
                <div className="absolute top-4 right-4 z-20">
                  <ToolFavoriteButton
                    tool={{ title: tool.title, url: tool.url, description: tool.description }}
                    size="icon"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border/80 bg-card/40 space-y-3">
            <Search className="h-8 w-8 text-muted-foreground mx-auto" />
            <h3 className="font-medium text-foreground text-sm">
              {filterMode === "favorites"
                ? "No starred tools in this category yet"
                : `No tools found matching "${searchQuery}"`}
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {filterMode === "favorites"
                ? "Click the star icon on any tool card to add it to your favorites."
                : "Try searching with different keywords or switch back to view all tools."}
            </p>
            <Button size="sm" variant="outline" onClick={() => { setSearchQuery(""); setFilterMode("all"); }}>
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Category FAQs */}
      {categoryFaqs.length > 0 && (
        <section aria-label={`${title} Frequently Asked Questions`} className="relative z-10 pt-4">
          <ToolFaqAccordion faqs={categoryFaqs} title={`${title} FAQ`} />
        </section>
      )}

      {/* Related Categories Grid */}
      {relatedCategories.length > 0 && (
        <section aria-label="Related Tool Categories" className="relative z-10 pt-4 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Explore More Tool Suites</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {relatedCategories.map((cat) => (
              <Link key={cat.url} href={cat.url} className="group">
                <GlassCard className="p-3.5 transition-all duration-200 group-hover:border-primary/40 group-hover:bg-card/80">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      {cat.title}
                    </span>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {cat.count}
                    </Badge>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
