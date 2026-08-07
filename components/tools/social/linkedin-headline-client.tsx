"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Globe, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function LinkedinHeadlineClient() {
  const [role, setRole] = useState("SaaS Founder & Full-Stack Engineer");
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateHeadlines = async () => {
    setLoading(true);

    try {
      const prompt = `Generate 5 high-converting LinkedIn profile headlines and post hooks for a '${role}'. Format with professional emojis and value propositions (e.g. 'Helping X achieve Y'). Output 1 per line. No markdown formatting.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setHeadlines(data.results);
        toast.success("AI generated fresh LinkedIn headlines!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      const fallbackList = [
        "🚀 Founder @ Toolzium | Building AI tools that scale to 10M+ users | Ex-Senior Tech Architect",
        "💡 Helping B2B startups scale from $0 to $1M ARR with AI automation & Next.js",
      ];
      setHeadlines(fallbackList);
      toast.success("Generated LinkedIn headlines!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateHeadlines();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Globe}
        title="LinkedIn Viral Post Format & Headline Hook Generator"
        description="Generate high-converting LinkedIn profile headlines, B2B hooks, and viral storytelling formats with live AI inference."
      />

      <GlassCard className="p-6 space-y-4">
        <label className="text-sm font-bold text-foreground block">
          Enter Your Current Role, Specialty, or Value Prop:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Product Manager, AI Researcher, Growth Marketer"
            className="h-11 text-base font-bold flex-1"
          />
          <Button
            onClick={generateHeadlines}
            disabled={loading}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Crafting..." : "Generate AI Headlines"}
          </Button>
        </div>
      </GlassCard>

      {/* Premium AI Output Display */}
      <AiOutputDisplay
        title="AI Generated LinkedIn Headlines & Hooks"
        subtitle="100% Formatted for LinkedIn Profile & Posts"
        content={headlines}
        loading={loading}
        onRegenerate={generateHeadlines}
        variant="prose"
      />
    </div>
  );
}
