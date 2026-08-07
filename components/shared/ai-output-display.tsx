"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Copy, Check, RefreshCw, Bot, Terminal, Share2 } from "lucide-react";
import toast from "react-hot-toast";

interface AiOutputDisplayProps {
  title?: string;
  subtitle?: string;
  content: string | string[];
  loading?: boolean;
  onRegenerate?: () => void;
  variant?: "cards" | "prose" | "list";
  className?: string;
}

export function AiOutputDisplay({
  title = "AI Generated Results",
  subtitle = "Powered by ultra-fast AI inference",
  content,
  loading = false,
  onRegenerate,
  variant = "cards",
  className = "",
}: AiOutputDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const cleanText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove markdown bold
      .replace(/\*(.*?)\*/g, "$1")     // Remove markdown italic
      .replace(/^#+\s+/gm, "")         // Remove headings
      .replace(/^[\s-*•]+\s*/gm, "")   // Remove bullets
      .trim();
  };

  const items: string[] = Array.isArray(content)
    ? content.map(cleanText).filter(Boolean)
    : typeof content === "string" && content.includes("\n")
    ? content.split("\n").map(cleanText).filter(Boolean)
    : content ? [cleanText(content)] : [];

  const handleCopy = (text: string, idx?: number) => {
    navigator.clipboard.writeText(text);
    if (idx !== undefined) {
      setCopiedIndex(idx);
      toast.success("Copied item to clipboard!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopiedAll(true);
      toast.success("Copied all results to clipboard!");
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  return (
    <GlassCard className={`p-6 space-y-5 border border-primary/20 shadow-xl bg-card/80 backdrop-blur-md relative overflow-hidden ${className}`}>
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <Bot className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground font-medium">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(items.join("\n"))}
              className="h-8 text-xs font-medium gap-1.5 border-border/80 hover:bg-muted"
            >
              {copiedAll ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              Copy All
            </Button>
          )}

          {onRegenerate && (
            <Button
              variant="default"
              size="sm"
              onClick={onRegenerate}
              disabled={loading}
              className="h-8 text-xs font-bold gap-1.5 shadow-xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Regenerate
            </Button>
          )}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-3 py-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary animate-pulse">
            <Sparkles className="h-4 w-4" /> AI is crafting personalized results...
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-muted/40 animate-pulse border border-border/40" />
            ))}
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground text-xs font-medium border border-dashed rounded-xl bg-muted/10">
          No AI outputs generated yet. Click generate above to start!
        </div>
      ) : variant === "cards" ? (
        /* Card Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
          {items.map((item, i) => (
            <div
              key={i}
              className="group p-3.5 rounded-xl border border-border/70 bg-background/60 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200 shadow-xs flex items-center justify-between gap-3"
            >
              <span className="font-sans font-semibold text-sm text-foreground leading-snug break-words">
                {item}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(item, i)}
                className="h-8 w-8 p-0 rounded-lg shrink-0 text-muted-foreground group-hover:text-primary hover:bg-primary/10"
              >
                {copiedIndex === i ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        /* Prose / Document Layout */
        <div className="space-y-3 relative z-10">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-border/70 bg-background/60 hover:border-primary/30 transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-sans text-foreground leading-relaxed whitespace-pre-wrap">
                  {item}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(item, i)}
                  className="h-8 px-2.5 text-xs gap-1.5 shrink-0 text-muted-foreground hover:text-primary"
                >
                  {copiedIndex === i ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  Copy
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
