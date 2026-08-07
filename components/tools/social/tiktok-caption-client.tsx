"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/shared/form-fields/select-field";
import { Video, Sparkles, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

const TIKTOK_STYLES = [
  { value: "story", label: "📖 Storytime & Mystery Hook" },
  { value: "tutorial", label: "💡 Life Hack & Tutorial" },
  { value: "pov", label: "🎬 POV & Relatable Humor" },
  { value: "business", label: "📈 Side Hustle & Product Hook" },
];

const CAPTION_HOOKS: Record<string, string[]> = {
  story: [
    "I was NOT supposed to find out about this... 😳 (Wait till the end) #fyp #storytime #secret #viral",
    "Nobody believes me when I tell them what happened in 2024. 💀 #fypシ #truestory #unbelievable",
    "Stop scrolling if you were born between 2000 and 2008! 🚨 #fyp #viral #foryou",
  ],
  tutorial: [
    "The secret website digital marketers don't want you to know about 🤫 #lifehacks #tech #ai #productivity",
    "How to double your productivity in 3 simple steps (Save this!) 📌 #studyhacks #tips #fyp",
  ],
  pov: [
    "POV: You finally stopped overthinking and started winning. 💫 #pov #relatable #aesthetic #fyp",
    "That one friend who always knows the gossip before anyone else: 💀 #funny #relatable #humor",
  ],
  business: [
    "How I scaled my side hustle to $5,000/month from my bedroom 🚀 #sidehustle #business #entrepreneur",
    "The 1 tool every creator needs in 2026! 🔥 #digitalproducts #creator",
  ],
};

export default function TikTokCaptionClient() {
  const [style, setStyle] = useState("story");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const captions = CAPTION_HOOKS[style] || CAPTION_HOOKS.story;

  const copyCaption = (txt: string, idx: number) => {
    navigator.clipboard.writeText(txt);
    setCopiedIndex(idx);
    toast.success("Copied TikTok Caption & Hashtags!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Video}
        title="TikTok Viral Caption & Hashtag Hook Studio"
        description="Generate high-converting TikTok captions, viral opening hooks, storytime openers, and trending hashtag clusters."
      />

      <GlassCard className="p-6 space-y-4">
        <SelectField
          label="Select TikTok Video Style"
          value={style}
          onValueChange={(v) => setStyle(String(v || "story"))}
          options={TIKTOK_STYLES}
        />
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-500" /> Viral TikTok Captions & Hooks
          </h2>
          <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-600 border-cyan-500/30">
            ✓ FYP Algorithm Optimized
          </Badge>
        </div>

        <div className="space-y-3">
          {captions.map((cap, i) => (
            <div key={i} className="p-4 rounded-xl border bg-muted/20 hover:bg-primary/5 hover:border-primary/40 transition flex items-center justify-between gap-3">
              <span className="font-sans font-medium text-sm text-foreground leading-relaxed">{cap}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyCaption(cap, i)}
                className="h-8 px-3 text-xs gap-1.5 shrink-0"
              >
                {copiedIndex === i ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                Copy
              </Button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
