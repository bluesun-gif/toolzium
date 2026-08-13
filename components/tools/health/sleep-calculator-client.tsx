"use client";

import { useState, useEffect, useMemo } from"react";
import { Moon, Sun, Clock, Info, BedDouble, Sparkles, Shield, Zap, Copy } from"lucide-react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Separator } from"@/components/ui/separator";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

type Mode ="wake"|"sleep";

interface CycleResult {
 cycles: number;
 time: Date;
 durationString: string;
 category:"optimal"|"okay"|"insufficient";
}

const CYCLE_MINS = 90;
const FALL_ASLEEP_MINS = 15;
const CYCLE_MS = CYCLE_MINS * 60 * 1000;
const FALL_ASLEEP_MS = FALL_ASLEEP_MINS * 60 * 1000;

export function SleepCalculatorClient() {
 const [mode, setMode] = useState<Mode>("wake");
 const [timeStr, setTimeStr] = useState<string>("07:00");
 const [results, setResults] = useState<CycleResult[]>([]);

 useEffect(() => {
 // default to next whole hour or typical wake time
 const now = new Date();
 if (mode ==="wake") {
 setTimeStr("07:00");
 } else {
 // nearest next hour for sleep mode
 const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
 const hh = nextHour.getHours().toString().padStart(2,"0");
 setTimeStr(`${hh}:00`);
 }
 }, [mode]);

 useEffect(() => {
 if (!timeStr) return;
 
 const [hours, minutes] = timeStr.split(":").map(Number);
 const baseDate = new Date();
 baseDate.setHours(hours, minutes, 0, 0);

 const newResults: CycleResult[] = [];

 if (mode ==="wake") {
 // Calculate bedtimes (count backwards from wake time)
 // Including 15 mins to fall asleep
 for (let cycles = 6; cycles >= 1; cycles--) {
 const bedTime = new Date(baseDate.getTime() - (cycles * CYCLE_MS) - FALL_ASLEEP_MS);
 const totalSleepMins = cycles * CYCLE_MINS;
 const h = Math.floor(totalSleepMins / 60);
 const m = totalSleepMins % 60;
 
 let category: CycleResult["category"] ="insufficient";
 if (cycles >= 5) category ="optimal";
 else if (cycles >= 3) category ="okay";

 newResults.push({
 cycles,
 time: bedTime,
 durationString: `${h}h${m > 0 ? ` ${m}m` :""}`,
 category
 });
 }
 } else {
 // Calculate wake times (count forwards from bedtime)
 for (let cycles = 1; cycles <= 6; cycles++) {
 const wakeTime = new Date(baseDate.getTime() + (cycles * CYCLE_MS) + FALL_ASLEEP_MS);
 const totalSleepMins = cycles * CYCLE_MINS;
 const h = Math.floor(totalSleepMins / 60);
 const m = totalSleepMins % 60;
 
 let category: CycleResult["category"] ="insufficient";
 if (cycles >= 5) category ="optimal";
 else if (cycles >= 3) category ="okay";

 newResults.push({
 cycles,
 time: wakeTime,
 durationString: `${h}h${m > 0 ? ` ${m}m` :""}`,
 category
 });
 }
 // Reverse so optimal times (5-6 cycles) are at the top
 newResults.reverse();
 }

 setResults(newResults);
 }, [mode, timeStr]);

 const formatTime = (date: Date) => {
 return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
 };

 const handleSetNow = () => {
 const now = new Date();
 const hh = now.getHours().toString().padStart(2,"0");
 const mm = now.getMinutes().toString().padStart(2,"0");
 setTimeStr(`${hh}:${mm}`);
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
 title="Sleep Calculator"
 description="Calculate the best times to go to sleep or wake up based on 90-minute sleep cycles."
 icon={Moon}
 />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-lg">Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 
 <div className="space-y-3">
 <label className="text-sm font-medium">I want to calculate:</label>
 <div className="flex bg-muted p-1 rounded-lg">
 <button
 onClick={() => setMode("wake")}
 className={cn("flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm rounded-md transition-colors", (mode ==="wake"?"bg-background shadow-sm font-medium":"text-muted-foreground hover:bg-background/50"))}
 >
 <Sun className="w-4 h-4"/> Wake up at
 </button>
 <button
 onClick={() => setMode("sleep")}
 className={cn("flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm rounded-md transition-colors", (mode ==="sleep"?"bg-background shadow-sm font-medium":"text-muted-foreground hover:bg-background/50"))}
 >
 <BedDouble className="w-4 h-4"/> Go to bed at
 </button>
 </div>
 </div>

 <div className="space-y-3">
 <label className="text-sm font-medium">
 {mode ==="wake"?"What time do you want to wake up?":"What time are you going to bed?"}
 </label>
 <div className="flex gap-2">
 <div className="relative flex-1">
 <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
 <input
 type="time"
 value={timeStr}
 onChange={(e) => setTimeStr(e.target.value)}
 className="w-full pl-9 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
 />
 </div>
 {mode ==="sleep"&& (
 <button
 onClick={handleSetNow}
 className="px-3 py-2 bg-secondary text-secondary-foreground text-sm rounded-md hover:bg-secondary/80 transition-colors"
 >
 Now
 </button>
 )}
 </div>
 <p className="text-xs text-muted-foreground flex items-start gap-1.5 mt-2">
 <Info className="w-3.5 h-3.5 shrink-0 mt-0.5"/>
 We automatically add 15 minutes to account for the average time it takes to fall asleep.
 </p>
 </div>

 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="text-lg">Sleep Cycle Facts</CardTitle>
 </CardHeader>
 <CardContent>
 <ul className="text-sm space-y-3 text-muted-foreground">
 <li className="flex items-start gap-2">
 <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"/>
 <p>A typical sleep cycle lasts about <strong>90 minutes</strong>.</p>
 </li>
 <li className="flex items-start gap-2">
 <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"/>
 <p>Most adults need <strong>5 to 6 sleep cycles</strong> per night (7.5 to 9 hours of sleep).</p>
 </li>
 <li className="flex items-start gap-2">
 <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"/>
 <p>Waking up in the middle of a cycle can leave you feeling tired and groggy (sleep inertia).</p>
 </li>
 </ul>
 </CardContent>
 </GlassCard>
 </div>

 <div className="lg:col-span-2">
 <GlassCard className="h-full">
 <CardHeader>
 <CardTitle>
 {mode ==="wake"?"Recommended Bedtimes":"Recommended Wake Times"}
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="space-y-4">
 {results.map((res, i) => {
 let bgColor ="bg-red-500/10";
 let borderColor ="border-red-500/20";
 let textColor ="text-red-600 dark:text-red-400";
 let badgeColor ="bg-red-500 text-white";
 
 if (res.category ==="optimal") {
 bgColor ="bg-green-500/10";
 borderColor ="border-green-500/20";
 textColor ="text-green-700 dark:text-green-400";
 badgeColor ="bg-green-500 text-white";
 } else if (res.category ==="okay") {
 bgColor ="bg-yellow-500/10";
 borderColor ="border-yellow-500/20";
 textColor ="text-yellow-700 dark:text-yellow-400";
 badgeColor ="bg-yellow-500 text-white";
 }

 return (
 <div
 key={res.cycles}
 className={cn("p-4 rounded-xl border", (bgColor), "", (borderColor), "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all")}
 >
 <div>
 <div className="flex items-center gap-3 mb-1">
 <h3 className="text-2xl font-bold tracking-tight">
 {formatTime(res.time)}
 </h3>
 <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", (badgeColor))}>
 {res.cycles} cycle{res.cycles > 1 ? 's' : ''}
 </span>
 </div>
 <p className={cn("text-sm font-medium", (textColor))}>
 {res.category ==="optimal"&&"Optimal amount of sleep"}
 {res.category ==="okay"&&"Okay, but could be better"}
 {res.category ==="insufficient"&&"Not enough sleep"}
 </p>
 </div>
 
 <div className="text-right sm:text-left flex-shrink-0">
 <div className="text-sm text-muted-foreground flex items-center gap-1.5">
 <Clock className="w-4 h-4"/>
 {res.durationString} of sleep
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>
 </div>
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
          <h3>Why Use Our Sleep Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Sleep Calculator provides
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

      <RelatedTools currentToolUrl="/tools/health/sleep-calculator" max={6} />

</div>
 );
}
