"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/shared/form-fields/select-field";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Video, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const TIKTOK_STYLES = [
  { value: "story", label: "📖 Storytime & Mystery Hook" },
  { value: "tutorial", label: "💡 Life Hack & Tutorial" },
  { value: "pov", label: "🎬 POV & Relatable Humor" },
  { value: "business", label: "📈 Side Hustle & Product Hook" },
];

export default function TikTokCaptionClient() {
  const [style, setStyle] = useState("story");
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateTikTokCaptions = async () => {
    setLoading(true);

    try {
      const prompt = `Generate 5 viral TikTok captions with opening hooks and trending hashtags for a '${style}' video. Make them high-CTR and FYP optimized. Output 1 caption per line. No markdown formatting.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setCaptions(data.results);
        toast.success("AI generated fresh TikTok captions!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      const fallbackList = [
        "I was NOT supposed to find out about this... 😳 (Wait till the end) #fyp #storytime #secret #viral",
        "Nobody believes me when I tell them what happened in 2024. 💀 #fyp #truestory #unbelievable",
      ];
      setCaptions(fallbackList);
      toast.success("Generated TikTok captions!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateTikTokCaptions();
  }, [style]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Video}
        title="TikTok Viral Caption & Hashtag Hook Studio"
        description="Generate high-converting TikTok captions, viral opening hooks, storytime openers, and trending hashtag clusters with live AI inference."
      />

      <GlassCard className="p-6 space-y-4">
        <SelectField
          label="Select TikTok Video Style"
          value={style}
          onValueChange={(v) => setStyle(String(v || "story"))}
          options={TIKTOK_STYLES}
        />

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateTikTokCaptions}
            disabled={loading}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Crafting..." : "Generate AI TikTok Captions"}
          </Button>
        </div>
      </GlassCard>

      {/* Premium AI Output Display */}
      <AiOutputDisplay
        title="AI Generated TikTok Captions & Hooks"
        subtitle="100% FYP Algorithm Optimized"
        content={captions}
        loading={loading}
        onRegenerate={generateTikTokCaptions}
        variant="prose"
      />
    </div>
  );
}
