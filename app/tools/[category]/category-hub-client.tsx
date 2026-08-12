"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { Search, ArrowRight, Sparkles, Wrench } from "lucide-react";
import Link from "next/link";

interface ToolItem {
  title: string;
  url: string;
  description: string;
  popular?: boolean;
}

interface CategoryObj {
  title: string;
  url: string;
  icon?: any;
  items: ToolItem[];
}

export default function CategoryHubClient({ categoryObj }: { categoryObj: CategoryObj }) {
  const [search, setSearch] = useState("");

  const IconComp = categoryObj.icon || Wrench;

  const filteredTools = useMemo(() => {
    if (!search.trim()) return categoryObj.items;
    const query = search.toLowerCase();
    return categoryObj.items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }, [categoryObj.items, search]);

  return (
    <div className="w-full min-h-screen pb-20 relative">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 h-full w-full stroke-border [mask-image:linear-gradient(to_bottom,white,transparent)]"
        )}
      />

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader
          icon={IconComp}
          title={`${categoryObj.title} Hub`}
          description={`Explore ${categoryObj.items.length} free, browser-based ${categoryObj.title.toLowerCase()} designed for developers, creators, and professionals.`}
        />

        {/* Search Bar */}
        <GlassCard className="p-4 bg-background border-border shadow-sm rounded-2xl">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${categoryObj.items.length} ${categoryObj.title.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 bg-background border-border text-foreground font-medium text-sm"
            />
          </div>
        </GlassCard>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link key={tool.url} href={tool.url} className="group block">
              <GlassCard className="p-6 h-full flex flex-col justify-between bg-card/70 backdrop-blur-md border-border/80 hover:border-primary/50 transition-all duration-300 rounded-2xl group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    {tool.popular && (
                      <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20 shrink-0 font-bold">
                        POPULAR
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center text-xs font-bold text-primary opacity-90 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 text-muted-foreground space-y-2">
            <p className="text-base font-bold text-foreground">No Tools Found</p>
            <p className="text-xs">No tools matched your search query &quot;{search}&quot;. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
