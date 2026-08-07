"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/shared/form-fields/select-field";
import { Tv, Sparkles, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

const GAME_CATEGORIES = [
  { value: "valorant", label: "🎯 Valorant / Ranked FPS" },
  { value: "gta", label: "🚗 GTA V / Roleplay (RP)" },
  { value: "minecraft", label: "⛏️ Minecraft Survival & SMP" },
  { value: "fortnite", label: "⚡ Fortnite Victory Royale" },
  { value: "justchatting", label: "💬 Just Chatting & IRL" },
];

const TITLE_HOOKS: Record<string, string[]> = {
  valorant: [
    "🔥 ROAD TO RADIANT OR WE DON'T SLEEP! (!rank !sens)",
    "🎯 100% HEADSHOT RATE ONLY | CLOTHING & MERCH GIVEAWAY AT 50 SUBS",
    "⚡ UNRANKED TO IMMORTAL SPEEDRUN | SOLO QUEUE MADNESS",
    "💀 IF I DIE, I DO 10 PUSHUPS (!commands)",
  ],
  gta: [
    "🚗 NOPIXEL RP | CHIEF OFFICER BACK ON DUTY (!rp !specs)",
    "🔥 STARTING FROM THE BOTTOM IN LS | HEIST PLANNING NIGHT",
    "💼 RUNNING THE MOST DANGEROUS CASINO IN NOPIXEL",
  ],
  minecraft: [
    "⛏️ 100 DAYS SURVIVAL IN HARDCORE MINECRAFT | NO CHEATS",
    "🌸 BUILDING A MEGA JAPANESE CASTLE IN SMP (!smp)",
    "⚡ SPEEDRUNNING MINECRAFT VS 3 HUNTERS",
  ],
  fortnite: [
    "👑 SOLO VS SQUADS TO UNLOCK CHAMPION DIVISION",
    "⚡ NEW SEASON BATTLE PASS GRIND | CUSTOM ROOMS WITH VIEWERS",
    "🎯 240FPS ZERO BUILD DOMINATION (!settings)",
  ],
  justchatting: [
    "💬 TIER LIST: RATING YOUR WORST TAKES (!submit)",
    "☕ LATE NIGHT COZY VIBES & Q&A | ASKING AGONY AUNT QUESTIONS",
    "🎙️ TALKING ABOUT THE NEW AI BREAKTHROUGHS & GAMING NEWS",
  ],
};

export default function TwitchTitleClient() {
  const [game, setGame] = useState("valorant");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const titles = TITLE_HOOKS[game] || TITLE_HOOKS.valorant;

  const copyTitle = (txt: string, idx: number) => {
    navigator.clipboard.writeText(txt);
    setCopiedIndex(idx);
    toast.success("Copied Stream Title!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Tv}
        title="Twitch Stream Title & High-CTR Hook Generator"
        description="Generate high-converting Twitch stream titles, viewer engagement hooks, and command tags for Valorant, GTA V, Minecraft, and Just Chatting."
      />

      <GlassCard className="p-6 space-y-4">
        <SelectField
          label="Select Streaming Category / Game Niche"
          value={game}
          onValueChange={(v) => setGame(String(v || "valorant"))}
          options={GAME_CATEGORIES}
        />
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" /> High-CTR Twitch Stream Titles ({titles.length})
          </h2>
          <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 border-purple-500/30">
            ✓ Boost Click-Through Rate
          </Badge>
        </div>

        <div className="space-y-3">
          {titles.map((title, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border bg-muted/20 hover:bg-primary/5 hover:border-primary/40 transition flex items-center justify-between gap-3"
            >
              <span className="font-mono font-bold text-sm text-foreground leading-snug">{title}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyTitle(title, i)}
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
