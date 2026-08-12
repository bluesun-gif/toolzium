"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import SelectField from"@/components/shared/form-fields/select-field";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Tv, RefreshCw } from"lucide-react";
import toast from"react-hot-toast";

const GAME_CATEGORIES = [
 { value:"valorant", label:"🎯 Valorant / Ranked FPS"},
 { value:"gta", label:"🚗 GTA V / Roleplay (RP)"},
 { value:"minecraft", label:"⛏️ Minecraft Survival & SMP"},
 { value:"fortnite", label:"⚡ Fortnite Victory Royale"},
 { value:"justchatting", label:"💬 Just Chatting & IRL"},
];

export default function TwitchTitleClient() {
 const [game, setGame] = useState("valorant");
 const [titles, setTitles] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateTwitchTitles = async () => {
 setLoading(true);

 try {
 const prompt = `Generate 6 high-CTR, engaging Twitch stream title hooks for '${game}'. Include commands tags (e.g. !rank !sens !specs), uppercase hooks, and viewer incentives. Output 1 title per line. No markdown formatting.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt }),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 setTitles(data.results);
 toast.success("AI generated fresh Twitch stream titles!");
 } else {
 throw new Error("No results");
 }
 } catch (err) {
 console.warn("AI generation fallback:", err);
 const fallbackList = [
"🔥 ROAD TO RADIANT OR WE DON'T SLEEP! (!rank !sens)",
"🎯 100% HEADSHOT RATE ONLY | MERCH GIVEAWAY AT 50 SUBS",
 ];
 setTitles(fallbackList);
 toast.success("Generated Twitch titles!");
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
 generateTwitchTitles();
 }, [game]);

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={Tv}
 title="Twitch Stream Title & High-CTR Hook Generator"
 description="Generate high-converting Twitch stream titles, viewer engagement hooks, and command tags for Valorant, GTA V, Minecraft, and Just Chatting with live AI inference."
 />

 <GlassCard className="p-6 space-y-4">
 <SelectField
 label="Select Streaming Category / Game Niche"
 value={game}
 onValueChange={(v) => setGame(String(v ||"valorant"))}
 options={GAME_CATEGORIES}
 />

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateTwitchTitles}
 disabled={loading}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Crafting...":"Generate AI Twitch Titles"}
 </Button>
 </div>
 </GlassCard>

 {/* Premium AI Output Display */}
 <AiOutputDisplay
 title="AI Generated Twitch Stream Titles"
 subtitle="High-CTR Hooks & Engagement Boosters"
 content={titles}
 loading={loading}
 onRegenerate={generateTwitchTitles}
 variant="prose"
 />
 </div>
 );
}
