"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { ResetButton } from"@/components/shared/action-buttons";
import { Clock, Moon, Sun, Shield, Sparkles, Zap, Copy } from"lucide-react";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function RemBedtimeClockClient() {
 const [time, setTime] = useState("07:00");
 const [isWakeUp, setIsWakeUp] = useState(true);

 const calculateTimes = () => {
 if (!time) return [];
 
 const [hours, minutes] = time.split(":").map(Number);
 const baseDate = new Date();
 baseDate.setHours(hours, minutes, 0, 0);

 const fallAsleepDelay = 14 * 60000;
 const cycleDuration = 90 * 60000;
 const cyclesToCalc = [6, 5, 4];
 
 return cyclesToCalc.map(cycles => {
 let targetTime;
 if (isWakeUp) {
 targetTime = new Date(baseDate.getTime() - (cycles * cycleDuration) - fallAsleepDelay);
 } else {
 targetTime = new Date(baseDate.getTime() + (cycles * cycleDuration) + fallAsleepDelay);
 }
 return {
 cycles,
 hours: cycles * 1.5,
 time: targetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
 };
 });
 };

 const results = calculateTimes();

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
 icon={Clock}
 title="REM Sleep Cycle & Bedtime Alarm Clock"
 description="Calculate optimal bedtime and wake-up alarm times based on 90-minute REM sleep cycles."
 actions={
 <React.Fragment>
 <ResetButton onClick={() => setTime("07:00")} label="Reset"/>
 </React.Fragment>
 }
 />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Sleep Settings</CardTitle>
 <CardDescription>Include 14-min average sleep onset latency</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex items-center space-x-4">
 <Label className={cn(isWakeUp ?"text-muted-foreground":"font-bold")}>Bedtime</Label>
 <Switch checked={isWakeUp} onCheckedChange={setIsWakeUp} />
 <Label className={cn(!isWakeUp ?"text-muted-foreground":"font-bold")}>Wake-up time</Label>
 </div>
 
 <div className="space-y-2">
 <Label>{isWakeUp ?"I want to wake up at":"I am going to bed at"}</Label>
 <Input type="time"value={time} onChange={(e) => setTime(e.target.value)} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>{isWakeUp ?"Optimal Bedtimes":"Optimal Wake Times"}</CardTitle>
 <CardDescription>Based on 90-minute sleep cycles</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {results.map((res, i) => (
 <div key={i} className="p-4 bg-muted rounded-md border flex justify-between items-center">
 <div>
 <div className="font-bold text-xl">{res.time}</div>
 <div className="text-sm text-muted-foreground">{res.cycles +"cycles ("+ res.hours +"hrs)"}</div>
 </div>
 {isWakeUp ? <Moon className="w-5 h-5 text-primary"/> : <Sun className="w-5 h-5 text-amber-500"/>}
 </div>
 ))}
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
          <h3>Why Use Our REM Sleep Cycle & Bedtime Alarm Clock?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our REM Sleep Cycle & Bedtime Alarm Clock provides
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

      <RelatedTools currentToolUrl="/tools/time/rem-bedtime-clock" max={6} />

</div>
 );
}
