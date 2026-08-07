"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { FileText, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function ResumeSummaryGeneratorClient() {
  const [jobTitle, setJobTitle] = useState("Senior Full-Stack Engineer");
  const [yearsExp, setYearsExp] = useState("6+ years");
  const [skills, setSkills] = useState("React, Next.js, Node.js, PostgreSQL, AWS, GraphQL");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!jobTitle.trim()) return;

    setLoading(true);

    try {
      const prompt = `Write 3 executive resume professional summaries and bullet point lists for a '${jobTitle}' with '${yearsExp}' of experience. Key Skills: '${skills}'. Include quantifiable impact metrics and action verbs. Format as 3 distinct resume summary options. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Resume summaries generated!");
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
        title="AI Executive Resume Summary & Bullet Point Generator"
        description="Craft high-impact resume professional summaries, experience bullet points, and ATS-friendly keywords powered by live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Target Job Title:</label>
            <Input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Lead Product Designer"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Years of Experience:</label>
            <Input
              type="text"
              value={yearsExp}
              onChange={(e) => setYearsExp(e.target.value)}
              placeholder="e.g. 5+ years"
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Core Technical & Soft Skills:</label>
          <Input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. Figma, UI Systems, Team Leadership"
            className="h-11"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateSummary}
            disabled={loading || !jobTitle}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Writing Summaries..." : "AI Generate Resume Summary"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated ATS Resume Summaries"
          subtitle="Impactful action-oriented summaries ready for your CV"
          content={results}
          loading={loading}
          onRegenerate={generateSummary}
          variant="cards"
        />
      )}
    </div>
  );
}
