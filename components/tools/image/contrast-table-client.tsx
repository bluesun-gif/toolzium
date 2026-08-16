"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Calculator, CheckCircle, Palette, Plus, ShieldCheck, Table, Trash2, XCircle } from"lucide-react";
import { toast } from"react-hot-toast";

interface ColorItem {
 id: string;
 hex: string;
 name: string;
}

export function ContrastTableClient() {
 const [colors, setColors] = useState<ColorItem[]>([
 { id:"1", hex:"#FFFFFF", name:"White"},
 { id:"2", hex:"#000000", name:"Black"},
 { id:"3", hex:"#2563EB", name:"Blue 600"}
 ]);

 const hexToRgb = (hex: string) => {
 let h = hex.replace("#","");
 if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
 const num = parseInt(h, 16);
 return [num >> 16, (num >> 8) & 255, num & 255];
 };

 const getLuminance = (r: number, g: number, b: number) => {
 const a = [r, g, b].map(v => {
 v /= 255;
 return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
 });
 return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
 };

 const getContrastRatio = (hex1: string, hex2: string) => {
 try {
 const rgb1 = hexToRgb(hex1);
 const rgb2 = hexToRgb(hex2);
 const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
 const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
 const brightest = Math.max(lum1, lum2);
 const darkest = Math.min(lum1, lum2);
 return (brightest + 0.05) / (darkest + 0.05);
 } catch {
 return 1;
 }
 };

 const getWcagLevel = (ratio: number) => {
 if (ratio >= 7) return"AAA";
 if (ratio >= 4.5) return"AA";
 if (ratio >= 3) return"AA Large";
 return"Fail";
 };

 const addColor = () => {
 if (colors.length >= 6) {
 toast.error("Maximum 6 colors allowed");
 return;
 }
 setColors([...colors, { id: Date.now().toString(), hex:"#808080", name:"New Color"}]);
 };

 const removeColor = (id: string) => {
 if (colors.length <= 2) {
 toast.error("Minimum 2 colors required");
 return;
 }
 setColors(colors.filter(c => c.id !== id));
 };

 const updateColor = (id: string, field:"hex"|"name", value: string) => {
 setColors(colors.map(c => c.id === id ? { ...c, [field]: value } : c));
 };

 const generateReportData = () => {
 const table: any[] = [];
 colors.forEach(bg => {
 const row: any = { Background: bg.name +"("+ bg.hex +")"};
 colors.forEach(fg => {
 if (fg.id === bg.id) {
 row[fg.name] ="-";
 } else {
 const ratio = getContrastRatio(fg.hex, bg.hex);
 row[fg.name] = ratio.toFixed(2) +":1 ("+ getWcagLevel(ratio) +")";
 }
 });
 table.push(row);
 });
 return table;
 };

 const copyJson = () => {
 return JSON.stringify(generateReportData(), null, 2);
 };

 const copyMarkdown = () => {
 let md ="| Background / Text |"+ colors.map(c => c.name).join("|") +"|\n";
 md +="|---|"+ colors.map(() =>"---|").join("") +"\n";
 colors.forEach(bg => {
 md +="| **"+ bg.name +"** |";
 const cols = colors.map(fg => {
 if (fg.id === bg.id) return"-";
 const ratio = getContrastRatio(fg.hex, bg.hex);
 return ratio.toFixed(2) +"("+ getWcagLevel(ratio) +")";
 });
 md += cols.join("|") +"|\n";
 });
 return md;
 };

 const resetData = () => {
 setColors([
 { id:"1", hex:"#FFFFFF", name:"White"},
 { id:"2", hex:"#000000", name:"Black"}
 ]);
 };

 return (
 <div className={"space-y-6"}>
 <ToolPageHeader
 title="Color Contrast Ratio Compliance Table"
 description="Generate WCAG 2.1 accessibility contrast comparison tables for design systems."
 icon={Table}
 actions={
 <>
 <CopyButton getText={copyJson} label="Copy JSON"/>
 <CopyButton getText={copyMarkdown} label="Copy MD"/>
 <ResetButton onClick={resetData} label="Reset"/>
 </>
 }
 />

 <GlassCard>
 <CardHeader className={"flex flex-row items-center justify-between"}>
 <CardTitle>Color Palette ({colors.length}/6)</CardTitle>
 <Button variant="outline"size="sm"onClick={addColor} disabled={colors.length >= 6}>
 <Plus className={"w-4 h-4 mr-2"} /> Add Color
 </Button>
 </CardHeader>
 <CardContent>
 <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
 {colors.map(color => (
 <div key={color.id} className={"flex items-center gap-2 p-2 border rounded-lg"}>
 <input
 type="color"
 value={color.hex}
 onChange={(e) => updateColor(color.id,"hex", e.target.value)}
 className={"w-10 h-10 p-0 border-0 rounded cursor-pointer"}
 />
 <div className={"flex-1 space-y-1"}>
 <Input 
 value={color.name} 
 onChange={(e) => updateColor(color.id,"name", e.target.value)}
 className={"h-7 text-sm"}
 placeholder="Color Name"
 />
 <Input 
 value={color.hex} 
 onChange={(e) => updateColor(color.id,"hex", e.target.value)}
 className={"h-7 text-sm font-mono"}
 placeholder="#FFFFFF"
 />
 </div>
 <Button variant="ghost"size="icon"className={"text-destructive"} onClick={() => removeColor(color.id)}>
 <Trash2 className={"w-4 h-4"} />
 </Button>
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Contrast Matrix (Text on Background)</CardTitle>
 </CardHeader>
 <CardContent className={"overflow-x-auto"}>
 <table className={"w-full text-sm border-collapse"}>
 <thead>
 <tr>
 <th className={"p-3 border bg-secondary/20 text-left"}>Bg \\ Text</th>
 {colors.map(c => (
 <th key={c.id} className={"p-3 border bg-secondary/20 min-w-[120px]"}>
 <div className={"flex items-center gap-2"}>
 <div className={"w-4 h-4 rounded-full border"} style={{ backgroundColor: c.hex }}></div>
 {c.name}
 </div>
 </th>
 ))}
 </tr>
 </thead>
 <tbody>
 {colors.map(bg => (
 <tr key={bg.id}>
 <th className={"p-3 border bg-secondary/20 text-left font-medium"}>
 <div className={"flex items-center gap-2"}>
 <div className={"w-4 h-4 rounded-full border"} style={{ backgroundColor: bg.hex }}></div>
 {bg.name}
 </div>
 </th>
 {colors.map(fg => {
 if (bg.id === fg.id) {
 return <td key={fg.id} className={"p-3 border text-center text-muted-foreground bg-secondary/5"}>-</td>;
 }
 const ratio = getContrastRatio(fg.hex, bg.hex);
 const level = getWcagLevel(ratio);
 const isPass = level !=="Fail";
 
 return (
 <td key={fg.id} className={"p-0 border"}>
 <div 
 className={"h-full w-full flex flex-col items-center justify-center p-3 min-h-[80px] transition-colors"}
 style={{ backgroundColor: bg.hex, color: fg.hex }}
 >
 <span className={"text-lg font-bold"}>{ratio.toFixed(2)}</span>
 <div className={"flex items-center gap-1 text-xs mt-1 bg-background/80 text-foreground px-2 py-0.5 rounded-full"}>
 {isPass ? <CheckCircle className={"w-3 h-3 text-green-500"} /> : <XCircle className={"w-3 h-3 text-destructive"} />}
 <span className={isPass ?"font-semibold":"text-destructive"}>{level}</span>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Colors",
    description:"Add foreground and background.",
    icon: Palette,
  },
{
    step:"02",
    title:"Compute",
    description:"See the ratio and level.",
    icon: Calculator,
  },
{
    step:"03",
    title:"Tabulate",
    description:"Build a compliance table.",
    icon: Table,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Palette,
    title:"Color Pair",
    description:"Text and background.",
  },
{
    icon: Calculator,
    title:"Ratio",
    description:"Precise number.",
  },
{
    icon: Table,
    title:"Table",
    description:"Multiple pairs listed.",
  },
{
    icon: ShieldCheck,
    title:"WCAG",
    description:"AA and AAA.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A contrast compliance table lists multiple color pairs with their ratios and WCAG levels in one place, faster than checking each separately. Designers comparing several text-background options benefit from the side-by-side view. This tool builds that table.</p>
  <p>Listing pairs reveals patterns — perhaps all dark-on-light pass while light-on-light fail. The table makes the structure of your accessibility clear at a glance.</p>
  <p>Use it to audit several combinations efficiently. The tool's value is batch contrast evaluation in a readable table.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Table vs checker?",
    answer:"Lists many pairs at once.",
  },
{
    question:"WCAG?",
    answer:"Reports levels.",
  },
{
    question:"Use case?",
    answer:"Audit several combos.",
  },
{
    question:"Export?",
    answer:"Visible table.",
  },
{
    question:"Free?",
    answer:"Yes.",
  }
  ]}
/>
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
