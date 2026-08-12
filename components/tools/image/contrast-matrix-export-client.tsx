"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { Grid, Palette, Download, Plus, Trash2 } from"lucide-react";
import { ActionButton, CopyButton } from"@/components/shared/action-buttons";
import { toast } from"react-hot-toast";

type ColorEntry = { id: string, name: string, hex: string };

// Utility to calculate contrast ratio
const getLuminance = (hex: string) => {
 const rgb = hex.replace(/^#/,"").match(/.{2}/g);
 if (!rgb) return 0;
 const [r, g, b] = rgb.map(v => {
 let c = parseInt(v, 16) / 255;
 return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
 });
 return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const getContrastRatio = (color1: string, color2: string) => {
 const l1 = getLuminance(color1);
 const l2 = getLuminance(color2);
 const lightest = Math.max(l1, l2);
 const darkest = Math.min(l1, l2);
 return (lightest + 0.05) / (darkest + 0.05);
};

const getRating = (ratio: number) => {
 if (ratio >= 7) return"AAA";
 if (ratio >= 4.5) return"AA";
 if (ratio >= 3) return"AA Large";
 return"Fail";
};

export function ContrastMatrixExportClient() {
 const [colors, setColors] = useState<ColorEntry[]>([
 { id:"1", name:"Primary", hex:"#0f172a"},
 { id:"2", name:"Secondary", hex:"#3b82f6"},
 { id:"3", name:"Background", hex:"#f8fafc"},
 { id:"4", name:"Text", hex:"#334155"},
 ]);

 const addColor = () => {
 if (colors.length >= 8) {
 toast.error("Maximum 8 colors supported for readability.");
 return;
 }
 setColors([...colors, { id: Date.now().toString(), name:"New Color", hex:"#000000"}]);
 };

 const removeColor = (id: string) => {
 if (colors.length <= 2) {
 toast.error("Minimum 2 colors required.");
 return;
 }
 setColors(colors.filter(c => c.id !== id));
 };

 const updateColor = (id: string, field: keyof ColorEntry, value: string) => {
 setColors(colors.map(c => c.id === id ? { ...c, [field]: value } : c));
 };

 const generateCSSVariables = () => {
 let css =":root {\n";
 colors.forEach(c => {
 const varName = c.name.toLowerCase().replace(/[^a-z0-9]/g,"-");
 css +="--color-"+ varName +":"+ c.hex +";\n";
 });
 css +="}";
 return css;
 };

 const exportSVG = () => {
 const cellSize = 100;
 const padding = 50;
 const width = colors.length * cellSize + padding * 2 + 100;
 const height = colors.length * cellSize + padding * 2 + 100;
 
 let svg ="<svg xmlns='http://www.w3.org/2000/svg' width='"+ width +"' height='"+ height +"' style='font-family:sans-serif;'>";
 svg +="<rect width='100%' height='100%' fill='#ffffff' />";
 
 // Draw Headers
 colors.forEach((c, i) => {
 svg +="<text x='"+ (padding + 100 + i * cellSize + cellSize/2) +"' y='"+ (padding + 80) +"' text-anchor='middle' font-weight='bold'>"+ c.name +"</text>";
 svg +="<text x='"+ (padding + 80) +"' y='"+ (padding + 100 + i * cellSize + cellSize/2) +"' text-anchor='end' alignment-baseline='middle' font-weight='bold'>"+ c.name +"</text>";
 });

 // Draw Matrix
 colors.forEach((bg, r) => {
 colors.forEach((fg, c) => {
 const x = padding + 100 + c * cellSize;
 const y = padding + 100 + r * cellSize;
 const ratio = getContrastRatio(fg.hex, bg.hex);
 const rating = getRating(ratio);
 
 svg +="<rect x='"+ x +"' y='"+ y +"' width='"+ cellSize +"' height='"+ cellSize +"' fill='"+ bg.hex +"' stroke='#e2e8f0' />";
 svg +="<text x='"+ (x + cellSize/2) +"' y='"+ (y + cellSize/2 - 10) +"' text-anchor='middle' fill='"+ fg.hex +"' font-size='20px' font-weight='bold'>Text</text>";
 svg +="<text x='"+ (x + cellSize/2) +"' y='"+ (y + cellSize/2 + 15) +"' text-anchor='middle' fill='"+ fg.hex +"' font-size='12px'>"+ ratio.toFixed(2) +":1</text>";
 svg +="<text x='"+ (x + cellSize/2) +"' y='"+ (y + cellSize/2 + 30) +"' text-anchor='middle' fill='"+ fg.hex +"' font-size='10px'>"+ rating +"</text>";
 });
 });

 svg +="</svg>";
 
 const blob = new Blob([svg], { type:"image/svg+xml"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="contrast_matrix.svg";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 toast.success("SVG Exported!");
 };

 return (
 <div className={"space-y-6"}>
 <ToolPageHeader 
 icon={Grid}
 title="Color Contrast Matrix"
 description="Check accessibility contrast ratios across your entire color palette."
 actions={
 <>
 <CopyButton getText={generateCSSVariables} label="Copy CSS"/>
 <ActionButton icon={Download} label="Export SVG"onClick={exportSVG} />
 </>
 }
 />

 <GlassCard>
 <CardHeader>
 <CardTitle className={"flex items-center gap-2"}><Palette className={"w-5 h-5"} /> Color Palette</CardTitle>
 </CardHeader>
 <CardContent>
 <div className={"grid gap-4 md:grid-cols-2 lg:grid-cols-4"}>
 {colors.map(color => (
 <div key={color.id} className={"flex items-center gap-2 p-2 border rounded-md"}>
 <div 
 className={"w-10 h-10 rounded shadow-sm border shrink-0"}
 style={{ backgroundColor: color.hex }}
 />
 <div className={"flex-1 space-y-1"}>
 <Input 
 value={color.name} 
 onChange={e => updateColor(color.id,"name", e.target.value)}
 className={"h-7 text-xs px-2"}
 />
 <Input 
 type="color"
 value={color.hex} 
 onChange={e => updateColor(color.id,"hex", e.target.value)}
 className={"h-7 text-xs p-0 px-1 w-full"}
 />
 </div>
 <Button variant="ghost"size="icon"className={"text-destructive"} onClick={() => removeColor(color.id)}>
 <Trash2 className={"w-4 h-4"} />
 </Button>
 </div>
 ))}
 {colors.length < 8 && (
 <Button variant="outline"className={"h-auto min-h-[4rem] border-dashed"} onClick={addColor}>
 <Plus className={"w-4 h-4 mr-2"} /> Add Color
 </Button>
 )}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Contrast Matrix</CardTitle>
 </CardHeader>
 <CardContent className={"overflow-x-auto"}>
 <table className={"w-full border-collapse min-w-[600px]"}>
 <thead>
 <tr>
 <th className={"p-2 border text-left bg-muted/50 w-32"}>Bg \ Text</th>
 {colors.map(c => (
 <th key={"th-"+ c.id} className={"p-2 border text-center font-medium bg-muted/50"}>{c.name}</th>
 ))}
 </tr>
 </thead>
 <tbody>
 {colors.map(bg => (
 <tr key={"tr-"+ bg.id}>
 <th className={"p-2 border text-left font-medium bg-muted/50"}>{bg.name}</th>
 {colors.map(fg => {
 const ratio = getContrastRatio(fg.hex, bg.hex);
 const rating = getRating(ratio);
 return (
 <td key={"td-"+ bg.id +"-"+ fg.id} className={"border p-0"}>
 <div 
 className={"flex flex-col items-center justify-center p-4 min-h-[100px] transition-colors hover:opacity-90"}
 style={{ backgroundColor: bg.hex, color: fg.hex }}
 >
 <span className={"font-bold text-lg mb-1"}>Aa</span>
 <span className={"text-sm"}>{ratio.toFixed(2)}:1</span>
 <span className={"text-xs font-semibold px-2 py-0.5 rounded-full mt-1 bg-background/20 mix-blend-difference"}>
 {rating}
 </span>
 </div>
 </td>
 );
 })}
 </tr>
 ))}
 </tbody>
 </table>
 </CardContent>
 </GlassCard>
 </div>
 );
}
