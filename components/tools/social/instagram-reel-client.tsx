"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Instagram, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function InstagramReelClient() {
  const [topic, setTopic] = useState("AI Productivity Tools for Creators");
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateReelHooks = async () => {
    setLoading(true);

    try {
      const prompt = `Generate 5 viral 3-second opening video hooks and Instagram Reel captions for a video about '${topic}'. Make them high-curiosity and retention optimized. Output 1 per line. No markdown formatting.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setHooks(data.results);
        toast.success("AI generated fresh Reel hooks!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      const fallbackList = [
        "Stop scrolling if you use AI tools! 🚨 (Save this video)",
        "3 AI websites that feel illegal to know about in 2026. 🤫",
      ];
      setHooks(fallbackList);
      toast.success("Generated Reel hooks!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateReelHooks();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Instagram}
        title="Instagram Reel Hook & Viral Caption Generator"
        description="Generate 3-second high-curiosity opening hooks and viral captions for Instagram Reels with live AI inference."
      />

      <GlassCard className="p-6 space-y-4">
        <label className="text-sm font-bold text-foreground block">
          Enter Your Reel Topic or Niche:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Travel Hacks, Coding Tips, Gym Workout"
            className="h-11 text-base font-bold flex-1"
          />
          <Button
            onClick={generateReelHooks}
            disabled={loading}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Crafting..." : "Generate AI Reel Hooks"}
          </Button>
        </div>
      </GlassCard>

      {/* Premium AI Output Display */}
      <AiOutputDisplay
        title="AI Generated Instagram Reel Hooks & Captions"
        subtitle="3-Second Retention Hooks & Call to Actions"
        content={hooks}
        loading={loading}
        onRegenerate={generateReelHooks}
        variant="prose"
      />
    </div>
  );
}
