"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton } from"@/components/shared/action-buttons";
import { Palette, Sparkles, Download } from"lucide-react";
import toast from"react-hot-toast";

export function ColorHarmonyClient() {
 const [baseColor, setBaseColor] = useState("#3b82f6");
 const [harmony, setHarmony] = useState("complementary");
 const [palette, setPalette] = useState<string[]>(["#3b82f6","#f59e0b"]);

 const generatePalette = () => {
 // Basic mock generation logic
 if (harmony ==="complementary") {
 setPalette([baseColor,"#ef4444"]);
 } else if (harmony ==="analogous") {
 setPalette([baseColor,"#10b981","#6366f1"]);
 } else {
 setPalette([baseColor,"#222222","#cccccc","#ffffff"]);
 }
 toast.success("Palette generated");
 };

 const exportCSS = () => {
 const css = palette.map((c, i) =>"--color-"+ i +":"+ c +";").join("\n");
 const blob = new Blob([":root {\n"+ css +"\n}"], { type:"text/css"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="palette.css";
 a.click();
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Palette}
 title="Color Palette Harmonizer & Generator"
 description="Generate color harmony palettes based on color theory."
 actions={<ActionButton onClick={exportCSS} icon={Download} label="Export CSS"variant="outline"size="default"/>}
 />

 <GlassCard>
 <CardContent className="p-4 flex gap-4 items-end flex-wrap">
 <div className="space-y-2">
 <Label>Base Color</Label>
 <Input type="color"value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-16 h-10 p-1"/>
 </div>
 <div className="flex-1 space-y-2 min-w-[200px]">
 <Label>Hex Code</Label>
 <Input value={baseColor} onChange={(e) => setBaseColor(e.target.value)} />
 </div>
 <div className="w-48 space-y-2">
 <Label>Harmony Rule</Label>
 <Select value={harmony} onValueChange={setHarmony}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="complementary">Complementary</SelectItem>
 <SelectItem value="analogous">Analogous</SelectItem>
 <SelectItem value="triadic">Triadic</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <ActionButton onClick={generatePalette} icon={Sparkles} label="Generate"variant="default"size="default"/>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {palette.map((color, i) => (
 <GlassCard key={i}>
 <div style={{ backgroundColor: color }} className="h-32 w-full rounded-t-xl"/>
 <CardContent className="p-4 flex flex-col gap-2">
 <div className="flex justify-between items-center">
 <span className="font-mono uppercase font-bold">{color}</span>
 <CopyButton getText={() => color} label="Copy"/>
 </div>
 </CardContent>
 </GlassCard>
 ))}
 </div>
 </div>
 );
}
