"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/shared/form-fields/select-field";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Gamepad2, Sparkles, Copy, RefreshCw, Check, ExternalLink, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const ROBLOX_STYLES = [
  { value: "aesthetic", label: "✨ Aesthetic & Soft Girl/Boy" },
  { value: "clean", label: "⚡ Clean & Short (4-5 Letters)" },
  { value: "goth", label: "🖤 Dark & Goth / Edgy" },
  { value: "anime", label: "⛩️ Anime & Otaku Vibe" },
  { value: "pvp", label: "🔥 Hardcore Gamer & PvP Sweaty" },
  { value: "cute", label: "🌸 Cute & Kawaii" },
];

const PREFIXES: Record<string, string[]> = {
  aesthetic: ["Soft", "Velvet", "Lunar", "Cloudy", "Pastel", "Aura", "Blush", "Starlight", "Silk", "Mist"],
  clean: ["Vex", "Zyn", "Kyo", "Nox", "Ryn", "Jax", "Luv", "Zek", "Sol", "Vyn"],
  goth: ["Vamp", "Void", "Shadow", "Grim", "Venom", "Phantom", "Eclipse", "Corpse", "Raven", "Dusk"],
  anime: ["Kuro", "Ryu", "Shin", "Yuki", "Sora", "Akira", "Zen", "Kenji", "Tora", "Hana"],
  pvp: ["Clutch", "Toxic", "Viper", "Slayer", "Apex", "Havoc", "Static", "Reaper", "Rage", "Impact"],
  cute: ["Boba", "Mochi", "Matcha", "Honey", "Cookie", "Peachy", "Teddy", "Chibi", "Plush", "Pixie"],
};

const SUFFIXES: Record<string, string[]> = {
  aesthetic: ["Vibes", "Aura", "Glow", "Bloom", "Clouds", "Dreams", "Breeze", "Petals", "Whisper", "Glimmer"],
  clean: ["x", "v", "z", "qt", "fn", "rb", "vr", "xl", "ic", "ox"],
  goth: ["Soul", "Grave", "Blade", "Blood", "Abyss", "Night", "Gloom", "Hex", "Reign", "Thorn"],
  anime: ["Kun", "Chan", "Sensei", "Sama", "Soul", "Zero", "Blade", "Moon", "Spirit", "Nova"],
  pvp: ["God", "King", "Unbeaten", "Sweat", "Clutch", "Aim", "EZ", "Demon", "Prime", "Flex"],
  cute: ["Puff", "Bunny", "Kitty", "Bear", "Melon", "Sparkle", "Sweet", "Fairy", "Star", "Heart"],
};

export default function RobloxUsernameClient() {
  const [style, setStyle] = useState("aesthetic");
  const [useNumbers, setUseNumbers] = useState(true);
  const [useUnderscore, setUseUnderscore] = useState(false);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const generateRobloxNames = () => {
    const prefs = PREFIXES[style] || PREFIXES.aesthetic;
    const suffs = SUFFIXES[style] || SUFFIXES.aesthetic;
    const names: string[] = [];

    for (let i = 0; i < 15; i++) {
      const p = prefs[Math.floor(Math.random() * prefs.length)];
      const s = suffs[Math.floor(Math.random() * suffs.length)];
      let name = `${p}${s}`;

      if (useUnderscore && Math.random() > 0.5) {
        name = `${p}_${s}`;
      }

      if (useNumbers && Math.random() > 0.4) {
        const num = Math.floor(Math.random() * 99) + 1;
        name = `${name}${num}`;
      }

      names.push(name);
    }

    setGeneratedNames(names);
    toast.success("Generated 15 Roblox Usernames!");
  };

  React.useEffect(() => {
    generateRobloxNames();
  }, [style]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedName(text);
    toast.success(`Copied "${text}" to clipboard!`);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Gamepad2}
        title="Roblox Username & Display Name Generator"
        description="Generate cool, aesthetic, rare 4-letter, goth, and PvP Roblox usernames and display names with 1-click Roblox availability checker."
      />

      <GlassCard className="p-5 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SelectField
            label="Username Style & Theme"
            value={style}
            onValueChange={(v) => setStyle(String(v || "aesthetic"))}
            options={ROBLOX_STYLES}
          />

          <div className="flex flex-col justify-end space-y-2">
            <label className="text-xs font-semibold flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
                className="h-4 w-4 rounded-xs border-primary text-primary accent-primary"
              />
              <span>Include Numbers (e.g. 77, 99)</span>
            </label>
          </div>

          <div className="flex flex-col justify-end space-y-2">
            <label className="text-xs font-semibold flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useUnderscore}
                onChange={(e) => setUseUnderscore(e.target.checked)}
                className="h-4 w-4 rounded-xs border-primary text-primary accent-primary"
              />
              <span>Include Underscores (e.g. Soft_Vibes)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={generateRobloxNames} className="gap-2 font-bold h-11 px-6 shadow-md">
            <RefreshCw className="h-4 w-4" /> Generate New Roblox Names
          </Button>
        </div>
      </GlassCard>

      {/* Generated Names Grid */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" /> Generated Roblox Usernames ({generatedNames.length})
          </h2>
          <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/30">
            ✓ 1-Click Copy & Check
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {generatedNames.map((name, i) => (
            <div
              key={i}
              className="p-3 rounded-xl border bg-muted/20 hover:bg-primary/5 hover:border-primary/40 transition flex items-center justify-between gap-2 group"
            >
              <span className="font-mono font-bold text-sm text-foreground truncate">{name}</span>

              <div className="flex items-center gap-1.5 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(name)}
                  className="h-8 px-2.5 text-xs gap-1 hover:text-primary"
                >
                  {copiedName === name ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>

                <a
                  href={`https://www.roblox.com/search/users?keyword=${encodeURIComponent(name)}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Check availability on Roblox"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
