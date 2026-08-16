"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { AlarmClock, Calculator, Clock, Heart, Moon, ShieldCheck } from"lucide-react";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Moon, AlarmClock, Heart, Clock, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function SleepLatencyClient() {
  const [bedTime, setBedTime] = useState("22:00");
  const [latency, setLatency] = useState("15");
  const [sleepDuration, setSleepDuration] = useState("7.5");
  const [alarmTime, setAlarmTime] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  useEffect(() => {
    calculateAlarm();
    assessHealth();
  }, [bedTime, latency, sleepDuration]);
  const calculateAlarm = () => {
    if (!bedTime || !latency || !sleepDuration) return;
    const [hours, minutes] = bedTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    // Add latency
    date.setMinutes(date.getMinutes() + Number(latency));

    // Add sleep duration (hours to minutes)
    date.setMinutes(date.getMinutes() + Number(sleepDuration) * 60);
    const alarmHours = date.getHours().toString().padStart(2, '0');
    const alarmMinutes = date.getMinutes().toString().padStart(2, '0');
    setAlarmTime(alarmHours + ":" + alarmMinutes);
  };
  const assessHealth = () => {
    const lat = Number(latency);
    if (lat < 5) {
      setHealthStatus("Excessive sleepiness - You fall asleep very quickly, which may indicate sleep deprivation.");
    } else if (lat >= 10 && lat <= 20) {
      setHealthStatus("Normal - Healthy sleep latency.");
    } else if (lat > 30) {
      setHealthStatus("Sleep onset insomnia - It takes longer than usual to fall asleep.");
    } else {
      setHealthStatus("Slightly abnormal - Falling asleep taking" + lat + "minutes.");
    }
  };
  const handleReset = () => {
    setBedTime("22:00");
    setLatency("15");
    setSleepDuration("7.5");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Moon} title="Sleep Latency & Alarm Clock" description="Sleep latency & sleep efficiency analyzer with custom alarm calculator." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Sleep Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Time You Enter Bed</Label>
 <Input type="time" value={bedTime} onChange={e => setBedTime(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Average Time to Fall Asleep (Latency in minutes)</Label>
 <Input type="number" min="0" value={latency} onChange={e => setLatency(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Desired Total Sleep Duration</Label>
 <Select value={sleepDuration} onValueChange={setSleepDuration}>
 <SelectTrigger>
 <SelectValue placeholder="Select duration" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="4.5">4.5 hours (3 cycles)</SelectItem>
 <SelectItem value="6">6.0 hours (4 cycles)</SelectItem>
 <SelectItem value="7.5">7.5 hours (5 cycles)</SelectItem>
 <SelectItem value="9">9.0 hours (6 cycles)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <AlarmClock className="w-5 h-5 text-primary" />
 Calculated Alarm Time
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-4xl font-bold text-center py-6 text-primary">
 {alarmTime || "--:--"}
 </div>
 <p className="text-sm text-center text-muted-foreground">
 Set your alarm for this time to complete your sleep cycles.
 </p>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Heart className="w-5 h-5 text-red-500" />
 Health Status
 </CardTitle>
 </CardHeader>
 <CardContent>
 <p className="text-md font-medium">
 {healthStatus}
 </p>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Alarm",
    description:"Enter wake time.",
    icon: AlarmClock,
  },
{
    step:"02",
    title:"Latency",
    description:"Minutes to fall asleep.",
    icon: Moon,
  },
{
    step:"03",
    title:"Compute",
    description:"See when to be in bed.",
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
    description:"Fall-asleep delay.",
  },
{
    icon: Calculator,
    title:"Bedtime",
    description:"When to lie down.",
  },
{
    icon: ShieldCheck,
    title:"Realistic",
    description:"Includes latency.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A sleep latency alarm works backward from your wake time, subtracting your fall-asleep delay to tell you when to actually be in bed — not just when to fall asleep. Ignoring latency is why people feel shortchanged. This tool includes it.</p>
  <p>Realistic bedtimes improve sleep duration. The calculator turns the delay into an actionable clock time.</p>
  <p>Use it to plan rest. The tool's value is latency-aware bedtime calculation.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Latency?",
    answer:"Time to fall asleep.",
  },
{
    question:"Why include it?",
    answer:"Makes bedtime accurate.",
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
    answer:"Planning sleep.",
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
          <h3>Why Use Our Sleep Latency & Alarm Clock?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Sleep Latency & Alarm Clock provides
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

      <RelatedTools currentToolUrl="/tools/time/sleep-latency" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
