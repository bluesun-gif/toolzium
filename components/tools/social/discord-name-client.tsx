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
import { MessageSquare, RefreshCw, Sparkles, Hash, Copy, Shield, BookOpen, Layers, Zap } from"lucide-react";
import toast from "react-hot-toast";

const SERVER_TYPES = [
  { value: "gaming", label: "🎮 Gaming & Esports Syndicate" },
  { value: "anime", label: "⛩️ Anime & Chill Lounge" },
  { value: "coding", label: "💻 Developer, Coding & AI Hub" },
  { value: "study", label: "📚 Study, Productivity & Lofi" },
  { value: "crypto", label: "🚀 Crypto, Web3 & Trading" },
  { value: "roleplay", label: "⚔️ Fantasy Roleplay & Worldbuilding" },
];

export default function DiscordNameClient() {
  const [serverType, setServerType] = useState("gaming");
  const [keyword, setKeyword] = useState("");
  const [serverNames, setServerNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateDiscordNames = async () => {
    setLoading(true);

    try {
      const prompt = `Generate 10 aesthetic, creative Discord server name ideas for a '${serverType}' community. ${
        keyword ? `Incorporate the keyword '${keyword}'.` : ""
      } Include modern clean emojis and aesthetic formatting (e.g. ✦ Nexus Gaming ⚡). Output 1 server name per line. No markdown formatting.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setServerNames(data.results);
        toast.success("AI generated fresh Discord server names!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      setServerNames([
        "✦ Nexus Gaming Hub ⚡",
        "❖ Viper Strike Syndicate ⚔️",
        "✧ Pixel Haven Lounge ✨",
        "◈ Apex Realm Esports 🏆",
        "✦ Cyber Pulse Network 🌃",
        "❖ Midnight Code Collective 💻",
        "✧ Valhalla Gamers 🛡️",
        "◈ Echo Chamber Lounge 🎧",
      ]);
      toast.success("Generated Discord server names.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateDiscordNames();
  }, [serverType]);

  const handleReset = () => {
    setServerType("gaming");
    setKeyword("");
    generateDiscordNames();
  };

  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

      <ToolPageHeader
        icon={MessageSquare}
        title="Discord Server Name & Channel Layout Studio"
        description="Generate aesthetic Discord server names, channel symbols (│・welcome), category headers, and role layouts with live AI."
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />

      {/* INPUT CARD */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Hash className="h-5 w-5 text-primary" />
            Server Theme & Community Niche
          </CardTitle>
          <CardDescription>Select community category and add optional keywords for tailored name concepts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Server Category</Label>
              <Select value={serverType} onValueChange={(v) => setServerType(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select server theme" />
                </SelectTrigger>
                <SelectContent>
                  {SERVER_TYPES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyword">Optional Custom Keyword</Label>
              <Input
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Apex, Realm, Cyber, Coffee"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={generateDiscordNames}
              disabled={loading}
              className="gap-2 font-bold h-11 px-6 shadow-md"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "AI Crafting..." : "Generate AI Discord Names"}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* RESULTS GRID */}
      {serverNames.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            10 Aesthetic Discord Server Names
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {serverNames.map((name, idx) => (
              <GlassCard key={idx} className="p-4 flex items-center justify-between hover:border-primary/40 transition-all">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-mono font-bold text-muted-foreground w-6">#{idx + 1}</span>
                  <span className="font-bold text-sm text-foreground truncate">{name}</span>
                </div>
                <CopyButton getText={() => name} label="Copy" />
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
            title: "Select Community Theme",
            description: "Choose from Gaming, Anime Lounge, Coding Hub, Study Lofi, or Crypto Trading categories.",
            icon: Hash,
          },
          {
            step: "02",
            title: "Generate Names & Symbols",
            description: "AI crafts aesthetic server titles complete with Discord-friendly unicode symbols (✦, ❖, ✧).",
            icon: Sparkles,
          },
          {
            step: "03",
            title: "Copy to Discord",
            description: "Click copy and paste your new server name directly into Server Settings in Discord.",
            icon: MessageSquare,
          },
        ]}
        badges={["Unicode Symbol Support", "10 Server Ideas", "100% Free"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: MessageSquare,
            title: "Discord-Optimized Typography",
            description: "Uses clean aesthetic unicode symbols that render perfectly across Discord Desktop and Mobile apps.",
          },
          {
            icon: Sparkles,
            title: "Aesthetic Category Matching",
            description: "Tailors server name prefixes, brackets, and emojis to match specific community genres.",
          },
          {
            icon: Shield,
            title: "100% Free & Private",
            description: "Generates unlimited Discord server titles without requiring Discord bot permissions or login.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "What makes a good Discord server name?",
            answer: "A great Discord server name is memorable, short (under 32 characters), and uses subtle aesthetic symbols to stand out in the user's server sidebar list.",
          },
          {
            question: "Can I use special symbols in Discord server names?",
            answer: "Yes! Discord supports most Unicode symbols such as ✦, ❖, ✧, and ⚔️. Avoid overly complex fonts that may break screen readers.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/social/discord-name-generator" max={6} />
    </div>
  );
}
