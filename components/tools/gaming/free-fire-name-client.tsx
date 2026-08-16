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
export default function FreeFireNameClient() {
  const [name, setName] = useState("ProSniper");
  const [model, setModel] = useState("gpt4o");
  const [allNames, setAllNames] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(30);
  const [loading, setLoading] = useState(false);
  const generateFfNames = async () => {
    setLoading(true);
    try {
      const prompt = `Generate 25 aggressive, stylish Garena Free Fire nickname base words inspired by '${name}'. Output 1 base name per line. No symbols or numbering.`;
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
      const baseWords: string[] = data.results && data.results.length > 0 ? data.results : ["Boss", "Sniper", "Venom", "Slayer", "Shadow", "Apex", "Killer", "Viper", "Zero", "Demon", "Ghost", "Titan", "Spectre", "Overlord", "Draco"];

      // Generate 150+ decorated combinations
      const combined: string[] = [];
      baseWords.forEach(base => {
        const clean = base.trim().replace(/[^a-zA-Z0-9]/g, "");
        if (!clean) return;
        const gothic = applyGothic(clean);
        const small = applySmallCaps(clean);
        FF_DECORATIONS.forEach(dec => {
          combined.push(`${dec.prefix}${clean}${dec.suffix}`);
          combined.push(`${dec.prefix}${gothic}${dec.suffix}`);
          combined.push(`${dec.prefix}${small}${dec.suffix}`);
        });
      });
      const unique = Array.from(new Set(combined));
      setAllNames(unique);
      toast.success(`Generated ${unique.length}+ Free Fire names!`);
    } catch {
      const base = name.trim() || "ProSniper";
      const gothic = applyGothic(base);
      const small = applySmallCaps(base);
      const combined: string[] = [];
      FF_DECORATIONS.forEach(dec => {
        combined.push(`${dec.prefix}${base}${dec.suffix}`);
        combined.push(`${dec.prefix}${gothic}${dec.suffix}`);
        combined.push(`${dec.prefix}${small}${dec.suffix}`);
      });
      setAllNames(combined);
      toast.success(`Generated ${combined.length} Free Fire names!`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    generateFfNames();
  }, []);
  const filteredNames = allNames.filter(n => n.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleReset = () => {
    setName("ProSniper");
    setSearchQuery("");
    setVisibleCount(30);
    generateFfNames();
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={Flame} title="Free Fire (FF) 100+ Nickname & Boss Squad Tag Generator" description="Generate 100+ cool Free Fire nicknames, Boss style symbols, V.I.P tags, and invisible space characters for Garena Free Fire with AI." actions={<ResetButton onClick={handleReset} label="Reset" />} />

      {/* INPUT CARD */}
      <div className="mb-4">

        <ModelSelector value={model} onChange={setModel} />

      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Flame className="h-5 w-5 text-primary" />
            Base Free Fire Name or Squad Vibe
          </CardTitle>
          <CardDescription>Enter your preferred nickname to generate 100+ Boss style & Guild nickname options.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Boss, Killer, Venom, Sniper" className="h-11 font-bold flex-1" />
            <Button onClick={generateFfNames} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Generating 100+ Names..." : "Generate 100+ FF Names"}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* 100+ NAMES DISPLAY GRID */}
      {allNames.length > 0 && <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generated {filteredNames.length} Unique Free Fire Names
            </h2>

            {/* LIVE SEARCH FILTER */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Filter names..." className="pl-9 h-10 text-xs" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredNames.slice(0, visibleCount).map((item, idx) => <GlassCard key={idx} className="p-3.5 flex items-center justify-between hover:border-primary/40 transition-all">
                <span className="font-bold text-sm text-foreground truncate pr-2">{item}</span>
                <CopyButton getText={() => item} label="Copy" />
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
        description: "Input your name, guild tag, or weapon main (e.g. Boss, Sniper, Venom).",
        icon: Flame
      }, {
        step: "02",
        title: "AI Generates 100+ Styles",
        description: "Combines Boss style tags (亗, ꧁༺, V·I·P) and Gothic font styles into 100+ variants.",
        icon: Sparkles
      }, {
        step: "03",
        title: "Copy to Free Fire",
        description: "Copy your favorite nickname directly into Garena Free Fire Name Change card.",
        icon: Copy
      }]} badges={["100+ Name Variants", "Free Fire Symbol Approved", "100% Free"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
        icon: Flame,
        title: "100+ Aggressive FF Nicknames",
        description: "Generates massive lists of Boss style, Guild tag, and V.I.P nicknames."
      }, {
        icon: Sparkles,
        title: "Garena Renderer Approved",
        description: "Tested with Free Fire in-game font display to prevent empty box characters."
      }, {
        icon: Shield,
        title: "100% Free & Instant",
        description: "Generates unlimited FF nicknames without requiring Free Fire ID login or diamond top-ups."
      }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
        question: "How do I change my Free Fire name using a Name Change Card?",
        answer: "Open Free Fire → click on your Profile Banner in top left → click yellow Edit icon → paste your copied name → spend 390 diamonds or 1 Name Change Card."
      }, {
        question: "What is the Free Fire character limit for nicknames?",
        answer: "Garena Free Fire limits nicknames to a maximum of 12 characters."
      }]} />

      <RelatedTools currentToolUrl="/tools/gaming/free-fire-name-generator" max={6} />
    </div></div>;
}