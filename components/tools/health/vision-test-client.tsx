"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { AlertTriangle, BarChart2, Calculator, Eye, RotateCcw, Ruler, ShieldCheck } from"lucide-react";
import toast from"react-hot-toast";

export function VisionTestClient() {
  const [snellenResult, setSnellenResult] = useState<string | null>(null);
  const snellenRows = [{
    text: "E",
    size: "text-9xl",
    acuity: "20/200"
  }, {
    text: "F P",
    size: "text-8xl",
    acuity: "20/100"
  }, {
    text: "T O Z",
    size: "text-7xl",
    acuity: "20/70"
  }, {
    text: "L P E D",
    size: "text-6xl",
    acuity: "20/50"
  }, {
    text: "P E C F D",
    size: "text-5xl",
    acuity: "20/40"
  }, {
    text: "E D F C Z P",
    size: "text-4xl",
    acuity: "20/30"
  }, {
    text: "F E L O P Z D",
    size: "text-3xl",
    acuity: "20/25"
  }, {
    text: "D E F P O T E C",
    size: "text-2xl",
    acuity: "20/20"
  }];
  const handleReset = () => {
    setSnellenResult(null);
    toast.success("Test reset");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Vision Test" description="Simple online vision screening tool (not medical advice)." icon={Eye} actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <GlassCard className={cn("border-yellow-500/50", "bg-yellow-500/10")}>
 <CardContent className={cn("pt-6", "flex", "items-start", "gap-4")}>
 <AlertTriangle className={cn("text-yellow-500", "h-6", "w-6", "shrink-0")} />
 <div>
 <h3 className={cn("font-semibold", "text-yellow-700", "dark:text-yellow-400")}>Disclaimer</h3>
 <p className={cn("text-sm", "text-yellow-700/80", "dark:text-yellow-400/80")}>
 This is a basic screening tool and does NOT provide medical diagnosis or replace a professional eye exam. Please consult an optometrist or ophthalmologist for medical advice.
 </p>
 </div>
 </CardContent>
 </GlassCard>

 <div className={cn("grid", "gap-6", "md:grid-cols-2")}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Visual Acuity Test</CardTitle>
 <CardDescription>Stand about 3-10 feet away. Click the smallest row you can read clearly.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className={cn("flex", "flex-col", "items-center", "space-y-4", "p-8", "bg-background", "", "rounded-lg", "border")}>
 {snellenRows.map((row, i) => <div key={i} className={cn("flex", "w-full", "items-center", "justify-center", "group", "cursor-pointer")} onClick={() => setSnellenResult(row.acuity)}>
 <div className={cn("font-serif", "font-bold", "tracking-widest", row.size, "group-hover:text-primary", "transition-colors", "text-center")}>
 {row.text}
 </div>
 </div>)}
 </div>
 
 {snellenResult && <div className={cn("p-4", "rounded-lg", "bg-primary/10", "text-center")}>
 <h4 className={cn("font-semibold", "text-primary")}>Approximate Result</h4>
 <p className={cn("text-2xl", "font-bold")}>{snellenResult}</p>
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Color Vision Check</CardTitle>
 <CardDescription>Identify the shape or number in the pattern.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className={cn("flex", "justify-center")}>
 {/* Simple Ishihara-like simulation using divs */}
 <div className={cn("relative", "w-64", "h-64", "rounded-full", "overflow-hidden", "bg-orange-200", "flex", "items-center", "justify-center", "p-4")}>
 <div className={cn("absolute", "inset-0", "opacity-50")}>
 {/* Background dots simulation */}
 {Array.from({
                    length: 100
                  }).map((_, i) => <div key={i} className={cn("absolute", "rounded-full", i % 3 === 0 ? "bg-orange-500" : "bg-red-400")} style={{
                    width: Math.random() * 10 + 5 + "px",
                    height: Math.random() * 10 + 5 + "px",
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%"
                  }} />)}
 </div>
 {/* Foreground shape simulation (number 12) */}
 <div className={cn("relative", "z-10", "text-green-600", "font-bold", "text-8xl", "opacity-80", "mix-blend-multiply")}>
 12
 </div>
 </div>
 </div>
 <div className="space-y-2">
 <p className={cn("text-sm", "text-center", "text-muted-foreground")}>
 If you have normal color vision, you should see the number"12".
 </p>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Distance",
    description:"Position at recommended distance.",
    icon: Ruler,
  },
{
    step:"02",
    title:"Read",
    description:"Identify shown characters.",
    icon: Eye,
  },
{
    step:"03",
    title:"Estimate",
    description:"See approximate acuity.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Ruler,
    title:"Distance Guide",
    description:"Standard testing setup.",
  },
{
    icon: Eye,
    title:"Acuity Check",
    description:"Reads letter rows.",
  },
{
    icon: Calculator,
    title:"Estimate",
    description:"Approximate result.",
  },
{
    icon: ShieldCheck,
    title:"Informational",
    description:"Not a substitute for exam.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A vision test offers a rough, at-home screen of visual acuity, not a clinical diagnosis. By reading characters at a set distance, it estimates whether your sight may need attention. This tool provides an approximate check and guidance.</p>
  <p>Screens cannot replace professional exams, which assess health beyond acuity. The test is a prompt: if you struggle, book an eye care visit. It is informational, useful for noticing changes between appointments.</p>
  <p>Use it as a nudge, not reassurance. The tool's value is a quick self-screen that encourages timely professional care when something seems off.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Accurate?",
    answer:"Rough screen estimate only.",
  },
{
    question:"Replace eye exam?",
    answer:"No, see a professional.",
  },
{
    question:"When to get checked?",
    answer:"Blurriness, headaches, strain.",
  },
{
    question:"Screen distance?",
    answer:"Follow on-screen guide.",
  },
{
    question:"Children?",
    answer:"Professional exams are key.",
  }
  ]}
/>
</div>
 );
}
