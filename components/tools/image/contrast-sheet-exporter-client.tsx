"use client";

import React, { useState, useMemo, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Palette, Download, Copy, RefreshCw, Plus, X } from"lucide-react";
import { toast } from"react-hot-toast";

type BrandColor = {
 id: string;
 name: string;
 hex: string;
};

export function ContrastSheetExporterClient() {
 const [colors, setColors] = useState<BrandColor[]>([
 { id:"1", name:"Primary", hex:"#3b82f6"},
 { id:"2", name:"Background", hex:"#ffffff"},
 { id:"3", name:"Text", hex:"#1f2937"},
 ]);

 const addColor = () => {
 if (colors.length >= 8) {
 toast.error("Maximum 8 colors allowed.");
 return;
 }
 setColors([...colors, { id: Date.now().toString(), name:"New Color", hex:"#000000"}]);
 };

 const removeColor = (id: string) => {
 if (colors.length <= 3) {
 toast.error("Minimum 3 colors required.");
 return;
 }
 setColors(colors.filter(c => c.id !== id));
 };

 const updateColor = (id: string, field:"name"|"hex", value: string) => {
 setColors(colors.map(c => c.id === id ? { ...c, [field]: value } : c));
 };

 // Contrast calculation helpers
 const getLuminance = (r: number, g: number, b: number) => {
 const a = [r, g, b].map(function (v) {
 v /= 255;
 return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
 });
 return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
 };

 const hexToRgb = (hex: string) => {
 const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
 hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
 const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
 return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
 };

 const getContrastRatio = (hex1: string, hex2: string) => {
 const rgb1 = hexToRgb(hex1);
 const rgb2 = hexToRgb(hex2);
 const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
 const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
 const brightest = Math.max(lum1, lum2);
 const darkest = Math.min(lum1, lum2);
 return (brightest + 0.05) / (darkest + 0.05);
 };

 const complianceBadge = (ratio: number) => {
 if (ratio >= 7) return <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">AAA</span>;
 if (ratio >= 4.5) return <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">AA</span>;
 if (ratio >= 3) return <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">UI</span>;
 return <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">FAIL</span>;
 };

 const exportJSON = () => {
 const data = colors.map(c => ({
 name: c.name,
 hex: c.hex,
 contrasts: colors.filter(c2 => c2.id !== c.id).map(c2 => ({
 with: c2.name,
 ratio: getContrastRatio(c.hex, c2.hex).toFixed(2)
 }))
 }));
 const blob = new Blob([JSON.stringify(data, null, 2)], { type:"application/json"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="contrast-sheet.json";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 toast.success("Exported JSON");
 };

 const getCssVariables = () => {
 let css =":root {\n";
 colors.forEach(c => {
 const name = c.name.toLowerCase().replace(/\s+/g,"-");
 css +="--color-"+ name +":"+ c.hex +";\n";
 });
 css +="}\n";
 return css;
 };

 const exportSVG = () => {
 const svgContent = document.getElementById("contrast-grid-svg")?.outerHTML;
 if (svgContent) {
 const blob = new Blob([svgContent], { type:"image/svg+xml"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="contrast-sheet.svg";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 toast.success("Exported SVG");
 } else {
 toast.error("Could not generate SVG.");
 }
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Palette}
 title="Color Palette Contrast Sheet Exporter"
 description="Generate WCAG 2.1 contrast matrices for your brand colors."
 actions={
 <>
 <ActionButton onClick={exportJSON} icon={Download} label="Export JSON"/>
 <ActionButton onClick={exportSVG} icon={Download} label="Export SVG"/>
 <CopyButton getText={getCssVariables} label="Copy CSS Vars"/>
 <ResetButton onClick={() => setColors([{ id:"1", name:"Primary", hex:"#3b82f6"}, { id:"2", name:"Background", hex:"#ffffff"}, { id:"3", name:"Text", hex:"#1f2937"}])} label="Reset"/>
 </>
 }
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Brand Colors ({colors.length}/8)</CardTitle>
 <CardDescription>Add up to 8 colors to generate the contrast matrix.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
 {colors.map((color) => (
 <div key={color.id} className="p-3 border rounded-lg space-y-3 bg-card relative group">
 <button onClick={() => removeColor(color.id)} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
 <X className="w-3 h-3"/>
 </button>
 <div className="flex items-center gap-2">
 <Input type="color"value={color.hex} onChange={(e) => updateColor(color.id,"hex", e.target.value)} className="w-10 h-10 p-1 border-0 cursor-pointer"/>
 <Input value={color.hex} onChange={(e) => updateColor(color.id,"hex", e.target.value)} className="font-mono text-sm uppercase"/>
 </div>
 <Input value={color.name} onChange={(e) => updateColor(color.id,"name", e.target.value)} placeholder="Color Name"/>
 </div>
 ))}
 {colors.length < 8 && (
 <Button variant="outline"className="h-full min-h-[100px] border-dashed"onClick={addColor}>
 <Plus className="w-6 h-6 text-muted-foreground"/>
 </Button>
 )}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Contrast Matrix</CardTitle>
 </CardHeader>
 <CardContent className="overflow-x-auto">
 <table className="w-full text-sm border-collapse min-w-[600px]">
 <thead>
 <tr>
 <th className="p-2 border text-left bg-muted/50 w-32">Background \ Text</th>
 {colors.map(c => (
 <th key={c.id} className="p-2 border bg-muted/50 text-center">
 <div className="flex flex-col items-center gap-1">
 <div className="w-6 h-6 rounded-full border shadow-sm"style={{ backgroundColor: c.hex }} />
 <span className="truncate w-16"title={c.name}>{c.name}</span>
 </div>
 </th>
 ))}
 </tr>
 </thead>
 <tbody>
 {colors.map(bg => (
 <tr key={bg.id}>
 <th className="p-2 border text-left bg-muted/50">
 <div className="flex items-center gap-2">
 <div className="w-6 h-6 rounded-full border shadow-sm shrink-0"style={{ backgroundColor: bg.hex }} />
 <span className="truncate"title={bg.name}>{bg.name}</span>
 </div>
 </th>
 {colors.map(fg => {
 const ratio = getContrastRatio(bg.hex, fg.hex);
 const isSame = bg.id === fg.id;
 return (
 <td key={fg.id} className="p-2 border text-center relative h-16">
 {!isSame ? (
 <div className="flex flex-col items-center justify-center h-full w-full absolute inset-0 rounded-sm"style={{ backgroundColor: bg.hex, color: fg.hex }}>
 <span className="font-bold text-lg">{ratio.toFixed(2)}</span>
 <div className="mt-1 scale-90">{complianceBadge(ratio)}</div>
 </div>
 ) : (
 <div className="text-muted-foreground opacity-50">-</div>
 )}
 </td>
 )
 })}
 </tr>
 ))}
 </tbody>
 </table>

 {/* Hidden SVG for export */}
 <div style={{ display:"none"}}>
 <svg id="contrast-grid-svg"xmlns="http://www.w3.org/2000/svg"width={150 + colors.length * 100} height={50 + colors.length * 100} viewBox={"0 0"+ (150 + colors.length * 100) +""+ (50 + colors.length * 100)}>
 <style>
 {"text { font-family: sans-serif; font-size: 14px; } .header { font-weight: bold; }"}
 </style>
 <rect width="100%"height="100%"fill="#ffffff"/>
 {/* Headers */}
 {colors.map((c, i) => (
 <g key={"h"+ i}>
 <rect x={150 + i * 100} y={10} width="80"height="30"fill={c.hex} stroke="#ddd"rx="4"/>
 <text x={150 + i * 100 + 40} y={30} textAnchor="middle"className="header"fill={getContrastRatio(c.hex,"#ffffff") > 2 ?"#ffffff":"#000000"}>{c.name}</text>
 </g>
 ))}
 {/* Rows */}
 {colors.map((bg, row) => (
 <g key={"r"+ row}>
 <rect x={10} y={50 + row * 100} width="130"height="80"fill={bg.hex} stroke="#ddd"rx="4"/>
 <text x={75} y={50 + row * 100 + 45} textAnchor="middle"className="header"fill={getContrastRatio(bg.hex,"#ffffff") > 2 ?"#ffffff":"#000000"}>{bg.name}</text>
 
 {colors.map((fg, col) => {
 const ratio = getContrastRatio(bg.hex, fg.hex);
 return row !== col ? (
 <g key={"c"+ col}>
 <rect x={150 + col * 100} y={50 + row * 100} width="80"height="80"fill={bg.hex} stroke="#ddd"rx="4"/>
 <text x={150 + col * 100 + 40} y={50 + row * 100 + 40} textAnchor="middle"fill={fg.hex} style={{ fontSize:"18px", fontWeight:"bold"}}>{ratio.toFixed(2)}</text>
 <text x={150 + col * 100 + 40} y={50 + row * 100 + 65} textAnchor="middle"fill={fg.hex}>{ratio >= 7 ?"AAA": ratio >= 4.5 ?"AA": ratio >= 3 ?"UI":"FAIL"}</text>
 </g>
 ) : null;
 })}
 </g>
 ))}
 </svg>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 );
}
