"use client";

import { useState, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Palette, Upload, Copy, Download, Image as ImageIcon, Sparkles, Shield, Zap } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type ColorInfo = {
 hex: string;
 rgb: string;
 hsl: string;
};

// Simple color quantization (median cut approach approximation for frontend)
const extractColors = (imageData: ImageData, maxColors: number): ColorInfo[] => {
 const pixels = imageData.data;
 const colorMap = new Map<string, number>();
 
 // Sample pixels to improve performance
 const step = 4 * 10; 
 for (let i = 0; i < pixels.length; i += step) {
 const r = Math.round(pixels[i] / 10) * 10;
 const g = Math.round(pixels[i + 1] / 10) * 10;
 const b = Math.round(pixels[i + 2] / 10) * 10;
 const a = pixels[i + 3];
 
 if (a < 128) continue; // Skip transparent
 
 const rgb = `${r},${g},${b}`;
 colorMap.set(rgb, (colorMap.get(rgb) || 0) + 1);
 }

 // Sort by frequency
 const sorted = Array.from(colorMap.entries()).sort((a, b) => b[1] - a[1]);
 
 const rgbToHex = (r: number, g: number, b: number) => 
"#"+ [r, g, b].map(x => x.toString(16).padStart(2,"0")).join("");
 
 const rgbToHsl = (r: number, g: number, b: number) => {
 r /= 255; g /= 255; b /= 255;
 const l = Math.max(r, g, b);
 const s = l - Math.min(r, g, b);
 const h = s
 ? l === r
 ? (g - b) / s
 : l === g
 ? 2 + (b - r) / s
 : 4 + (r - g) / s
 : 0;
 return `${Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h)}°, ${Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0))}%, ${Math.round((100 * (2 * l - s)) / 2)}%`;
 };

 const results: ColorInfo[] = [];
 // Take top colors ensuring some diversity
 for (const [rgbStr] of sorted) {
 if (results.length >= maxColors) break;
 const [r, g, b] = rgbStr.split(',').map(Number);
 
 // Simple diversity check
 let isTooSimilar = false;
 for (const res of results) {
 const [rr, gg, bb] = res.rgb.replace('rgb(', '').replace(')', '').split(',').map(Number);
 const dist = Math.abs(r-rr) + Math.abs(g-gg) + Math.abs(b-bb);
 if (dist < 60) {
 isTooSimilar = true;
 break;
 }
 }
 
 if (!isTooSimilar || results.length < 2) {
 results.push({
 hex: rgbToHex(r, g, b).toUpperCase(),
 rgb: `rgb(${r}, ${g}, ${b})`,
 hsl: `hsl(${rgbToHsl(r, g, b)})`
 });
 }
 }
 
 // Fill rest if needed
 while(results.length < maxColors && sorted.length > results.length) {
 const [r, g, b] = sorted[results.length][0].split(',').map(Number);
 results.push({
 hex: rgbToHex(r, g, b).toUpperCase(),
 rgb: `rgb(${r}, ${g}, ${b})`,
 hsl: `hsl(${rgbToHsl(r, g, b)})`
 });
 }

 return results;
};

export function PaletteExtractClient() {
 const [imageSrc, setImageSrc] = useState<string | null>(null);
 const [palette, setPalette] = useState<ColorInfo[]>([]);
 const [isProcessing, setIsProcessing] = useState(false);
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const fileInputRef = useRef<HTMLInputElement>(null);

 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;

 const url = URL.createObjectURL(file);
 setImageSrc(url);
 processImage(url);
 };

 const processImage = (url: string) => {
 setIsProcessing(true);
 const img = new Image();
 img.crossOrigin ="Anonymous";
 img.onload = () => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 
 const ctx = canvas.getContext('2d');
 if (!ctx) return;
 
 // Resize for faster processing
 const MAX_SIZE = 400;
 let w = img.width;
 let h = img.height;
 if (w > MAX_SIZE || h > MAX_SIZE) {
 const ratio = Math.min(MAX_SIZE / w, MAX_SIZE / h);
 w *= ratio;
 h *= ratio;
 }
 
 canvas.width = w;
 canvas.height = h;
 ctx.drawImage(img, 0, 0, w, h);
 
 const imageData = ctx.getImageData(0, 0, w, h);
 const extracted = extractColors(imageData, 6);
 setPalette(extracted);
 setIsProcessing(false);
 };
 img.src = url;
 };

 const copyToClipboard = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success(`Copied ${text}`);
 };

 const getFullPaletteText = () => {
 return palette.map(p => `${p.hex} | ${p.rgb} | ${p.hsl}`).join('\n');
 };

 const resetAll = () => {
 setImageSrc(null);
 setPalette([]);
 if (fileInputRef.current) fileInputRef.current.value = '';
 };

 const downloadPalette = () => {
 if (palette.length === 0) return;
 
 const canvas = document.createElement('canvas');
 canvas.width = palette.length * 100;
 canvas.height = 150;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;
 
 palette.forEach((color, i) => {
 ctx.fillStyle = color.hex;
 ctx.fillRect(i * 100, 0, 100, 100);
 
 ctx.fillStyle ="#ffffff";
 ctx.fillRect(i * 100, 100, 100, 50);
 
 ctx.fillStyle ="#000000";
 ctx.font ="14px sans-serif";
 ctx.textAlign ="center";
 ctx.fillText(color.hex, i * 100 + 50, 130);
 });
 
 const link = document.createElement('a');
 link.download = 'palette.png';
 link.href = canvas.toDataURL('image/png');
 link.click();
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader 
 icon={Palette} 
 title="Color Palette from Image"
 description="Upload an image to extract its dominant colors instantly."
 actions={
 <>
 <input 
 type="file"
 accept="image/*"
 className="hidden"
 ref={fileInputRef} 
 onChange={handleImageUpload}
 />
 <ActionButton 
 icon={Upload} 
 label="Upload Image"
 onClick={() => fileInputRef.current?.click()} 
 variant="default"
 />
 {palette.length > 0 && (
 <>
 <ActionButton icon={Download} label="Download Swatches"onClick={downloadPalette} variant="outline"/>
 <CopyButton getText={getFullPaletteText} label="Copy All"/>
 </>
 )}
 <ResetButton onClick={resetAll} label="Reset"/>
 </>
 }
 />

 {/* Hidden canvas for processing */}
 <canvas ref={canvasRef} className="hidden"/>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <ImageIcon className="w-5 h-5"/> Image
 </CardTitle>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
 {imageSrc ? (
 <img src={imageSrc} alt="Uploaded"className="max-w-full max-h-[400px] rounded-lg object-contain"/>
 ) : (
 <div 
 className="w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-secondary/50 transition-colors"
 onClick={() => fileInputRef.current?.click()}
 >
 <Upload className="w-12 h-12 mb-4 opacity-50"/>
 <p>Click to upload an image</p>
 <p className="text-sm opacity-70">JPG, PNG, WebP supported</p>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Palette className="w-5 h-5"/> Extracted Palette
 </CardTitle>
 </CardHeader>
 <CardContent>
 {isProcessing ? (
 <div className="flex justify-center items-center h-64">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
 </div>
 ) : palette.length > 0 ? (
 <div className="grid gap-4">
 {palette.map((color, i) => (
 <div key={i} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg border hover:border-primary/50 transition-colors group">
 <div 
 className="w-16 h-16 rounded-md shadow-sm border border-border/50 shrink-0 cursor-pointer"
 style={{ backgroundColor: color.hex }}
 onClick={() => copyToClipboard(color.hex)}
 title="Click to copy Hex"
 />
 <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm font-mono">
 <div 
 className="cursor-pointer hover:text-primary transition-colors"
 onClick={() => copyToClipboard(color.hex)}
 >
 {color.hex}
 </div>
 <div 
 className="cursor-pointer hover:text-primary transition-colors"
 onClick={() => copyToClipboard(color.rgb)}
 >
 {color.rgb}
 </div>
 <div 
 className="cursor-pointer hover:text-primary transition-colors text-xs flex items-center"
 onClick={() => copyToClipboard(color.hsl)}
 >
 {color.hsl}
 </div>
 </div>
 <Button 
 variant="ghost"
 size="icon"
 className="opacity-0 group-hover:opacity-100 transition-opacity"
 onClick={() => copyToClipboard(color.hex)}
 >
 <Copy className="w-4 h-4"/>
 </Button>
 </div>
 ))}
 </div>
 ) : (
 <div className="flex flex-col items-center justify-center h-64 text-muted-foreground text-center">
 <Palette className="w-12 h-12 mb-4 opacity-20"/>
 <p>Upload an image to see its colors here</p>
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Color Palette from Image?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Color Palette from Image provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/image/palette-extract" max={6} />

</div>
 );
}
