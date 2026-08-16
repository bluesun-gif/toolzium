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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton } from"@/components/shared/action-buttons";
import { AlarmClock, Calculator, Clock, Moon, Shield, ShieldCheck, Sun } from"lucide-react";
=======
import { ToolBackground } from"@/components/shared/tool-background";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton } from "@/components/shared/action-buttons";
import { Clock, Moon, Sun, Shield, Sparkles, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function SleepOnsetClockClient() {
  const [latency, setLatency] = useState("15");
  const [mode, setMode] = useState("wake");
  const [targetTime, setTargetTime] = useState("07:00");
  const cycleLength = 90; // minutes

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const calculateCycles = () => {
    const lat = parseInt(latency);
    const results = [];
    if (mode === "wake") {
      const [hours, minutes] = targetTime.split(':').map(Number);
      const wakeDate = new Date();
      wakeDate.setHours(hours, minutes, 0, 0);
      for (const cycles of [6, 5, 4]) {
        const sleepDuration = cycles * cycleLength; // total minutes asleep
        const bedTime = new Date(wakeDate.getTime() - (sleepDuration + lat) * 60000);
        results.push({
          cycles,
          time: formatTime(bedTime),
          isDebt: cycles < 5
        });
      }
    } else {
      const bedDate = new Date(); // sleep now
      const fallAsleepDate = new Date(bedDate.getTime() + lat * 60000);
      for (const cycles of [6, 5, 4]) {
        const sleepDuration = cycles * cycleLength;
        const wakeTime = new Date(fallAsleepDate.getTime() + sleepDuration * 60000);
        results.push({
          cycles,
          time: formatTime(wakeTime),
          isDebt: cycles < 5
        });
      }
    }
    return results;
  };
  const cycleResults = calculateCycles();
  return <div className={"space-y-6"}><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Clock} title="Sleep Onset Latency & Bedtime Clock" description="Calculate optimal sleep schedules based on your REM cycles and sleep onset latency." actions={<ActionButton onClick={() => setMode(mode === "wake" ? "sleep" : "wake")} icon={mode === "wake" ? Moon : Sun} label={mode === "wake" ? "Switch to Sleep Now" : "Switch to Wake Target"} />} />

 <div className={"grid md:grid-cols-2 gap-6"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Configuration</CardTitle>
 <CardDescription>Adjust your sleep settings</CardDescription>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"space-y-2"}>
 <Label>Sleep Latency (Time to fall asleep)</Label>
 <Select value={latency} onValueChange={setLatency}>
 <SelectTrigger>
 <SelectValue placeholder="Select latency" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="5">5 Minutes</SelectItem>
 <SelectItem value="10">10 Minutes</SelectItem>
 <SelectItem value="15">15 Minutes (Average)</SelectItem>
 <SelectItem value="20">20 Minutes</SelectItem>
 <SelectItem value="30">30 Minutes</SelectItem>
 </SelectContent>
 </Select>
 </div>
 {mode === "wake" && <div className={"space-y-2"}>
 <Label>Target Wake-up Time</Label>
 <Input type="time" value={targetTime} onChange={e => setTargetTime(e.target.value)} />
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>{mode === "wake" ? "Optimal Bedtimes" : "Optimal Wake-up Times"}</CardTitle>
 <CardDescription>
 {mode === "wake" ? "To wake up at" + targetTime + ", try to be in bed by:" : "If you go to bed right now, set your alarm for:"}
 </CardDescription>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"grid gap-4"}>
 {cycleResults.map((result, idx) => <div key={idx} className={"flex items-center justify-between p-4 rounded-lg border bg-card"}>
 <div>
 <div className={"text-2xl font-bold text-primary"}>{result.time}</div>
 <div className={"text-sm text-muted-foreground"}>{result.cycles} Cycles ({result.cycles * 1.5} Hours)</div>
 </div>
 {result.isDebt && <div className={"flex items-center gap-1 text-xs font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded-md"}>
 <Shield className={"h-3 w-3"} /> Sleep Debt Warning
 </div>}
 {!result.isDebt && <div className={"flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md"}>
 Ideal
 </div>}
 </div>)}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Wake",
    description:"Enter wake time.",
    icon: AlarmClock,
  },
{
    step:"02",
    title:"Latency",
    description:"Your fall-asleep delay.",
    icon: Moon,
  },
{
    step:"03",
    title:"Compute",
    description:"See bedtime to be in bed.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: AlarmClock,
    title:"Wake",
    description:"Target time.",
  },
{
    icon: Moon,
    title:"Latency",
    description:"Delay to sleep.",
  },
{
    icon: Calculator,
    title:"Bedtime",
    description:"When to lie down.",
  },
{
    icon: ShieldCheck,
    title:"Realistic",
    description:"Includes delay.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A sleep onset clock subtracts your fall-asleep latency from the needed sleep duration to recommend a realistic bedtime — when to be in bed, not when to fall asleep. This distinction is why people feel shortchanged. This tool makes it explicit.</p>
  <p>Realistic bedtimes improve total sleep. The clock turns latency into an actionable time.</p>
  <p>Use it to plan rest. The tool's value is latency-aware bedtime suggestion.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Latency?",
    answer:"Time to fall asleep.",
  },
{
    question:"Why include?",
    answer:"Accurate bedtime.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  },
{
    question:"Use case?",
    answer:"Sleep planning.",
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
          <h3>Why Use Our Sleep Onset Latency & Bedtime Clock?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Sleep Onset Latency & Bedtime Clock provides
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

      <RelatedTools currentToolUrl="/tools/time/sleep-onset-clock" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
