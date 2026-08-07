"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Shield, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const SAMPLE_ENV = `DATABASE_URL=postgresql://user:password123@localhost:5432/mydb
STRIPE_SECRET_KEY=sk_live_51NxEXAMPLEKEY998877
NEXT_PUBLIC_API_KEY=groq_abc123secret
PORT=3000
NODE_ENV=production`;

export default function EnvScannerClient() {
  const [envContent, setEnvContent] = useState(SAMPLE_ENV);
  const [aiReport, setAiReport] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const scanEnv = async () => {
    if (!envContent.trim()) return;

    setLoading(true);

    try {
      const prompt = `Audit this .env file content for hardcoded secrets, unencrypted credentials, public variable naming risks (e.g. NEXT_PUBLIC_ leaky prefixes), and security best practices:\n\n${envContent.slice(0, 1000)}\n\nOutput 4 vulnerability & remediation bullet points. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setAiReport(data.results);
        toast.success("AI .env secret scan complete!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI scan failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Shield}
        title="Env Variables Security Risk & Secret Leak Scanner"
        description="Audit .env files for leaked production API keys, hardcoded database credentials, and NEXT_PUBLIC prefix vulnerabilities with live AI inference."
      />

      <GlassCard className="p-6 space-y-4">
        <label className="text-xs font-bold text-foreground block">
          Paste Your .env File Content (Safe - Processed in Memory):
        </label>
        <textarea
          value={envContent}
          onChange={(e) => setEnvContent(e.target.value)}
          rows={7}
          className="w-full p-3 font-mono text-xs bg-slate-950 text-slate-100 rounded-xl border"
        />

        <div className="flex justify-end pt-2">
          <Button
            onClick={scanEnv}
            disabled={loading || !envContent}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Scanning Secrets..." : "AI Scan .env File"}
          </Button>
        </div>
      </GlassCard>

      {/* AI Report Output */}
      {aiReport.length > 0 && (
        <AiOutputDisplay
          title="AI Secret Risk Audit Report"
          subtitle="100% Security Best Practice & Leak Protection"
          content={aiReport}
          loading={loading}
          onRegenerate={scanEnv}
          variant="prose"
        />
      )}
    </div>
  );
}
