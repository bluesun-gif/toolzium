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
import { Copy, LayoutGrid, Palette, RefreshCw, Shield, Sparkles } from"lucide-react";
import toast from"react-hot-toast";

const STEAM_STYLES = [
 { value:"aesthetic", label:"✨ Minimalist & Aesthetic Spacers"},
 { value:"pvp", label:"🔥 CS2 / Dota 2 Sweat & Ranks"},
 { value:"anime", label:"⛩️ Anime & Otaku Bio"},
 { value:"collector", label:"⭐ Level 100+ Game Collector"},
];

export default function SteamBioClient() {
  const [style, setStyle] = useState("aesthetic");
  const [model, setModel] = useState("gpt4o");
  const [favoriteGame, setFavoriteGame] = useState("");
  const [bios, setBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generateSteamBios = async () => {
    setLoading(true);
    try {
      const prompt = `Generate 4 aesthetic Steam profile bios for a '${style}' gamer. ${favoriteGame ? `Incorporate main game '${favoriteGame}'.` : ""} Use clean symbols, line breaks, hardware specs placeholders (RTX 4080 | i9), and rank tags. Separate each bio with |||. Do not use markdown formatting.`;
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
        setBios(data.results);
        toast.success("AI generated fresh Steam bios!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      setBios(["✧ CS2 & FPS Enthusiast ✧\n🎮 Level 150 Collector | Faceit 10\n💻 RTX 4090 | i9-14900K | 360Hz\n👇 Check my inventory below & leave a comment!", "⛩️ Anime & Chill Gamer ⛩️\n🌸 Favorite Games: Elden Ring & Cyberpunk 2077\n🎧 Lofi & Late Night Gaming\n✦ Don't send random trade offers", "🔥 Competitive Ranked Player 🔥\n⚡ Peak Global Elite / Immortal\n🎯 10,000+ Hours Total Playtime\n💬 Comment before adding"]);
      toast.success("Generated Steam bios.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    generateSteamBios();
  }, [style]);
  const handleReset = () => {
    setStyle("aesthetic");
    setFavoriteGame("");
    generateSteamBios();
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={Shield} title="Steam Profile Bio & Layout Decorator" description="Generate aesthetic Steam profile bios, hardware spec boxes, CS2/Dota 2 rank tags, and custom artwork spacers with live AI." actions={<ResetButton onClick={handleReset} label="Reset" />} />

      {/* INPUT CONTROL */}
      <div className="mb-4">

        <ModelSelector value={model} onChange={setModel} />

      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Gamepad2 className="h-5 w-5 text-primary" />
            Steam Profile Vibe & Setup
          </CardTitle>
          <CardDescription>Select a profile aesthetic and input your primary game or hardware specs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Profile Aesthetic</Label>
              <Select value={style} onValueChange={v => setStyle(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select profile theme" />
                </SelectTrigger>
                <SelectContent>
                  {STEAM_STYLES.map(s => <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fav-game">Primary Game / Hardware Specs (Optional)</Label>
              <Input id="fav-game" value={favoriteGame} onChange={e => setFavoriteGame(e.target.value)} placeholder="e.g. CS2, Elden Ring, RTX 4080" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={generateSteamBios} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "AI Crafting..." : "Generate AI Steam Bios"}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* RESULTS GRID */}
      {bios.length > 0 && <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Steam Profile Bio Layouts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bios.map((bio, idx) => <GlassCard key={idx} className="p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-xs font-bold text-primary">Steam Bio Layout #{idx + 1}</span>
                    <CopyButton getText={() => bio} label="Copy Bio" />
                  </div>
                  <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed font-mono">{bio}</p>
                </div>
              </GlassCard>)}
          </div>
        </div>}

 {/* Premium AI Output Display */}
 <AiOutputDisplay
 title="AI Generated Steam Bios"
 subtitle="100% Ready for Steam Custom Profile Box"
 content={bios}
 loading={loading}
 onRegenerate={generateSteamBios}
 variant="prose"
 />
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Pick a Theme",
    description:"Choose a minimal, gamer, or aesthetic bio style.",
    icon: Palette,
  },
{
    step:"02",
    title:"Add Sections",
    description:"Insert stats boxes, dividers, and tag lines.",
    icon: LayoutGrid,
  },
{
    step:"03",
    title:"Copy to Steam",
    description:"Paste the formatted bio into your profile.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Palette,
    title:"Themed Styles",
    description:"Match your bio to your gaming persona.",
  },
{
    icon: LayoutGrid,
    title:"Stat Boxes",
    description:"Add hardware, rank, and achievement snippets.",
  },
{
    icon: Sparkles,
    title:"Divider Art",
    description:"Use ASCII and Unicode dividers for structure.",
  },
{
    icon: Copy,
    title:"Clean Copy",
    description:"Copy text that pastes correctly into Steam.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Your Steam profile is your calling card in the PC gaming world. A blank bio is a missed opportunity to show personality, showcase achievements, and make trading or friend requests feel welcoming. This decorator helps you assemble a bio that looks intentional rather than empty.</p>
  <p>Steam's bio field accepts a limited markup for color and style, so decoration is possible without external tools. Start with a theme: minimal profiles use clean lines and a single accent, while gamer profiles lean into rank tags and hardware specs. Consistency between your avatar, name, and bio builds a coherent identity.</p>
  <p>Structure improves readability. Dividers separate sections like 'About Me', 'Games I Play', and 'Stats', turning a wall of text into scannable blocks. Keep ASCII art narrow so it does not overflow on the Steam mobile app, where many friends first view profiles.</p>
  <p>Stat boxes add credibility. Listing your main ranks, favorite genres, or hours played helps like-minded players connect. Since Steam does not auto-fill these, add them as plain text you update occasionally. Use the copy button to move the finished bio into the editor without losing spacing. A well-built Steam bio turns a random account into a recognizable presence in any gaming community.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Can Steam bios use formatting?",
    answer:"Steam supports BBCode-like tags for color, bold, and links within the profile bio.",
  },
{
    question:"Why decorate a Steam bio?",
    answer:"A polished bio makes your profile memorable to friends and trading partners.",
  },
{
    question:"Do dividers break on mobile?",
    answer:"Some wide ASCII art overflows on phones, so keep dividers modest in width.",
  },
{
    question:"Can I show my rank?",
    answer:"Yes, manually add your rank or stats as text; Steam does not auto-pull them into the bio.",
  },
{
    question:"Is this allowed by Steam?",
    answer:"Decorative bios are fine as long as they follow Steam's community guidelines.",
  }
  ]}
/>
</div>
 );
}
