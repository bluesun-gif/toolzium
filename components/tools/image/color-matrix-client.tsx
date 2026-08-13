"use client";

import React, { useState } from"react";
import { Grid, Palette, CheckCircle, Copy, Plus, Trash2, CheckCircle2, AlertTriangle, XCircle, Sparkles, Shield, Zap } from"lucide-react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

function hexToRgb(hex: string) {
 const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
 return result ? {
 r: parseInt(result[1], 16),
 g: parseInt(result[2], 16),
 b: parseInt(result[3], 16)
 } : { r: 0, g: 0, b: 0 };
}

function getLuminance(hex: string) {
 let { r, g, b } = hexToRgb(hex);
 let [rs, gs, bs] = [r / 255, g / 255, b / 255];
 
 rs = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
 gs = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
 bs = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
 
 return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1: string, hex2: string) {
 const lum1 = getLuminance(hex1);
 const lum2 = getLuminance(hex2);
 const brightest = Math.max(lum1, lum2);
 const darkest = Math.min(lum1, lum2);
 return (brightest + 0.05) / (darkest + 0.05);
}

export function ColorMatrixClient() {
 const [colors, setColors] = useState<{id: string, hex: string, name: string}[]>([
 { id:"1", hex:"#ffffff", name:"White"},
 { id:"2", hex:"#000000", name:"Black"},
 { id:"3", hex:"#3b82f6", name:"Blue"},
 { id:"4", hex:"#ef4444", name:"Red"}
 ]);

 const addColor = () => {
 if (colors.length >= 8) return;
 setColors([...colors, { id: Math.random().toString(), hex:"#cccccc", name:"New Color"}]);
 };

 const updateColor = (id: string, updates: Partial<{hex: string, name: string}>) => {
 setColors(colors.map(c => c.id === id ? { ...c, ...updates } : c));
 };

 const removeColor = (id: string) => {
 setColors(colors.filter(c => c.id !== id));
 };

 const getExportText = () => {
 let result ="Color Contrast Matrix Export\n\n";
 result +="Palette:\n";
 colors.forEach(c => {
 result += c.name +":"+ c.hex +"\n";
 });
 result +="\nMatrix (Text on Background):\n";
 
 colors.forEach(bg => {
 colors.forEach(text => {
 if (bg.id === text.id) return;
 const ratio = getContrastRatio(text.hex, bg.hex).toFixed(2);
 let status ="Fail";
 if (parseFloat(ratio) >= 7) status ="AAA";
 else if (parseFloat(ratio) >= 4.5) status ="AA";
 else if (parseFloat(ratio) >= 3) status ="AA Large";
 
 result += text.name +"text on"+ bg.name +"bg:"+ ratio +"("+ status +")\n";
 });
 });
 
 return result;
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Grid}
 title="Color Contrast Matrix"
 description="Test color contrast ratios across a design system palette to ensure WCAG compliance."
 actions={
 <CopyButton getText={getExportText} label="Export Matrix"/>
 }
 />

 <GlassCard>
 <CardHeader>
 <div className="flex justify-between items-center">
 <div>
 <CardTitle>Color Palette</CardTitle>
 <CardDescription>Add up to 8 colors to test combinations.</CardDescription>
 </div>
 <Button onClick={addColor} disabled={colors.length >= 8} variant="outline"className="gap-2">
 <Plus className="w-4 h-4"/> Add Color
 </Button>
 </div>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 {colors.map(color => (
 <div key={color.id} className="flex flex-col gap-2 p-3 border rounded-lg bg-secondary/20">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 rounded border shadow-inner shrink-0"style={{ backgroundColor: color.hex }} />
 <Input 
 type="color"
 value={color.hex} 
 onChange={e => updateColor(color.id, { hex: e.target.value })}
 className="w-full h-8 p-0 border-0"
 />
 <Button variant="ghost"size="icon"onClick={() => removeColor(color.id)} disabled={colors.length <= 2} className="h-8 w-8 text-destructive">
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 <Input 
 value={color.name} 
 onChange={e => updateColor(color.id, { name: e.target.value })}
 placeholder="Color Name"
 className="h-8 text-sm"
 />
 <Input 
 value={color.hex} 
 onChange={e => updateColor(color.id, { hex: e.target.value })}
 placeholder="#000000"
 className="h-8 text-sm font-mono uppercase"
 />
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Contrast Matrix</CardTitle>
 <CardDescription>Rows are text colors, columns are background colors. WCAG AA requires 4.5:1, AAA requires 7:1.</CardDescription>
 </CardHeader>
 <CardContent className="overflow-x-auto">
 <table className="w-full border-collapse min-w-[600px]">
 <thead>
 <tr>
 <th className="p-2 border bg-muted/50 w-32">Text \ Bg</th>
 {colors.map(bg => (
 <th key={bg.id} className="p-2 border bg-muted/20 w-32">
 <div className="flex flex-col items-center gap-1">
 <div className="w-6 h-6 rounded border"style={{ backgroundColor: bg.hex }} />
 <span className="text-xs truncate w-full text-center">{bg.name}</span>
 </div>
 </th>
 ))}
 </tr>
 </thead>
 <tbody>
 {colors.map(text => (
 <tr key={text.id}>
 <th className="p-2 border bg-muted/20 text-left">
 <div className="flex items-center gap-2">
 <div className="w-6 h-6 rounded border shrink-0"style={{ backgroundColor: text.hex }} />
 <span className="text-xs truncate w-full">{text.name}</span>
 </div>
 </th>
 {colors.map(bg => {
 const isSame = text.id === bg.id;
 const ratio = getContrastRatio(text.hex, bg.hex);
 const isAAA = ratio >= 7;
 const isAA = ratio >= 4.5;
 const isAALarge = ratio >= 3;
 
 let bgClass ="p-2 border text-center transition-colors";
 if (isSame) bgClass +="bg-muted/10";
 else if (isAAA) bgClass +="bg-green-500/10";
 else if (isAA) bgClass +="bg-green-500/5";
 else if (isAALarge) bgClass +="bg-yellow-500/10";
 else bgClass +="bg-red-500/10";

 return (
 <td key={bg.id} className={bgClass}>
 {isSame ? (
 <span className="text-muted-foreground">-</span>
 ) : (
 <div className="flex flex-col items-center justify-center gap-1">
 <div 
 className="px-2 py-1 rounded text-sm font-bold border"
 style={{ color: text.hex, backgroundColor: bg.hex, borderColor: text.hex +"40"}}
 >
 Text
 </div>
 <div className="font-mono text-sm">{ratio.toFixed(2)}</div>
 <div className="flex gap-1 text-[10px] font-bold uppercase">
 {isAAA ? (
 <span className="text-green-600 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3"/> AAA</span>
 ) : isAA ? (
 <span className="text-green-600 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3"/> AA</span>
 ) : isAALarge ? (
 <span className="text-yellow-600 flex items-center gap-0.5"><AlertTriangle className="w-3 h-3"/> AA+</span>
 ) : (
 <span className="text-red-600 flex items-center gap-0.5"><XCircle className="w-3 h-3"/> Fail</span>
 )}
 </div>
 </div>
 )}
 </td>
 );
 })}
 </tr>
 ))}
 </tbody>
 </table>
 </CardContent>
 </GlassCard>
 
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
          <h3>Why Use Our Color Contrast Matrix?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Color Contrast Matrix provides
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

      <RelatedTools currentToolUrl="/tools/image/color-matrix" max={6} />

</div>
 );
}
