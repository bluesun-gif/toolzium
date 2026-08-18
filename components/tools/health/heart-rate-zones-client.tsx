"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton } from"@/components/shared/action-buttons";
import { Activity, Calculator, Heart, HeartPulse, User } from"lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { cn } from"@/lib/utils";

type ZoneInfo = {
  name: string;
  min: number;
  max: number;
  color: string;
  description: string;
};
export function HeartRateZonesClient() {
  const [age, setAge] = useState<string>("30");
  const [restingHr, setRestingHr] = useState<string>("60");
  const [customMaxHr, setCustomMaxHr] = useState<string>("");
  const [method, setMethod] = useState<"standard" | "karvonen">("karvonen");
  const {
    maxHr,
    zones
  } = useMemo(() => {
    const ageNum = parseInt(age) || 30;
    const restHrNum = parseInt(restingHr) || 60;
    let calculatedMaxHr = 220 - ageNum;
    if (customMaxHr && !isNaN(parseInt(customMaxHr))) {
      calculatedMaxHr = parseInt(customMaxHr);
    }
    const getHr = (percent: number) => {
      if (method === "karvonen") {
        const hrr = calculatedMaxHr - restHrNum; // Heart Rate Reserve
        return Math.round(restHrNum + hrr * percent);
      } else {
        return Math.round(calculatedMaxHr * percent);
      }
    };
    const calculatedZones: ZoneInfo[] = [{
      name: "Recovery",
      min: getHr(0.5),
      max: getHr(0.6),
      color: "bg-gray-400",
      description: "50-60%: Very light, aids recovery"
    }, {
      name: "Fat Burn",
      min: getHr(0.6),
      max: getHr(0.7),
      color: "bg-blue-400",
      description: "60-70%: Light, builds endurance"
    }, {
      name: "Cardio",
      min: getHr(0.7),
      max: getHr(0.8),
      color: "bg-green-400",
      description: "70-80%: Moderate, aerobic fitness"
    }, {
      name: "Threshold",
      min: getHr(0.8),
      max: getHr(0.9),
      color: "bg-orange-400",
      description: "80-90%: Hard, increases lactate threshold"
    }, {
      name: "Maximum",
      min: getHr(0.9),
      max: getHr(1.0),
      color: "bg-red-500",
      description: "90-100%: Very hard, peak performance"
    }];
    return {
      maxHr: calculatedMaxHr,
      zones: calculatedZones
    };
  }, [age, restingHr, customMaxHr, method]);
  const handleReset = () => {
    setAge("30");
    setRestingHr("60");
    setCustomMaxHr("");
    setMethod("karvonen");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Heart} title="Heart Rate Zone Calculator" description="Calculate your optimal heart rate training zones using standard or Karvonen methods." actions={<>
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calculator className="h-5 w-5" /> Inputs
 </CardTitle>
 <CardDescription>Enter your stats</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Age (years)</Label>
 <Input type="number" value={age} onChange={e => setAge(e.target.value)} min="1" max="120" />
 </div>
 
 <div className="space-y-2">
 <Label>Resting Heart Rate (BPM)</Label>
 <Input type="number" value={restingHr} onChange={e => setRestingHr(e.target.value)} min="30" max="150" />
 </div>

 <div className="space-y-2">
 <Label>Custom Max HR (optional)</Label>
 <Input type="number" value={customMaxHr} onChange={e => setCustomMaxHr(e.target.value)} placeholder="Auto-calculated if blank" min="100" max="250" />
 </div>

 <div className="space-y-2">
 <Label>Calculation Method</Label>
 <Select value={method} onValueChange={(val: "standard" | "karvonen") => setMethod(val)}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="karvonen">Karvonen (Factors Resting HR)</SelectItem>
 <SelectItem value="standard">Standard (% of Max HR)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Activity className="h-5 w-5" /> Results
 </CardTitle>
 <CardDescription>Your Max HR: <span className="font-bold text-lg">{maxHr} BPM</span></CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-4">
 {zones.map((zone, idx) => <div key={idx} className="space-y-1">
 <div className="flex justify-between text-sm font-medium">
 <span>{zone.name} ({zone.min} - {zone.max} BPM)</span>
 </div>
 <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
 <div className={cn("h-full", zone.color)} style={{
                    width: '100%'
                  }}></div>
 </div>
 <p className="text-xs text-muted-foreground">{zone.description}</p>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Age",
    description:"Add your age.",
    icon: User,
  },
{
    step:"02",
    title:"Choose Method",
    description:"Max HR formula or test.",
    icon: HeartPulse,
  },
{
    step:"03",
    title:"Calculate",
    description:"See five training zones.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: User,
    title:"Age Based",
    description:"Estimates max heart rate.",
  },
{
    icon: HeartPulse,
    title:"Zone Breakdown",
    description:"Five intensity zones.",
  },
{
    icon: Calculator,
    title:"BPM Ranges",
    description:"Beats per zone.",
  },
{
    icon: Activity,
    title:"Training Aid",
    description:"Match workout to goal.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A heart rate zone calculator maps effort into five bands, helping you train at the right intensity. It estimates maximum heart rate from age, then derives zones from easy recovery to near-maximal. This tool gives the beats-per-minute ranges so you can target a session's purpose.</p>
  <p>Zones align training with goals. Lower zones build aerobic base; higher zones build speed and power. Knowing your numbers prevents the common mistake of training everything at medium effort, which yields mixed results. The calculator makes intentionality possible.</p>
  <p>Estimates vary by individual; a fitness test refines them. Pair with a heart rate monitor for live guidance. The tool's value is translating &quot;work hard&quot; into precise, goal-matched intensity ranges that make every session purposeful.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/health/heart-rate-zones" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What are HR zones?",
    answer:"Intensity bands from easy to maximal.",
  },
{
    question:"How is max HR estimated?",
    answer:"Often 220 minus age.",
  },
{
    question:"Which zone for fat burn?",
    answer:"Lower zones, though total burn matters more.",
  },
{
    question:"Accurate?",
    answer:"Estimates; testing is precise.",
  },
{
    question:"Use a monitor?",
    answer:"Yes, for live feedback.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default HeartRateZonesClient;
