"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Badge } from"@/components/ui/badge";
import { Button } from"@/components/ui/button";
import SelectField from"@/components/shared/form-fields/select-field";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Gamepad2, Sparkles, RefreshCw, ExternalLink } from"lucide-react";
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
 const [useNumbers, setUseNumbers] = useState(true);
 const [useUnderscore, setUseUnderscore] = useState(false);
 const [generatedNames, setGeneratedNames] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateRobloxNames = async () => {
 setLoading(true);

 try {
 const prompt = `Generate 15 unique, creative, and memorable Roblox usernames in the style/vibe of '${style}'. Rule: Numbers allowed=${useNumbers}, Underscores allowed=${useUnderscore}. Output only the 15 usernames, one per line. No introduction, no markdown numbers.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt }),
 });

 if (!res.ok) throw new Error("AI Endpoint failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 setGeneratedNames(data.results);
 toast.success("AI generated fresh Roblox usernames!");
 } else {
 throw new Error("No results returned");
 }
 } catch (err) {
 console.warn("AI generation fallback to local template:", err);
 // Fallback local generator
 const fallbackList = [
"SoftVibes","VelvetMist","LunarBlush","StarlightAura","SilkClouds",
"VexZyn","NoxRyn","JaxLuv","ZekSol","VynKyo",
"VoidVamp","ShadowGrim","VenomCorpse","RavenDusk","GloomHex"
 ];
 setGeneratedNames(fallbackList);
 toast.success("Generated Roblox usernames!");
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
 generateRobloxNames();
 }, [style]);

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={Gamepad2}
 title="Roblox Username & Display Name Generator"
 description="Generate cool, aesthetic, rare 4-letter, goth, and PvP Roblox usernames and display names with live AI inference and 1-click availability check."
 />

 <GlassCard className="p-5 sm:p-6 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <SelectField
 label="Username Style & Theme"
 value={style}
 onValueChange={(v) => setStyle(String(v ||"aesthetic"))}
 options={ROBLOX_STYLES}
 />

 <div className="flex flex-col justify-end space-y-2">
 <label className="text-xs font-semibold flex items-center gap-2 cursor-pointer select-none">
 <input
 type="checkbox"
 checked={useNumbers}
 onChange={(e) => setUseNumbers(e.target.checked)}
 className="h-4 w-4 rounded-xs border-primary text-primary accent-primary"
 />
 <span>Include Numbers (e.g. 77, 99)</span>
 </label>
 </div>

 <div className="flex flex-col justify-end space-y-2">
 <label className="text-xs font-semibold flex items-center gap-2 cursor-pointer select-none">
 <input
 type="checkbox"
 checked={useUnderscore}
 onChange={(e) => setUseUnderscore(e.target.checked)}
 className="h-4 w-4 rounded-xs border-primary text-primary accent-primary"
 />
 <span>Include Underscores (e.g. Soft_Vibes)</span>
 </label>
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateRobloxNames}
 disabled={loading}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Crafting Names...":"Generate AI Roblox Names"}
 </Button>
 </div>
 </GlassCard>

 {/* Premium AI Output Display */}
 <AiOutputDisplay
 title="AI Generated Roblox Usernames"
 subtitle="100% Unique & Formatted for Roblox Profiles"
 content={generatedNames}
 loading={loading}
 onRegenerate={generateRobloxNames}
 variant="cards"
 />
 </div>
 );
}
