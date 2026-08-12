"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { CheckCircle, Palette, Download, XCircle } from"lucide-react";
import { ActionButton, CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";

type ColorConfig = {
 name: string;
 hex: string;
};

// Contrast calculation utilities
const getLuminance = (r: number, g: number, b: number) => {
 const a = [r, g, b].map(function (v) {
 v /= 255;
 return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
 });
 return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const hexToRgb = (hex: string) => {
 let c = hex.substring(1).split('');
 if (c.length === 3) {
 c = [c[0], c[0], c[1], c[1], c[2], c[2]];
 }
 const x = parseInt(c.join(''), 16);
 return [(x >> 16) & 255, (x >> 8) & 255, x & 255];
};

const calculateContrast = (hex1: string, hex2: string) => {
 try {
 const rgb1 = hexToRgb(hex1);
 const rgb2 = hexToRgb(hex2);
 const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
 const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
 const brightest = Math.max(lum1, lum2);
 const darkest = Math.min(lum1, lum2);
 return (brightest + 0.05) / (darkest + 0.05);
 } catch (e) {
 return 1;
 }
};

export function ContrastComplianceSheetClient() {
 const [colors, setColors] = useState<ColorConfig[]>([
 { name:"Primary", hex:"#000000"},
 { name:"Secondary", hex:"#64748b"},
 { name:"Background", hex:"#ffffff"},
 { name:"Surface", hex:"#f8fafc"},
 ]);

 const updateColor = (index: number, field: keyof ColorConfig, value: string) => {
 const newColors = [...colors];
 newColors[index] = { ...newColors[index], [field]: value };
 setColors(newColors);
 };

 const getCompliance = (ratio: number) => {
 return {
 normalAA: ratio >= 4.5,
 normalAAA: ratio >= 7.0,
 largeAA: ratio >= 3.0,
 largeAAA: ratio >= 4.5,
 ui: ratio >= 3.0,
 };
 };

 const generateMarkdown = () => {
 let md ="# Color Contrast Compliance Matrix\n\n";
 md +="| Background \\ Text |"+ colors.map(c => c.name).join("|") +"|\n";
 md +="|"+"---|".repeat(colors.length + 1) +"\n";
 
 colors.forEach(bg => {
 let row ="| **"+ bg.name +"** |";
 colors.forEach(fg => {
 if (bg.hex === fg.hex) {
 row +="- |";
 } else {
 const ratio = calculateContrast(bg.hex, fg.hex).toFixed(2);
 const comp = getCompliance(parseFloat(ratio));
 row +=""+ ratio +":1 ("+ (comp.normalAA ?"AA":"Fail") +") |";
 }
 });
 md += row +"\n";
 });
 return md;
 };

 const downloadMarkdown = () => {
 const md = generateMarkdown();
 const blob = new Blob([md], { type:"text/markdown"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="contrast-matrix.md";
 a.click();
 URL.revokeObjectURL(url);
 toast.success("Downloaded report");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Palette}
 title="Color Contrast Ratio Compliance Sheet"
 description="Design system WCAG accessibility contrast compliance test sheet. Generate matrices for your palette."
 actions={
 <>
 <ActionButton onClick={downloadMarkdown} icon={Download} label="Download Report"/>
 <CopyButton getText={generateMarkdown} label="Copy Matrix"/>
 </>
 }
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Palette Configuration</CardTitle>
 <CardDescription>Set up the colors to test against each other</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 {colors.map((c, i) => (
 <div key={i} className="space-y-3 p-4 bg-muted/30 rounded-lg border">
 <div className="space-y-1">
 <Label>Name</Label>
 <Input value={c.name} onChange={e => updateColor(i,"name", e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label>Hex Color</Label>
 <div className="flex gap-2">
 <Input 
 type="color"
 value={c.hex} 
 onChange={e => updateColor(i,"hex", e.target.value)} 
 className="w-12 p-1 h-10"
 />
 <Input 
 value={c.hex} 
 onChange={e => updateColor(i,"hex", e.target.value)} 
 className="flex-1 font-mono uppercase"
 />
 </div>
 </div>
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Contrast Matrix</CardTitle>
 <CardDescription>Cross-reference all colors. Ratios need to be 4.5:1 for normal text (AA).</CardDescription>
 </CardHeader>
 <CardContent className="overflow-x-auto">
 <div className="min-w-[800px]">
 <table className="w-full border-collapse text-sm text-left">
 <thead>
 <tr>
 <th className="p-3 border-b-2 bg-muted/50">Bg \\ Text</th>
 {colors.map((c, i) => (
 <th key={i} className="p-3 border-b-2 bg-muted/50">
 <div className="flex items-center gap-2">
 <div className="w-4 h-4 rounded-full border"style={{backgroundColor: c.hex}}></div>
 {c.name}
 </div>
 </th>
 ))}
 </tr>
 </thead>
 <tbody>
 {colors.map((bg, i) => (
 <tr key={i} className="border-b">
 <th className="p-3 bg-muted/20">
 <div className="flex items-center gap-2">
 <div className="w-4 h-4 rounded-full border"style={{backgroundColor: bg.hex}}></div>
 {bg.name}
 </div>
 </th>
 {colors.map((fg, j) => {
 if (i === j) return <td key={j} className="p-3 bg-muted/10 text-muted-foreground">-</td>;
 const ratio = calculateContrast(bg.hex, fg.hex);
 const comp = getCompliance(ratio);
 return (
 <td key={j} className="p-3">
 <div className="flex items-center gap-2">
 <div 
 className="w-8 h-8 rounded border flex items-center justify-center font-bold font-serif text-lg leading-none pt-1"
 style={{backgroundColor: bg.hex, color: fg.hex}}
 >
 A
 </div>
 <div>
 <div className="font-mono font-semibold">{ratio.toFixed(2)}:1</div>
 <div className={"text-xs flex items-center gap-1"+ (comp.normalAA ?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400")}>
 {comp.normalAA ? <CheckCircle className="w-3 h-3"/> : <XCircle className="w-3 h-3"/>}
 {comp.normalAA ?"AA Pass":"AA Fail"}
 </div>
 </div>
 </div>
 </td>
 );
 })}
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 );
}
