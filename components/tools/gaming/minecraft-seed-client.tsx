"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import SelectField from"@/components/shared/form-fields/select-field";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Box, Copy, Dice5, Mountain, Pickaxe, RefreshCw } from"lucide-react";
import toast from"react-hot-toast";

const MINECRAFT_STYLES = [
 { value:"fantasy", label:"🏰 Fantasy & Kingdom SMP"},
 { value:"survival", label:"🌲 100 Days Hardcore Survival"},
 { value:"cozy", label:"🌸 Cottagecore & Aesthetic Village"},
 { value:"nether", label:"🔥 Nether & End Citadel"},
];

=======
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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export default function MinecraftSeedClient() {
  const [style, setStyle] = useState("fantasy");
  const [model, setModel] = useState("gpt4o");
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
      <div className="mb-4">

        <ModelSelector value={model} onChange={setModel} />

      </div>

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

<<<<<<< HEAD
 {/* Premium AI Output Display */}
 <AiOutputDisplay
 title="AI Generated Minecraft World Names"
 subtitle="100% Formatted for Minecraft Save Worlds & SMP Servers"
 content={worldNames}
 loading={loading}
 onRegenerate={generateWorldNames}
 variant="cards"
 />
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Choose Edition",
    description:"Pick Java or Bedrock to match your game.",
    icon: Box,
  },
{
    step:"02",
    title:"Generate Seed",
    description:"Roll a random seed or enter keywords for a themed world.",
    icon: Dice5,
  },
{
    step:"03",
    title:"Copy & Launch",
    description:"Copy the seed and paste it when creating a world.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Box,
    title:"Edition Aware",
    description:"Seeds behave differently across Java and Bedrock editions.",
  },
{
    icon: Dice5,
    title:"Random Rolls",
    description:"Generate unlimited seeds until one feels right.",
  },
{
    icon: Mountain,
    title:"Biome Themes",
    description:"Target seeds near villages, mountains, or oceans.",
  },
{
    icon: Copy,
    title:"Easy Copy",
    description:"Copy the numeric seed with one click.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A Minecraft seed is the starting point of every adventure. That single number feeds the world generator, deciding where mountains rise, where oceans spread, and where villages spawn. Picking the right seed shapes your entire playthrough, which is why players spend time hunting for the perfect start.</p>
  <p>Edition matters more than many realize. Java and Bedrock use separate generation code, so a seed that drops you next to a mansion in Java may drop you in open plains on Bedrock. Always generate and share seeds for the edition you actually play, or the result will not match your friends' worlds.</p>
  <p>Theming helps you find what you want. If you love building, seek seeds with flat plains and nearby forests. If you prefer exploration, look for archipelago or mountain-rich starts. Some players want a village at spawn for instant trading; others want isolation for a solo base. Knowing your goal narrows the search.</p>
  <p>Sharing is part of the fun. A great seed becomes a community recommendation, letting others experience the same landscape. Copy the exact number rather than describing it, since a single digit changes everything. Use the generator to roll fresh options or refine toward a biome you enjoy, then launch a world that starts strong from the first block.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is a Minecraft seed?",
    answer:"A seed is a number that determines how the world generates. The same seed produces the same terrain on the same edition.",
  },
{
    question:"Do Java and Bedrock seeds match?",
    answer:"No. The two editions use different world-generation algorithms, so a Java seed will not yield the same world in Bedrock.",
  },
{
    question:"Can I share a seed with friends?",
    answer:"Yes. Give them the exact seed number and they can recreate the same starting area.",
  },
{
    question:"What makes a good seed?",
    answer:"Proximity to useful biomes, villages, and resources makes early game smoother and more fun.",
  },
{
    question:"Are seeds safe to use?",
    answer:"Seeds are just numbers; they contain no executable code and are completely safe.",
  }
  ]}
/>
</div>
 );
}
=======
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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
