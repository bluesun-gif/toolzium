"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { Clock, Moon, Sun, Shield, Sparkles, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function RemSleepAlarmClient() {
 const [mode, setMode] = useState("wakeup");
 const [time, setTime] = useState("07:00");
 
 const handleReset = () => {
 setTime("07:00");
 setMode("wakeup");
 toast.success("Reset");
 };

 const calculateTimes = () => {
 if (!time) return [];
 
 const [hours, minutes] = time.split(":").map(Number);
 const baseDate = new Date();
 baseDate.setHours(hours, minutes, 0, 0);
 
 const cycleLength = 90;
 const fallAsleepTime = 14;
 const results: { cycles: number; timeStr: string; duration: number }[] = [];
 
 [6, 5, 4].forEach(cycles => {
 const targetDate = new Date(baseDate);
 if (mode ==="wakeup") {
 targetDate.setMinutes(targetDate.getMinutes() - (cycles * cycleLength) - fallAsleepTime);
 } else {
 targetDate.setMinutes(targetDate.getMinutes() + (cycles * cycleLength) + fallAsleepTime);
 }
 
 const formatted = targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 results.push({ cycles, timeStr: formatted, duration: (cycles * 1.5) });
 });
 
 return results;
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
 title="REM Sleep Cycle & Wakeup Alarm Calculator"
 description="Calculate optimal bedtime and wake-up alarm times based on 90-minute REM sleep cycles."
 actions={<ResetButton onClick={handleReset} label="Reset"/>}
 />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Sleep Settings</CardTitle>
 <CardDescription>Enter your schedule details.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>I want to calculate...</Label>
 <Select value={mode} onValueChange={setMode}>
 <SelectTrigger>
 <SelectValue placeholder="Select mode"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="wakeup">Bedtime (I know my wake-up time)</SelectItem>
 <SelectItem value="bedtime">Wake-up Time (I know my bedtime)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <div className="space-y-2">
 <Label>{mode ==="wakeup"?"Desired Wake-up Time":"Current Bedtime"}</Label>
 <Input type="time"value={time} onChange={(e) => setTime(e.target.value)} />
 </div>
 
 <div className={"text-sm text-muted-foreground p-4 bg-secondary/50 rounded-md mt-4"}>
 Note: Calculations include a 14-minute average sleep onset latency.
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>{mode ==="wakeup"?"Optimal Bedtimes":"Optimal Wake-up Times"}</CardTitle>
 <CardDescription>Based on 90-minute REM cycles.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {results.map((res, i) => (
 <div key={i} className="flex justify-between items-center p-4 border rounded-md">
 <div className="flex items-center gap-3">
 {mode ==="wakeup"? <Moon className="h-5 w-5 text-primary"/> : <Sun className="h-5 w-5 text-amber-500"/>}
 <div>
 <div className="font-bold text-lg">{res.timeStr}</div>
 <div className="text-sm text-muted-foreground">{res.cycles} cycles ({res.duration} hrs sleep)</div>
 </div>
 </div>
 {i === 1 && <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">Recommended</span>}
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
          <h3>Why Use Our REM Sleep Cycle & Wakeup Alarm Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our REM Sleep Cycle & Wakeup Alarm Calculator provides
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

      <RelatedTools currentToolUrl="/tools/time/rem-sleep-alarm" max={6} />

</div>
 );
}
