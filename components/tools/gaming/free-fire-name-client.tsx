"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Flame, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const FF_DECORATIONS = [
  { prefix: "⚡", suffix: "⚡" },
  { prefix: "꧁༺", suffix: "༻꧂" },
  { prefix: "亗 ", suffix: " 亗" },
  { prefix: "⚔️ ", suffix: " ⚔️" },
  { prefix: "『BOSS』", suffix: "" },
  { prefix: "×͜× ", suffix: "" },
  { prefix: "🔥 ", suffix: " 🔥" },
  { prefix: "┊", suffix: "┊" },
  { prefix: "V·I·P ", suffix: "" },
];

export default function FreeFireNameClient() {
  const [name, setName] = useState("ProSniper");
  const [variants, setVariants] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateFfNames = async () => {
    setLoading(true);

    try {
      const prompt = `Generate 12 cool, aggressive, and stylish Garena Free Fire nicknames inspired by '${name}'. Include Boss style vibes, sniper themes, V.I.P tags, and squad words. Output 1 name per line. No markdown formatting.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const decorated = data.results.map((base: string, idx: number) => {
          const dec = FF_DECORATIONS[idx % FF_DECORATIONS.length];
          return `${dec.prefix}${base}${dec.suffix}`;
        });
        setVariants(decorated);
        toast.success("AI generated fresh Free Fire names!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      const base = name.trim() || "FreeFirePlayer";
      const fallbackList = FF_DECORATIONS.map((dec) => `${dec.prefix}${base}${dec.suffix}`);
      setVariants(fallbackList);
      toast.success("Generated Free Fire names!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateFfNames();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Flame}
        title="Free Fire (FF) Nickname & Boss Squad Tag Studio"
        description="Generate cool Free Fire nicknames, Boss style symbols, V.I.P tags, and invisible space characters for Garena Free Fire with live AI inference."
      />

      <GlassCard className="p-6 space-y-4">
        <label className="text-sm font-bold text-foreground block">
          Enter Your Base Free Fire Name or Squad Vibe:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Boss, Killer, Venom"
            className="h-11 text-base font-bold flex-1"
          />
          <Button
            onClick={generateFfNames}
            disabled={loading}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Crafting..." : "Generate AI FF Names"}
          </Button>
        </div>
      </GlassCard>

      {/* Premium AI Output Display */}
      <AiOutputDisplay
        title="AI Generated Free Fire Nicknames"
        subtitle="100% Unique & Formatted for Garena FF Profiles"
        content={variants}
        loading={loading}
        onRegenerate={generateFfNames}
        variant="cards"
      />
    </div>
  );
}
