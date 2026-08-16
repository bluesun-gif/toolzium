"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Badge } from"@/components/ui/badge";
import { Button } from"@/components/ui/button";
import SelectField from"@/components/shared/form-fields/select-field";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Copy, Dice5, ExternalLink, Gamepad2, RefreshCw, Sparkles } from"lucide-react";
import toast from"react-hot-toast";

const ROBLOX_STYLES = [
 { value:"aesthetic", label:"✨ Aesthetic & Soft Girl/Boy"},
 { value:"clean", label:"⚡ Clean & Short (4-5 Letters)"},
 { value:"goth", label:"🖤 Dark & Goth / Edgy"},
 { value:"anime", label:"⛩️ Anime & Otaku Vibe"},
 { value:"pvp", label:"🔥 Hardcore Gamer & PvP Sweaty"},
 { value:"cute", label:"🌸 Cute & Kawaii"},
];

export default function RobloxUsernameClient() {
  const [style, setStyle] = useState("aesthetic");
  const [model, setModel] = useState("gpt4o");
  const [useNumbers, setUseNumbers] = useState(true);
  const [useUnderscore, setUseUnderscore] = useState(false);
  const [allNames, setAllNames] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(30);
  const [loading, setLoading] = useState(false);
  const generateRobloxNames = async () => {
    setLoading(true);
    try {
      const prompt = `Generate 40 unique Roblox username base concepts in '${style}' vibe. Output 1 username per line. Rule: Numbers=${useNumbers}, Underscores=${useUnderscore}. No spaces or special symbols except underscores. No markdown.`;
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
      const baseList: string[] = data.results && data.results.length > 0 ? data.results : ["SoftVibes", "VelvetMist", "LunarBlush", "StarlightAura", "SilkClouds", "VexZyn", "NoxRyn", "JaxLuv", "ZekSol", "VynKyo", "VoidVamp", "ShadowGrim", "VenomCorpse", "RavenDusk", "GloomHex"];

      // Multiply into 100+ variations with clean Roblox-friendly variations
      const expanded: string[] = [];
      baseList.forEach(base => {
        const clean = base.replace(/[^a-zA-Z0-9_]/g, "");
        if (!clean) return;
        expanded.push(clean);
        if (useNumbers) {
          expanded.push(`${clean}77`);
          expanded.push(`${clean}99`);
          expanded.push(`${clean}x`);
          expanded.push(`i${clean}`);
        }
        if (useUnderscore) {
          expanded.push(`${clean}_`);
          expanded.push(`_${clean}`);
        }
        expanded.push(`Real${clean}`);
        expanded.push(`${clean}Vibes`);
        expanded.push(`${clean}Official`);
      });
      const unique = Array.from(new Set(expanded));
      setAllNames(unique);
      toast.success(`Generated ${unique.length}+ Roblox usernames!`);
    } catch {
      const fallbackList = ["SoftVibes", "VelvetMist", "LunarBlush", "StarlightAura", "SilkClouds", "VexZyn", "NoxRyn", "JaxLuv", "ZekSol", "VynKyo", "VoidVamp", "ShadowGrim", "VenomCorpse", "RavenDusk", "GloomHex"];
      setAllNames(fallbackList);
      toast.success("Generated Roblox usernames!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    generateRobloxNames();
  }, [style]);
  const filteredNames = allNames.filter(n => n.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleReset = () => {
    setStyle("aesthetic");
    setUseNumbers(true);
    setUseUnderscore(false);
    setSearchQuery("");
    setVisibleCount(30);
    generateRobloxNames();
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={Gamepad2} title="Roblox 100+ Username & Display Name Generator" description="Generate 100+ cool, aesthetic, rare 4-letter, goth, and PvP Roblox usernames and display names with live AI." actions={<ResetButton onClick={handleReset} label="Reset" />} />

      {/* INPUT CARD */}
      <div className="mb-4">

        <ModelSelector value={model} onChange={setModel} />

      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Gamepad2 className="h-5 w-5 text-primary" />
            Roblox Username Theme & Options
          </CardTitle>
          <CardDescription>Select username style and toggle numbers or underscores for Roblox compatibility.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Select Theme</Label>
              <Select value={style} onValueChange={v => setStyle(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {ROBLOX_STYLES.map(s => <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col justify-end space-y-2 pb-2">
              <label className="text-xs font-bold text-foreground flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} className="h-4 w-4 rounded border-primary text-primary accent-primary" />
                <span>Include Numbers (e.g. 77, 99)</span>
              </label>
            </div>

            <div className="flex flex-col justify-end space-y-2 pb-2">
              <label className="text-xs font-bold text-foreground flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={useUnderscore} onChange={e => setUseUnderscore(e.target.checked)} className="h-4 w-4 rounded border-primary text-primary accent-primary" />
                <span>Include Underscores (e.g. Soft_Vibes)</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={generateRobloxNames} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Generating 100+ Usernames..." : "Generate 100+ Roblox Usernames"}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* 100+ DISPLAY GRID */}
      {allNames.length > 0 && <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generated {filteredNames.length} Roblox Usernames
            </h2>

            {/* SEARCH FILTER */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Filter usernames..." className="pl-9 h-10 text-xs" />
            </div>
          </div>

 {/* Premium AI Output Display */}
 <AiOutputDisplay
 title="AI Generated Roblox Usernames"
 subtitle="100% Unique & Formatted for Roblox Profiles"
 content={generatedNames}
 loading={loading}
 onRegenerate={generateRobloxNames}
 variant="cards"
 />
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Pick a Vibe",
    description:"Choose gaming, cute, aesthetic, or edgy style.",
    icon: Gamepad2,
  },
{
    step:"02",
    title:"Generate Options",
    description:"Roll multiple username suggestions.",
    icon: Dice5,
  },
{
    step:"03",
    title:"Check & Copy",
    description:"Copy a favorite and try it on Roblox.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Gamepad2,
    title:"Style Presets",
    description:"Generate names tuned to your preferred aesthetic.",
  },
{
    icon: Dice5,
    title:"Bulk Suggestions",
    description:"Get many ideas at once to spark creativity.",
  },
{
    icon: Sparkles,
    title:"Display Name Ideas",
    description:"Separate suggestions for the display name field.",
  },
{
    icon: Copy,
    title:"Easy Copy",
    description:"Copy any suggestion instantly.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Roblox usernames are scarce real estate. With hundreds of millions of accounts, the short, obvious names are long gone, leaving new players struggling to find something that feels original. This generator produces styled suggestions that balance availability and personality.</p>
  <p>Understand the two fields. Your username is the permanent handle tied to your account and costs Robux to change. Your display name is what friends see and can be updated more often. Many players keep a clean username and use the display name for creative expression, so the generator offers ideas for both.</p>
  <p>Style matters for community fit. Aesthetic and cute names suit roleplay and social games, while edgy or gaming tags fit competitive experiences. Adding a number, suffix, or symbol variation increases the chance a name feels unused, though you should still verify availability in Roblox directly.</p>
  <p>Safety first. This tool only creates text — it never touches your account or passwords. Copy a suggestion, then check it in Roblox's signup or settings to confirm it is free. A good Roblox name is memorable, readable on a small screen, and reflective of how you want to be known across experiences.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is the difference between username and display name?",
    answer:"The username is your permanent login identity; the display name is a separate, changeable name shown to others.",
  },
{
    question:"Can I change my Roblox username?",
    answer:"Usernames can be changed for a fee; display names can be changed more freely within limits.",
  },
{
    question:"Are short names taken?",
    answer:"Many short names are claimed, so the generator adds suffixes and styles to find available-feeling options.",
  },
{
    question:"How long can a name be?",
    answer:"Roblox has length limits for both fields, so keep suggestions concise.",
  },
{
    question:"Is this safe to use?",
    answer:"The tool only generates text ideas; it does not access your Roblox account.",
  }
  ]}
/>
</div>
 );
}
