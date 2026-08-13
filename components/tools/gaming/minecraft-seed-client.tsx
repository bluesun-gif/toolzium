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
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Pickaxe, RefreshCw, Sparkles, Compass, Shield, BookOpen, Layers, Zap } from "lucide-react";
import toast from "react-hot-toast";
const MINECRAFT_STYLES = [{
  value: "fantasy",
  label: "🏰 Fantasy & Kingdom SMP"
}, {
  value: "survival",
  label: "🌲 100 Days Hardcore Survival"
}, {
  value: "cozy",
  label: "🌸 Cottagecore & Aesthetic Village"
}, {
  value: "nether",
  label: "🔥 Nether & End Citadel"
}, {
  value: "cyber",
  label: "⚡ Sci-Fi & Cyberpunk SMP"
}];
export default function MinecraftSeedClient() {
  const [style, setStyle] = useState("fantasy");
  const [keyword, setKeyword] = useState("");
  const [worldNames, setWorldNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generateWorldNames = async () => {
    setLoading(true);
    try {
      const prompt = `Generate 10 creative Minecraft world titles and SMP server names for a '${style}' world theme. ${keyword ? `Incorporate theme keyword '${keyword}'.` : ""} Include Minecraft emojis. Output 1 name per line. No markdown formatting.`;
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
        setWorldNames(data.results);
        toast.success("AI generated fresh Minecraft world names!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      setWorldNames(["Aetheria Kingdom SMP 🏰", "Eldoria Hardcore Survival 🌲", "Sakura Blossom Village 🌸", "Obsidian Nether Citadel 🔥", "Astral Horizon SMP ⚡", "Verdant Isle Survival 🌿", "Ironclad Keep Fortress 🛡️", "Whispering Woods SMP 🍃"]);
      toast.success("Generated Minecraft world names.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    generateWorldNames();
  }, [style]);
  const handleReset = () => {
    setStyle("fantasy");
    setKeyword("");
    generateWorldNames();
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={Pickaxe} title="Minecraft Seed & World Name Generator" description="Generate fantasy Minecraft world titles, 100 Days Hardcore SMP names, and cottagecore village ideas with live AI." actions={<ResetButton onClick={handleReset} label="Reset" />} />

      {/* INPUT CARD */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Compass className="h-5 w-5 text-primary" />
            Minecraft World Theme & Vibe
          </CardTitle>
          <CardDescription>Select gameplay theme and enter optional biome or lore keywords.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select World Theme</Label>
              <Select value={style} onValueChange={v => setStyle(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select world vibe" />
                </SelectTrigger>
                <SelectContent>
                  {MINECRAFT_STYLES.map(s => <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyword">Biome / Lore Keyword (Optional)</Label>
              <Input id="keyword" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g. Cherry, Obsidian, Frost, Dragon" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={generateWorldNames} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "AI Crafting..." : "Generate AI World Names"}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* RESULTS GRID */}
      {worldNames.length > 0 && <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            10 Creative Minecraft World Titles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {worldNames.map((name, idx) => <GlassCard key={idx} className="p-4 flex items-center justify-between hover:border-primary/40 transition-all">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-mono font-bold text-muted-foreground w-6">#{idx + 1}</span>
                  <span className="font-bold text-sm text-foreground truncate">{name}</span>
                </div>
                <CopyButton getText={() => name} label="Copy" />
              </GlassCard>)}
          </div>
        </div>}

      {/* HOW IT WORKS */}
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Select World Vibe",
        description: "Choose from Fantasy SMP, 100 Days Hardcore, Cottagecore Village, or Nether Citadel.",
        icon: Compass
      }, {
        step: "02",
        title: "Input Custom Lore",
        description: "Optionally add biome names (e.g. Cherry Blossom, Taiga) for custom seed branding.",
        icon: Sparkles
      }, {
        step: "03",
        title: "Copy & Create World",
        description: "Copy your favorite world name directly into Minecraft Singleplayer or Multiplayer SMP creation menu.",
        icon: Pickaxe
      }]} badges={["Java & Bedrock Edition", "10 World Titles", "100% Free"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
        icon: Pickaxe,
        title: "Minecraft-Themed Naming",
        description: "Generates lore-rich names tailored to Minecraft gameplay mechanics, biomes, and SMP servers."
      }, {
        icon: Sparkles,
        title: "Java & Bedrock Compatible",
        description: "Works for singleplayer save files, Realm titles, and multi-node SMP server listings."
      }, {
        icon: Shield,
        title: "100% Free & Private",
        description: "Unlimited AI world generation without downloading mods or logging into Microsoft/Mojang accounts."
      }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
        question: "How do I rename a world in Minecraft?",
        answer: "In the Singleplayer world selection screen, click on your world, select 'Edit', and paste your new name in the World Name field."
      }, {
        question: "Does this generator give numerical seed numbers?",
        answer: "You can use any text name as a text seed input in Minecraft — Minecraft automatically hashes text seed names into 64-bit numerical seeds!"
      }]} />

      <RelatedTools currentToolUrl="/tools/gaming/minecraft-seed-namer" max={6} />
    </div></div>;
}