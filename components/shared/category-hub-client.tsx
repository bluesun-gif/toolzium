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
  const [filterMode, setFilterMode] = useState<"all" | "popular">("all");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterMode === "all" || (filterMode === "popular" && tool.popular);
      return matchesSearch && matchesFilter;
    });
  }, [tools, searchQuery, filterMode]);

  const popularCount = useMemo(() => tools.filter((t) => t.popular).length, [tools]);

  const defaultFaqs = useMemo(() => {
    if (faqs && faqs.length > 0) return faqs;
    return [
      {
        question: `What tools are included in the ${title} category?`,
        answer: `Toolzium's ${title} suite includes ${tools.length}+ specialized tools designed to streamline your workflow. You can convert, analyze, calculate, and process data directly in your browser.`,
      },
      {
        question: `Are these ${title} free to use?`,
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
  }, [faqs, title, tools.length]);

  return (
    <div className="relative space-y-10 pb-16">
      <ToolBackground />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="relative z-10 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-foreground">{title}</span>
      </nav>

      {/* Hero Header */}
      <header className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border-primary/20 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {tools.length} Free Online Tools
          </Badge>
          <Badge variant="outline" className="px-2.5 py-0.5 text-xs text-muted-foreground">
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
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={filterMode === "all" ? "default" : "outline"}
            onClick={() => setFilterMode("all")}
            className="rounded-lg text-xs gap-1.5 h-9"
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
        </div>
      </div>

      {/* Tools Grid */}
      <section aria-label={`${title} listing`} className="relative z-10">
        {filteredTools.length > 0 ? (
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Link
                key={tool.url}
                href={tool.url}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
              >
                <GlassCard className="h-full transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/5 flex flex-col justify-between p-5">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
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
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border/80 bg-card/40 space-y-3">
            <Search className="h-8 w-8 text-muted-foreground mx-auto" />
            <h3 className="font-medium text-foreground text-sm">No tools found matching &quot;{searchQuery}&quot;</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Try searching with different keywords or switch back to view all tools.
            </p>
            <Button size="sm" variant="outline" onClick={() => { setSearchQuery(""); setFilterMode("all"); }}>
              Reset Search
            </Button>
          </div>
        )}
      </section>

      {/* Category FAQs */}
      <div className="relative z-10 pt-6">
        <ToolFaqAccordion
          faqs={defaultFaqs}
          title={`Frequently Asked Questions about ${title}`}
          subtitle={`Everything you need to know about using our free online ${title.toLowerCase()}.`}
        />
      </div>

      {/* Related Categories */}
      {relatedCategories.length > 0 && (
        <section className="relative z-10 pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              Explore Other Tool Suites
            </h3>
            <Link href="/tools" className="text-xs text-primary hover:underline flex items-center gap-1 font-medium">
              View All Tools <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {relatedCategories.map((cat) => (
              <Link
                key={cat.url}
                href={cat.url}
                className="group p-3.5 rounded-xl border border-border/60 bg-card/60 hover:bg-card hover:border-primary/40 transition-all block"
              >
                <div className="font-medium text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                  <span>{cat.title}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  {cat.count} tools
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
