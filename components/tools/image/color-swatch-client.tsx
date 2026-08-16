"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Copy, Download, Palette, Pipette, Upload } from"lucide-react";
import { toast } from"react-hot-toast";

type Color = {
 hex: string;
 rgb: string;
 hsl: string;
};

export function ColorSwatchClient() {
 const [imageSrc, setImageSrc] = useState<string | null>(null);
 const [colors, setColors] = useState<Color[]>([]);
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const fileInputRef = useRef<HTMLInputElement>(null);

 const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;
 const reader = new FileReader();
 reader.onload = (event) => {
 setImageSrc(event.target?.result as string);
 extractColors(event.target?.result as string);
 };
 reader.readAsDataURL(file);
 };

 const rgbToHex = (r: number, g: number, b: number) => {
 return"#"+ [r, g, b].map(x => {
 const hex = x.toString(16);
 return hex.length === 1 ?"0"+ hex : hex;
 }).join("");
 };

 const rgbToHsl = (r: number, g: number, b: number) => {
 r /= 255; g /= 255; b /= 255;
 const max = Math.max(r, g, b), min = Math.min(r, g, b);
 let h = 0, s = 0, l = (max + min) / 2;
 if (max !== min) {
 const d = max - min;
 s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
 switch (max) {
 case r: h = (g - b) / d + (g < b ? 6 : 0); break;
 case g: h = (b - r) / d + 2; break;
 case b: h = (r - g) / d + 4; break;
 }
 h /= 6;
 }
 return"hsl("+ Math.round(h * 360) +","+ Math.round(s * 100) +"%,"+ Math.round(l * 100) +"%)";
 };

 const extractColors = (src: string) => {
 const img = new Image();
 img.crossOrigin ="Anonymous";
 img.onload = () => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const ctx = canvas.getContext("2d");
 if (!ctx) return;
 
 canvas.width = img.width;
 canvas.height = img.height;
 ctx.drawImage(img, 0, 0);
 
 const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
 const colorCounts: Record<string, { count: number, rgb: [number, number, number] }> = {};
 
 for (let i = 0; i < imageData.length; i += 4 * 10) { 
 const r = imageData[i];
 const g = imageData[i + 1];
 const b = imageData[i + 2];
 const a = imageData[i + 3];
 if (a < 128) continue;
 
 const rQ = Math.round(r / 32) * 32;
 const gQ = Math.round(g / 32) * 32;
 const bQ = Math.round(b / 32) * 32;
 const key = rQ +","+ gQ +","+ bQ;
 
 if (colorCounts[key]) {
 colorCounts[key].count++;
 } else {
 colorCounts[key] = { count: 1, rgb: [r, g, b] };
 }
 }
 
 const sortedColors = Object.values(colorCounts).sort((a, b) => b.count - a.count).slice(0, 8);
 
 const extracted: Color[] = sortedColors.map(c => {
 const [r, g, b] = c.rgb;
 return {
 hex: rgbToHex(r, g, b),
 rgb:"rgb("+ r +","+ g +","+ b +")",
 hsl: rgbToHsl(r, g, b)
 };
 });
 
 setColors(extracted);
 };
 img.src = src;
 };

 const exportPalette = () => {
 if (colors.length === 0) {
 toast.error("No colors to export");
 return;
 }
 const dataStr ="data:text/json;charset=utf-8,"+ encodeURIComponent(JSON.stringify(colors, null, 2));
 const downloadAnchorNode = document.createElement('a');
 downloadAnchorNode.setAttribute("href", dataStr);
 downloadAnchorNode.setAttribute("download","color_palette.json");
 document.body.appendChild(downloadAnchorNode);
 downloadAnchorNode.click();
 downloadAnchorNode.remove();
 };

 const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard:"+ text);
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Palette}
 title="Image Color Swatch Extractor"
 description="Extract prominent color palettes & swatches from any image."
 actions={
 <>
 <ActionButton onClick={exportPalette} icon={Download} label="Export Palette"/>
 <ResetButton onClick={() => { setImageSrc(null); setColors([]); }} label="Reset"/>
 </>
 }
 />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Image Upload</CardTitle>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center space-y-4">
 <input type="file"ref={fileInputRef} className="hidden"accept="image/*"onChange={handleFileUpload} />
 {!imageSrc ? (
 <div 
 className="w-full h-64 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
 onClick={() => fileInputRef.current?.click()}
 >
 <Upload className="w-10 h-10 text-muted-foreground mb-4"/>
 <p className="text-muted-foreground">Click to upload an image</p>
 </div>
 ) : (
 <img src={imageSrc} alt="Uploaded"className="max-w-full max-h-80 object-contain rounded-md"/>
 )}
 <canvas ref={canvasRef} className="hidden"/>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Extracted Palette</CardTitle>
 </CardHeader>
 <CardContent>
 {colors.length === 0 ? (
 <div className="h-64 flex items-center justify-center text-muted-foreground">
 Upload an image to extract colors
 </div>
 ) : (
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {colors.map((color, idx) => (
 <div key={idx} className="flex flex-col space-y-2">
 <div 
 className="w-full aspect-square rounded-md shadow-sm border border-border cursor-pointer transition-transform hover:scale-105"
 style={{ backgroundColor: color.hex }}
 onClick={() => handleCopy(color.hex)}
 />
 <div className="text-xs space-y-1">
 <div className="flex items-center justify-between font-mono bg-muted p-1 rounded cursor-pointer"onClick={() => handleCopy(color.hex)}>
 {color.hex} <Copy className="w-3 h-3"/>
 </div>
 <div className="flex items-center justify-between font-mono bg-muted p-1 rounded cursor-pointer"onClick={() => handleCopy(color.rgb)}>
 {color.rgb} <Copy className="w-3 h-3"/>
 </div>
 <div className="flex items-center justify-between font-mono bg-muted p-1 rounded cursor-pointer"onClick={() => handleCopy(color.hsl)}>
 {color.hsl} <Copy className="w-3 h-3"/>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Upload",
    description:"Load an image.",
    icon: Upload,
  },
{
    step:"02",
    title:"Extract",
    description:"Pull swatches from pixels.",
    icon: Pipette,
  },
{
    step:"03",
    title:"Use",
    description:"Copy hex codes.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Upload,
    title:"Image Input",
    description:"Photos or graphics.",
  },
{
    icon: Pipette,
    title:"Swatches",
    description:"Grid of extracted colors.",
  },
{
    icon: Copy,
    title:"Copy",
    description:"Hex per swatch.",
  },
{
    icon: Palette,
    title:"Palette",
    description:"Build themes.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An image color swatch extractor presents a clean grid of the dominant colors in a picture, each with its hex code. Where a raw extractor may dump many shades, swatches organize the result into a usable palette you can copy immediately.</p>
  <p>The grid format aids decision-making. You see the whole mood of an image at a glance and grab the specific swatches you need. Copy-ready codes drop into any design tool.</p>
  <p>Use it to derive palettes from inspiration imagery. The tool's value is a tidy, copy-ready color set that turns a photo's feeling into exact values.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Swatch vs extractor?",
    answer:"Swatches are a tidy grid of picks.",
  },
{
    question:"Count?",
    answer:"Several dominant colors.",
  },
{
    question:"Use case?",
    answer:"Quick palettes from art.",
  },
{
    question:"Exact?",
    answer:"Representative averages.",
  },
{
    question:"Free?",
    answer:"Yes.",
  }
  ]}
/>
</div>
 );
}
