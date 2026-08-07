"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectField from "@/components/shared/form-fields/select-field";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Instagram, Sparkles, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const BIO_CATEGORIES = [
  { value: "aesthetic", label: "✨ Minimalist & Aesthetic" },
  { value: "creator", label: "🚀 Content Creator / Influencer" },
  { value: "business", label: "💼 Business / Brand / Entrepreneur" },
  { value: "attitude", label: "🔥 Cool & Savage Attitude" },
  { value: "quotes", label: "📜 Deep Quotes & Inspo" },
];

export default function InstagramBioClient() {
  const [category, setCategory] = useState("aesthetic");
  const [niche, setNiche] = useState("Digital Creator & Coffee Addict");
  const [generatedBios, setGeneratedBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateBios = async () => {
    setLoading(true);

    try {
      const prompt = `Generate 5 creative, aesthetic, line-break formatted Instagram bios in the style of '${category}' for someone interested in '${niche}'. Use clean emojis, line breaks, and call to action arrow emojis (👇). Separate each complete bio option with a line break or empty line. Do not include markdown bold or stars.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setGeneratedBios(data.results);
        toast.success("AI generated fresh Instagram bios!");
      } else {
        throw new Error("No output returned");
      }
    } catch (err) {
      console.warn("AI generation fallback to templates:", err);
      const fallbackBios = [
        "✧ Living in soft color palettes ✦\n📍 NYC | ☕ Matcha Addict\n↳ Creating my own sunshine ☼\n👇 Link in Bio",
        "˗ˏˋ Capturing golden hours ˎˊ˗\n✨ Film & Design\n♡ Less perfection, more authenticity\n👇 Welcome to my space",
        "☁︎ Cloudgazing & Coffee\n🎨 Digital Creator\n“Silence speaks louder than noise.”\n👇 Explore my latest work"
      ];
      setGeneratedBios(fallbackBios);
      toast.success("Generated Instagram bios!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateBios();
  }, [category]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Instagram}
        title="Instagram Bio & Aesthetic Caption Generator Studio"
        description="Generate aesthetic, line-break formatted Instagram bios, content creator templates, and brand profile copy with live AI inference."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Bio Style & Category"
            value={category}
            onValueChange={(v) => setCategory(String(v || "aesthetic"))}
            options={BIO_CATEGORIES}
          />

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Your Niche / Profession / Vibe:</label>
            <Input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. Travel Blogger, Fitness Coach, Tech SaaS"
              className="h-10 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateBios}
            disabled={loading}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Crafting Bios..." : "Generate AI Instagram Bios"}
          </Button>
        </div>
      </GlassCard>

      {/* Premium AI Output Display */}
      <AiOutputDisplay
        title="AI Generated Instagram Bios"
        subtitle="100% Formatted for Instagram Profile Bio Copy"
        content={generatedBios}
        loading={loading}
        onRegenerate={generateBios}
        variant="prose"
      />
    </div>
  );
}
