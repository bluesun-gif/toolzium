"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface VoteButtonsProps {
  itemId: string;
  initialScore?: number;
  className?: string;
  compact?: boolean;
}

export function VoteButtons({
  itemId,
  initialScore = 0,
  className = "",
  compact = false,
}: VoteButtonsProps) {
  const [score, setScore] = useState(initialScore);
  const [userVote, setUserVote] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Load user vote from localStorage for instant feedback
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`toolzium:vote:${itemId}`);
      if (stored) setUserVote(parseInt(stored, 10));
    } catch {}
  }, [itemId]);

  const handleVote = async (value: 1 | -1) => {
    if (loading) return;
    const newVote = userVote === value ? 0 : value;
    const prevVote = userVote;
    const diff = newVote - prevVote;

    // Optimistic update
    setUserVote(newVote);
    setScore((prev) => prev + diff);
    try {
      localStorage.setItem(`toolzium:vote:${itemId}`, newVote.toString());
    } catch {}

    setLoading(true);
    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, value: newVote }),
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.score === "number") setScore(data.score);
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  return (
    <div className={`inline-flex items-center gap-1 bg-muted/50 border border-border/70 rounded-xl p-0.5 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote(1)}
        className={`h-7 px-2 rounded-lg text-xs transition-colors ${
          userVote === 1
            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Upvote"
      >
        <ThumbsUp className="h-3 w-3 mr-1" />
        <span>{compact ? "" : "Upvote"}</span>
      </Button>

      <span className="px-1 text-xs font-mono font-semibold min-w-[20px] text-center text-foreground">
        {score > 0 ? `+${score}` : score}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote(-1)}
        className={`h-7 px-2 rounded-lg text-xs transition-colors ${
          userVote === -1
            ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Downvote"
      >
        <ThumbsDown className="h-3 w-3" />
      </Button>
    </div>
  );
}

export default VoteButtons;
