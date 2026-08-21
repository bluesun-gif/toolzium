"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { History, ArrowRight, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecentItem {
  title: string;
  url: string;
  description?: string;
  timestamp?: number;
}

export function RecentlyUsedStrip() {
  const [recent, setRecent] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("toolzium:recent-items-v1");
      if (raw) {
        const parsed = JSON.parse(raw) as RecentItem[];
        setRecent(parsed.slice(0, 6));
      }
    } catch {}
  }, []);

  if (recent.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8">
      <div className="rounded-2xl border border-primary/20 bg-primary/[0.03] backdrop-blur-sm p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground">
            <div className="h-6 w-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <History className="h-3.5 w-3.5" />
            </div>
            <span>Recently Used Tools</span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {recent.length}
            </Badge>
          </div>
          <Link
            href="/tools"
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            All Tools <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Horizontal scrollable pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {recent.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-border/80 hover:border-primary/40 hover:bg-accent/40 text-xs font-medium text-foreground transition-all shrink-0 group shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary group-hover:rotate-12 transition-transform shrink-0" />
              <span className="truncate max-w-[140px] sm:max-w-[200px] font-semibold">{item.title}</span>
              <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
