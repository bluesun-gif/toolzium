"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton } from"@/components/shared/action-buttons";
import { Copy, Download, Palette, ShieldCheck, Sparkles, Wand2 } from"lucide-react";
import toast from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton } from "@/components/shared/action-buttons";
import { Palette, Sparkles, Download, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function ColorHarmonyClient() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [harmony, setHarmony] = useState("complementary");
  const [palette, setPalette] = useState<string[]>(["#3b82f6", "#f59e0b"]);
  const generatePalette = () => {
    // Basic mock generation logic
    if (harmony === "complementary") {
      setPalette([baseColor, "#ef4444"]);
    } else if (harmony === "analogous") {
      setPalette([baseColor, "#10b981", "#6366f1"]);
    } else {
      setPalette([baseColor, "#222222", "#cccccc", "#ffffff"]);
    }
    toast.success("Palette generated");
  };
  const exportCSS = () => {
    const css = palette.map((c, i) => "--color-" + i + ":" + c + ";").join("\n");
    const blob = new Blob([":root {\n" + css + "\n}"], {
      type: "text/css"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "palette.css";
    a.click();
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Palette} title="Color Palette Harmonizer & Generator" description="Generate color harmony palettes based on color theory." actions={<ActionButton onClick={exportCSS} icon={Download} label="Export CSS" variant="outline" size="default" />} />

 <GlassCard>
 <CardContent className="p-4 flex gap-4 items-end flex-wrap">
 <div className="space-y-2">
 <Label>Base Color</Label>
 <Input type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)} className="w-16 h-10 p-1" />
 </div>
 <div className="flex-1 space-y-2 min-w-[200px]">
 <Label>Hex Code</Label>
 <Input value={baseColor} onChange={e => setBaseColor(e.target.value)} />
 </div>
 <div className="w-48 space-y-2">
 <Label>Harmony Rule</Label>
 <Select value={harmony} onValueChange={setHarmony}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="complementary">Complementary</SelectItem>
 <SelectItem value="analogous">Analogous</SelectItem>
 <SelectItem value="triadic">Triadic</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <ActionButton onClick={generatePalette} icon={Sparkles} label="Generate" variant="default" size="default" />
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {palette.map((color, i) => <GlassCard key={i}>
 <div style={{
            backgroundColor: color
          }} className="h-32 w-full rounded-t-xl" />
 <CardContent className="p-4 flex flex-col gap-2">
 <div className="flex justify-between items-center">
 <span className="font-mono uppercase font-bold">{color}</span>
 <CopyButton getText={() => color} label="Copy" />
 </div>
 </CardContent>
 </GlassCard>)}
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Pick Base",
    description:"Choose a starting color.",
    icon: Palette,
  },
{
    step:"02",
    title:"Generate",
    description:"Build harmonious schemes.",
    icon: Wand2,
  },
{
    step:"03",
    title:"Refine",
    description:"Adjust and copy.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Palette,
    title:"Base Color",
    description:"Your anchor hue.",
  },
{
    icon: Wand2,
    title:"Schemes",
    description:"Complementary, analogous, triadic.",
  },
{
    icon: Copy,
    title:"Export",
    description:"Copy all hex codes.",
  },
{
    icon: ShieldCheck,
    title:"Accessible",
    description:"Optionally check contrast.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A color harmonizer generates balanced palettes from a single base hue using established color-theory relationships — complementary, analogous, triadic. Random colors clash; harmonized ones feel intentional. This tool builds schemes so your design looks coherent without design training.</p>
  <p>Scheme choice sets the mood. Complementary pairs pop with contrast; analogous sets feel calm and unified. The generator lets you explore quickly, then copy the resulting hex codes into your project.</p>
  <p>Use it to start any visual design. The tool's value is turning one color into a complete, harmonious palette grounded in theory rather than trial and error.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is harmony?",
    answer:"Color relationships that look balanced.",
  },
{
    question:"Scheme types?",
    answer:"Complementary, analogous, triadic, more.",
  },
{
    question:"Use case?",
    answer:"Design and branding.",
  },
{
    question:"Contrast?",
    answer:"Can verify readability.",
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
=======
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
          <h3>Why Use Our Color Palette Harmonizer & Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Color Palette Harmonizer & Generator provides
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

      <RelatedTools currentToolUrl="/tools/image/color-harmony" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
