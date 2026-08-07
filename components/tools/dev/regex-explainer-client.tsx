"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Code2, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function RegexExplainerClient() {
  const [pattern, setPattern] = useState("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  const [sampleText, setSampleText] = useState("Contact us at support@toolzium.com or alex@example.org");
  const [aiExplanation, setAiExplanation] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const explainRegex = async () => {
    if (!pattern.trim()) return;

    setLoading(true);

    try {
      const prompt = `Explain this regular expression pattern in plain English step-by-step: '${pattern}'. Describe what each character class, quantifier, anchor, and group matches. Output 4 clear bullet points. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setAiExplanation(data.results);
        toast.success("AI Regex breakdown complete!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI breakdown failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Code2}
        title="Regex Tester & AI Natural Language Explainer"
        description="Test regular expressions against live sample strings and generate plain-English breakdowns of regex syntax with live AI inference."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Regex Pattern String:</label>
          <Input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="^[a-zA-Z0-9]+$"
            className="h-11 font-mono text-sm font-bold text-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Test Input Text:</label>
          <textarea
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            rows={3}
            className="w-full p-3 font-mono text-xs bg-slate-950 text-slate-100 rounded-xl border"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={explainRegex}
            disabled={loading}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Explaining..." : "AI Explain Regex Pattern"}
          </Button>
        </div>
      </GlassCard>

      {/* AI Explanation Output */}
      {aiExplanation.length > 0 && (
        <AiOutputDisplay
          title="AI Plain-English Regex Breakdown"
          subtitle="Real-time LLM step-by-step regex syntax explanation"
          content={aiExplanation}
          loading={loading}
          onRegenerate={explainRegex}
          variant="prose"
        />
      )}
    </div>
  );
}
