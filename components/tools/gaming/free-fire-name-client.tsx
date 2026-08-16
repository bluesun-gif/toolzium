"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Copy, Flame, RefreshCw, Sparkles, Swords, Type } from"lucide-react";
import toast from"react-hot-toast";

const FF_DECORATIONS = [
 { prefix:"⚡", suffix:"⚡"},
 { prefix:"꧁༺", suffix:"༻꧂"},
 { prefix:"亗", suffix:"亗"},
 { prefix:"⚔️", suffix:"⚔️"},
 { prefix:"『BOSS』", suffix:""},
 { prefix:"×͜×", suffix:""},
 { prefix:"🔥", suffix:"🔥"},
 { prefix:"┊", suffix:"┊"},
 { prefix:"V·I·P", suffix:""},
];

export default function FreeFireNameClient() {
 const [name, setName] = useState("ProSniper");
 const [variants, setVariants] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateFfNames = async () => {
 setLoading(true);

 try {
 const prompt = `Generate 12 cool, aggressive, and stylish Garena Free Fire nicknames inspired by '${name}'. Include Boss style vibes, sniper themes, V.I.P tags, and squad words. Output 1 name per line. No markdown formatting.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt }),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 const decorated = data.results.map((base: string, idx: number) => {
 const dec = FF_DECORATIONS[idx % FF_DECORATIONS.length];
 return `${dec.prefix}${base}${dec.suffix}`;
 });
 setVariants(decorated);
 toast.success("AI generated fresh Free Fire names!");
 } else {
 throw new Error("No results");
 }
 } catch (err) {
 console.warn("AI generation fallback:", err);
 const base = name.trim() ||"FreeFirePlayer";
 const fallbackList = FF_DECORATIONS.map((dec) => `${dec.prefix}${base}${dec.suffix}`);
 setVariants(fallbackList);
 toast.success("Generated Free Fire names!");
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
 generateFfNames();
 }, []);

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={Flame}
 title="Free Fire (FF) Nickname & Boss Squad Tag Studio"
 description="Generate cool Free Fire nicknames, Boss style symbols, V.I.P tags, and invisible space characters for Garena Free Fire with live AI inference."
 />

 <GlassCard className="p-6 space-y-4">
 <label className="text-sm font-bold text-foreground block">
 Enter Your Base Free Fire Name or Squad Vibe:
 </label>
 <div className="flex flex-col sm:flex-row gap-3">
 <Input
 type="text"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="e.g. Boss, Killer, Venom"
 className="h-11 text-base font-bold flex-1"
 />
 <Button
 onClick={generateFfNames}
 disabled={loading}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Crafting...":"Generate AI FF Names"}
 </Button>
 </div>
 </GlassCard>

 {/* Premium AI Output Display */}
 <AiOutputDisplay
 title="AI Generated Free Fire Nicknames"
 subtitle="100% Unique & Formatted for Garena FF Profiles"
 content={variants}
 loading={loading}
 onRegenerate={generateFfNames}
 variant="cards"
 />
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Pick a Style",
    description:"Choose a cool, stylish, or boss-themed nickname style.",
    icon: Swords,
  },
{
    step:"02",
    title:"Add Symbols",
    description:"Decorate the name with Unicode symbols and fancy fonts.",
    icon: Sparkles,
  },
{
    step:"03",
    title:"Copy & Use",
    description:"Copy the final nickname and paste it into Free Fire.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Swords,
    title:"Boss Squad Tags",
    description:"Generate aggressive, squad-ready nicknames that stand out in matches.",
  },
{
    icon: Sparkles,
    title:"Symbol Decorations",
    description:"Add Unicode arrows, crowns, and stylish brackets around your name.",
  },
{
    icon: Type,
    title:"Fancy Font Styles",
    description:"Convert text into zalgo, small caps, and decorative font variants.",
  },
{
    icon: Copy,
    title:"One-Click Copy",
    description:"Copy the finished nickname without extra formatting issues.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A memorable Free Fire nickname is part of your identity on the battlefield. With millions of players, a generic name gets lost in the lobby, while a sharp, decorated tag signals confidence and style. This generator helps you craft names that fit within the game's 14-character limit while still looking distinctive.</p>
  <p>Start by choosing a theme. Boss and squad tags work well for competitive players who want an intimidating presence, while stylish and cute variants suit casual or content-creator profiles. The generator mixes your base word with Unicode decorations — crowns, arrows, brackets, and dividers — to frame the text without exceeding the character cap.</p>
  <p>Font transformation adds flair. Small caps, zalgo, and mirrored styles change how the letters look while keeping them readable. Be cautious: heavily glitched fonts can become unreadable on mobile screens, so preview the result before committing. A clean, balanced decoration usually reads better than maximal effects.</p>
  <p>Squad coordination matters in ranked play. Generating a shared visual style across your crew — same brackets, same divider — makes the team instantly recognizable. Copy each name and assign roles so the tags reflect leader, sniper, or rusher positions.</p>
  <p>Respect the rules. Free Fire bans offensive or impersonating names, so keep content original and appropriate. Use the copy button to transfer the exact string, then paste it in the profile editor. With a polished nickname, your squad enters every match with a stronger first impression.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why use a stylish Free Fire nickname?",
    answer:"A unique nickname helps your profile stand out in lobbies and leaderboards, and reflects your squad's identity.",
  },
{
    question:"Will symbols show correctly in game?",
    answer:"Most Unicode symbols render in Free Fire, though some decorative fonts may appear as boxes on older devices.",
  },
{
    question:"Can I make a squad tag?",
    answer:"Yes. Generate matching tags for your whole crew so the team looks coordinated.",
  },
{
    question:"Are these names allowed by the game?",
    answer:"Keep names appropriate and free of offensive language to avoid bans. Decorative formatting is generally fine.",
  },
{
    question:"How long can a Free Fire name be?",
    answer:"Free Fire nicknames are limited to 14 characters including spaces and symbols, so keep it short.",
  }
  ]}
/>
</div>
 );
}
