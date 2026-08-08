"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { CheckSquare, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AiActionItemsClient() {
  const [transcript, setTranscript] = useState(
    "Alex: We need to finalize the Q3 marketing budget by Thursday. Sarah, can you audit last month's Meta ad spend and send the report? Sarah: Sure, I'll have that done by Wednesday morning. Dave: I'm working on the landing page redesign and will set up A/B testing on Friday."
  );
  const [meetingTitle, setMeetingTitle] = useState("Q3 Marketing & Growth Strategy Standup");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const extractActionItems = async () => {
    if (!transcript.trim()) return;

    setLoading(true);

    try {
      const prompt = `Extract action items from Meeting Transcript: '${transcript}'. Meeting Title: '${meetingTitle}'. Create detailed action item cards formatted with: 1. Owner Name & Task Assignment, 2. Deadline / Target Date, 3. Priority Level (High/Medium/Low), 4. Key Dependencies. Format as 4 distinct action item cards. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Action Items extracted!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI extraction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={CheckSquare}
        title="AI Meeting Action Items Extractor Studio"
        description="Convert raw meeting transcripts and notes into clear owner assignments, deadlines, and task cards using live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Meeting Transcript / Notes:</label>
          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste meeting transcript or informal notes here..."
            className="min-h-[130px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Meeting Subject / Title:</label>
          <Input
            type="text"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            placeholder="e.g. Sprint Planning Standup"
            className="h-11 font-medium"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={extractActionItems}
            disabled={loading || !transcript.trim()}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Extracting Tasks..." : "AI Extract Action Items"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Extracted Action Items & Assignments"
          subtitle="Owner assignments, deadlines, and priority levels"
          content={results}
          loading={loading}
          onRegenerate={extractActionItems}
          variant="cards"
        />
      )}
    </div>
  );
}
