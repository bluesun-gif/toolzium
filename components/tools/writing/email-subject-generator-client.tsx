"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Mail, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function EmailSubjectGeneratorClient() {
  const [topic, setTopic] = useState("Exclusive 48-Hour Summer Sale on Developer Tools");
  const [goal, setGoal] = useState("Maximum Email Open Rate & Urgency");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSubjects = async () => {
    if (!topic.trim()) return;

    setLoading(true);

    try {
      const prompt = `Generate 6 high-open-rate email subject lines for an email about '${topic}'. Goal: '${goal}'. Include curiosity hooks, FOMO triggers, personal tone, and emoji variations. Format as 6 distinct subject line cards. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Subject lines generated!");
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
        icon={Mail}
        title="AI High Open-Rate Email Subject Line Generator"
        description="Generate irresistible email subject lines for newsletter campaigns, sales outreach, and promotional announcements powered by live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Email Campaign Topic:</label>
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. New Product Feature Launch"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Campaign Goal / Desired Effect:</label>
          <Input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. High Curiosity, Direct Value, FOMO Urgency"
            className="h-11"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateSubjects}
            disabled={loading || !topic}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Generating Subjects..." : "AI Generate Subject Lines"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated Email Subject Lines"
          subtitle="Optimized for inbox visibility and high click-through rates"
          content={results}
          loading={loading}
          onRegenerate={generateSubjects}
          variant="cards"
        />
      )}
    </div>
  );
}
