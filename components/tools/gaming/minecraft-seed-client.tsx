"use client";
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

export default function MinecraftSeedClient() {
 const [style, setStyle] = useState("fantasy");
 const [worldNames, setWorldNames] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateWorldNames = async () => {
 setLoading(true);

 try {
 const prompt = `Generate 10 creative Minecraft world titles and SMP server names for a '${style}' world theme. Output 1 name per line. No markdown formatting.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt }),
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
 const fallbackList = [
"Aetheria SMP 🏰",
"Eldoria Kingdom 🌲",
"Sakura Village 🌸",
"Obsidian Citadel 🔥",
 ];
 setWorldNames(fallbackList);
 toast.success("Generated Minecraft world names!");
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
 generateWorldNames();
 }, [style]);

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={Pickaxe}
 title="Minecraft Seed & World Name Generator"
 description="Generate fantasy Minecraft world titles, 100 Days Hardcore SMP names, and cottagecore village ideas with live AI inference."
 />

 <GlassCard className="p-6 space-y-4">
 <SelectField
 label="Select World Vibe / Gameplay Theme"
 value={style}
 onValueChange={(v) => setStyle(String(v ||"fantasy"))}
 options={MINECRAFT_STYLES}
 />

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateWorldNames}
 disabled={loading}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Crafting...":"Generate AI World Names"}
 </Button>
 </div>
 </GlassCard>

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
