"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/shared/form-fields/select-field";
import { MessageSquare, Sparkles, Copy, Check, Hash } from "lucide-react";
import toast from "react-hot-toast";

const SERVER_TYPES = [
  { value: "gaming", label: "🎮 Gaming & Esports Community" },
  { value: "anime", label: "⛩️ Anime & Lounge" },
  { value: "chill", label: "☕ Chill, Study & Music" },
  { value: "coding", label: "💻 Coding, Tech & AI Hub" },
  { value: "roleplay", label: "⚔️ Fantasy & RP Universe" },
];

const SERVER_NAME_TEMPLATES: Record<string, string[]> = {
  gaming: ["Nexus Gaming Hub", "Viper Strike Syndicate", "Pixel Haven", "Apex Realm", "Cyber Pulse Gaming", "Titan Vault", "Overload Esports", "Mythic Sanctum"],
  anime: ["Sakura Garden 🌸", "Tokyo Midnight 🌙", "Otaku Central ⛩️", "Kawaii Lounge ✨", "Shonen Sphere 🔥", "Akira Underground 🌆"],
  chill: ["The Lofi Cafe ☕", "Cloud Nine ☁️", "Starlight Corner 💫", "Midnight Society 🌌", "Study Nook 📖", "Cozy Hangout 🍃"],
  coding: ["DevVerse Hub 💻", "Syntax & Coffee ☕", "ByteCode HQ ⚡", "OpenSource Syndicate 🌐", "StackOverflow Refuge 🚀", "Algo Tribe 🧠"],
  roleplay: ["Aetheria Empire ⚔️", "Valhalla Citadel 🛡️", "Shadow Realm 🐉", "Eldoria RP Chronicles 🏰", "Obsidian Sanctum 🔮"],
};

const CHANNEL_PRESETS: Record<string, string[]> = {
  gaming: ["│・welcome-hub", "│・rules-info", "│・announcements", "│・general-chat", "│・lfg-squads", "│・clips-and-highlights", "🔊│ 💬 Main Voice", "🔊│ 🎮 Squad 1"],
  anime: ["│・welcome-gate", "│・rules", "│・anime-discussion", "│・manga-spoilers", "│・fanart-gallery", "│・bot-commands", "🔊│ 🎧 Lofi Listening"],
  chill: ["│・cafe-entrance", "│・guidelines", "│・general-hangout", "│・study-together", "│・music-recommendations", "│・pets-and-food", "🔊│ ☕ Study Room (Muted)"],
  coding: ["│・onboarding", "│・general-dev", "│・project-showcase", "│・help-and-debugging", "│・ai-and-tools", "│・career-advice", "🔊│ 👨‍💻 Code Pairing"],
  roleplay: ["│・lore-and-history", "│・character-sheets", "│・rp-main-street", "│・tavern-brawl", "│・ooc-chat", "🔊│ 🛡️ Campaign Room"],
};

export default function DiscordNameClient() {
  const [serverType, setServerType] = useState("gaming");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const serverNames = SERVER_NAME_TEMPLATES[serverType] || SERVER_NAME_TEMPLATES.gaming;
  const channels = CHANNEL_PRESETS[serverType] || CHANNEL_PRESETS.gaming;

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    toast.success(`Copied: "${text}"!`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={MessageSquare}
        title="Discord Server Name & Channel Layout Studio"
        description="Generate aesthetic Discord server names, aesthetic channel symbols (│・welcome), category headers, and role layouts."
      />

      <GlassCard className="p-6 space-y-4">
        <SelectField
          label="Select Server Theme & Community Niche"
          value={serverType}
          onValueChange={(v) => setServerType(String(v || "gaming"))}
          options={SERVER_TYPES}
        />
      </GlassCard>

      {/* Server Names */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-500" /> Aesthetic Server Name Ideas ({serverNames.length})
          </h2>
          <Badge variant="outline" className="text-xs bg-indigo-500/10 text-indigo-600 border-indigo-500/30">
            ✓ 1-Click Copy
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {serverNames.map((name, i) => (
            <div
              key={i}
              className="p-3 rounded-xl border bg-muted/20 hover:bg-primary/5 hover:border-primary/40 transition flex items-center justify-between gap-2"
            >
              <span className="font-bold text-sm text-foreground truncate">{name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyText(name)}
                className="h-8 px-2.5 text-xs gap-1 hover:text-primary shrink-0"
              >
                {copiedText === name ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Channel Symbols & Structure */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Hash className="h-4 w-4 text-indigo-500" /> Channel Structure & Symbols Template
          </h2>
          <Badge variant="outline" className="text-xs bg-indigo-500/10 text-indigo-600 border-indigo-500/30">
            ✓ Ready for Discord
          </Badge>
        </div>

        <div className="space-y-2">
          {channels.map((ch, i) => (
            <div
              key={i}
              className="p-3 rounded-lg border bg-slate-950 text-slate-100 font-mono text-xs flex items-center justify-between gap-2"
            >
              <span>{ch}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyText(ch)}
                className="h-7 px-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
              >
                {copiedText === ch ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
