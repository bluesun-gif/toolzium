"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Zap, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AiElevatorPitchClient() {
  const [productName, setProductName] = useState("Toolzium AI");
  const [targetAudience, setTargetAudience] = useState("Developers, Content Creators & Digital Marketers");
  const [problemSolved, setProblemSolved] = useState("Finding fast, high-converting online tools and AI utility apps without bloatware or paywalls.");
  const [keyDifference, setKeyDifference] = useState("100% instant client-side tools with multi-provider AI key fallback.");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateElevatorPitch = async () => {
    if (!productName.trim() || !problemSolved.trim()) return;

    setLoading(true);

    try {
      const prompt = `Write persuasive 30-second elevator pitches for Product: '${productName}'. Target Audience: '${targetAudience}'. Problem Solved: '${problemSolved}'. Key Differentiator: '${keyDifference}'. Generate 4 pitch styles: Style 1: 15-Second High-Impact Hook Pitch, Style 2: Problem-Agitation-Solution Investor Pitch, Style 3: Customer Pain-Point Story Pitch, Style 4: Viral Social Media Pitch. Format as 4 distinct pitch cards. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Elevator Pitch generated!");
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
        icon={Zap}
        title="AI Elevator Pitch & Value Proposition Studio"
        description="Craft compelling 15 to 30-second elevator pitches and value propositions for investors, clients, and landing pages with live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Product / Startup Name:</label>
            <Input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Acme AI"
              className="h-11 font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Target Audience / Customer:</label>
            <Input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. SaaS Founders & Product Managers"
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Main Problem You Solve:</label>
          <Textarea
            value={problemSolved}
            onChange={(e) => setProblemSolved(e.target.value)}
            placeholder="Describe the painful problem or frustration..."
            className="min-h-[90px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Key Differentiator / Secret Sauce:</label>
          <Input
            type="text"
            value={keyDifference}
            onChange={(e) => setKeyDifference(e.target.value)}
            placeholder="e.g. 10x faster with zero configuration"
            className="h-11"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateElevatorPitch}
            disabled={loading || !productName.trim() || !problemSolved.trim()}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Crafting Pitch..." : "AI Generate Elevator Pitch Options"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated Elevator Pitches & Value Propositions"
          subtitle="Ready for investor meetings, demo days, and sales calls"
          content={results}
          loading={loading}
          onRegenerate={generateElevatorPitch}
          variant="cards"
        />
      )}
    </div>
  );
}
