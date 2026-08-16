"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton } from"@/components/shared/action-buttons";
import { Activity, Award, Calculator, Clock, Heart, Moon, ShieldCheck } from"lucide-react";
import { toast } from"react-hot-toast";

export function SleepEfficiencyClient() {
  const [inBedTime, setInBedTime] = useState("22:00");
  const [fallAsleepTime, setFallAsleepTime] = useState("22:30");
  const [finalWakeTime, setFinalWakeTime] = useState("06:00");
  const [outOfBedTime, setOutOfBedTime] = useState("06:30");
  const [awakeningsDuration, setAwakeningsDuration] = useState("30");
  const [efficiency, setEfficiency] = useState<number | null>(null);
  const [grade, setGrade] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const calculate = () => {
    try {
      const parseTime = (timeStr: string) => {
        const [h, m] = timeStr.split(":").map(Number);
        return h * 60 + m;
      };
      let inBed = parseTime(inBedTime);
      let fallAsleep = parseTime(fallAsleepTime);
      let finalWake = parseTime(finalWakeTime);
      let outOfBed = parseTime(outOfBedTime);
      if (fallAsleep < inBed) fallAsleep += 24 * 60;
      if (finalWake < inBed) finalWake += 24 * 60;
      if (outOfBed < inBed) outOfBed += 24 * 60;
      const totalTimeInBed = outOfBed - inBed;
      const timeAsleep = finalWake - fallAsleep - Number(awakeningsDuration);
      if (totalTimeInBed <= 0 || timeAsleep < 0) {
        toast.error("Invalid time inputs. Ensure times are logically ordered.");
        return;
      }
      const eff = timeAsleep / totalTimeInBed * 100;
      setEfficiency(eff);
      if (eff >= 90) {
        setGrade("A+");
        setInterpretation("Excellent sleep efficiency.");
      } else if (eff >= 85) {
        setGrade("A");
        setInterpretation("Normal, healthy sleep efficiency.");
      } else if (eff >= 75) {
        setGrade("B");
        setInterpretation("Slightly low efficiency. Consider reducing time in bed while awake.");
      } else if (eff >= 65) {
        setGrade("C");
        setInterpretation("Low efficiency. You may be spending too much time in bed not sleeping.");
      } else {
        setGrade("F");
        setInterpretation("Very low efficiency. If persistent, consider consulting a sleep specialist.");
      }
    } catch (e) {
      toast.error("Please enter valid times.");
    }
  };
  const handleReset = () => {
    setInBedTime("22:00");
    setFallAsleepTime("22:30");
    setFinalWakeTime("06:00");
    setOutOfBedTime("06:30");
    setAwakeningsDuration("30");
    setEfficiency(null);
    setGrade("");
    setInterpretation("");
    toast.success("Reset successful");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Moon} title="Sleep Efficiency Calculator" description="Calculate your Sleep Efficiency Percentage and Sleep Quality Score." actions={<div className="flex gap-2">
 <ResetButton onClick={handleReset} label="Reset" />
 </div>} />
 
 <div className="grid gap-6 md:grid-cols-2">
 <GlassCard>
 <CardHeader>
 <CardTitle>Sleep Log</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Time got into bed</Label>
 <Input type="time" value={inBedTime} onChange={e => setInBedTime(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Time you think you fell asleep</Label>
 <Input type="time" value={fallAsleepTime} onChange={e => setFallAsleepTime(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Time of final wake up</Label>
 <Input type="time" value={finalWakeTime} onChange={e => setFinalWakeTime(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Time got out of bed</Label>
 <Input type="time" value={outOfBedTime} onChange={e => setOutOfBedTime(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Total duration of night awakenings (minutes)</Label>
 <Input type="number" value={awakeningsDuration} onChange={e => setAwakeningsDuration(e.target.value)} />
 </div>
 <Button className="w-full mt-4" onClick={calculate}>Calculate Efficiency</Button>
 </CardContent>
 </GlassCard>

 {efficiency !== null && <GlassCard>
 <CardHeader>
 <CardTitle>Your Sleep Quality</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="text-center p-6 bg-secondary/20 rounded-lg border">
 <p className="text-sm text-muted-foreground mb-2">Sleep Efficiency</p>
 <div className="text-5xl font-bold text-primary">{efficiency.toFixed(1)}%</div>
 <div className="mt-4 flex justify-center items-center gap-2">
 <span className={cn("text-2xl font-bold px-3 py-1 rounded-md", efficiency >= 85 ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600")}>
 Grade: {grade}
 </span>
 </div>
 </div>
 
 <div className="space-y-2">
 <h3 className="font-semibold flex items-center gap-2"><Heart className="w-4 h-4 text-rose-500" /> Clinical Interpretation</h3>
 <p className="text-sm text-muted-foreground">{interpretation}</p>
 </div>

 <div className="space-y-2">
 <h3 className="font-semibold flex items-center gap-2"><Award className="w-4 h-4 text-amber-500" /> Improvement Tips</h3>
 <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
 <li>Only use your bed for sleep and intimacy.</li>
 <li>If you can't sleep for 20+ minutes, get out of bed and do a relaxing activity until sleepy.</li>
 <li>Maintain a consistent wake time, even on weekends.</li>
 <li>Limit bright lights and screens 1-2 hours before bed.</li>
 </ul>
 </div>
 </CardContent>
 </GlassCard>}
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Times",
    description:"Time in bed vs asleep.",
    icon: Clock,
  },
{
    step:"02",
    title:"Compute",
    description:"See efficiency percentage.",
    icon: Calculator,
  },
{
    step:"03",
    title:"Interpret",
    description:"Understand the score.",
    icon: Activity,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Clock,
    title:"Times",
    description:"Bed and asleep.",
  },
{
    icon: Calculator,
    title:"Percentage",
    description:"Efficiency score.",
  },
{
    icon: Activity,
    title:"Interpret",
    description:"What it means.",
  },
{
    icon: ShieldCheck,
    title:"Track",
    description:"Over nights.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A sleep efficiency calculator divides time actually asleep by time in bed, yielding a percentage that reflects sleep quality. Low scores signal restless nights even with enough hours. This tool computes and interprets the figure.</p>
  <p>The score guides improvement — reducing time awake in bed raises efficiency. Tracking over nights reveals trends.</p>
  <p>Use it to assess rest quality. The tool's value is a simple, meaningful sleep-quality metric.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is efficiency?",
    answer:"Asleep time over time in bed.",
  },
{
    question:"Good score?",
    answer:"85% plus is healthy.",
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
    answer:"Sleep quality.",
  }
  ]}
/>
</div>
 );
}
