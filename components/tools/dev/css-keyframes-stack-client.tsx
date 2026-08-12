"use client";
import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Layers, Play, Plus, Trash2 } from"lucide-react";

type AnimationLayer = {
 id: string;
 name: string;
 duration: string;
 timingFunction: string;
 delay: string;
 iterationCount: string;
 direction: string;
};

const DEFAULT_LAYER: AnimationLayer = {
 id:"1",
 name:"spin",
 duration:"2",
 timingFunction:"linear",
 delay:"0",
 iterationCount:"infinite",
 direction:"normal",
};

const ANIMATION_NAMES = ["spin","pulse","bounce","float","shake","fade-in","slide-in"];

export function CssKeyframesStackClient() {
 const [layers, setLayers] = useState<AnimationLayer[]>([{ ...DEFAULT_LAYER }]);
 const [previewKey, setPreviewKey] = useState(0);

 const updateLayer = (id: string, field: keyof AnimationLayer, value: string) => {
 setLayers(layers.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
 };

 const addLayer = () => {
 setLayers([...layers, { ...DEFAULT_LAYER, id: Date.now().toString(), name:"pulse"}]);
 };

 const removeLayer = (id: string) => {
 if (layers.length > 1) {
 setLayers(layers.filter((l) => l.id !== id));
 }
 };

 const resetLayers = () => {
 setLayers([{ ...DEFAULT_LAYER, id: Date.now().toString() }]);
 };

 const animationString = layers
 .map((l) => l.name +""+ l.duration +"s"+ l.timingFunction +""+ l.delay +"s"+ l.iterationCount +""+ l.direction)
 .join(",");
 const cssCode ="animation:"+ animationString +";";

 const triggerAnimation = () => {
 setPreviewKey(previewKey + 1);
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader 
 icon={Layers} 
 title="CSS Keyframe Multi-Animation Stacker"
 description="Visual CSS multi-animation builder. Chain multiple @keyframes on a single element."
 actions={
 <>
 <ActionButton onClick={triggerAnimation} icon={Play} label="Preview"/>
 <ResetButton onClick={resetLayers} label="Reset"/>
 </>
 } 
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Animation Layers</CardTitle>
 <CardDescription>Stack multiple animations together.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {layers.map((layer, index) => (
 <div key={layer.id} className="p-4 border rounded-md space-y-4 relative bg-card/50">
 <div className="flex justify-between items-center">
 <h4 className="font-medium text-sm">Layer {index + 1}</h4>
 {layers.length > 1 && (
 <Button variant="ghost"size="icon"onClick={() => removeLayer(layer.id)}>
 <Trash2 className="w-4 h-4 text-destructive"/>
 </Button>
 )}
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Animation Name</Label>
 <Select value={layer.name} onValueChange={(val) => updateLayer(layer.id,"name", val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {ANIMATION_NAMES.map((name) => (
 <SelectItem key={name} value={name}>{name}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 
 <div className="space-y-2">
 <Label>Timing Function</Label>
 <Select value={layer.timingFunction} onValueChange={(val) => updateLayer(layer.id,"timingFunction", val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="linear">linear</SelectItem>
 <SelectItem value="ease">ease</SelectItem>
 <SelectItem value="ease-in">ease-in</SelectItem>
 <SelectItem value="ease-out">ease-out</SelectItem>
 <SelectItem value="ease-in-out">ease-in-out</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Duration (s)</Label>
 <Input type="number"min="0.1"step="0.1"value={layer.duration} onChange={(e) => updateLayer(layer.id,"duration", e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Delay (s)</Label>
 <Input type="number"min="0"step="0.1"value={layer.delay} onChange={(e) => updateLayer(layer.id,"delay", e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Iteration Count</Label>
 <Select value={layer.iterationCount} onValueChange={(val) => updateLayer(layer.id,"iterationCount", val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="infinite">infinite</SelectItem>
 <SelectItem value="1">1</SelectItem>
 <SelectItem value="2">2</SelectItem>
 <SelectItem value="3">3</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Direction</Label>
 <Select value={layer.direction} onValueChange={(val) => updateLayer(layer.id,"direction", val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="normal">normal</SelectItem>
 <SelectItem value="reverse">reverse</SelectItem>
 <SelectItem value="alternate">alternate</SelectItem>
 <SelectItem value="alternate-reverse">alternate-reverse</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 </div>
 ))}

 <Button onClick={addLayer} variant="outline"className="w-full">
 <Plus className="w-4 h-4 mr-2"/>
 Add Animation Layer
 </Button>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Live Preview</CardTitle>
 <CardDescription>See your stacked animations in action.</CardDescription>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center min-h-[300px] bg-black/5 rounded-md relative overflow-hidden">
 <style dangerouslySetInnerHTML={{ __html:"\n"+
"@keyframes spin { 100% { transform: rotate(360deg); } }\n"+
"@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }\n"+
"@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25%); } }\n"+
"@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }\n"+
"@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }\n"+
"@keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }\n"+
"@keyframes slide-in { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }\n"+
".preview-element {"+ cssCode +"}\n"
 }} />
 <div 
 key={previewKey}
 className={"w-24 h-24 bg-primary rounded-xl shadow-lg flex items-center justify-center text-primary-foreground font-bold"+"preview-element"}
 >
 CSS
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Generated CSS</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="p-4 bg-muted rounded-md overflow-x-auto text-sm font-mono">
 {cssCode}
 </div>
 <CopyButton getText={() => cssCode} label="Copy CSS"/>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 </div>
 );
}
