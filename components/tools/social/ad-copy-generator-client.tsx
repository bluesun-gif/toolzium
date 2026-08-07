"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Target, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AdCopyGeneratorClient() {
  const [productName, setProductName] = useState("ProClean Electric Toothbrush");
  const [targetAudience, setTargetAudience] = useState("Coffee drinkers & busy professionals");
  const [offer, setOffer] = useState("50% OFF + Free Whitening Gel Today Only");
  const [adFramework, setAdFramework] = useState("PAS (Problem - Agitate - Solution)");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateAdCopy = async () => {
    if (!productName.trim()) return;

    setLoading(true);

    try {
      const prompt = `Write high-converting Facebook & Instagram Ad Primary Text options for Product: '${productName}'. Audience: '${targetAudience}'. Special Offer: '${offer}'. Copy Framework: '${adFramework}'. Create 4 distinct ad copy variations (Variation 1: Direct Offer Hook, Variation 2: Social Proof & Testimonial Angle, Variation 3: Problem/Agitation Angle, Variation 4: Short-Form Punchy UGC Style). Format as 4 distinct ad variations cards. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Ad Copy generated!");
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
        icon={Target}
        title="AI Facebook & Instagram Ad Copy Studio"
        description="Generate high-converting Meta primary text, headlines, and call-to-action variants using PAS, AIDA, and Social Proof frameworks."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Product / Service Name:</label>
            <Input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Ergonomic Desk Chair"
              className="h-11 font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Target Customer Audience:</label>
            <Input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Remote workers with lower back pain"
              className="h-11"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Special Offer / Hook:</label>
            <Input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="e.g. Free Shipping + 30-Day Risk Free Trial"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Copywriting Framework:</label>
            <select
              value={adFramework}
              onChange={(e) => setAdFramework(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
            >
              <option value="PAS (Problem - Agitate - Solution)">PAS (Problem - Agitate - Solution)</option>
              <option value="AIDA (Attention - Interest - Desire - Action)">AIDA (Attention - Interest - Desire - Action)</option>
              <option value="BAB (Before - After - Bridge)">BAB (Before - After - Bridge)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateAdCopy}
            disabled={loading || !productName.trim()}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Copywriting Ads..." : "AI Generate Meta Ad Copy Options"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated High-ROAS Facebook & Instagram Ad Copy Options"
          subtitle="4 high-converting variations with hooks, pain points, and CTAs"
          content={results}
          loading={loading}
          onRegenerate={generateAdCopy}
          variant="cards"
        />
      )}
    </div>
  );
}
