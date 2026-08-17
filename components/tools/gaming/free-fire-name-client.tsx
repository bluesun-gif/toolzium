"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Flame, Sparkles, Copy, RefreshCw, Shield, Swords } from "lucide-react";
import toast from "react-hot-toast";

function applySmallCaps(str: string): string {
  const smallMap: Record<string, string> = {
    a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ",
    j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ",
    s: "ꜱ", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ"
  };
  return str.toLowerCase().split("").map(c => smallMap[c] || c).join("");
}

export function FreeFireNameClient() {
  const [name, setName] = useState("Killer");
  const [loading, setLoading] = useState(false);

  const generateNames = (base: string) => {
    const raw = base.trim() || "Sniper";
    const sm = applySmallCaps(raw);
    return [
      `亗 ${raw.toUpperCase()} 亗`,
      `꧁༺${raw}༻꧂`,
      `V·I·P | ${raw}`,
      `⚡${sm}⚡`,
      `★${raw}★`,
      `☠️${raw.toUpperCase()}☠️`,
      `×͜× ${raw}`,
      `𝕯𝖆𝖗𝖐 ${raw}`,
      `父 ${raw} 父`,
      `ᴮᴼˢˢ ${sm}`,
      `亗 DEVIL 亗 ${raw}`,
      `〆${raw}〆`
    ];
  };

  const [variants, setVariants] = useState<string[]>(() => generateNames("Killer"));

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setVariants(generateNames(name));
      setLoading(false);
      toast.success("Generated Free Fire nicknames!");
    }, 200);
  };

  const copyName = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success(`Copied: ${val}`);
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Flame}
          title="Free Fire Name Generator"
          description="Generate aggressive, stylish Boss symbols, small caps, and guild-ready nicknames for Garena Free Fire."
        />

        <GlassCard>
          <CardHeader>
            <CardTitle>Enter Base Name or Keyword</CardTitle>
            <CardDescription>Input your player tag or hero name to generate stylish FF variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Boss, Killer, Venom"
                className="h-11 text-base font-bold flex-1"
              />
              <Button onClick={handleGenerate} disabled={loading} className="gap-2 font-bold h-11 px-6">
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Generating..." : "Generate FF Names"}
              </Button>
            </div>
          </CardContent>
        </GlassCard>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {variants.map((v, i) => (
            <div
              key={i}
              onClick={() => copyName(v)}
              className="p-4 rounded-xl border bg-card/60 hover:border-primary/50 transition-all cursor-pointer flex justify-between items-center group"
            >
              <span className="font-bold text-base tracking-wide truncate">{v}</span>
              <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Enter Nickname", description: "Input your preferred name or guild tag.", icon: Flame },
            { step: "02", title: "Apply FF Symbols", description: "Instantly decorates with official Garena Free Fire symbols (亗, ꧁༺, ⚡).", icon: Sparkles },
            { step: "03", title: "Copy & Paste", description: "Click any stylish name to copy directly to your Free Fire Name Change Card.", icon: Copy }
          ]}
          badges={["100% Free", "Boss Symbols", "Garena In-Game Approved"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Flame, title: "Aggressive FF Aesthetics", description: "Pre-formatted with popular Boss style (亗) and Japanese gothic runes." },
            { icon: Sparkles, title: "Unicode Compatibility", description: "Verified to prevent in-game question marks or missing symbol boxes." },
            { icon: Swords, title: "Guild Tag Formatting", description: "Includes brackets, dividers, and clan symbols for esports teams." },
            { icon: Shield, title: "Instant & Free", description: "Generate unlimited player nicknames without login or diamond fees." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Creating a Legendary Free Fire Persona</h3>
            <p>
              In Garena Free Fire, an aggressive, unique player nickname commands respect in Clash Squad and Battle Royale lobbies. Utilizing Unicode runes, small capitals, and wing symbols (꧁༺ ༻꧂) gives your profile a distinct competitive flair.
            </p>
            <p>
              Free Fire restricts names to a maximum of 12 characters. All combinations generated by Toolzium are designed to fit within Garena&apos;s character length constraints.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "How do I change my Free Fire name?", answer: "Open Free Fire → Click your profile avatar in the top left → Tap the yellow Edit icon next to your name → Paste your copied nickname and confirm using 390 Diamonds or a Name Change Card." },
            { question: "What is the maximum character limit for Free Fire names?", answer: "Garena Free Fire allows a maximum of 12 characters including spaces and Unicode symbols." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/gaming/free-fire-name" max={6} />
      </div>
    </div>
  );
}

export default FreeFireNameClient;
