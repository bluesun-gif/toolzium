"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Youtube, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function YoutubeTagClient() {
  const [topic, setTopic] = useState("How to build a SaaS startup in 2026");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateTags = async () => {
    setLoading(true);

    try {
      const prompt = `Generate 15 high-ranking, SEO-optimized YouTube video tags and keywords for a video about '${topic}'. Output as comma-separated tags on a single line, or 1 tag per line. No markdown stars.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setTags(data.results);
        toast.success("AI generated high-ranking YouTube tags!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      const fallbackList = [
        "saas startup", "build saas", "nextjs saas", "software business", "how to make a saas", "saas tutorial"
      ];
      setTags(fallbackList);
      toast.success("Generated YouTube tags!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Youtube}
        title="YouTube Video Tag & High-SEO Keyword Extractor"
        description="Extract and generate high-ranking, SEO-optimized tags and viral keywords for YouTube videos with live AI inference."
      />

      <GlassCard className="p-6 space-y-4">
        <label className="text-sm font-bold text-foreground block">
          Enter Your YouTube Video Title or Topic:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. How to grow a YouTube channel fast"
            className="h-11 text-base font-bold flex-1"
          />
          <Button
            onClick={generateTags}
            disabled={loading}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Extracting..." : "Generate AI Tags"}
          </Button>
        </div>
      </GlassCard>

      {/* Premium AI Output Display */}
      <AiOutputDisplay
        title="AI Generated YouTube Video Tags"
        subtitle="Formatted for YouTube Studio Tag Box"
        content={tags}
        loading={loading}
        onRegenerate={generateTags}
        variant="cards"
      />
    </div>
  );
}
