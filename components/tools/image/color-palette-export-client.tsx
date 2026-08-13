"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton } from"@/components/shared/action-buttons";
import { Palette, Download, RefreshCw, Plus, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

const randomHex = () =>"#"+ Math.floor(Math.random() * 16777215).toString(16).padStart(6,"0");

export function ColorPaletteExportClient() {
 const [colors, setColors] = useState<string[]>(["#ff595e","#ffca3a","#8ac926","#1982c4","#6a4c93"]);

 const randomizeAll = () => {
 setColors(colors.map(() => randomHex()));
 };

 const addColor = () => {
 if (colors.length < 10) setColors([...colors, randomHex()]);
 };

 const removeColor = (idx: number) => {
 if (colors.length > 3) setColors(colors.filter((_, i) => i !== idx));
 };

 const updateColor = (idx: number, val: string) => {
 const newColors = [...colors];
 newColors[idx] = val;
 setColors(newColors);
 };

 const getCss = () => {
 return":root {\n"+ colors.map((c, i) =>"--color-"+ (i + 1) +":"+ c +";").join("\n") +"\n}";
 };

 const getJson = () => {
 const obj: Record<string, string> = {};
 colors.forEach((c, i) => obj["color-"+ (i + 1)] = c);
 return JSON.stringify(obj, null, 2);
 };

 const downloadSvg = () => {
 const width = colors.length * 100;
 const height = 100;
 const rects = colors.map((c, i) =>"<rect x=\""+ (i * 100) +"\"y=\"0\"width=\"100\"height=\"100\"fill=\""+ c +"\"/>").join("");
 const svg ="<svg xmlns=\"http://www.w3.org/2000/svg\"width=\""+ width +"\"height=\""+ height +"\"viewBox=\"0 0"+ width +""+ height +"\">"+ rects +"</svg>";
 
 const blob = new Blob([svg], { type:"image/svg+xml"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="palette.svg";
 a.click();
 URL.revokeObjectURL(url);
 };

 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader 
 title="Color Palette Exporter"
 icon={Palette} 
 description="Create and export beautiful color palettes for your projects."
 actions={
 <>
 <ActionButton onClick={randomizeAll} icon={RefreshCw} label="Randomize"/>
 <ActionButton onClick={downloadSvg} icon={Download} label="Download SVG"/>
 </>
 }
 />

 <GlassCard>
 <CardContent className="p-6">
 <div className="flex h-32 w-full rounded-xl overflow-hidden mb-6 shadow-md border">
 {colors.map((c, i) => (
 <div key={i} className="h-full flex-1 transition-all duration-300 group relative"style={{ backgroundColor: c }}>
 <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
 <span className="bg-background/80 px-2 py-1 rounded text-xs font-mono">{c}</span>
 </div>
 </div>
 ))}
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
 {colors.map((c, i) => (
 <div key={i} className="space-y-2 bg-secondary/30 p-3 rounded-lg border">
 <div className="flex items-center justify-between">
 <Label>Color {i + 1}</Label>
 <Button variant="ghost"size="icon"className="h-6 w-6"onClick={() => removeColor(i)} disabled={colors.length <= 3}>
 <Trash2 className="w-3 h-3"/>
 </Button>
 </div>
 <div className="flex gap-2">
 <input type="color"value={c} onChange={(e) => updateColor(i, e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0"/>
 <Input value={c} onChange={(e) => updateColor(i, e.target.value)} className="font-mono uppercase"/>
 </div>
 </div>
 ))}
 {colors.length < 10 && (
 <Button variant="outline"className="h-full min-h-[100px] border-dashed"onClick={addColor}>
 <Plus className="w-6 h-6 mr-2"/> Add Color
 </Button>
 )}
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <CardTitle className="text-lg">CSS Variables</CardTitle>
 <CopyButton getText={getCss} label="Copy CSS"/>
 </CardHeader>
 <CardContent>
 <pre className="bg-muted p-4 rounded-lg overflow-auto font-mono text-sm">
 {getCss()}
 </pre>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <CardTitle className="text-lg">JSON</CardTitle>
 <CopyButton getText={getJson} label="Copy JSON"/>
 </CardHeader>
 <CardContent>
 <pre className="bg-muted p-4 rounded-lg overflow-auto font-mono text-sm">
 {getJson()}
 </pre>
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
          <h3>Why Use Our Color Palette Exporter?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Color Palette Exporter provides
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

      <RelatedTools currentToolUrl="/tools/image/color-palette-export" max={6} />

</div>
 );
}
