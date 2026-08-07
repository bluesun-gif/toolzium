"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Mail, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function ColdEmailGeneratorClient() {
  const [product, setProduct] = useState("AI-Powered SEO & Content Optimization Platform");
  const [targetAudience, setTargetAudience] = useState("Head of Marketing at E-Commerce Brands");
  const [valueProp, setValueProp] = useState("Increases organic Google traffic by 40% in 30 days without manual copywriting.");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateEmails = async () => {
    if (!product.trim()) return;

    setLoading(true);

    try {
      const prompt = `Write 3 high-converting B2B cold email templates targeting '${targetAudience}' for a product named '${product}'. Value Proposition: '${valueProp}'. Include punchy subject line, personalized hook, value callout, and frictionless CTA. Format as 3 clear email cards. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Cold email templates generated!");
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
        title="AI Cold Email & B2B Sales Outreach Sequence Generator"
        description="Craft high-reply B2B cold email campaigns, personalized sales pitches, and follow-up templates powered by live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Product / Service Name:</label>
            <Input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g. LeadGen Pro"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Target Prospect / Role:</label>
            <Input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. VP of Sales at Tech Startups"
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Core Value Proposition / Key Benefit:</label>
          <Input
            type="text"
            value={valueProp}
            onChange={(e) => setValueProp(e.target.value)}
            placeholder="e.g. Save 10 hours per week on customer support..."
            className="h-11"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateEmails}
            disabled={loading || !product}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Writing Emails..." : "AI Generate Cold Email Sequence"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated B2B Cold Email Templates"
          subtitle="High-converting templates with subject lines and low-friction CTAs"
          content={results}
          loading={loading}
          onRegenerate={generateEmails}
          variant="cards"
        />
      )}
    </div>
  );
}
