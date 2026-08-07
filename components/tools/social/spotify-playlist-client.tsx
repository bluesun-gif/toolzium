"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/shared/form-fields/select-field";
import { Music, Sparkles, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

const VIBE_CATEGORIES = [
  { value: "lofi", label: "☕ Lofi, Chill & Midnight Study" },
  { value: "workout", label: "⚡ Gym, Beast Mode & PR Heavy" },
  { value: "heartbreak", label: "💔 Sad Hours & Midnight Crying" },
  { value: "indie", label: "🌸 Aesthetic Indie & Bedroom Pop" },
  { value: "drive", label: "🌃 Night Drive & Synthwave" },
];

const PLAYLIST_TEMPLATES: Record<string, { title: string; desc: string }[]> = {
  lofi: [
    { title: "midnight coffee & quiet thoughts ☕", desc: "soft lofi beats to study, relax, or overthink to at 2 AM." },
    { title: "raining outside my window 🌧️", desc: "cozy instrumental chillhop for rainy afternoons and deep focus." },
    { title: "nostalgia in a cup ☁️", desc: "vintage lofi & warm vinyl crackles." },
  ],
  workout: [
    { title: "PURE ADRENALINE // HEAVY PR ⚡", desc: "Aggressive phonk, hardstyle, and metal for breaking personal records." },
    { title: "BEAST MODE ACTIVATED 🔥", desc: "High-bpm hype rap and gym motivation tracks." },
  ],
  heartbreak: [
    { title: "staring at the ceiling at 3am 💔", desc: "sad indie acoustic & melancholic piano for when words fail." },
    { title: "texts i never sent you 🌧️", desc: "bittersweet heartbreak anthems." },
  ],
  indie: [
    { title: "golden hour & polaroids 🌿", desc: "dreamy indie pop, bedroom acoustic, and summer breeze vibes." },
    { title: "main character energy ✨", desc: "feel-good indie anthems." },
  ],
  drive: [
    { title: "TOKYO NIGHT DRIVE 🌃", desc: "Retro synthwave, dark techno, and neon cyber beats." },
    { title: "empty highway vibes 🏎️", desc: "smooth R&B and chill electronic." },
  ],
};

export default function SpotifyPlaylistClient() {
  const [vibe, setVibe] = useState("lofi");
  const [copiedTitle, setCopiedTitle] = useState<string | null>(null);

  const playlists = PLAYLIST_TEMPLATES[vibe] || PLAYLIST_TEMPLATES.lofi;

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedTitle(txt);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedTitle(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Music}
        title="Spotify Playlist Title & Aesthetic Description Studio"
        description="Generate aesthetic Spotify playlist titles, mood descriptions, and lofi/indie/gym cover text."
      />

      <GlassCard className="p-6 space-y-4">
        <SelectField
          label="Select Playlist Music Vibe"
          value={vibe}
          onValueChange={(v) => setVibe(String(v || "lofi"))}
          options={VIBE_CATEGORIES}
        />
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-500" /> Aesthetic Spotify Playlist Ideas
          </h2>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
            ✓ Ready for Spotify App
          </Badge>
        </div>

        <div className="space-y-4">
          {playlists.map((pl, i) => (
            <div key={i} className="p-4 rounded-xl border bg-muted/20 hover:bg-primary/5 hover:border-primary/40 transition space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-base text-foreground">{pl.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyText(`${pl.title}\n${pl.desc}`)}
                  className="h-8 px-2.5 text-xs gap-1 hover:text-primary shrink-0"
                >
                  {copiedTitle === `${pl.title}\n${pl.desc}` ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  Copy Both
                </Button>
              </div>
              <p className="text-xs text-muted-foreground font-medium">{pl.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
