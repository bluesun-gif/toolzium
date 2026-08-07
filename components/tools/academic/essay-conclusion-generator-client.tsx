"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { BookOpen, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function EssayConclusionGeneratorClient() {
  const [essayContent, setEssayContent] = useState(
    "Artificial intelligence is transforming modern medicine through early disease detection, automated medical imaging, and personalized treatment plans. While ethical concerns regarding patient privacy and algorithmic bias exist, the integration of AI tools promises to decrease hospital diagnostic errors and save lives."
  );
  const [thesis, setThesis] = useState("AI integration in healthcare enhances diagnostic accuracy and patient outcomes when ethically regulated.");
  const [academicTone, setAcademicTone] = useState("Academic & Formal");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateConclusion = async () => {
    if (!essayContent.trim()) return;

    setLoading(true);

    try {
      const prompt = `Write compelling academic essay conclusions for Essay Text: '${essayContent}'. Main Thesis Statement: '${thesis}'. Tone: '${academicTone}'. Provide 3 distinct conclusion options: Option 1: Restated Thesis & Synthesis of Main Points, Option 2: Broader Societal Impact & Future Outlook, Option 3: Call to Action & Thought-Provoking Final Statement. Format as 3 distinct conclusion cards. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Essay Conclusion generated!");
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
        icon={BookOpen}
        title="AI Essay Conclusion & Summary Generator"
        description="Synthesize main arguments, restate thesis statements powerfully, and craft memorable closing paragraphs for academic papers with live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Essay Content / Main Paragraphs:</label>
          <Textarea
            value={essayContent}
            onChange={(e) => setEssayContent(e.target.value)}
            placeholder="Paste your essay body paragraphs here..."
            className="min-h-[140px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Core Thesis Statement:</label>
            <Input
              type="text"
              value={thesis}
              onChange={(e) => setThesis(e.target.value)}
              placeholder="e.g. AI enhances healthcare when ethically regulated"
              className="h-11 font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Academic Writing Tone:</label>
            <select
              value={academicTone}
              onChange={(e) => setAcademicTone(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
            >
              <option value="Academic & Formal">Academic & Formal</option>
              <option value="Persuasive & Opinionated">Persuasive & Opinionated</option>
              <option value="Analytical & Objective">Analytical & Objective</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateConclusion}
            disabled={loading || !essayContent.trim()}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Writing Conclusion..." : "AI Generate Essay Conclusion"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated Academic Essay Conclusions"
          subtitle="Synthesis of main arguments with restated thesis options"
          content={results}
          loading={loading}
          onRegenerate={generateConclusion}
          variant="cards"
        />
      )}
    </div>
  );
}
