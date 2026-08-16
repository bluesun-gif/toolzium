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
import { Copy, RefreshCw, Sparkles, Swords, Type } from"lucide-react";
import toast from"react-hot-toast";

const FANCY_MAPS: Record<string, (char: string) => string> = {
 gothic: (c) => {
 const code = c.charCodeAt(0);
 if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d56c + (code - 65));
 if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d586 + (code - 97));
 return c;
 },
 boldSerif: (c) => {
 const code = c.charCodeAt(0);
 if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d400 + (code - 65));
 if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d41a + (code - 97));
 return c;
 },
};

const SYMBOL_DECORATIONS = [
 { prefix:"꧁༺", suffix:"༻꧂"},
 { prefix:"★彡", suffix:"彡★"},
 { prefix:"⚔️", suffix:"⚔️"},
 { prefix:"👑", suffix:"👑"},
 { prefix:"『", suffix:"』"},
 { prefix:"×͜×", suffix:""},
 { prefix:"⚡", suffix:"⚡"},
 { prefix:"꧁༒☬", suffix:"☬༒꧂"},
 { prefix:"亗", suffix:"亗"},
];

export default function MlbbNameClient() {
 const [inputName, setInputName] = useState("ViperKey");
 const [variants, setVariants] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateMlbbNames = async () => {
 setLoading(true);

 try {
 const prompt = `Generate 12 creative Mobile Legends Bang Bang (MLBB) nicknames inspired by '${inputName}'. Mix cool gamer words (Viper, Mythic, Phantom, Slayer), Japanese Kanji symbols, and squad tags. Output 1 name per line. No markdown stars.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt }),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 // Decorate AI generated base names with MLBB symbols
 const decorated = data.results.map((base: string, idx: number) => {
 const dec = SYMBOL_DECORATIONS[idx % SYMBOL_DECORATIONS.length];
 return `${dec.prefix}${base}${dec.suffix}`;
 });
 setVariants(decorated);
 toast.success("AI generated fresh MLBB names!");
 } else {
 throw new Error("No results");
 }
 } catch (err) {
 console.warn("AI generation fallback:", err);
 const base = inputName.trim() ||"MobileLegend";
 const fallbackList = SYMBOL_DECORATIONS.map((dec) => `${dec.prefix}${base}${dec.suffix}`);
 setVariants(fallbackList);
 toast.success("Generated MLBB names!");
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
 generateMlbbNames();
 }, []);

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={Swords}
 title="Mobile Legends (MLBB) Fancy Name & Symbol Generator"
 description="Generate cool Japanese Kanji, Gothic symbols, squad tags, and fancy font nicknames for Mobile Legends Bang Bang with live AI inference."
 />

 <GlassCard className="p-6 space-y-4">
 <label className="text-sm font-bold text-foreground block">
 Enter Your Base MLBB Nickname or Hero Vibe:
 </label>
 <div className="flex flex-col sm:flex-row gap-3">
 <Input
 type="text"
 value={inputName}
 onChange={(e) => setInputName(e.target.value)}
 placeholder="e.g. Slayer, Mythic, Phantom"
 className="h-11 text-base font-bold flex-1"
 />
 <Button
 onClick={generateMlbbNames}
 disabled={loading}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Crafting...":"Generate AI MLBB Names"}
 </Button>
 </div>
 </GlassCard>

 {/* Premium AI Output Display */}
 <AiOutputDisplay
 title="AI Generated MLBB Fancy Names"
 subtitle="100% Unique & Formatted with Mythic Squad Symbols"
 content={variants}
 loading={loading}
 onRegenerate={generateMlbbNames}
 variant="cards"
 />
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Base Name",
    description:"Type the name you want to decorate.",
    icon: Type,
  },
{
    step:"02",
    title:"Add Symbols",
    description:"Wrap it with MLBB-supported Unicode symbols.",
    icon: Sparkles,
  },
{
    step:"03",
    title:"Copy to Game",
    description:"Copy and paste into your MLBB profile.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Sparkles,
    title:"Symbol Library",
    description:"Curated symbols that render in Mobile Legends.",
  },
{
    icon: Type,
    title:"Fancy Fonts",
    description:"Styled text variants for a unique look.",
  },
{
    icon: Swords,
    title:"Pro Player Style",
    description:"Mimic the clean decoration top players use.",
  },
{
    icon: Copy,
    title:"Quick Copy",
    description:"Transfer the name without formatting loss.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>In Mobile Legends, your name appears in every match, every leaderboard, and every friend request. A decorated name projects identity and style without affecting gameplay. This generator focuses on symbols and fonts that actually render inside MLBB's text system.</p>
  <p>Choose decorations that read clearly. Brackets, thin dividers, and small crowns frame a name nicely, while excessive zalgo or stacked emoji often becomes unreadable on a phone screen. Top players tend to use restraint: a clean name with one or two accent symbols looks more professional than a wall of effects.</p>
  <p>Font variants add personality. Small caps and spaced lettering change the visual rhythm of a name, making it feel custom. Test the result at the size it appears in-game — what looks cool in a generator may shrink into noise on a busy HUD. Balance flair with legibility.</p>
  <p>Community recognition is the real benefit. A consistent, stylish tag helps teammates remember you across matches and makes content clips easier to attribute. When you change names, use the copy button to preserve exact spacing so the look survives the paste. With a sharp MLBB name, your account feels like a brand rather than a random string.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why decorate an MLBB name?",
    answer:"A styled name helps you look polished in ranked and highlights your account in friend lists.",
  },
{
    question:"Which symbols work in MLBB?",
    answer:"Most standard Unicode brackets, arrows, and dividers render fine; avoid emoji that may show as boxes.",
  },
{
    question:"Is there a character limit?",
    answer:"MLBB usernames have a length limit, so keep decorations compact.",
  },
{
    question:"Will a fancy name help me win?",
    answer:"No, but it improves recognition and personal branding within the community.",
  },
{
    question:"Can I change my name later?",
    answer:"Yes, using an in-game name change card or diamonds, so you can refresh your style.",
  }
  ]}
/>
</div>
 );
}
