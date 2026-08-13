"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { Moon, Clock, Sun, Shield, Sparkles, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function RemSleepClockClient() {
 const [wakeTime, setWakeTime] = useState("07:00");
 const [bedTimes, setBedTimes] = useState<{cycles: number, time: string, isOptimal: boolean}[]>([]);
 const [wakeUpTimes, setWakeUpTimes] = useState<{cycles: number, time: string, isOptimal: boolean}[]>([]);

 const SLEEP_LATENCY = 14; // minutes
 const CYCLE_LENGTH = 90; // minutes

 const calculateBedTimes = () => {
 if (!wakeTime) return;
 const [hours, minutes] = wakeTime.split(":").map(Number);
 const wakeDate = new Date();
 wakeDate.setHours(hours, minutes, 0, 0);
 
 const times = [];
 for (let cycles = 6; cycles >= 4; cycles--) {
 const totalMinutes = (cycles * CYCLE_LENGTH) + SLEEP_LATENCY;
 const bedDate = new Date(wakeDate.getTime() - totalMinutes * 60000);
 times.push({
 cycles,
 time: bedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
 isOptimal: cycles === 5 || cycles === 6
 });
 }
 setBedTimes(times);
 setWakeUpTimes([]);
 };

 const calculateWakeUpTimes = () => {
 const now = new Date();
 const times = [];
 for (let cycles = 4; cycles <= 6; cycles++) {
 const totalMinutes = (cycles * CYCLE_LENGTH) + SLEEP_LATENCY;
 const wakeDate = new Date(now.getTime() + totalMinutes * 60000);
 times.push({
 cycles,
 time: wakeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
 isOptimal: cycles === 5 || cycles === 6
 });
 }
 setWakeUpTimes(times.reverse());
 setBedTimes([]);
 };

 const handleReset = () => {
 setWakeTime("07:00");
 setBedTimes([]);
 setWakeUpTimes([]);
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
 icon={Moon}
 title="REM Sleep Cycle Clock"
 description="Calculate optimal sleep & wake times based on 90-minute REM sleep cycles."
 actions={<ResetButton onClick={handleReset} label="Reset"/>}
 />
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>I want to wake up at...</CardTitle>
 <CardDescription>Find the best time to go to bed</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Wake up time</Label>
 <Input type="time"value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />
 </div>
 <Button className="w-full"onClick={calculateBedTimes}>
 <Clock className="mr-2 h-4 w-4"/> Calculate Bedtimes
 </Button>
 
 {bedTimes.length > 0 && (
 <div className="mt-6 space-y-4">
 <h4 className="font-semibold text-sm">Suggested Bedtimes (including 14 min to fall asleep):</h4>
 <div className="grid gap-3">
 {bedTimes.map((item, i) => (
 <div key={i} className={cn("p-4 border rounded-md flex justify-between items-center", (item.isOptimal ?"bg-primary/10 border-primary":"bg-muted"))}>
 <div>
 <div className="font-bold text-lg">{item.time}</div>
 <div className="text-sm text-muted-foreground">{item.cycles} Cycles ({item.cycles * 1.5} Hours)</div>
 </div>
 {item.isOptimal && <span className="text-xs font-bold text-primary">RECOMMENDED</span>}
 </div>
 ))}
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>I am going to sleep now</CardTitle>
 <CardDescription>Find the best time to wake up</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <Button className="w-full"variant="secondary"onClick={calculateWakeUpTimes}>
 <Sun className="mr-2 h-4 w-4"/> Sleep Now
 </Button>
 
 {wakeUpTimes.length > 0 && (
 <div className="mt-6 space-y-4">
 <h4 className="font-semibold text-sm">Suggested Wake-up Times:</h4>
 <div className="grid gap-3">
 {wakeUpTimes.map((item, i) => (
 <div key={i} className={cn("p-4 border rounded-md flex justify-between items-center", (item.isOptimal ?"bg-primary/10 border-primary":"bg-muted"))}>
 <div>
 <div className="font-bold text-lg">{item.time}</div>
 <div className="text-sm text-muted-foreground">{item.cycles} Cycles ({item.cycles * 1.5} Hours)</div>
 </div>
 {item.isOptimal && <span className="text-xs font-bold text-primary">RECOMMENDED</span>}
 </div>
 ))}
 </div>
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
          <h3>Why Use Our REM Sleep Cycle Clock?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our REM Sleep Cycle Clock provides
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

      <RelatedTools currentToolUrl="/tools/time/rem-sleep-clock" max={6} />

</div>
 );
}
