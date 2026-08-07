"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Sparkles, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function SloganGeneratorClient() {
  const [brand, setBrand] = useState("Aura Energy Drink");
  const [vibe, setVibe] = useState("Bold, Punchy & Futuristic");
  const [industry, setIndustry] = useState("Fitness & Beverage");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSlogans = async () => {
    if (!brand.trim()) return;

    setLoading(true);

    try {
      const prompt = `Generate 6 catchy, memorable brand slogans and product taglines for '${brand}' in the '${industry}' industry. Tone/Vibe: '${vibe}'. Output 6 distinct slogan ideas with brief brand positioning notes. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Slogans generated!");
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
        icon={Sparkles}
        title="AI Product Slogan & Brand Tagline Generator"
        description="Brainstorm memorable brand slogans, catchy product taglines, and marketing motto ideas with live AI inference."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Brand / Product Name:</label>
            <Input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Velocity Cloud"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Industry / Category:</label>
            <Input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Software, Fashion, Coffee"
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Desired Brand Vibe / Tone:</label>
          <Input
            type="text"
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            placeholder="e.g. Minimalist, Luxury, Playful, Professional"
            className="h-11"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateSlogans}
            disabled={loading || !brand}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Generating Slogans..." : "AI Generate Slogans & Taglines"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated Brand Slogans & Taglines"
          subtitle="Catchy, high-impact branding mottos for your business"
          content={results}
          loading={loading}
          onRegenerate={generateSlogans}
          variant="cards"
        />
      )}
    </div>
  );
}
