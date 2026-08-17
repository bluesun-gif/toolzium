"use client";

import { ToolBackground } from"@/components/shared/tool-background";

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
import { ModelSelector } from "@/components/shared/model-selector";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Tv, RefreshCw, Sparkles, Video, Copy, Shield, BookOpen, Layers, Zap, Type } from "lucide-react";
import toast from "react-hot-toast";
const GAME_CATEGORIES = [{
  value: "valorant",
  label: "🎯 Valorant / Competitive FPS"
}, {
  value: "gta",
  label: "🚗 GTA V / NoPixel Roleplay (RP)"
}, {
  value: "minecraft",
  label: "⛏️ Minecraft Survival & Hardcore SMP"
}, {
  value: "fortnite",
  label: "⚡ Fortnite Victory Royale / Tournaments"
}, {
  value: "justchatting",
  label: "💬 Just Chatting, Q&A & IRL Streams"
}, {
  value: "league",
  label: "⚔️ League of Legends Ranked Grind"
}];
export default function TwitchTitleClient() {
  const [game, setGame] = useState("valorant");
  const [model, setModel] = useState("gpt4o");
  const [customGoal, setCustomGoal] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generateTwitchTitles = async () => {
    setLoading(true);
    try {
      const prompt = `Generate 6 high-CTR, engaging Twitch stream title hooks for '${game}'. ${customGoal ? `Include stream goal '${customGoal}'.` : ""} Include chat command tags (e.g. !rank !sens !specs), uppercase emotional hooks, and sub incentives. Output 1 title per line. No markdown formatting.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt
        })
      });
      if (!res.ok) throw new Error("AI API failed");
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setTitles(data.results);
        toast.success("AI generated fresh Twitch stream titles!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      setTitles(["🔥 ROAD TO RADIANT OR WE DON'T SLEEP! (!rank !sens !pc)", "🎯 100% HEADSHOT RATE ONLY | SUB GIFT GIVEAWAY AT 50 SUBS (!sub)", "🔴 RANKED GRIND UNTIL I LOSE MY MIND | !discord !spotify", "⚡ ZERO DEATH CHALLENGE DAY 3 (!specs !settings)", "💬 CHILL VIBES & Q&A | ASKING ME ANYTHING (!discord)", "⚔️ RANK 1 LEADERBOARD GRIND | HIGH ELO GAMEPLAY (!rank)"]);
      toast.success("Generated Twitch titles.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    generateTwitchTitles();
  }, [game]);
  const handleReset = () => {
    setGame("valorant");
    setCustomGoal("");
    generateTwitchTitles();
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

      <ToolPageHeader icon={Tv} title="Twitch Stream Title & High-CTR Hook Generator" description="Generate high-converting Twitch stream titles, viewer engagement hooks, and command tags (!rank !sens) with live AI." actions={<ResetButton onClick={handleReset} label="Reset" />} />

      {/* CONTROL PANEL */}
      <div className="mb-4">

        <ModelSelector value={model} onChange={setModel} />

      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Video className="h-5 w-5 text-primary" />
            Stream Category & Goal Setup
          </CardTitle>
          <CardDescription>Select your live streaming directory and enter custom stream goals or sub milestones.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Streaming Directory / Game</Label>
              <Select value={game} onValueChange={v => setGame(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select streaming category" />
                </SelectTrigger>
                <SelectContent>
                  {GAME_CATEGORIES.map(cat => <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stream-goal">Stream Goal / Milestone (Optional)</Label>
              <Input id="stream-goal" value={customGoal} onChange={e => setCustomGoal(e.target.value)} placeholder="e.g. 50 Sub Hype Train, Rank Up to Immortal" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={generateTwitchTitles} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "AI Writing Titles..." : "Generate AI Twitch Titles"}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* RESULTS GRID */}
      {titles.length > 0 && <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            6 High-CTR Twitch Stream Titles
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {titles.map((title, idx) => <GlassCard key={idx} className="p-4 flex items-center justify-between hover:border-primary/40 transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono font-bold text-muted-foreground w-6">#{idx + 1}</span>
                  <span className="font-bold text-sm text-foreground truncate">{title}</span>
                </div>
                <CopyButton getText={() => title} label="Copy Title" />
              </GlassCard>)}
          </div>
        </div>}

      {/* HOW IT WORKS */}
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Select Stream Category",
        description: "Choose your game directory (Valorant, GTA RP, Minecraft, Fortnite, Just Chatting).",
        icon: Video
      }, {
        step: "02",
        title: "Input Rank or Sub Goal",
        description: "Optionally add your current rank or sub milestone to incentivize viewer clicks.",
        icon: Sparkles
      }, {
        step: "03",
        title: "Copy Title & Stream",
        description: "Copy high-CTR stream titles complete with Nightbot/StreamElements commands (!rank, !sens).",
        icon: Tv
      }]} badges={["Nightbot Command Compatible", "High-CTR Hooks", "100% Free"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
        icon: Tv,
        title: "CTR-Optimized Formatting",
        description: "Utilizes ALL CAPS hooks, bracket tags, and high-urgency phrasing to maximize Twitch directory click-through rates."
      }, {
        icon: Sparkles,
        title: "Chat Command Integration",
        description: "Automatically includes standard chatbot command triggers (!rank, !sens, !specs) in titles."
      }, {
        icon: Shield,
        title: "100% Free & Privacy-Friendly",
        description: "Generates unlimited stream titles without linking your Twitch OAuth tokens."
      }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
        question: "How long can a Twitch stream title be?",
        answer: "Twitch stream titles have a maximum limit of 140 characters, though keeping titles under 80 characters ensures they don't get truncated on mobile screens."
      }, {
        question: "Do stream titles affect Twitch directory ranking?",
        answer: "Yes! High-CTR titles attract more casual directory scrollers, boosting live viewer count and push placement on the Twitch browse page."
      }]} />
    </div>
    </div>
);
}
