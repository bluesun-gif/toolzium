"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { ShieldCheck, Lock, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const SAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggUml2ZXJhIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtInspectorClient() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const [headerJson, setHeaderJson] = useState("");
  const [payloadJson, setPayloadJson] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const decodeJwt = () => {
    try {
      const parts = token.split(".");
      if (parts.length < 2) throw new Error("Invalid JWT token format");

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));

      setHeaderJson(JSON.stringify(header, null, 2));
      setPayloadJson(JSON.stringify(payload, null, 2));
      toast.success("Decoded JWT Header & Payload!");
    } catch (err) {
      toast.error("Failed to decode JWT token.");
    }
  };

  const auditWithAi = async () => {
    if (!token.trim()) return;

    setLoading(true);

    try {
      const prompt = `Audit this JWT token payload and header for security risks, expiration claims (exp, iat), sensitive data leaks, and signing algorithm strength:\n\nHeader: ${headerJson}\nPayload: ${payloadJson}\n\nOutput 4 security audit bullet points. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setAiAnalysis(data.results);
        toast.success("AI JWT security audit complete!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI audit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    decodeJwt();
  }, [token]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4">
      <ToolPageHeader
        icon={ShieldCheck}
        title="JWT Security Audit & Payload Inspector Studio"
        description="Decode JSON Web Tokens (JWT) locally and run live AI security risk audits for algorithm vulnerabilities and payload data leaks."
      />

      <GlassCard className="p-5 space-y-4">
        <label className="text-xs font-bold text-foreground block">
          Paste Encoded JWT Token:
        </label>
        <Input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1Ni..."
          className="h-11 font-mono text-xs"
        />

        <div className="flex justify-end pt-1">
          <Button
            onClick={auditWithAi}
            disabled={loading || !payloadJson}
            className="gap-2 font-bold h-10 px-5 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Security Auditing..." : "AI JWT Security Audit"}
          </Button>
        </div>
      </GlassCard>

      {/* Decoded Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-5 space-y-3">
          <h3 className="text-xs font-bold text-foreground border-b pb-2 uppercase tracking-wider">
            JWT Header (Algorithm & Token Type)
          </h3>
          <pre className="p-4 font-mono text-xs bg-slate-950 text-cyan-400 rounded-xl overflow-x-auto h-48">
            {headerJson || "// Header JSON will appear here..."}
          </pre>
        </GlassCard>

        <GlassCard className="p-5 space-y-3">
          <h3 className="text-xs font-bold text-foreground border-b pb-2 uppercase tracking-wider">
            JWT Payload (Claims & Data)
          </h3>
          <pre className="p-4 font-mono text-xs bg-slate-950 text-emerald-400 rounded-xl overflow-x-auto h-48">
            {payloadJson || "// Payload JSON will appear here..."}
          </pre>
        </GlassCard>
      </div>

      {aiAnalysis.length > 0 && (
        <AiOutputDisplay
          title="AI JWT Security Audit Report"
          subtitle="Real-time LLM security vulnerability and token risk assessment"
          content={aiAnalysis}
          loading={loading}
          onRegenerate={auditWithAi}
          variant="prose"
        />
      )}
    </div>
  );
}
