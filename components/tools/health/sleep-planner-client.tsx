"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Moon, Sun, Clock, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { ResetButton } from"@/components/shared/action-buttons";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

export function SleepPlannerClient() {
 const [wakeTime, setWakeTime] = useState("07:00");
 const [mode, setMode] = useState<"wake"|"bed">("wake");

 const calculateTimes = () => {
 const cycleLength = 90; // minutes
 const sleepLatency = 15; // minutes to fall asleep
 const results = [];
 
 if (mode ==="wake") {
 const [hours, minutes] = wakeTime.split(":").map(Number);
 const wakeDate = new Date();
 wakeDate.setHours(hours, minutes, 0, 0);
 
 for (let cycles = 6; cycles >= 3; cycles--) {
 const bedTime = new Date(wakeDate.getTime() - (cycles * cycleLength + sleepLatency) * 60000);
 results.push({ cycles, time: bedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
 }
 } else {
 const bedDate = new Date();
 bedDate.setMinutes(bedDate.getMinutes() + sleepLatency);
 
 for (let cycles = 3; cycles <= 6; cycles++) {
 const wakeUpTime = new Date(bedDate.getTime() + (cycles * cycleLength) * 60000);
 results.push({ cycles, time: wakeUpTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
 }
 }
 return results;
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Moon}
 title="Sleep Cycle Calculator"
 description="Calculate optimal bedtimes based on 90-minute sleep cycles."
 actions={
 <React.Fragment>
 <ResetButton onClick={() => setWakeTime("07:00")} label="Reset"/>
 </React.Fragment>
 }
 />
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Calculation Mode</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex gap-4">
 <Button variant={mode ==="wake"?"default":"outline"} onClick={() => setMode("wake")}>I want to wake up at...</Button>
 <Button variant={mode ==="bed"?"default":"outline"} onClick={() => setMode("bed")}>I'm going to bed now</Button>
 </div>
 
 {mode ==="wake"&& (
 <div className="space-y-2">
 <Label>Wake up time</Label>
 <Input type="time"value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />
 </div>
 )}
 
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>{mode ==="wake"?"Suggested Bedtimes":"Suggested Wake Times"}</CardTitle>
 <CardDescription>Includes 15 minutes to fall asleep</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid gap-3">
 {calculateTimes().map((result, i) => (
 <div key={i} className={cn("p-4 rounded-lg flex justify-between items-center", (i === 1 ?"bg-primary/10 border border-primary":"bg-muted"))}>
 <div>
 <p className="font-semibold text-lg">{result.time}</p>
 <p className="text-sm text-muted-foreground">{result.cycles} cycles ({result.cycles * 1.5} hours)</p>
 </div>
 {i === 1 && <Sparkles className="h-5 w-5 text-primary"/>}
 </div>
 ))}
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
          <h3>Why Use Our Sleep Cycle Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Sleep Cycle Calculator provides
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

      <RelatedTools currentToolUrl="/tools/health/sleep-planner" max={6} />

</div>
 );
}
