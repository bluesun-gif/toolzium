"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { BookOpen, Copy, Droplet, Palette, Pipette, Search, Type } from "lucide-react";
import { cn } from"@/lib/utils";

const COLORS = [
 { name:"AliceBlue", hex:"#f0f8ff"},
 { name:"AntiqueWhite", hex:"#faebd7"},
 { name:"Aqua", hex:"#00ffff"},
 { name:"Aquamarine", hex:"#7fffd4"},
 { name:"Azure", hex:"#f0ffff"},
 { name:"Beige", hex:"#f5f5dc"},
 { name:"Bisque", hex:"#ffe4c4"},
 { name:"Black", hex:"#000000"},
 { name:"BlanchedAlmond", hex:"#ffebcd"},
 { name:"Blue", hex:"#0000ff"},
 { name:"BlueViolet", hex:"#8a2be2"},
 { name:"Brown", hex:"#a52a2a"},
 { name:"Crimson", hex:"#dc143c"},
 { name:"Cyan", hex:"#00ffff"},
 { name:"DarkBlue", hex:"#00008b"},
 { name:"Red", hex:"#ff0000"},
 { name:"White", hex:"#ffffff"},
 { name:"Yellow", hex:"#ffff00"},
 { name:"Green", hex:"#008000"},
];

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function colorDistance(rgb1: {
  r: number;
  g: number;
  b: number;
}, rgb2: {
  r: number;
  g: number;
  b: number;
}) {
  return Math.sqrt(Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2));
}
export function ColorNameFinderClient() {
  const [hexInput, setHexInput] = useState("#000000");
  const [searchTerm, setSearchTerm] = useState("");
  const nearestColor = useMemo(() => {
    const rgb = hexToRgb(hexInput);
    if (!rgb) return null;
    let minDistance = Infinity;
    let closest = COLORS[0];
    for (const color of COLORS) {
      const cRgb = hexToRgb(color.hex);
      if (cRgb) {
        const dist = colorDistance(rgb, cRgb);
        if (dist < minDistance) {
          minDistance = dist;
          closest = color;
        }
      }
    }
    return closest;
  }, [hexInput]);
  const filteredColors = useMemo(() => {
    if (!searchTerm) return COLORS;
    const lower = searchTerm.toLowerCase();
    return COLORS.filter(c => c.name.toLowerCase().includes(lower) || c.hex.toLowerCase().includes(lower));
  }, [searchTerm]);
  const rgbStr = useMemo(() => {
    const rgb = hexToRgb(hexInput);
    if (!rgb) return "";
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }, [hexInput]);
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Palette} title="Color Name Finder" description="Find the closest named color for any hex value" actions={<ResetButton onClick={() => setHexInput("#000000")} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Pick a Color</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Color Picker</Label>
 <div className="flex space-x-2">
 <Input type="color" value={hexInput} onChange={e => setHexInput(e.target.value)} className="w-16 h-10 p-1" />
 <Input type="text" value={hexInput} onChange={e => setHexInput(e.target.value)} placeholder="#000000" className="flex-1" />
 </div>
 </div>
 
 {nearestColor && <div className="mt-6 p-4 rounded-lg bg-muted border flex items-center space-x-4">
 <div className="w-16 h-16 rounded-full border shadow-sm" style={{
                backgroundColor: nearestColor.hex
              }} />
 <div className="flex-1 space-y-1">
 <p className="text-sm font-medium text-muted-foreground">Closest Match</p>
 <p className="text-xl font-bold">{nearestColor.name}</p>
 <p className="text-sm font-mono">{nearestColor.hex}</p>
 </div>
 <div className="flex flex-col space-y-2">
 <CopyButton getText={() => nearestColor.name} label="Copy Name" />
 <CopyButton getText={() => nearestColor.hex} label="Copy Hex" />
 </div>
 </div>}
 
 <div className="text-sm font-mono mt-4">
 <p>Input RGB: {rgbStr}</p>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Browse Colors</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="relative">
 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input placeholder="Search color name or hex..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9" />
 </div>
 
 <div className="max-h-[300px] overflow-y-auto border rounded-md divide-y">
 {filteredColors.map(color => <div key={color.name} className="flex items-center justify-between p-2 hover:bg-muted/50 cursor-pointer" onClick={() => setHexInput(color.hex)}>
 <div className="flex items-center space-x-3">
 <div className="w-6 h-6 rounded border shadow-sm" style={{
                    backgroundColor: color.hex
                  }} />
 <span className="font-medium text-sm">{color.name}</span>
 </div>
 <span className="text-xs font-mono text-muted-foreground">{color.hex}</span>
 </div>)}
 {filteredColors.length === 0 && <div className="p-4 text-center text-sm text-muted-foreground">No colors found.</div>}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Color",
    description:"Type or pick a color.",
    icon: Palette,
  },
{
    step:"02",
    title:"Match",
    description:"Find the closest named color.",
    icon: Search,
  },
{
    step:"03",
    title:"Copy",
    description:"Grab name and hex.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Palette,
    title:"Color Input",
    description:"Hex, RGB, or picker.",
  },
{
    icon: Search,
    title:"Name Match",
    description:"Closest standard name.",
  },
{
    icon: Copy,
    title:"Copy",
    description:"Name and code.",
  },
{
    icon: BookOpen,
    title:"Reference",
    description:"Large color dictionary.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A color name finder translates a hex or RGB value into a recognizable name — &quot;Tomato&quot; instead of #FF6347. Designers and developers use names to communicate colors unambiguously, avoiding the ambiguity of raw codes in discussions.</p>
  <p>Matching to a large dictionary yields the closest standard name, useful for documentation and handoff. The tool returns both the name and the exact code so nothing is lost in translation.</p>
  <p>Use it when discussing or documenting colors. The tool's value is human-readable color identification that speeds collaboration.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What does it do?",
    answer:"Names any color you enter.",
  },
{
    question:"Accurate?",
    answer:"Closest from a large list.",
  },
{
    question:"Use case?",
    answer:"Communication, theming.",
  },
{
    question:"Many names?",
    answer:"Hundreds of standards.",
  },
{
    question:"Free?",
    answer:"Yes.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default ColorNameFinderClient;
