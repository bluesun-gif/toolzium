"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Shield, RefreshCw, Sparkles, Gamepad2, Copy, BookOpen, Layers, Zap } from"lucide-react";
import toast from "react-hot-toast";

const STEAM_STYLES = [
  { value: "aesthetic", label: "✨ Minimalist & Aesthetic Spacers" },
  { value: "pvp", label: "🔥 CS2 / Dota 2 Sweat & Ranks" },
  { value: "anime", label: "⛩️ Anime & Otaku Bio" },
  { value: "collector", label: "⭐ Level 100+ Game Collector" },
];

export default function SteamBioClient() {
  const [style, setStyle] = useState("aesthetic");
  const [favoriteGame, setFavoriteGame] = useState("");
  const [bios, setBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSteamBios = async () => {
    setLoading(true);

    try {
      const prompt = `Generate 4 aesthetic Steam profile bios for a '${style}' gamer. ${
        favoriteGame ? `Incorporate main game '${favoriteGame}'.` : ""
      } Use clean symbols, line breaks, hardware specs placeholders (RTX 4080 | i9), and rank tags. Separate each bio with |||. Do not use markdown formatting.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setBios(data.results);
        toast.success("AI generated fresh Steam bios!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      setBios([
        "✧ CS2 & FPS Enthusiast ✧\n🎮 Level 150 Collector | Faceit 10\n💻 RTX 4090 | i9-14900K | 360Hz\n👇 Check my inventory below & leave a comment!",
        "⛩️ Anime & Chill Gamer ⛩️\n🌸 Favorite Games: Elden Ring & Cyberpunk 2077\n🎧 Lofi & Late Night Gaming\n✦ Don't send random trade offers",
        "🔥 Competitive Ranked Player 🔥\n⚡ Peak Global Elite / Immortal\n🎯 10,000+ Hours Total Playtime\n💬 Comment before adding",
      ]);
      toast.success("Generated Steam bios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateSteamBios();
  }, [style]);

  const handleReset = () => {
    setStyle("aesthetic");
    setFavoriteGame("");
    generateSteamBios();
  };

  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern />

      <ToolPageHeader
        icon={Shield}
        title="Steam Profile Bio & Layout Decorator"
        description="Generate aesthetic Steam profile bios, hardware spec boxes, CS2/Dota 2 rank tags, and custom artwork spacers with live AI."
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />

      {/* INPUT CONTROL */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Gamepad2 className="h-5 w-5 text-primary" />
            Steam Profile Vibe & Setup
          </CardTitle>
          <CardDescription>Select a profile aesthetic and input your primary game or hardware specs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Profile Aesthetic</Label>
              <Select value={style} onValueChange={(v) => setStyle(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select profile theme" />
                </SelectTrigger>
                <SelectContent>
                  {STEAM_STYLES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fav-game">Primary Game / Hardware Specs (Optional)</Label>
              <Input
                id="fav-game"
                value={favoriteGame}
                onChange={(e) => setFavoriteGame(e.target.value)}
                placeholder="e.g. CS2, Elden Ring, RTX 4080"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={generateSteamBios}
              disabled={loading}
              className="gap-2 font-bold h-11 px-6 shadow-md"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "AI Crafting..." : "Generate AI Steam Bios"}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* RESULTS GRID */}
      {bios.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Steam Profile Bio Layouts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bios.map((bio, idx) => (
              <GlassCard key={idx} className="p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-xs font-bold text-primary">Steam Bio Layout #{idx + 1}</span>
                    <CopyButton getText={() => bio} label="Copy Bio" />
                  </div>
                  <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed font-mono">{bio}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Select Steam Theme",
            description: "Choose Minimalist Aesthetic, CS2/Dota 2 Ranked, Anime Otaku, or Level 100 Collector.",
            icon: Gamepad2,
          },
          {
            step: "02",
            title: "Generate Bio Layout",
            description: "AI crafts bio boxes complete with ASCII symbols, spec blocks, and trade rules.",
            icon: Sparkles,
          },
          {
            step: "03",
            title: "Paste in Steam Edit Profile",
            description: "Copy your chosen bio and paste directly into Steam Profile Summary.",
            icon: Shield,
          },
        ]}
        badges={["Steam Profile Box Ready", "ASCII Symbol Support", "100% Free"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Shield,
            title: "Steam Summary Formatting",
            description: "Uses clean Unicode symbols and line breaks optimized for Steam Community profile boxes.",
          },
          {
            icon: Gamepad2,
            title: "Hardware Specs & Rank Blocks",
            description: "Includes formatted slots for GPU, CPU, monitor refresh rate, and competitive ranks.",
          },
          {
            icon: Sparkles,
            title: "Trade & Comment Guidance",
            description: "Includes clear rules for profile visitors (e.g. 'Comment before adding', 'No random trades').",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "Where do I paste this on Steam?",
            answer: "Open Steam → Edit Profile → Profile Summary, and paste your bio directly into the text box.",
          },
          {
            question: "What is the character limit for a Steam profile summary?",
            answer: "Steam profile summaries allow up to 1,000 characters.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/gaming/steam-bio-generator" max={6} />
    </div>
  );
}
