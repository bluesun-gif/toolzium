"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { LayoutDashboard, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AiStatusReportClient() {
  const [completedTasks, setCompletedTasks] = useState(
    "Deployed 4 new AI finance calculators, optimized Neon PostgreSQL connection pooling, fixed TypeScript build linter errors."
  );
  const [inProgressTasks, setInProgressTasks] = useState(
    "Building AI productivity tools suite, updating global tools data registry."
  );
  const [blockers, setBlockers] = useState("Waiting on API key quota limit upgrade for secondary OpenRouter account.");
  const [projectStatus, setProjectStatus] = useState("On Track (Green)");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateStatusReport = async () => {
    if (!completedTasks.trim()) return;

    setLoading(true);

    try {
      const prompt = `Write an Executive Weekly Status Report: Completed Achievements: '${completedTasks}', Active Tasks in Progress: '${inProgressTasks}', Blockers / Risks: '${blockers}', Overall Health Status: '${projectStatus}'. Format into 4 executive report cards: Card 1: Executive Summary & Health Status, Card 2: Key Accomplishments Completed, Card 3: Active Focus & Upcoming Priorities, Card 4: Blockers & Resource Requests. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Weekly Status Report generated!");
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
        icon={LayoutDashboard}
        title="AI Executive Weekly Status Report Generator"
        description="Convert weekly task notes, completed tickets, and blockers into structured executive status reports for stakeholders with live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Completed Accomplishments This Week:</label>
          <Textarea
            value={completedTasks}
            onChange={(e) => setCompletedTasks(e.target.value)}
            placeholder="List completed tickets, milestones reached..."
            className="min-h-[90px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">In Progress / Next Week Focus:</label>
            <Textarea
              value={inProgressTasks}
              onChange={(e) => setInProgressTasks(e.target.value)}
              placeholder="List active tasks..."
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Blockers / Risks:</label>
            <Textarea
              value={blockers}
              onChange={(e) => setBlockers(e.target.value)}
              placeholder="List bottlenecks or dependencies..."
              className="min-h-[80px]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Overall Project Health Indicator:</label>
          <select
            value={projectStatus}
            onChange={(e) => setProjectStatus(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
          >
            <option value="On Track (Green)">On Track (Green)</option>
            <option value="Minor Delay Risk (Yellow)">Minor Delay Risk (Yellow)</option>
            <option value="Critical Blocker (Red)">Critical Blocker (Red)</option>
          </select>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateStatusReport}
            disabled={loading || !completedTasks.trim()}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Building Report..." : "AI Generate Executive Status Report"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated Executive Weekly Status Report"
          subtitle="Accomplishments, active priorities, and risk escalation"
          content={results}
          loading={loading}
          onRegenerate={generateStatusReport}
          variant="cards"
        />
      )}
    </div>
  );
}
