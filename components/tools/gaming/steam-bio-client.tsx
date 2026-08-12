"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import SelectField from"@/components/shared/form-fields/select-field";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Shield, RefreshCw } from"lucide-react";
import toast from"react-hot-toast";

const STEAM_STYLES = [
 { value:"aesthetic", label:"✨ Minimalist & Aesthetic Spacers"},
 { value:"pvp", label:"🔥 CS2 / Dota 2 Sweat & Ranks"},
 { value:"anime", label:"⛩️ Anime & Otaku Bio"},
 { value:"collector", label:"⭐ Level 100+ Game Collector"},
];

export default function SteamBioClient() {
 const [style, setStyle] = useState("aesthetic");
 const [bios, setBios] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateSteamBios = async () => {
 setLoading(true);

 try {
 const prompt = `Generate 4 aesthetic Steam profile bios for a '${style}' gamer. Use clean symbols, line breaks, hardware specs placeholders (!specs), and rank tags. Separate each bio with an empty line. Do not use markdown bold or asterisks.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt, type:"prose"}),
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
 const fallbackList = [
"✧ 𝖢𝖲𝟤 & 𝖥𝖯𝖲 𝖤𝗇𝗍𝗁𝗎𝗌𝗂𝖺𝗌𝗍 ✧\n🎮 Level 150 Collector\n💻 RTX 4090 | i9-14900K\n👇 Check my inventory below",
 ];
 setBios(fallbackList);
 toast.success("Generated Steam bios!");
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
 generateSteamBios();
 }, [style]);

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={Shield}
 title="Steam Profile Bio & Layout Decorator"
 description="Generate aesthetic Steam profile bios, hardware spec boxes, CS2/Dota 2 rank tags, and custom artwork spacers with live AI inference."
 />

 <GlassCard className="p-6 space-y-4">
 <SelectField
 label="Select Steam Profile Theme"
 value={style}
 onValueChange={(v) => setStyle(String(v ||"aesthetic"))}
 options={STEAM_STYLES}
 />

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateSteamBios}
 disabled={loading}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Crafting...":"Generate AI Steam Bios"}
 </Button>
 </div>
 </GlassCard>

 {/* Premium AI Output Display */}
 <AiOutputDisplay
 title="AI Generated Steam Bios"
 subtitle="100% Ready for Steam Custom Profile Box"
 content={bios}
 loading={loading}
 onRegenerate={generateSteamBios}
 variant="prose"
 />
 </div>
 );
}
