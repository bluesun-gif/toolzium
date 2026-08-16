"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Copy, Eye, Info, Palette, ShieldCheck, Wand2 } from"lucide-react";
import toast from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Palette, Copy, Info, Sparkles, Shield, Zap } from "lucide-react";
;
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
function getLuminance(r: number, g: number, b: number) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
function getContrastRatio(hex1: string, hex2: string) {
  try {
    const [r1, g1, b1] = hexToRgb(hex1);
    const [r2, g2, b2] = hexToRgb(hex2);
    const l1 = getLuminance(r1, g1, b1);
    const l2 = getLuminance(r2, g2, b2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
  } catch (e) {
    return 1;
  }
}
function hexToRgb(hex: string) {
  let c = hex.substring(1);
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return [num >> 16, num >> 8 & 255, num & 255];
}
function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
function simulateColorBlindness(hex: string, type: string) {
  try {
    let [r, g, b] = hexToRgb(hex);
    if (type === "protanopia") {
      const newR = r * 0.56667 + g * 0.43333 + b * 0.0;
      const newG = r * 0.55833 + g * 0.44167 + b * 0.0;
      const newB = r * 0.0 + g * 0.24167 + b * 0.75833;
      r = newR;
      g = newG;
      b = newB;
    } else if (type === "deuteranopia") {
      const newR = r * 0.625 + g * 0.375 + b * 0.0;
      const newG = r * 0.7 + g * 0.3 + b * 0.0;
      const newB = r * 0.0 + g * 0.3 + b * 0.7;
      r = newR;
      g = newG;
      b = newB;
    } else if (type === "tritanopia") {
      const newR = r * 0.95 + g * 0.05 + b * 0.0;
      const newG = r * 0.0 + g * 0.43333 + b * 0.56667;
      const newB = r * 0.0 + g * 0.475 + b * 0.525;
      r = newR;
      g = newG;
      b = newB;
    } else if (type === "achromatopsia") {
      const lum = r * 0.299 + g * 0.587 + b * 0.114;
      r = lum;
      g = lum;
      b = lum;
    }
    r = Math.min(255, Math.max(0, Math.round(r)));
    g = Math.min(255, Math.max(0, Math.round(g)));
    b = Math.min(255, Math.max(0, Math.round(b)));
    return rgbToHex(r, g, b);
  } catch (e) {
    return "#000000";
  }
}
export function ColorBlindPaletteClient() {
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [secondaryColor, setSecondaryColor] = useState("#FFFFFF");
  const deficiencies = [{
    id: "normal",
    name: "Normal Vision"
  }, {
    id: "protanopia",
    name: "Protanopia (Red-Blind)"
  }, {
    id: "deuteranopia",
    name: "Deuteranopia (Green-Blind)"
  }, {
    id: "tritanopia",
    name: "Tritanopia (Blue-Blind)"
  }, {
    id: "achromatopsia",
    name: "Achromatopsia (Monochromacy)"
  }];
  const isValidHex = (hex: string) => /^#[0-9A-Fa-f]{6}$/i.test(hex) || /^#[0-9A-Fa-f]{3}$/i.test(hex);
  const contrastRatio = isValidHex(baseColor) && isValidHex(secondaryColor) ? getContrastRatio(baseColor, secondaryColor) : 1;
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${text}`);
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Eye} title="Color Blindness Palette" description="Simulate how colors appear to people with different types of color vision deficiencies." />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-lg">Color Selection</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-4">
 <div className="space-y-2">
 <Label>Base Color (Background)</Label>
 <div className="flex gap-2">
 <div className="w-12 h-10 rounded border" style={{
                    backgroundColor: isValidHex(baseColor) ? baseColor : '#ccc'
                  }} />
 <Input type="color" className="w-12 h-10 p-1 cursor-pointer" value={isValidHex(baseColor) ? baseColor.length === 4 ? "#" + baseColor[1] + baseColor[1] + baseColor[2] + baseColor[2] + baseColor[3] + baseColor[3] : baseColor : '#3B82F6'} onChange={e => setBaseColor(e.target.value.toUpperCase())} />
 <Input className="flex-1 uppercase font-mono" value={baseColor} onChange={e => setBaseColor(e.target.value)} />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Secondary Color (Text)</Label>
 <div className="flex gap-2">
 <div className="w-12 h-10 rounded border" style={{
                    backgroundColor: isValidHex(secondaryColor) ? secondaryColor : '#ccc'
                  }} />
 <Input type="color" className="w-12 h-10 p-1 cursor-pointer" value={isValidHex(secondaryColor) ? secondaryColor.length === 4 ? "#" + secondaryColor[1] + secondaryColor[1] + secondaryColor[2] + secondaryColor[2] + secondaryColor[3] + secondaryColor[3] : secondaryColor : '#FFFFFF'} onChange={e => setSecondaryColor(e.target.value.toUpperCase())} />
 <Input className="flex-1 uppercase font-mono" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} />
 </div>
 </div>
 </div>

 <div className="p-4 rounded-lg bg-muted space-y-3">
 <div className="flex justify-between items-center">
 <h4 className="font-semibold flex items-center gap-2">
 <Info className="h-4 w-4" /> WCAG Contrast
 </h4>
 <div className="font-mono font-bold text-lg">
 {isValidHex(baseColor) && isValidHex(secondaryColor) ? contrastRatio.toFixed(2) + ":1" : "-"}
 </div>
 </div>
 <div className="flex gap-2 text-sm">
 <div className={cn("px-2 py-1 rounded flex-1 text-center font-semibold", contrastRatio >= 4.5 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400')}>
 AA Normal {contrastRatio >= 4.5 ? 'Pass' : 'Fail'}
 </div>
 <div className={cn("px-2 py-1 rounded flex-1 text-center font-semibold", contrastRatio >= 7 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400')}>
 AAA Normal {contrastRatio >= 7 ? 'Pass' : 'Fail'}
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="text-lg">Simulation</CardTitle>
 <CardDescription>How this combination appears</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {isValidHex(baseColor) && isValidHex(secondaryColor) ? deficiencies.map(def => {
              const simBg = def.id === "normal" ? baseColor : simulateColorBlindness(baseColor, def.id);
              const simFg = def.id === "normal" ? secondaryColor : simulateColorBlindness(secondaryColor, def.id);
              return <div key={def.id} className="space-y-1">
 <div className="text-sm font-medium">{def.name}</div>
 <div className="w-full h-16 rounded flex items-center justify-center font-semibold text-lg border relative group cursor-pointer" style={{
                  backgroundColor: simBg,
                  color: simFg
                }} onClick={() => copyToClipboard(simBg)} title={`Copy background: ${simBg}`}>
 Sample Text
 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-primary-foreground text-sm transition-opacity rounded">
 Click to copy bg hex
 </div>
 </div>
<<<<<<< HEAD
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Colors",
    description:"Add your base palette.",
    icon: Palette,
  },
{
    step:"02",
    title:"Simulate",
    description:"Preview color blindness views.",
    icon: Eye,
  },
{
    step:"03",
    title:"Adjust",
    description:"Get accessible alternatives.",
    icon: Wand2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Palette,
    title:"Palette Input",
    description:"Your existing colors.",
  },
{
    icon: Eye,
    title:"Simulate",
    description:"Protan, deutan, tritan.",
  },
{
    icon: Wand2,
    title:"Fix Suggestions",
    description:"Accessible swaps.",
  },
{
    icon: ShieldCheck,
    title:"Compliance",
    description:"Supports WCAG goals.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A color blindness palette tool reveals how your design appears to the roughly 1 in 12 men and 1 in 200 women with color vision deficiency. Colors that look distinct to you may be indistinguishable to them, breaking charts and signals. This tool simulates those views and suggests fixes.</p>
  <p>Simulation drives empathy and correctness. Seeing your palette through protan, deutan, and tritan filters exposes problems before launch. The tool then proposes accessible alternatives that preserve intent while remaining distinguishable.</p>
  <p>Use it for any user-facing design. The tool's value is building inclusive palettes that work for everyone, supporting accessibility goals without guesswork.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What does it do?",
    answer:"Shows how colors look to color-blind users.",
  },
{
    question:"Types?",
    answer:"Protanopia, deuteranopia, tritanopia.",
  },
{
    question:"Why matter?",
    answer:"Accessibility for many users.",
  },
{
    question:"WCAG?",
    answer:"Helps meet contrast guidance.",
  },
{
    question:"Free?",
    answer:"Yes.",
  }
  ]}
/>
</div>
 );
 })
 ) : (
 <div className="text-center p-8 text-muted-foreground">
=======
 </div>;
            }) : <div className="text-center p-8 text-muted-foreground">
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
 Enter valid hex codes to see simulation.
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Color Blindness Palette?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Color Blindness Palette provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/image/color-blind-palette" max={6} />

    </div></div>;
}