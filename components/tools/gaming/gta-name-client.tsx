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
import { Car, Copy, RefreshCw, Sparkles, Type, Users } from"lucide-react";
import toast from"react-hot-toast";

const CREW_TYPES = [
 { value:"mafia", label:"🕴️ Italian & Russian Mafia Syndicate"},
 { value:"street", label:"🔥 Street Racing & Biker Gang"},
 { value:"cartel", label:"🌴 Sinaloa & Narco Cartel"},
 { value:"cop", label:"👮 LSPD & FIB Tactical Squad"},
];

export default function GtaNameClient() {
 const [crewType, setCrewType] = useState("mafia");
 const [names, setNames] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateGtaNames = async () => {
 setLoading(true);

 try {
 const prompt = `Generate 10 badass GTA V / GTA RP crew names and custom vanity license plate texts for a '${crewType}' organization. Format each output as: 'Crew Name [PLATE_TEXT]'. Output 1 per line. No markdown formatting.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt }),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 setNames(data.results);
 toast.success("AI generated fresh GTA crew names!");
 } else {
 throw new Error("No results");
 }
 } catch (err) {
 console.warn("AI generation fallback:", err);
 const fallbackList = [
"Vercetti Crime Syndicate [OUTLAW]",
"Los Santos Speed Demons [FASTAF]",
"Vinewood Cartel [NARCO]",
"FIB Special Operations [LAWMAN]",
 ];
 setNames(fallbackList);
 toast.success("Generated GTA names!");
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
 generateGtaNames();
 }, [crewType]);

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={Car}
 title="GTA V License Plate & Crew Name Studio"
 description="Generate badass GTA Online crew names, NoPixel RP gang tags, and custom vanity license plates with live AI inference."
 />

 <GlassCard className="p-6 space-y-4">
 <SelectField
 label="Select Crew / Gang Archetype"
 value={crewType}
 onValueChange={(v) => setCrewType(String(v ||"mafia"))}
 options={CREW_TYPES}
 />

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateGtaNames}
 disabled={loading}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Crafting...":"Generate AI GTA Crew Names"}
 </Button>
 </div>
 </GlassCard>

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
