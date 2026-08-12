"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Button } from"@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton } from"@/components/shared/action-buttons";
import { Code, Eye, RefreshCw, Layers } from"lucide-react";
import { Separator } from"@/components/ui/separator";

const PRESETS = {
 custom:"M 10 80 Q 52.5 10, 95 80 T 180 80",
 star:"M 50 10 L 61 39 L 92 39 L 67 57 L 76 86 L 50 69 L 24 86 L 33 57 L 8 39 L 39 39 Z",
 heart:"M 50 85 C 50 85 10 55 10 30 C 10 15 25 10 35 20 C 45 30 50 40 50 40 C 50 40 55 30 65 20 C 75 10 90 15 90 30 C 90 55 50 85 50 85 Z",
 checkmark:"M 20 50 L 40 70 L 80 30"
};

export function SvgPathClient() {
 const [path, setPath] = useState(PRESETS.custom);
 const [preset, setPreset] = useState("custom");
 const [strokeWidth, setStrokeWidth] = useState("2");
 const [strokeColor, setStrokeColor] = useState("#3b82f6");
 const [fillColor, setFillColor] = useState("transparent");
 const [scale, setScale] = useState(1);

 const handlePresetChange = (val: string) => {
 setPreset(val);
 setPath(PRESETS[val as keyof typeof PRESETS]);
 };

 const getSvgCode = () => {
 return `<svg width="200"height="200"viewBox="0 0 100 100"xmlns="http://www.w3.org/2000/svg">\n <path d="${path}"stroke="${strokeColor}"stroke-width="${strokeWidth}"fill="${fillColor}"/>\n</svg>`;
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Code}
 title="SVG Path Visualizer & Editor"
 description="Visualize and edit raw SVG path strings, explore path commands, and preview the resulting shape."
 actions={
 <CopyButton getText={getSvgCode} label="Copy SVG"/>
 }
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Path Input & Editor</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-sm font-medium">Presets</label>
 </div>
 <Select value={preset} onValueChange={handlePresetChange}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="custom">Custom</SelectItem>
 <SelectItem value="star">Star</SelectItem>
 <SelectItem value="heart">Heart</SelectItem>
 <SelectItem value="checkmark">Checkmark</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div>
 <label className="text-sm font-medium mb-1 block">Path Data (d attribute)</label>
 <textarea
 value={path}
 onChange={(e) => { setPath(e.target.value); setPreset("custom"); }}
 className="w-full min-h-[100px] p-3 border rounded-md font-mono text-sm bg-background resize-y"
 placeholder="M 10 10 L 90 90..."
 />
 </div>

 <Separator />

 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="text-sm font-medium mb-1 block">Stroke Color</label>
 <div className="flex gap-2">
 <Input type="color"value={strokeColor} onChange={e => setStrokeColor(e.target.value)} className="w-12 h-10 p-1"/>
 <Input type="text"value={strokeColor} onChange={e => setStrokeColor(e.target.value)} className="flex-1 font-mono"/>
 </div>
 </div>
 <div>
 <label className="text-sm font-medium mb-1 block">Fill Color</label>
 <div className="flex gap-2">
 <Input type="color"value={fillColor ==="transparent"?"#ffffff": fillColor} onChange={e => setFillColor(e.target.value)} className="w-12 h-10 p-1"/>
 <Input type="text"value={fillColor} onChange={e => setFillColor(e.target.value)} className="flex-1 font-mono"/>
 </div>
 </div>
 <div>
 <label className="text-sm font-medium mb-1 block">Stroke Width</label>
 <Input type="number"value={strokeWidth} onChange={e => setStrokeWidth(e.target.value)} min="0"step="0.5"/>
 </div>
 <div>
 <label className="text-sm font-medium mb-1 block">Zoom</label>
 <div className="flex items-center gap-2">
 <input type="range"min="0.5"max="3"step="0.1"value={scale} onChange={e => setScale(parseFloat(e.target.value))} className="w-full"/>
 <span className="text-xs text-muted-foreground w-8">{scale}x</span>
 </div>
 </div>
 </div>
 
 <div className="mt-4 p-4 bg-muted/30 rounded-lg text-sm">
 <h4 className="font-semibold mb-2">Common Commands</h4>
 <ul className="space-y-1 text-muted-foreground grid grid-cols-2 gap-x-2">
 <li><code className="font-bold text-primary">M</code> MoveTo</li>
 <li><code className="font-bold text-primary">L</code> LineTo</li>
 <li><code className="font-bold text-primary">C</code> Cubic Bezier</li>
 <li><code className="font-bold text-primary">Q</code> Quadratic Bezier</li>
 <li><code className="font-bold text-primary">A</code> Arc</li>
 <li><code className="font-bold text-primary">Z</code> ClosePath</li>
 </ul>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between space-y-0">
 <CardTitle className="flex items-center gap-2"><Eye className="w-5 h-5"/> Preview</CardTitle>
 </CardHeader>
 <CardContent>
 <div 
 className="w-full aspect-square border-2 border-dashed rounded-lg bg-grid flex items-center justify-center overflow-hidden"
 style={{
 backgroundImage: 'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
 backgroundSize: '20px 20px'
 }}
 >
 <svg
 viewBox="0 0 100 100"
 className="w-full h-full max-w-[400px] max-h-[400px]"
 style={{ transform:"scale("+ scale +")", transition:"transform 0.2s"}}
 >
 <path
 d={path}
 stroke={strokeColor}
 strokeWidth={strokeWidth}
 fill={fillColor}
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 </svg>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
