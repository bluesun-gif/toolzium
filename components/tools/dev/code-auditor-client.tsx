"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Braces, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const SAMPLE_CODE = `function processUserData(user) {
  if (user != null) {
    let query = "SELECT * FROM users WHERE id = '" + user.id + "'";
    eval(query);
    console.log("Processed: " + user.name);
  }
}`;

export default function CodeAuditorClient() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [aiReport, setAiReport] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const auditCode = async () => {
    if (!code.trim()) return;

    setLoading(true);

    try {
      const prompt = `Audit this source code for security vulnerabilities (SQL injection, eval execution, XSS), performance bottlenecks, and refactoring improvements:\n\n${code.slice(0, 1500)}\n\nOutput 4 actionable refactoring bullet points. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setAiReport(data.results);
        toast.success("AI code audit complete!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI audit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Braces}
        title="AI Code Refactoring & Security Vulnerability Auditor"
        description="Audit JavaScript, TypeScript, Python, and SQL code for security vulnerabilities, memory leaks, and performance refactoring with live AI inference."
      />

      <GlassCard className="p-6 space-y-4">
        <label className="text-xs font-bold text-foreground block">
          Paste Source Code Snippet:
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={8}
          className="w-full p-3 font-mono text-xs bg-slate-950 text-slate-100 rounded-xl border"
        />

        <div className="flex justify-end pt-2">
          <Button
            onClick={auditCode}
            disabled={loading || !code}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Auditing Code..." : "AI Audit & Refactor Code"}
          </Button>
        </div>
      </GlassCard>

      {/* AI Report Output */}
      {aiReport.length > 0 && (
        <AiOutputDisplay
          title="AI Code Audit & Refactoring Recommendations"
          subtitle="Real-time LLM vulnerability detection & performance optimization"
          content={aiReport}
          loading={loading}
          onRegenerate={auditCode}
          variant="prose"
        />
      )}
    </div>
  );
}
