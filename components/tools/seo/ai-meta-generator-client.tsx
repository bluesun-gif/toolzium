"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Search, Sparkles, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AiMetaGeneratorClient() {
  const [topic, setTopic] = useState("SaaS Invoice & Billing Software for Freelancers");
  const [keywords, setKeywords] = useState("freelance invoicing, client billing, PDF receipt maker");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateMeta = async () => {
    if (!topic.trim()) return;

    setLoading(true);

    try {
      const prompt = `Generate 4 high-click-through rate SEO Title tags (under 60 characters) and compelling Meta Descriptions (under 155 characters) for a website about: '${topic}'. Keywords to target: '${keywords}'. Format as 4 distinct title + description pairs. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Meta tags generated!");
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
        icon={Search}
        title="AI High-CTR SEO Title & Meta Description Generator"
        description="Generate search-optimized HTML title tags and meta descriptions tailored for maximum organic Google click-through rates with live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Page Topic / Product Name:</label>
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Best Ergonomic Office Chairs 2026"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Target SEO Keywords (Comma Separated):</label>
          <Input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="ergonomic chair, lumbar support, desk posture"
            className="h-11"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateMeta}
            disabled={loading || !topic}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Generating Meta Tags..." : "AI Generate High-CTR Meta Tags"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated High-CTR Meta Tags & Titles"
          subtitle="Ready to paste into your website's HTML <head> section"
          content={results}
          loading={loading}
          onRegenerate={generateMeta}
          variant="cards"
        />
      )}
    </div>
  );
}
