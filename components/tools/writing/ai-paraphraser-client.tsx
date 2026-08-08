"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Sparkles, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AiParaphraserClient() {
  const [originalText, setOriginalText] = useState(
    "We need to streamline our operational workflow to maximize efficiency, cut unnecessary expenses, and ensure that our quarterly milestones are delivered on time."
  );
  const [targetTone, setTargetTone] = useState("Professional & Executive");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const paraphraseText = async () => {
    if (!originalText.trim()) return;

    setLoading(true);

    try {
      const prompt = `Rewrite and paraphrase the following text: '${originalText}'. Target Tone / Style: '${targetTone}'. Generate 4 distinct rephrased options: Option 1: Fluent & Natural Standard, Option 2: Executive & Professional, Option 3: Short & Punchy Concise, Option 4: Engaging & Creative Storyteller. Format as 4 distinct paraphrased text cards. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Paraphrasing complete!");
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
        icon={Sparkles}
        title="AI Content Paraphraser & Tone Transformer Studio"
        description="Rewrite sentences, paragraphs, and articles into professional, concise, or creative tones with live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Original Text to Paraphrase:</label>
          <Textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Paste sentence or paragraph to rewrite..."
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Desired Rewrite Tone / Style:</label>
          <select
            value={targetTone}
            onChange={(e) => setTargetTone(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
          >
            <option value="Professional & Executive">Professional & Executive</option>
            <option value="Casual & Conversational">Casual & Conversational</option>
            <option value="Academic & Formal">Academic & Formal</option>
            <option value="Short & Punchy">Short & Punchy</option>
            <option value="Persuasive & Sales-Focused">Persuasive & Sales-Focused</option>
          </select>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={paraphraseText}
            disabled={loading || !originalText.trim()}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Rewriting Text..." : "AI Paraphrase & Transform Text"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated Paraphrased Variations"
          subtitle="Select the best rewrite for your target audience"
          content={results}
          loading={loading}
          onRegenerate={paraphraseText}
          variant="cards"
        />
      )}
    </div>
  );
}
