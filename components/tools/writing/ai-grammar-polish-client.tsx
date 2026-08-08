"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { CheckCircle2, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AiGrammarPolishClient() {
  const [draftText, setDraftText] = useState(
    "Their is many reasons why companies should adopts AI tools. Its faster, cost less money, and make employees more effective on daily work."
  );
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fixGrammar = async () => {
    if (!draftText.trim()) return;

    setLoading(true);

    try {
      const prompt = `Proofread, audit, and fix grammar errors in text: '${draftText}'. Provide 4 structured bullet points: 1. Corrected Polished Text Version, 2. Key Grammar & Spelling Corrections Made, 3. Style & Punctuation Enhancements, 4. Vocabulary Improvement Recommendations. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Grammar Proofreading complete!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI proofreading failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={CheckCircle2}
        title="AI Grammar & Style Polish Studio"
        description="Audit grammar errors, fix spelling mistakes, and polish style tone for emails, essays, and reports with live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Draft Text to Audit & Polish:</label>
          <Textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            placeholder="Paste text with potential typos or awkward phrasing..."
            className="min-h-[140px]"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={fixGrammar}
            disabled={loading || !draftText.trim()}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Proofreading Text..." : "AI Fix Grammar & Polish Text"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="AI Grammar & Style Audit Results"
          subtitle="Corrected text, explanation of edits, and vocabulary enhancements"
          content={results}
          loading={loading}
          onRegenerate={fixGrammar}
          variant="prose"
        />
      )}
    </div>
  );
}
