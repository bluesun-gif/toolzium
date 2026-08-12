"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import SelectField from"@/components/shared/form-fields/select-field";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Car, RefreshCw } from"lucide-react";
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
 </div>
 );
}
