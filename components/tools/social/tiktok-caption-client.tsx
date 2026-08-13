"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { Music2, Sparkles, RefreshCw, Hash } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass =
"border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const fieldClass =
"w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

const vibes = ["Funny","Inspirational","Educational","Trending"] as const;
type Vibe = (typeof vibes)[number];

export default function TiktokCaptionClient() {
 const [topic, setTopic] = useState("");
 const [vibe, setVibe] = useState<Vibe>("Trending");
 const [audience, setAudience] = useState("");
 const [loading, setLoading] = useState(false);
 const [captions, setCaptions] = useState<string[]>([]);

 const handleGenerate = async () => {
 if (!topic.trim()) {
 toast.error("Enter your video topic.");
 return;
 }

 setLoading(true);

 try {
 const prompt = `You are a TikTok content strategist.
Generate 5 TikTok captions with relevant hashtags for:
Video topic: ${topic}
Vibe: ${vibe}
Target audience: ${audience ||"general TikTok users"}

Return ONLY the 5 captions separated by ||| with no labels.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt }),
 });

 const data = await res.json();

 if (data.success && data.raw) {
 const parts = String(data.raw)
 .replace(/```[a-z]*\n?/gi,"")
 .split("|||")
 .map((item: string) => item.trim())
 .filter(Boolean);

 if (parts.length >= 5) {
 setCaptions(parts.slice(0, 5));
 toast.success("TikTok captions generated.");
 } else {
 throw new Error("Invalid AI output.");
 }
 } else {
 throw new Error("API error");
 }
 } catch {
 setCaptions([
 `Wait for the end 👀 ${topic} hits different #fyp #${topic.replace(/\s+/g,"").toLowerCase()}`,
 `POV: you finally understand ${topic} 🤯 #learnontiktok #fyp`,
 `This is your sign to try ${topic} ✨ #trending #viral`,
 `Nobody talks about ${topic} enough 👇 #foryou #tips`,
 `How ${topic} changed the game 🚀 #fypage #viralvideo`,
 ]);
 toast.error("AI offline. Loaded template fallback.");
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Music2}
 title="TikTok Caption Generator"
 description="Generate 5 TikTok captions with hashtags and character counts."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Hash className="w-4 h-4 text-primary"/> Video Details
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Video Topic</label>
 <Input
 value={topic}
 onChange={(e) => setTopic(e.target.value)}
 placeholder="e.g. morning routine hacks"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Vibe</label>
 <select
 value={vibe}
 onChange={(e) => setVibe(e.target.value as Vibe)}
 className={fieldClass}
 >
 {vibes.map((item) => (
 <option key={item} value={item}>
 {item}
 </option>
 ))}
 </select>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Target Audience</label>
 <Input
 value={audience}
 onChange={(e) => setAudience(e.target.value)}
 placeholder="e.g. students, creators"
 />
 </div>
 </div>

 <Button onClick={() => void handleGenerate()} disabled={loading} className="w-full">
 {loading ? (
 <>
 <RefreshCw className="w-4 h-4 animate-spin"/> Generating...
 </>
 ) : (
 <>
 <Sparkles className="w-4 h-4"/> Generate Captions
 </>
 )}
 </Button>
 </CardContent>
 </GlassCard>

 {captions.length > 0 && (
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 {captions.map((caption, index) => (
 <Card key={`${caption.slice(0, 12)}-${index}`} className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Music2 className="w-4 h-4 text-primary"/> Caption {index + 1}
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{caption}</p>
 <div className="flex items-center justify-between gap-3">
 <span
 className={`text-xs ${
 caption.length > 2200 ?"text-red-500":"text-muted-foreground"
 }`}
 >
 {caption.length}/2200
 </span>
 <CopyButton getText={() => caption} label="Copy"/>
 </div>
 </CardContent>
 </Card>
 ))}
 </div>
 )}

 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Describe the Video",
 description:"Add topic, vibe, and audience.",
 icon: Music2,
 },
 {
 step:"02",
 title:"Generate Captions",
 description:"Get five caption ideas with hashtags.",
 icon: Sparkles,
 },
 {
 step:"03",
 title:"Post Faster",
 description:"Copy the best caption and publish.",
 icon: Hash,
 },
 ]}
 badges={["AI-Powered","Hashtags Included","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 {
 icon: Music2,
 title:"TikTok-First Copy",
 description:"Creates captions suited to short-form video culture.",
 },
 {
 icon: Hash,
 title:"Hashtag Support",
 description:"Includes hashtags to support discoverability.",
 },
 {
 icon: Sparkles,
 title:"Vibe Control",
 description:"Matches tone to funny, inspirational, educational, or trending content.",
 },
 {
 icon: Music2,
 title:"Fast Ideation",
 description:"Helps creators publish more consistently with less writing friction.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>
 TikTok captions do more than describe a video. They can create curiosity, add context, encourage comments,
 and improve discoverability. A strong caption often works together with the hook in the video itself to keep
 viewers engaged.
 </p>
 <p>
 Hashtags still matter on TikTok, especially when they help categorize content for interested viewers. The
 best approach is usually a mix of broad discovery hashtags and more specific niche hashtags related to the
 video topic.
 </p>
 <p>
 Use these generated captions as starting points. Add your own voice, adjust the hook, and test different
 styles. Short, clear, and emotionally direct captions often perform better than overly polished marketing
 language.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 {
 question:"How long can TikTok captions be?",
 answer:"TikTok allows long captions, commonly up to 2200 characters.",
 },
 {
 question:"Should I use many hashtags?",
 answer:
"Use a balanced set of relevant hashtags. Relevance matters more than stuffing too many tags.",
 },
 {
 question:"Can this help business accounts?",
 answer:"Yes. Enter your product or campaign topic to create branded caption ideas.",
 },
 ]}
 />

 <RelatedTools currentToolUrl="/tools/social/tiktok-caption" max={6} />
 </div>
 );
}
