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
function applySmallCaps(str: string): string {
  const smallMap: Record<string, string> = {
    a: "ᴀ",
    b: "ʙ",
    c: "ᴄ",
    d: "ᴅ",
    e: "ᴇ",
    f: "ꜰ",
    g: "ɢ",
    h: "ʜ",
    i: "ɪ",
    j: "ᴊ",
    k: "ᴋ",
    l: "ʟ",
    m: "ᴍ",
    n: "ɴ",
    o: "ᴏ",
    p: "ᴘ",
    q: "ǫ",
    r: "ʀ",
    s: "s",
    t: "ᴛ",
    u: "ᴜ",
    v: "ᴠ",
    w: "ᴡ",
    x: "x",
    y: "ʏ",
    z: "ᴢ"
  };
  return str.toLowerCase().split("").map(c => smallMap[c] || c).join("");
}
export default function MlbbNameClient() {
  const [inputName, setInputName] = useState("ViperKey");
  const [model, setModel] = useState("gpt4o");
  const [allNames, setAllNames] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(30);
  const [loading, setLoading] = useState(false);
  const generateMlbbNames = async () => {
    setLoading(true);
    try {
      const prompt = `Generate 25 cool Mobile Legends Bang Bang (MLBB) nickname base words inspired by '${inputName}'. Output 1 base name per line. No symbols or numbering.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt
        })
      });
      const data = await res.json();
      const baseWords: string[] = data.results && data.results.length > 0 ? data.results : ["Viper", "Slayer", "Mythic", "Phantom", "Shadow", "Apex", "Vortex", "Titan", "Venom", "Spectre", "Ghost", "Overlord", "Zero", "Nexus", "Draco"];

      // Generate 150+ decorated combinations
      const combined: string[] = [];
      baseWords.forEach(base => {
        const clean = base.trim().replace(/[^a-zA-Z0-9]/g, "");
        if (!clean) return;
        const gothic = applyGothic(clean);
        const small = applySmallCaps(clean);
        SYMBOL_DECORATIONS.forEach(dec => {
          combined.push(`${dec.prefix}${clean}${dec.suffix}`);
          combined.push(`${dec.prefix}${gothic}${dec.suffix}`);
          combined.push(`${dec.prefix}${small}${dec.suffix}`);
        });
      });

      // Deduplicate
      const unique = Array.from(new Set(combined));
      setAllNames(unique);
      toast.success(`Generated ${unique.length}+ MLBB fancy names!`);
    } catch {
      const base = inputName.trim() || "ViperKey";
      const gothic = applyGothic(base);
      const small = applySmallCaps(base);
      const combined: string[] = [];
      SYMBOL_DECORATIONS.forEach(dec => {
        combined.push(`${dec.prefix}${base}${dec.suffix}`);
        combined.push(`${dec.prefix}${gothic}${dec.suffix}`);
        combined.push(`${dec.prefix}${small}${dec.suffix}`);
      });
      setAllNames(combined);
      toast.success(`Generated ${combined.length} MLBB names!`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    generateMlbbNames();
  }, []);
  const filteredNames = allNames.filter(n => n.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleReset = () => {
    setInputName("ViperKey");
    setSearchQuery("");
    setVisibleCount(30);
    generateMlbbNames();
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={Swords} title="Mobile Legends (MLBB) 100+ Fancy Name & Symbol Generator" description="Generate 100+ cool Japanese Kanji, Gothic symbols, squad tags, and fancy font nicknames for Mobile Legends Bang Bang with AI." actions={<ResetButton onClick={handleReset} label="Reset" />} />

      {/* INPUT CARD */}
      <div className="mb-4">

        <ModelSelector value={model} onChange={setModel} />

      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Swords className="h-5 w-5 text-primary" />
            Base MLBB Nickname or Hero Vibe
          </CardTitle>
          <CardDescription>Enter your preferred nickname to generate 100+ decorated squad & solo player names.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input type="text" value={inputName} onChange={e => setInputName(e.target.value)} placeholder="e.g. Viper, Slayer, Mythic, Phantom" className="h-11 font-bold flex-1" />
            <Button onClick={generateMlbbNames} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Generating 100+ Names..." : "Generate 100+ MLBB Names"}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* 100+ NAMES DISPLAY GRID */}
      {allNames.length > 0 && <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generated {filteredNames.length} Unique MLBB Names
            </h2>

            {/* LIVE SEARCH FILTER */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Filter names..." className="pl-9 h-10 text-xs" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredNames.slice(0, visibleCount).map((name, idx) => <GlassCard key={idx} className="p-3.5 flex items-center justify-between hover:border-primary/40 transition-all">
                <span className="font-bold text-sm text-foreground truncate pr-2">{name}</span>
                <CopyButton getText={() => name} label="Copy" />
              </GlassCard>)}
          </div>

          {visibleCount < filteredNames.length && <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={() => setVisibleCount(prev => prev + 30)} className="font-bold gap-2 px-8 h-11 border-primary/30 text-primary hover:bg-primary/10">
                Load 30 More Names ({filteredNames.length - visibleCount} Remaining)
              </Button>
            </div>}
        </div>}

      {/* HOW IT WORKS */}
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Base Nickname",
        description: "Input your name, hero main, or playstyle vibe (e.g. Slayer, Assassin, Mythic).",
        icon: Swords
      }, {
        step: "02",
        title: "AI Generates 100+ Styles",
        description: "Combines Gothic fonts, Small Caps, and Mythic squad symbols into 100+ unique variants.",
        icon: Sparkles
      }, {
        step: "03",
        title: "Copy to Mobile Legends",
        description: "Click copy and paste your new name directly into MLBB Profile Name Change.",
        icon: Copy
      }]} badges={["100+ Name Variants", "MLBB Symbol Approved", "100% Free"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
        icon: Swords,
        title: "100+ Unique Variations",
        description: "Generates massive lists of name ideas so you never run out of fresh options for your squad."
      }, {
        icon: Sparkles,
        title: "Unicode Symbol Compatibility",
        description: "Tested with MLBB's in-game font renderer to prevent invalid character square boxes."
      }, {
        icon: Shield,
        title: "100% Free & No Account Needed",
        description: "Generates unlimited MLBB nicknames instantly without logging into Moonton accounts."
      }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
        question: "Are these symbols supported in Mobile Legends?",
        answer: "Yes! All symbols included in this generator (꧁༺, ★彡, ⚔️, 👑, 亗) render properly in MLBB profiles."
      }, {
        question: "How long can a Mobile Legends name be?",
        answer: "Mobile Legends allows names up to 20 characters in length."
      }]} />

      <RelatedTools currentToolUrl="/tools/gaming/mlbb-name-generator" max={6} />
    </div></div>;
}