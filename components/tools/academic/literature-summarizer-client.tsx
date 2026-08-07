"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { GraduationCap, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function LiteratureSummarizerClient() {
  const [paperAbstract, setPaperAbstract] = useState(
    "This study investigates the impact of remote work policies on employee productivity and mental well-being across 500 tech companies from 2021 to 2025. Using a randomized control trial methodology, results indicate a 14% increase in self-reported task focus and a 22% reduction in turnover intention among hybrid workers compared to full-time in-office staff."
  );
  const [summaryFormat, setSummaryFormat] = useState("Executive & Key Findings");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const summarizePaper = async () => {
    if (!paperAbstract.trim()) return;

    setLoading(true);

    try {
      const prompt = `Synthesize academic paper abstract / text: '${paperAbstract}'. Requested Summary Format: '${summaryFormat}'. Provide 4 structured bullet points analyzing: 1. Core Research Objective & Problem, 2. Methodology & Sample Size, 3. Key Findings & Empirical Data Points, 4. Research Implications & Limitations. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Literature Summary complete!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI summarization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={GraduationCap}
        title="AI Literature Review & Academic Paper Summarizer"
        description="Extract core research objectives, methodologies, sample sizes, empirical findings, and limitations from academic papers with live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Paper Abstract / Full Text:</label>
          <Textarea
            value={paperAbstract}
            onChange={(e) => setPaperAbstract(e.target.value)}
            placeholder="Paste academic paper abstract or excerpts here..."
            className="min-h-[160px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Summary Output Depth:</label>
          <select
            value={summaryFormat}
            onChange={(e) => setSummaryFormat(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
          >
            <option value="Executive & Key Findings">Executive Summary & Key Empirical Findings</option>
            <option value="Methodology & Data Analysis">Methodology, Sample Size & Statistical Analysis</option>
            <option value="Literature Review Synthesis">Literature Review Synthesis & Citation Notes</option>
          </select>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={summarizePaper}
            disabled={loading || !paperAbstract.trim()}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Summarizing Paper..." : "AI Synthesize Academic Paper"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="AI Academic Literature Synthesis & Key Takeaways"
          subtitle="Objective, methodology, data findings, and research limitations"
          content={results}
          loading={loading}
          onRegenerate={summarizePaper}
          variant="prose"
        />
      )}
    </div>
  );
}
