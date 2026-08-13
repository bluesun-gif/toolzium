"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Button } from"@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton } from"@/components/shared/action-buttons";
import { Code, Eye, RefreshCw, Layers, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { Separator } from"@/components/ui/separator";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
      <div className="relative space-y-6">
      <GridPattern />

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
          <h3>Why Use Our SVG Path Visualizer & Editor?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our SVG Path Visualizer & Editor provides
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

      <RelatedTools currentToolUrl="/tools/image/svg-path" max={6} />

</div>
 );
}
