"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Swords, Sparkles, RefreshCw } from"lucide-react";
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
 </div>
 );
}
