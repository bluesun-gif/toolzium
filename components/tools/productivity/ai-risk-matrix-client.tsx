"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { AlertTriangle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AiRiskMatrixClient() {
  const [projectScope, setProjectScope] = useState(
    "Migrating our monolithic Node.js backend to a serverless AWS Lambda architecture with PostgreSQL Neon cloud database."
  );
  const [projectTimeline, setProjectTimeline] = useState("6 Weeks");
  const [teamSize, setTeamSize] = useState("4 Engineers");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const auditRiskMatrix = async () => {
    if (!projectScope.trim()) return;

    setLoading(true);

    try {
      const prompt = `Audit project risks & assumptions for Scope: '${projectScope}'. Timeline: '${projectTimeline}'. Team: '${teamSize}'. Structure into 4 risk categories: Category 1: Technical & Architecture Vulnerabilities, Category 2: Timeline & Delay Risk Factors, Category 3: Resource & Key Person Dependencies, Category 4: Mitigation Action Plan & Preventive Controls. Format as 4 distinct risk audit cards. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Risk Matrix Audit complete!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI risk audit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={AlertTriangle}
        title="AI Project Risk & Assumption Matrix Auditor"
        description="Identify hidden project risks, technical debt, timeline bottlenecks, and mitigation plans with live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Project Scope & Specs:</label>
          <Textarea
            value={projectScope}
            onChange={(e) => setProjectScope(e.target.value)}
            placeholder="Describe project tech stack, scope, and objectives..."
            className="min-h-[110px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Project Deadline / Duration:</label>
            <Input
              type="text"
              value={projectTimeline}
              onChange={(e) => setProjectTimeline(e.target.value)}
              placeholder="e.g. 4 Months"
              className="h-11 font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Team Resources:</label>
            <Input
              type="text"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              placeholder="e.g. 2 Full-Stack Developers + 1 Designer"
              className="h-11"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={auditRiskMatrix}
            disabled={loading || !projectScope.trim()}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Auditing Risks..." : "AI Audit Project Risk Matrix"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated Project Risk Matrix Audit"
          subtitle="Technical debt, timeline dependencies, and preventive controls"
          content={results}
          loading={loading}
          onRegenerate={auditRiskMatrix}
          variant="cards"
        />
      )}
    </div>
  );
}
