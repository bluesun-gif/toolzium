"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Video, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function YoutubeScriptGeneratorClient() {
  const [topic, setTopic] = useState("How to Build a $10k/Month SaaS Business in 2026");
  const [targetAudience, setTargetAudience] = useState("Aspiring Solopreneurs & Software Engineers");
  const [videoLength, setVideoLength] = useState("8-10 Minutes");
  const [tone, setTone] = useState("High Energy & Educational");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    if (!topic.trim()) return;

    setLoading(true);

    try {
      const prompt = `Generate a full high-retention YouTube video script & outline for topic: '${topic}'. Target Audience: '${targetAudience}'. Length: '${videoLength}'. Tone: '${tone}'. Break down into 4 key visual sections: Section 1: 5-Second Curiosity Hook & Title Callback, Section 2: Problem Staking & Retention Bridge, Section 3: Step-by-Step Value Delivery & B-Roll Cues, Section 4: Outro & High-Converting CTA. Format as 4 distinct script section cards. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI YouTube Script generated!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Video}
        title="AI YouTube Video Script & Outline Generator"
        description="Generate high-retention 5-second opening hooks, B-roll cues, step-by-step value scripts, and high-CTR calls to action using live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Video Topic / Title Idea:</label>
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. 7 Hidden Mac Features You Need to Use"
            className="h-11 font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Target Audience:</label>
            <Input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Target Video Length:</label>
            <select
              value={videoLength}
              onChange={(e) => setVideoLength(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
            >
              <option value="3-5 Minutes">3-5 Minutes (Quick Guide)</option>
              <option value="8-10 Minutes">8-10 Minutes (Mid-Length Standard)</option>
              <option value="15+ Minutes">15+ Minutes (Deep Dive Masterclass)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Video Tone / Vibe:</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
            >
              <option value="High Energy & Educational">High Energy & Educational</option>
              <option value="Cinematic & Storytelling">Cinematic & Storytelling</option>
              <option value="Casual & Conversational">Casual & Conversational</option>
              <option value="Urgent & Provocative">Urgent & Provocative</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateScript}
            disabled={loading || !topic.trim()}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Scripting Video..." : "AI Generate YouTube Script"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated High-Retention YouTube Video Script"
          subtitle="Complete with B-roll cues, hooks, and retention bridges"
          content={results}
          loading={loading}
          onRegenerate={generateScript}
          variant="cards"
        />
      )}
    </div>
  );
}
