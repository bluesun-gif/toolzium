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
import { Car, Copy, RefreshCw, Sparkles, Type, Users } from"lucide-react";
import toast from"react-hot-toast";

const CREW_TYPES = [
 { value:"mafia", label:"🕴️ Italian & Russian Mafia Syndicate"},
 { value:"street", label:"🔥 Street Racing & Biker Gang"},
 { value:"cartel", label:"🌴 Sinaloa & Narco Cartel"},
 { value:"cop", label:"👮 LSPD & FIB Tactical Squad"},
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
import { Car, RefreshCw, Sparkles, Shield, BookOpen, Layers, Zap } from "lucide-react";
import toast from "react-hot-toast";
const CREW_TYPES = [{
  value: "mafia",
  label: "🕴️ Italian & Russian Mafia Syndicate"
}, {
  value: "street",
  label: "🔥 Street Racing & Underground Tuners"
}, {
  value: "cartel",
  label: "🌴 Sinaloa & Narco Cartel"
}, {
  value: "cop",
  label: "👮 LSPD & FIB Tactical Operations"
}, {
  value: "biker",
  label: "🏍️ Outlaw Motorcycle Club (MC)"
}];
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export default function GtaNameClient() {
  const [crewType, setCrewType] = useState("mafia");
  const [model, setModel] = useState("gpt4o");
  const [cityPrefix, setCityPrefix] = useState("Los Santos");
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generateGtaNames = async () => {
    setLoading(true);
    try {
      const prompt = `Generate 10 badass GTA V / GTA RP crew names and custom 8-character vanity license plate texts for a '${crewType}' organization based in '${cityPrefix}'. Format each output as: 'Crew Name [VANITY_PLATE]'. Output 1 per line. No markdown formatting.`;
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
        setNames(data.results);
        toast.success("AI generated fresh GTA crew names & plates!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      setNames(["Vercetti Crime Syndicate [OUTLAW8]", "Los Santos Speed Syndicate [FASTAF99]", "Vinewood Narco Cartel [NARCO88]", "FIB Special Operations [LAWMAN01]", "Pacific Coast Outlaw MC [BADBOYS]", "Del Perro Drift Cartel [DRIFTKNG]"]);
      toast.success("Generated GTA crew names.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    generateGtaNames();
  }, [crewType]);
  const handleReset = () => {
    setCrewType("mafia");
    setCityPrefix("Los Santos");
    generateGtaNames();
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={Car} title="GTA V License Plate & Crew Name Studio" description="Generate badass GTA Online crew names, NoPixel RP gang tags, and 8-character custom vanity license plates with live AI." actions={<ResetButton onClick={handleReset} label="Reset" />} />

      {/* INPUT CONTROL */}
      <div className="mb-4">

        <ModelSelector value={model} onChange={setModel} />

      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Car className="h-5 w-5 text-primary" />
            Crew Archetype & Territory
          </CardTitle>
          <CardDescription>Select crew category and enter territory or custom lore keywords.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Crew Archetype</Label>
              <Select value={crewType} onValueChange={v => setCrewType(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select archetype" />
                </SelectTrigger>
                <SelectContent>
                  {CREW_TYPES.map(c => <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Territory / City Name</Label>
              <Input id="city" value={cityPrefix} onChange={e => setCityPrefix(e.target.value)} placeholder="e.g. Los Santos, Liberty City, Vice City" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={generateGtaNames} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "AI Crafting..." : "Generate AI Crew & Plates"}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* RESULTS GRID */}
      {names.length > 0 && <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            GTA Crew Names & License Plates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {names.map((item, idx) => <GlassCard key={idx} className="p-4 flex items-center justify-between hover:border-primary/40 transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono font-bold text-muted-foreground w-6">#{idx + 1}</span>
                  <span className="font-bold text-sm text-foreground truncate">{item}</span>
                </div>
                <CopyButton getText={() => item} label="Copy" />
              </GlassCard>)}
          </div>
        </div>}

<<<<<<< HEAD
 {/* Premium AI Output Display */}
 <AiOutputDisplay
 title="AI Generated GTA Crew Names & License Plates"
 subtitle="Formatted for GTA Online Crews & NoPixel RP Servers"
 content={names}
 loading={loading}
 onRegenerate={generateGtaNames}
 variant="cards"
 />
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Choose Format",
    description:"Decide between a license plate or a crew name.",
    icon: Car,
  },
{
    step:"02",
    title:"Enter Text",
    description:"Type your desired name within the character limit.",
    icon: Type,
  },
{
    step:"03",
    title:"Style & Copy",
    description:"Apply styling and copy the result for GTA Online.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Car,
    title:"License Plates",
    description:"Craft plates that fit GTA Online's strict character rules.",
  },
{
    icon: Users,
    title:"Crew Names",
    description:"Build a recognizable crew identity for sessions and jobs.",
  },
{
    icon: Sparkles,
    title:"Stylish Variants",
    description:"Add spacing tricks and symbol flair to plain text.",
  },
{
    icon: Copy,
    title:"Instant Copy",
    description:"Grab the final string with one click.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Grand Theft Auto Online is a social game, and your license plate or crew name is the smallest billboard you own. Because plates are capped at eight characters, every letter has to earn its place. This studio helps you brainstorm names that are short, legal, and visually striking.</p>
  <p>For plates, think like a bumper sticker. Abbreviations, initials, and clever spacing turn a limitation into a signature. A plate like 'NITRO FX' or 'BOSS 99' reads instantly at a glance during drive-bys and car meets. Avoid characters that blur together on the in-game font, and test readability before buying.</p>
  <p>Crew names have more room but face a different challenge: recognition. A crew called 'Midnight Runners' tells a story; a random string of letters does not. Align the name with your crew's vibe — heists, racing, or roleplay — so new members instantly get the theme. Consistent styling across plates and crew tags reinforces the brand.</p>
  <p>Symbol flair can help, but GTA's text rendering is limited, so heavy decorations often break or look messy. A single divider or spaced caps is usually enough. Use the copy button to move the exact string into the game without retyping errors. Whether you are building a racing dynasty or a heist crew, a sharp name makes the whole organization feel intentional.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How many characters can a GTA plate have?",
    answer:"Custom license plates in GTA Online are limited to 8 characters, so brevity and creativity both matter.",
  },
{
    question:"Can I use spaces in a plate?",
    answer:"Yes, spaces count as characters within the 8-character limit, so plan them carefully.",
  },
{
    question:"How do I make a good crew name?",
    answer:"Short, punchy, and themed names are easiest to remember and display well above players in sessions.",
  },
{
    question:"Do plates transfer between characters?",
    answer:"Plates are tied to the character that purchases them, so each character needs its own.",
  },
{
    question:"Why style a GTA name?",
    answer:"A styled name helps your crew stand out in public lobbies and content clips.",
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
        title: "Select Crew Archetype",
        description: "Choose Mafia Syndicate, Street Racers, Narco Cartel, FIB Ops, or Biker MC.",
        icon: Car
      }, {
        step: "02",
        title: "Generate Name & Plate",
        description: "AI generates crew names together with legal 8-character GTA Online vanity license plates.",
        icon: Sparkles
      }, {
        step: "03",
        title: "Apply in Rockstar Social Club",
        description: "Copy crew name into Rockstar Social Club and custom plate into iFruit / Los Santos Customs.",
        icon: Shield
      }]} badges={["8-Char Vanity Plates", "NoPixel RP Compatible", "100% Free"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
        icon: Car,
        title: "GTA License Plate Limit",
        description: "Generates custom vanity plates restricted to 8 alphanumeric characters allowed by Los Santos Customs."
      }, {
        icon: Sparkles,
        title: "Social Club & NoPixel Ready",
        description: "Formatted for Rockstar Games Social Club crew creation and FiveM / NoPixel roleplay servers."
      }, {
        icon: Shield,
        title: "100% Free & Fast",
        description: "Generates unlimited crew names without linking Rockstar Social Club accounts."
      }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
        question: "How long can a custom GTA license plate be?",
        answer: "GTA Online custom vanity plates allow up to 8 characters (letters and numbers only, no spaces or special symbols)."
      }, {
        question: "Can I use these crew names for FiveM / NoPixel RP?",
        answer: "Yes! All generated gang tags and mafia titles are formatted for FiveM roleplay server gang registration."
      }]} />

      <RelatedTools currentToolUrl="/tools/gaming/gta-name-generator" max={6} />
    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
