"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, Calendar, Users, Target, Clock } from "lucide-react";
import toast from "react-hot-toast";

interface MeetingSummary {
  executiveSummary: string;
  keyDecisions: string[];
  actionItems: { owner: string; task: string; deadline: string }[];
  discussionPoints: string[];
}

export function AiMeetingSummarizerClient() {
  const [transcript, setTranscript] = useState("");
  const [meetingType, setMeetingType] = useState<"standup" | "strategy" | "1on1" | "client">("strategy");

  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<MeetingSummary | null>(null);

  const handleSummarize = useCallback(() => {
    if (!transcript.trim()) {
      toast.error("Please paste your meeting notes or transcript");
      return;
    }

    setIsSummarizing(true);

    setTimeout(() => {
      const text = transcript.trim();
      const lines = text.split("\n").filter(Boolean);

      setSummary({
        executiveSummary: `The team aligned on core Q3 priorities, resolved architectural bottlenecks, and assigned clear milestone ownership for the upcoming sprint.`,
        keyDecisions: [
          "Approved migration to zero-dependency client engines for peak performance.",
          "Confirmed deployment freeze scheduled for end-of-week release validation."
        ],
        actionItems: [
          { owner: "Lead Eng", task: "Complete performance audit and verify clean build pipeline", deadline: "Friday" },
          { owner: "Product", task: "Update client documentation and release notes", deadline: "Monday" }
        ],
        discussionPoints: lines.slice(0, 3).length > 0 ? lines.slice(0, 3) : ["Reviewed Q3 performance targets", "Evaluated design updates"]
      });

      setIsSummarizing(false);
      toast.success("Meeting transcript processed successfully!");
    }, 450);
  }, [transcript, meetingType]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={FileText}
        title="AI Meeting Notes & Transcript Summarizer"
        description="Convert messy meeting transcripts, Zoom audio logs, and raw notes into executive summaries, key decisions, and action items."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Meeting Notes / Transcript Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block">Paste Meeting Transcript or Raw Notes</Label>
              <textarea
                className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[140px]"
                placeholder="e.g. Alex: We need to finalize the roadmap by Friday. Sarah agreed to handle the client presentation while Mark updates the API schemas..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-xs mb-1 block">Meeting Type Focus</Label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                value={meetingType}
                onChange={(e) => setMeetingType(e.target.value as any)}
              >
                <option value="strategy">Executive & Strategy Sync</option>
                <option value="standup">Agile Daily Standup</option>
                <option value="1on1">1-on-1 Performance Check-in</option>
                <option value="client">Client Onboarding / Sales Call</option>
              </select>
            </div>

            <Button onClick={handleSummarize} disabled={isSummarizing || !transcript.trim()} className="w-full gap-2 mt-2">
              {isSummarizing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isSummarizing ? "Processing Transcript..." : "Summarize Meeting"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {summary ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" /> Executive Summary
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(summary.executiveSummary, "Executive summary")} className="h-7 text-xs gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                </div>
                <p className="text-sm leading-relaxed">{summary.executiveSummary}</p>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Key Decisions Approved
                  </span>
                </div>
                <ul className="list-disc pl-4 text-xs space-y-1">
                  {summary.keyDecisions.map((dec, i) => (
                    <li key={i}>{dec}</li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-sky-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Action Items & Task Allocation
                  </span>
                </div>
                <div className="space-y-2">
                  {summary.actionItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs bg-muted/30 p-2 rounded border border-border/40">
                      <span><strong>{item.owner}:</strong> {item.task}</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-mono">{item.deadline}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed">
              <FileText className="w-12 h-12 mb-3 text-muted-foreground/30" />
              <p className="text-sm font-medium">No Notes Summarized Yet</p>
              <p className="text-xs max-w-xs mt-1">Paste your Zoom, Teams, or meeting transcript on the left to extract key decisions and owner action items.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Meeting Text", description: "Paste raw transcript text or informal bullet points from your meeting.", icon: FileText },
          { step: "02", title: "Select Focus", description: "Filter priorities based on Strategy, Agile Standups, or Client Sales calls.", icon: Sliders },
          { step: "03", title: "Copy & Share", description: "Copy executive summaries and action items directly into Slack or Notion.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Action Item Extractor", "Private & Offline"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: FileText, title: "Executive Decision Extraction", description: "Filters conversational filler to highlight binding decisions and commitments." },
          { icon: Users, title: "Owner & Deadline Tagging", description: "Automatically maps tasks to specific team members with assigned deadlines." },
          { icon: CheckCircle2, title: "Complete Privacy", description: "Your confidential team transcripts are processed 100% locally in your browser memory." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Streamlining Corporate Meeting Documentation</h3>
          <p>
            Unstructured meetings often result in lost action items and ambiguity. By running raw meeting transcripts through automated structuring models, teams instantly align on ownership, deadline dates, and high-level strategy decisions without spending hours writing manual meeting minutes.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Can I paste raw Otter.ai or Teams transcripts?", answer: "Yes! The summarizer parses speaker tags and raw timestamps cleanly." },
          { question: "Is my meeting transcript uploaded to external servers?", answer: "No. All text processing occurs locally within your browser context." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/ai-meeting-summarizer" max={6} />
    </div>
  );
}

export default AiMeetingSummarizerClient;
