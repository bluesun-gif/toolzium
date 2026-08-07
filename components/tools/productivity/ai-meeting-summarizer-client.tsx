"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { ClipboardList, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const SAMPLE_TRANSCRIPT = `Alex: Welcome everyone. Today we are reviewing the Q3 roadmap for Toolzium.
Sarah: The API key rotation features are 100% deployed. We saw zero downtime during peak traffic.
Michael: Great work. Next sprint we need to optimize client bundle size for Next.js app pages.
Alex: Agreed. Michael will lead bundle analysis and Sarah will audit external dependencies by Friday.`;

export default function AiMeetingSummarizerClient() {
  const [transcript, setTranscript] = useState(SAMPLE_TRANSCRIPT);
  const [summary, setSummary] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const summarizeMeeting = async () => {
    if (!transcript.trim()) return;

    setLoading(true);

    try {
      const prompt = `Summarize this meeting transcript into an executive summary, key decisions made, owner action items, and deadline commitments:\n\n${transcript.slice(0, 2000)}\n\nOutput 4 structured bullet points. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setSummary(data.results);
        toast.success("AI Meeting summary generated!");
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
        icon={ClipboardList}
        title="AI Executive Meeting Notes & Action Item Summarizer"
        description="Transform raw meeting transcripts, Zoom notes, and Slack huddle logs into executive summaries and action items with live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <label className="text-xs font-bold text-foreground block">
          Paste Raw Meeting Transcript or Notes:
        </label>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={7}
          className="w-full p-3 font-mono text-xs bg-slate-950 text-slate-100 rounded-xl border"
        />

        <div className="flex justify-end pt-2">
          <Button
            onClick={summarizeMeeting}
            disabled={loading || !transcript}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Summarizing..." : "AI Summarize Meeting Notes"}
          </Button>
        </div>
      </GlassCard>

      {/* AI Summary Output */}
      {summary.length > 0 && (
        <AiOutputDisplay
          title="AI Executive Meeting Summary & Action Items"
          subtitle="Key decisions, task assignees, and project deadlines"
          content={summary}
          loading={loading}
          onRegenerate={summarizeMeeting}
          variant="prose"
        />
      )}
    </div>
  );
}
