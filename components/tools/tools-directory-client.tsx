"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";
import { RecentlyUsedStrip } from "@/components/shared/recently-used-strip";
import { SparklesText } from "@/components/ui/sparkles-text";
import {
  ArrowRight,
  Check,
  Compass,
  CornerDownLeft,
  Filter,
  Layers,
  Search,
  SlidersHorizontal,
  Sparkles,
  Wand2,
  X,
  type LucideIcon,
} from "lucide-react";

type ToolItem = {
  title: string;
  url: string;
  description: string;
  popular?: boolean;
};

type Category = {
  key: string;
  label: string;
  icon?: LucideIcon;
  items: ToolItem[];
};

export function ToolsDirectoryClient({
  categories,
  totalCount,
}: {
  categories: Category[];
  totalCount: number;
}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Keyboard shortcut ⌘K or / to focus search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          document.activeElement?.tagName === "INPUT" ||
          document.activeElement?.tagName === "TEXTAREA"
        ) {
          return;
        }
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter categories and tools
  const filteredCategories = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return categories
      .filter((cat) => {
        if (selectedCategory !== "all" && cat.key !== selectedCategory) {
          return false;
        }
        return true;
      })
      .map((cat) => {
        if (!query) return cat;

        const filteredItems = cat.items.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );

        return {
          ...cat,
          items: filteredItems,
        };
      })
      .filter((cat) => cat.items.length > 0);
  }, [categories, selectedCategory, searchQuery]);

  const totalMatchingTools = React.useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ─── DIRECTORY HERO & PROMINENT SEARCH ───────────────────────────── */}
      <div className="text-center space-y-4 pt-2 pb-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{totalCount}+ Privacy-First Browser Tools</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
          Explore All Tools
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Fast, client-side web utilities for developers, creators, marketers, and students. Zero data stored, instant results.
        </p>

        {/* ─── PROMINENT HERO COMMAND SEARCH BAR (Issue #5) ─────────────── */}
        <div className="max-w-2xl mx-auto mt-6 relative">
          <div className="relative flex items-center rounded-2xl border-2 border-primary/30 bg-card/90 backdrop-blur-md shadow-lg shadow-primary/5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 transition-all duration-200">
            <Search className="ml-4 h-5 w-5 text-primary shrink-0 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 559+ tools by name, purpose, or format (e.g. 'wav cutter', 'json', 'qr')..."
              className="w-full bg-transparent px-3 py-3.5 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              aria-label="Search tools directory"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="mr-3 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1 mr-3 text-[11px] font-mono text-muted-foreground bg-muted/60 px-2 py-1 rounded-lg border border-border/60">
                <span>⌘K</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── RECENTLY USED STRIP ────────────────────────────────────────── */}
      <RecentlyUsedStrip />

      {/* ─── COMPACT CATEGORY FILTER PILLS (Issues #4 & #8) ─────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Filter className="h-3.5 w-3.5 text-primary" />
            <span>Filter by Category</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Showing <strong className="text-foreground">{totalMatchingTools}</strong> tools
          </span>
        </div>

        {/* Scrollable / wrapping pills */}
        <div className="flex flex-wrap gap-2 pt-1 pb-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="rounded-xl h-9 text-xs font-semibold px-3.5 shadow-xs"
          >
            <Layers className="mr-1.5 h-3.5 w-3.5" />
            All Tools ({totalCount})
          </Button>

          {categories.map((c) => {
            const isSelected = selectedCategory === c.key;
            return (
              <Button
                key={c.key}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(isSelected ? "all" : c.key)}
                className={`rounded-xl h-9 text-xs font-semibold px-3 transition-all duration-200 ${
                  isSelected ? "shadow-sm shadow-primary/25" : "hover:border-primary/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.icon && <c.icon className="mr-1.5 h-3.5 w-3.5 shrink-0" />}
                <span>{c.label}</span>
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-muted/80 text-muted-foreground"}`}>
                  {c.items.length}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* ─── TOOL CARDS GRID WITH VISUAL ICON ANCHORS (Issue #6) ────────── */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-muted/60 border border-border/80 flex items-center justify-center mx-auto text-muted-foreground">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No tools found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            No tools matched &ldquo;{searchQuery}&rdquo;. Try another keyword or clear the search.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="rounded-xl"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredCategories.map((c) => (
            <section key={c.key} id={`cat-${c.key}`} className="space-y-4 scroll-mt-20">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    {c.icon && <c.icon className="h-4 w-4" />}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                    <span>{c.label}</span>
                  </h2>
                </div>
                <Badge variant="secondary" className="rounded-full text-xs font-semibold px-2.5 py-0.5 border border-border/60">
                  {c.items.length} {c.items.length === 1 ? "tool" : "tools"}
                </Badge>
              </div>

              {/* Tool Cards Grid with Visual Icon Anchors */}
              <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {c.items.map((t) => (
                  <Link
                    key={t.url}
                    href={t.url}
                    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                    aria-label={t.title}
                  >
                    <GlassCard className="h-full p-4 rounded-2xl hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start gap-3 mb-2.5">
                          {/* Visual Icon Anchor (Issue #6) */}
                          <div className="h-8 w-8 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-200">
                            {c.icon ? <c.icon className="h-4 w-4" /> : <Wand2 className="h-4 w-4" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-1">
                              {t.title}
                            </CardTitle>
                          </div>
                        </div>

                        <CardDescription className="text-xs text-muted-foreground leading-relaxed line-clamp-2 pl-0.5">
                          {t.description}
                        </CardDescription>
                      </div>

                      {/* Clean 1-Click Action Footer */}
                      <div className="pt-3 mt-2 border-t border-border/40 flex items-center justify-between text-xs text-primary font-semibold">
                        <span>Open tool</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <Separator className="my-8" />

      {/* ─── FOOTER CTA ─────────────────────────────────────────────────── */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-border/60 bg-muted/20 text-xs sm:text-sm text-muted-foreground">
        <div>
          <span className="font-semibold text-foreground">Didn&apos;t find what you need?</span> We build new tools weekly based on community requests.
        </div>
        <Button asChild variant="outline" size="sm" className="rounded-xl font-semibold shrink-0">
          <a href="mailto:contact@toolzium.com">Request a New Tool</a>
        </Button>
      </footer>
    </div>
  );
}
