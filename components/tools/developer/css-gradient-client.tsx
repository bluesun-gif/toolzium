"use client";
import { Button } from"@/components/ui/button";
import { cn } from"@/lib/utils";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";
import { Layers, Eye, Sparkles, Move } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const linearDirections = [{
  value: "to right",
  label: "→ to right"
}, {
  value: "to left",
  label: "← to left"
}, {
  value: "to bottom",
  label: "↓ to bottom"
}, {
  value: "to top",
  label: "↑ to top"
}, {
  value: "to top right",
  label: "↗ to top right"
}, {
  value: "to bottom right",
  label: "↘ to bottom right"
}, {
  value: "to top left",
  label: "↖ to top left"
}, {
  value: "to bottom left",
  label: "↙ to bottom left"
}];
type GradientType = "linear" | "radial";
export default function CssGradientClient() {
  const [color1, setColor1] = useState("#6366f1");
  const [color2, setColor2] = useState("#ec4899");
  const [direction, setDirection] = useState("to right");
  const [type, setType] = useState<GradientType>("linear");
  const cssCode = useMemo(() => {
    if (type === "linear") {
      return `background: linear-gradient(${direction}, ${color1}, ${color2});`;
    }
    return `background: radial-gradient(circle, ${color1}, ${color2});`;
  }, [color1, color2, direction, type]);
  const previewStyle = useMemo(() => {
    if (type === "linear") {
      return {
        background: `linear-gradient(${direction}, ${color1}, ${color2})`
      };
    }
    return {
      background: `radial-gradient(circle, ${color1}, ${color2})`
    };
  }, [color1, color2, direction, type]);
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader icon={Layers} title="CSS Gradient Generator" description="Build beautiful linear and radial CSS gradients with a live preview and ready-to-copy code." />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Sparkles className="w-4 h-4 text-primary" /> Gradient Controls
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-2 gap-3">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Start Color</label>
 <div className="flex items-center gap-2">
 <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="h-10 w-12 cursor-pointer rounded border border-border/70 bg-transparent" />
 <Input value={color1} onChange={e => setColor1(e.target.value)} className="font-mono text-sm" />
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">End Color</label>
 <div className="flex items-center gap-2">
 <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="h-10 w-12 cursor-pointer rounded border border-border/70 bg-transparent" />
 <Input value={color2} onChange={e => setColor2(e.target.value)} className="font-mono text-sm" />
 </div>
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Type</label>
 <div className="inline-flex overflow-hidden rounded-lg border border-border/70">
 <Button onClick={() => setType("linear")} className={cn(`px-4 py-2 text-sm font-medium ${type === "linear" ? "bg-primary text-primary-foreground" : "bg-background/80 hover:bg-muted/40"}`)}>
 Linear
 </Button>
 <Button onClick={() => setType("radial")} className={cn(`px-4 py-2 text-sm font-medium ${type === "radial" ? "bg-primary text-primary-foreground" : "bg-background/80 hover:bg-muted/40"}`)}>
 Radial
 </Button>
 </div>
 </div>

 {type === "linear" && <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
 <Move className="w-3.5 h-3.5" /> Direction
 </label>
 <select value={direction} onChange={e => setDirection(e.target.value)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50">
 {linearDirections.map(d => <option key={d.value} value={d.value}>
 {d.label}
 </option>)}
 </select>
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Eye className="w-4 h-4 text-primary" /> Live Preview
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <div className="h-56 w-full rounded-xl border border-border/60 shadow-inner" style={previewStyle} />
 <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
 <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs text-foreground">{cssCode}</pre>
 </div>
 <CopyButton getText={() => cssCode} label="Copy CSS" />
 </CardContent>
 </GlassCard>
 </div>

 <ToolHowItWorks steps={[{
      step: "01",
      title: "Pick Two Colors",
      description: "Use the native pickers or type HEX values to define the start and end of your gradient.",
      icon: Sparkles
    }, {
      step: "02",
      title: "Choose Type & Direction",
      description: "Switch between linear and radial, and pick a direction for linear gradients.",
      icon: Move
    }, {
      step: "03",
      title: "Copy the CSS",
      description: "Copy the generated rule and paste it into your stylesheet or Tailwind arbitrary value.",
      icon: Layers
    }]} badges={["100% Free", "Client-Side", "No Signup"]} />

 <ToolFeatureGuides features={[{
      icon: Layers,
      title: "Linear & Radial",
      description: "Supports both gradient types with full control over direction and shape."
    }, {
      icon: Eye,
      title: "Live Preview",
      description: "See exactly how your gradient will render before copying the code."
    }, {
      icon: Sparkles,
      title: "Native Pickers",
      description: "Uses the browser color picker for quick, intuitive color selection."
    }, {
      icon: Move,
      title: "8 Directions",
      description: "All standard linear gradient directions are available out of the box."
    }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>CSS gradients are one of the most efficient ways to add depth and visual interest to a user interface without loading any image assets. They are declared directly in your stylesheet, scale perfectly to any screen resolution, and typically cost the browser far less to render than a comparable PNG or SVG background.</p>
 <p>Linear gradients flow between two or more colors along a straight axis defined by a direction keyword like <code>to right</code> or <code>to bottom left</code>. You can also use angles (e.g., <code>45deg</code>) for more precise control. Radial gradients expand outward from a central point in a circle or ellipse, which is useful for spotlights, vignettes, and glowing effects.</p>
 <p>Modern CSS also supports advanced gradient features such as multiple color stops, varying stop positions, and the newer <code>conic-gradient()</code> for pie-chart-like effects. You can combine gradients with other background properties like <code>background-size</code> and <code>background-blend-mode</code> to create sophisticated textures. When copying output from this tool, you can further extend it by adding additional color stops between the start and end colors.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
      question: "Can I add more than two colors?",
      answer: "This generator focuses on two-color gradients. To add more stops, simply insert extra color values between the two colors in the generated CSS, separated by commas."
    }, {
      question: "Do gradients work in all browsers?",
      answer: "Yes. Linear and radial gradients are supported in all modern browsers including Chrome, Firefox, Safari, and Edge. No vendor prefixes are needed today."
    }, {
      question: "Can I use this with Tailwind?",
      answer: "Yes. Paste the generated CSS into a custom utility, or use Tailwind's arbitrary value syntax like bg-[linear-gradient(to_right,#6366f1,#ec4899)]."
    }]} />

 <RelatedTools currentToolUrl="/tools/developer/css-gradient" max={6} />
 </div>;
}