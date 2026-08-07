"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { FileText, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AiSowGeneratorClient() {
  const [projectTitle, setProjectTitle] = useState("E-Commerce Web Platform Overhaul");
  const [clientName, setClientName] = useState("Vanguard Retail Brands");
  const [timeline, setTimeline] = useState("6 Weeks (Phased Delivery)");
  const [scopeDetails, setScopeDetails] = useState("Redesign Next.js storefront UI, integrate Stripe Checkout, optimize mobile performance to sub-1s load times, and configure Postgres database caching.");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSow = async () => {
    if (!projectTitle.trim() || !scopeDetails.trim()) return;

    setLoading(true);

    try {
      const prompt = `Write a Statement of Work (SOW) document: Project Title: '${projectTitle}', Client: '${clientName}', Timeline: '${timeline}', Scope: '${scopeDetails}'. Break into 4 key section cards: Section 1: Executive Summary & Objective, Section 2: Phase Breakdown & Milestone Deliverables, Section 3: Acceptance Criteria & Out-of-Scope Exclusions, Section 4: Project Assumptions & Review Sign-off. Format as 4 distinct SOW section cards. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Statement of Work generated!");
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
        icon={FileText}
        title="AI Statement of Work (SOW) Deliverables Generator"
        description="Generate professional client Statement of Work (SOW) documents with phased milestone deliverables, acceptance criteria, and out-of-scope boundaries using live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Project Title:</label>
            <Input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. Mobile App Redesign"
              className="h-11 font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Client Organization:</label>
            <Input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Acme Corp"
              className="h-11 font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Project Scope & Deliverable Notes:</label>
          <Textarea
            value={scopeDetails}
            onChange={(e) => setScopeDetails(e.target.value)}
            placeholder="Outline main technical goals, integrations, features..."
            className="min-h-[110px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Estimated Project Timeline:</label>
          <Input
            type="text"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            placeholder="e.g. 4 Weeks (Sprint 1 to 4)"
            className="h-11"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateSow}
            disabled={loading || !projectTitle.trim() || !scopeDetails.trim()}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Building SOW..." : "AI Generate Statement of Work"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated Statement of Work (SOW) Document"
          subtitle="Milestone deliverables, acceptance criteria, and out-of-scope boundaries"
          content={results}
          loading={loading}
          onRegenerate={generateSow}
          variant="cards"
        />
      )}
    </div>
  );
}
