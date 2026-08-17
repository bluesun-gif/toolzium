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
import { Swords, Sparkles, Copy, RefreshCw, Shield, Crown } from "lucide-react";
import toast from "react-hot-toast";

export function MlbbNameClient() {
  const [name, setName] = useState("Hayabusa");
  const [loading, setLoading] = useState(false);

  const generateMlbbNames = (base: string) => {
    const raw = base.trim() || "Assassin";
    return [
      `亗 ${raw} 亗`,
      `ᴹᴸᴮᴮ | ${raw}`,
      `𝕯𝖆𝖗𝖐 ${raw}`,
      `⚡${raw.toUpperCase()}⚡`,
      `〆${raw}〆`,
      `[SQUAD] ${raw}`,
      `ঔৣ☬✞${raw}✞☬ঔৣ`,
      `꧁༺${raw}༻꧂`,
      `MVP • ${raw}`,
      `⚔️${raw}⚔️`,
      `ᴮᴼˢˢ ${raw}`,
      `亗 MYTHIC 亗`
    ];
  };

  const [variants, setVariants] = useState<string[]>(() => generateMlbbNames("Hayabusa"));

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setVariants(generateMlbbNames(name));
      setLoading(false);
      toast.success("Generated MLBB nicknames!");
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
          icon={Swords}
          title="Mobile Legends Name Generator"
          description="Create stylish, Mythical Glory-worthy gamer tags and squad names for Mobile Legends: Bang Bang (MLBB)."
        />

        <GlassCard>
          <CardHeader>
            <CardTitle>Enter IGN or Hero Keyword</CardTitle>
            <CardDescription>Generate customized MLBB in-game nicknames with stylish runes and squad tags</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Hayabusa, Chou, Fanny"
                className="h-11 text-base font-bold flex-1"
              />
              <Button onClick={handleGenerate} disabled={loading} className="gap-2 font-bold h-11 px-6">
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Generating..." : "Generate MLBB Names"}
              </Button>
            </div>
          </CardContent>
        </GlassCard>

        {/* Results */}
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
            { step: "01", title: "Enter Hero or Tag", description: "Input your favorite MLBB hero, squad, or personal alias.", icon: Swords },
            { step: "02", title: "Generate Squad Styles", description: "Select from Mythic tags, Japanese kanji, and crosshair emblems.", icon: Sparkles },
            { step: "03", title: "Paste into MLBB", description: "Copy and paste directly into your Mobile Legends Name Change Card.", icon: Copy }
          ]}
          badges={["100% Free", "Mythic Glory Styles", "Squad & Clan Ready"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Crown, title: "Mythic Glory Aesthetics", description: "Styles curated to match professional MPL and competitive rank aesthetics." },
            { icon: Swords, title: "Squad Tag Formats", description: "Includes squad dividers (•, |, 亗) for 5-man pre-made tournament teams." },
            { icon: Sparkles, title: "Mobile Friendly Unicode", description: "Tested with Moonton in-game font renderers across Android and iOS." },
            { icon: Shield, title: "Instant & Free", description: "Generate unlimited player names without diamond spending." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Stand Out in the Land of Dawn</h3>
            <p>
              In Mobile Legends: Bang Bang, your in-game name (IGN) is the first thing allies and opponents see in the loading screen. Combining sleek symbols with your main role (Jungler, Roamer, Mid) establishes an intimidating presence.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "How do I change my Mobile Legends name?", answer: "Open Mobile Legends → Tap your profile avatar at the top left → Tap your nickname → Enter the new name and confirm using a Name Change Card." },
            { question: "What is the MLBB name character limit?", answer: "Mobile Legends allows names up to 20 characters in length." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/gaming/mlbb-name" max={6} />
      </div>
    </div>
  );
}

export default MlbbNameClient;
