"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface ToolShareButtonProps {
  toolTitle: string;
  toolUrl?: string;
  className?: string;
}

export function ToolShareButton({ toolTitle, toolUrl, className }: ToolShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = typeof window !== "undefined" ? (toolUrl ? new URL(toolUrl, window.location.origin).toString() : window.location.href) : "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${toolTitle} — Toolzium`,
          text: `Check out ${toolTitle} on Toolzium — 100% Free Online Tools with No Signup!`,
          url: url,
        });
        toast.success("Shared successfully!");
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      aria-label={`Share ${toolTitle}`}
      className={cn(
        "transition-all duration-200 gap-1.5 h-8.5 px-3 rounded-xl border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/50",
        copied && "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
        className
      )}
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-500" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
      <span className="text-xs font-semibold hidden sm:inline">
        {copied ? "Copied!" : "Share"}
      </span>
    </Button>
  );
}
