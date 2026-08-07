"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { PenTool, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function BlogIntroGeneratorClient() {
  const [title, setTitle] = useState("10 Proven Ways to Scale a Next.js App in 2026");
  const [audience, setAudience] = useState("Full-Stack Developers & Software Architects");
  const [tone, setTone] = useState("Engaging, Technical & Authoritative");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateIntros = async () => {
    if (!title.trim()) return;

    setLoading(true);

    try {
      const prompt = `Write 3 captivating blog post introductions for an article titled '${title}'. Target Audience: '${audience}'. Tone: '${tone}'. Include a strong opening hook, pain point acknowledgment, and promise of value. Format as 3 distinct blog intro cards. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Blog intros generated!");
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
        icon={PenTool}
        title="AI Blog Post Intro & Opening Hook Generator"
        description="Generate captivating opening paragraphs and high-retention hooks for articles, Medium posts, and tech blogs with live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Blog Title / Main Topic:</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How to Build an AI App with Next.js"
            className="h-11"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Target Readers:</label>
            <Input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Founders, Marketers, Students"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Tone of Voice:</label>
            <Input
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              placeholder="e.g. Conversational, Academic, Storytelling"
              className="h-11"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateIntros}
            disabled={loading || !title}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Writing Intros..." : "AI Generate Blog Intros"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated Blog Post Introductions"
          subtitle="High-retention hooks to boost reader engagement"
          content={results}
          loading={loading}
          onRegenerate={generateIntros}
          variant="cards"
        />
      )}
    </div>
  );
}
