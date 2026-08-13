"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { Eye, AlertTriangle, BarChart2, RotateCcw, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function VisionTestClient() {
 const [snellenResult, setSnellenResult] = useState<string | null>(null);

 const snellenRows = [
 { text:"E", size:"text-9xl", acuity:"20/200"},
 { text:"F P", size:"text-8xl", acuity:"20/100"},
 { text:"T O Z", size:"text-7xl", acuity:"20/70"},
 { text:"L P E D", size:"text-6xl", acuity:"20/50"},
 { text:"P E C F D", size:"text-5xl", acuity:"20/40"},
 { text:"E D F C Z P", size:"text-4xl", acuity:"20/30"},
 { text:"F E L O P Z D", size:"text-3xl", acuity:"20/25"},
 { text:"D E F P O T E C", size:"text-2xl", acuity:"20/20"},
 ];

 const handleReset = () => {
 setSnellenResult(null);
 toast.success("Test reset");
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
 title="Vision Test"
 description="Simple online vision screening tool (not medical advice)."
 icon={Eye}
 actions={<ResetButton onClick={handleReset} label="Reset"/>}
 />

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
 {snellenRows.map((row, i) => (
 <div key={i} className={cn("flex", "w-full", "items-center", "justify-center", "group", "cursor-pointer")} onClick={() => setSnellenResult(row.acuity)}>
 <div className={cn("font-serif", "font-bold", "tracking-widest", row.size, "group-hover:text-primary", "transition-colors", "text-center")}>
 {row.text}
 </div>
 </div>
 ))}
 </div>
 
 {snellenResult && (
 <div className={cn("p-4", "rounded-lg", "bg-primary/10", "text-center")}>
 <h4 className={cn("font-semibold", "text-primary")}>Approximate Result</h4>
 <p className={cn("text-2xl", "font-bold")}>{snellenResult}</p>
 </div>
 )}
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
 {Array.from({ length: 100 }).map((_, i) => (
 <div key={i} className={cn("absolute", "rounded-full", ((i % 3 === 0) ?"bg-orange-500":"bg-red-400"))} 
 style={{
 width: (Math.random() * 10 + 5) +"px",
 height: (Math.random() * 10 + 5) +"px",
 left: (Math.random() * 100) +"%",
 top: (Math.random() * 100) +"%",
 }} />
 ))}
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
          <h3>Why Use Our Vision Test?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Vision Test provides
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

      <RelatedTools currentToolUrl="/tools/health/vision-test" max={6} />

</div>
 );
}
