"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Square, Plus, Trash2 } from"lucide-react";
import { cn } from"@/lib/utils";

type ShadowLayer = {
 id: string;
 hOffset: number;
 vOffset: number;
 blur: number;
 spread: number;
 color: string;
 inset: boolean;
};

const defaultShadow: ShadowLayer = {
 id:"1",
 hOffset: 10,
 vOffset: 10,
 blur: 15,
 spread: 0,
 color:"rgba(0,0,0,0.3)",
 inset: false,
};

const presets = [
 { name:"Subtle", layers: [{ id:"p1", hOffset: 0, vOffset: 1, blur: 3, spread: 0, color:"rgba(0,0,0,0.1)", inset: false }, { id:"p2", hOffset: 0, vOffset: 1, blur: 2, spread: 0, color:"rgba(0,0,0,0.06)", inset: false }] },
 { name:"Medium", layers: [{ id:"p1", hOffset: 0, vOffset: 4, blur: 6, spread: -1, color:"rgba(0,0,0,0.1)", inset: false }, { id:"p2", hOffset: 0, vOffset: 2, blur: 4, spread: -1, color:"rgba(0,0,0,0.06)", inset: false }] },
 { name:"Heavy", layers: [{ id:"p1", hOffset: 0, vOffset: 10, blur: 15, spread: -3, color:"rgba(0,0,0,0.1)", inset: false }, { id:"p2", hOffset: 0, vOffset: 4, blur: 6, spread: -2, color:"rgba(0,0,0,0.05)", inset: false }] },
 { name:"Neon Glow", layers: [{ id:"p1", hOffset: 0, vOffset: 0, blur: 5, spread: 2, color:"rgba(59,130,246,0.5)", inset: false }, { id:"p2", hOffset: 0, vOffset: 0, blur: 20, spread: 5, color:"rgba(59,130,246,0.3)", inset: false }] },
 { name:"Layered", layers: [{ id:"p1", hOffset: 2, vOffset: 2, blur: 5, spread: 0, color:"rgba(0,0,0,0.1)", inset: false }, { id:"p2", hOffset: 4, vOffset: 4, blur: 10, spread: 0, color:"rgba(0,0,0,0.1)", inset: false }, { id:"p3", hOffset: 8, vOffset: 8, blur: 20, spread: 0, color:"rgba(0,0,0,0.1)", inset: false }] }
];

export function BoxShadowClient() {
 const [layers, setLayers] = useState<ShadowLayer[]>([defaultShadow]);
 const [activeLayerId, setActiveLayerId] = useState<string>(defaultShadow.id);
 const [boxColor, setBoxColor] = useState("#3b82f6");
 const [bgColor, setBgColor] = useState("#ffffff");

 const activeLayerIndex = layers.findIndex(l => l.id === activeLayerId);
 const activeLayer = layers[activeLayerIndex];

 const updateActiveLayer = (updates: Partial<ShadowLayer>) => {
 setLayers(layers.map(l => l.id === activeLayerId ? { ...l, ...updates } : l));
 };

 const addLayer = () => {
 const newLayer = { ...defaultShadow, id: Math.random().toString(36).substring(7) };
 setLayers([...layers, newLayer]);
 setActiveLayerId(newLayer.id);
 };

 const removeLayer = (id: string) => {
 if (layers.length <= 1) return;
 const newLayers = layers.filter(l => l.id !== id);
 setLayers(newLayers);
 if (activeLayerId === id) {
 setActiveLayerId(newLayers[0].id);
 }
 };

 const loadPreset = (presetLayers: ShadowLayer[]) => {
 const newLayers = presetLayers.map(l => ({ ...l, id: Math.random().toString(36).substring(7) }));
 setLayers(newLayers);
 setActiveLayerId(newLayers[0].id);
 };

 const generateCSS = () => {
 const shadows = layers.map(l => `${l.inset ?"inset":""}${l.hOffset}px ${l.vOffset}px ${l.blur}px ${l.spread}px ${l.color}`).join(",");
 return `box-shadow: ${shadows};`;
 };

 const generateTailwind = () => {
 const shadows = layers.map(l => `${l.inset ?"inset_":""}${l.hOffset}px_${l.vOffset}px_${l.blur}px_${l.spread}px_${l.color.replace(/\s/g,"")}`).join(",");
 return `shadow-[${shadows}]`;
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Square}
 title="CSS Box Shadow Generator"
 description="Create beautiful box shadows for your web projects with layers, colors, and live preview."
 actions={
 <ResetButton onClick={() => loadPreset([defaultShadow])} label="Reset All"/>
 }
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Preview</CardTitle>
 <CardDescription>See how your shadow looks on a box.</CardDescription>
 </CardHeader>
 <CardContent>
 <div 
 className="w-full h-64 rounded-xl flex items-center justify-center transition-colors"
 style={{ backgroundColor: bgColor }}
 >
 <div 
 className="w-32 h-32 rounded-xl transition-all"
 style={{ 
 backgroundColor: boxColor,
 boxShadow: layers.map(l => `${l.inset ?"inset":""}${l.hOffset}px ${l.vOffset}px ${l.blur}px ${l.spread}px ${l.color}`).join(",")
 }}
 />
 </div>
 <div className="flex gap-4 mt-4">
 <div className="flex-1 space-y-2">
 <Label>Box Color</Label>
 <Input type="color"value={boxColor} onChange={(e) => setBoxColor(e.target.value)} className="h-10"/>
 </div>
 <div className="flex-1 space-y-2">
 <Label>Background Color</Label>
 <Input type="color"value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-10"/>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Output Code</CardTitle>
 <CardDescription>Copy the generated CSS or Tailwind code.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <div className="flex justify-between items-center">
 <Label>CSS</Label>
 <CopyButton getText={generateCSS} label="Copy CSS"/>
 </div>
 <div className="p-3 bg-muted rounded-md text-sm font-mono break-all">
 {generateCSS()}
 </div>
 </div>
 <div className="space-y-2">
 <div className="flex justify-between items-center">
 <Label>Tailwind CSS</Label>
 <CopyButton getText={generateTailwind} label="Copy Tailwind"/>
 </div>
 <div className="p-3 bg-muted rounded-md text-sm font-mono break-all">
 {generateTailwind()}
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <div className="flex items-center justify-between">
 <div>
 <CardTitle>Shadow Layers</CardTitle>
 <CardDescription>Manage multiple shadow layers.</CardDescription>
 </div>
 <Button onClick={addLayer} size="sm"variant="outline"className="gap-1">
 <Plus className="h-4 w-4"/> Add Layer
 </Button>
 </div>
 </CardHeader>
 <CardContent>
 <div className="flex flex-wrap gap-2 mb-4">
 {layers.map((l, i) => (
 <div key={l.id} className={cn("flex items-center border rounded-md overflow-hidden", activeLayerId === l.id ?"border-primary ring-1 ring-primary":"border-input")}>
 <button
 className="px-3 py-1.5 text-sm hover:bg-muted"
 onClick={() => setActiveLayerId(l.id)}
 >
 Layer {i + 1}
 </button>
 {layers.length > 1 && (
 <button
 className="px-2 py-1.5 text-destructive hover:bg-destructive/10"
 onClick={() => removeLayer(l.id)}
 >
 <Trash2 className="h-3.5 w-3.5"/>
 </button>
 )}
 </div>
 ))}
 </div>

 {activeLayer && (
 <div className="space-y-4 pt-4 border-t">
 <div className="flex items-center justify-between">
 <Label className="text-base font-semibold">Layer Settings</Label>
 <div className="flex items-center gap-2">
 <Label htmlFor="inset-mode">Inset</Label>
 <Switch 
 id="inset-mode"
 checked={activeLayer.inset} 
 onCheckedChange={(c) => updateActiveLayer({ inset: c })} 
 />
 </div>
 </div>

 <div className="space-y-4">
 <div className="space-y-2">
 <div className="flex justify-between">
 <Label>Horizontal Offset</Label>
 <span className="text-xs text-muted-foreground">{activeLayer.hOffset}px</span>
 </div>
 <input 
 type="range"min="-50"max="50"value={activeLayer.hOffset}
 onChange={(e) => updateActiveLayer({ hOffset: parseInt(e.target.value) })}
 className="w-full"
 />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between">
 <Label>Vertical Offset</Label>
 <span className="text-xs text-muted-foreground">{activeLayer.vOffset}px</span>
 </div>
 <input 
 type="range"min="-50"max="50"value={activeLayer.vOffset}
 onChange={(e) => updateActiveLayer({ vOffset: parseInt(e.target.value) })}
 className="w-full"
 />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between">
 <Label>Blur Radius</Label>
 <span className="text-xs text-muted-foreground">{activeLayer.blur}px</span>
 </div>
 <input 
 type="range"min="0"max="100"value={activeLayer.blur}
 onChange={(e) => updateActiveLayer({ blur: parseInt(e.target.value) })}
 className="w-full"
 />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between">
 <Label>Spread Radius</Label>
 <span className="text-xs text-muted-foreground">{activeLayer.spread}px</span>
 </div>
 <input 
 type="range"min="-50"max="50"value={activeLayer.spread}
 onChange={(e) => updateActiveLayer({ spread: parseInt(e.target.value) })}
 className="w-full"
 />
 </div>

 <div className="space-y-2">
 <Label>Shadow Color (Hex/RGBA)</Label>
 <Input 
 value={activeLayer.color}
 onChange={(e) => updateActiveLayer({ color: e.target.value })}
 placeholder="rgba(0, 0, 0, 0.3)"
 />
 </div>
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Presets</CardTitle>
 <CardDescription>Start with a popular shadow preset.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex flex-wrap gap-2">
 {presets.map(p => (
 <Button 
 key={p.name} 
 variant="outline"
 onClick={() => loadPreset(p.layers as any)}
 >
 {p.name}
 </Button>
 ))}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 </div>
 );
}
