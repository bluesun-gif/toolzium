"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { Activity, BarChart3, Calculator, Info, Ruler, Scale, TrendingUp, User } from"lucide-react";
import toast from"react-hot-toast";

type Gender ="male"|"female";
type HeightUnit ="cm"|"ft";

export function IdealWeightClient() {
  const [gender, setGender] = useState<Gender>("male");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [cm, setCm] = useState("175");
  const [ft, setFt] = useState("5");
  const [inc, setInc] = useState("9");
  const [currentWeight, setCurrentWeight] = useState("");
  const heightInInches = heightUnit === "cm" ? parseFloat(cm) / 2.54 : parseFloat(ft) * 12 + parseFloat(inc);
  const heightInMeters = heightInInches * 0.0254;
  const calculateWeights = () => {
    if (isNaN(heightInInches) || heightInInches < 60) return null; // Formulas typically start at 5ft (60 inches)

    const over5ft = Math.max(0, heightInInches - 60);
    let devine, robinson, miller, hamwi;
    if (gender === "male") {
      devine = 50 + 2.3 * over5ft;
      robinson = 52 + 1.9 * over5ft;
      miller = 56.2 + 1.41 * over5ft;
      hamwi = 48 + 2.7 * over5ft;
    } else {
      devine = 45.5 + 2.3 * over5ft;
      robinson = 49 + 1.7 * over5ft;
      miller = 53.1 + 1.36 * over5ft;
      hamwi = 45.5 + 2.2 * over5ft;
    }
    const minBMIWeight = 18.5 * (heightInMeters * heightInMeters);
    const maxBMIWeight = 24.9 * (heightInMeters * heightInMeters);
    return {
      devine,
      robinson,
      miller,
      hamwi,
      minBMIWeight,
      maxBMIWeight
    };
  };
  const results = calculateWeights();
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Scale} title="Ideal Weight Calculator" description="Calculate ideal body weight using multiple scientific formulas" actions={<ResetButton onClick={() => {
        setCm("175");
        setFt("5");
        setInc("9");
        setCurrentWeight("");
      }} label="Reset" />} />

 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Your Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Gender</Label>
 <Select value={gender} onValueChange={(v: Gender) => setGender(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="male">Male</SelectItem>
 <SelectItem value="female">Female</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Height Unit</Label>
 <Select value={heightUnit} onValueChange={(v: HeightUnit) => setHeightUnit(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="cm">Centimeters (cm)</SelectItem>
 <SelectItem value="ft">Feet & Inches (ft/in)</SelectItem>
 </SelectContent>
 </Select>
 </div>

 {heightUnit === "cm" ? <div className="space-y-2">
 <Label>Height (cm)</Label>
 <Input type="number" value={cm} onChange={e => setCm(e.target.value)} />
 </div> : <div className="grid grid-cols-2 gap-2">
 <div className="space-y-2">
 <Label>Feet</Label>
 <Input type="number" value={ft} onChange={e => setFt(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Inches</Label>
 <Input type="number" value={inc} onChange={e => setInc(e.target.value)} />
 </div>
 </div>}

 <div className="space-y-2">
 <Label>Current Weight (kg) - Optional</Label>
 <Input type="number" value={currentWeight} onChange={e => setCurrentWeight(e.target.value)} placeholder="e.g. 70" />
 </div>
 </CardContent>
 </GlassCard>

 <div className="md:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 <CardDescription>Based on multiple scientific formulas</CardDescription>
 </CardHeader>
 <CardContent>
 {!results ? <div className="text-center p-6 text-muted-foreground bg-muted/30 rounded-lg">
 Please enter a height of at least 5ft (152cm) to calculate ideal weight formulas.
 </div> : <div className="space-y-6">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="bg-muted/30 p-4 rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Devine</div>
 <div className="text-xl font-bold">{results.devine.toFixed(1)} kg</div>
 </div>
 <div className="bg-muted/30 p-4 rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Robinson</div>
 <div className="text-xl font-bold">{results.robinson.toFixed(1)} kg</div>
 </div>
 <div className="bg-muted/30 p-4 rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Miller</div>
 <div className="text-xl font-bold">{results.miller.toFixed(1)} kg</div>
 </div>
 <div className="bg-muted/30 p-4 rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Hamwi</div>
 <div className="text-xl font-bold">{results.hamwi.toFixed(1)} kg</div>
 </div>
 </div>
 
 <Separator />
 
 <div className="bg-primary/10 p-6 rounded-lg text-center">
 <h3 className="text-lg font-semibold mb-2">Healthy BMI Range (18.5 - 24.9)</h3>
 <div className="text-2xl font-bold text-primary">
 {results.minBMIWeight.toFixed(1)} - {results.maxBMIWeight.toFixed(1)} kg
 </div>
 </div>

 {currentWeight && !isNaN(parseFloat(currentWeight)) && <div className="p-4 rounded-lg bg-muted/30">
 <div className="flex items-center gap-2 mb-2 font-semibold">
 <User className="w-5 h-5 text-muted-foreground" /> Your Status
 </div>
 <p className="text-sm">
 Current weight: <strong>{currentWeight} kg</strong>. 
 Difference from Devine average: <strong>{(parseFloat(currentWeight) - results.devine).toFixed(1)} kg</strong>
 </p>
 </div>}

 <div className="flex items-start gap-2 text-xs text-muted-foreground mt-4">
 <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
 <p>
 Disclaimer: These formulas provide estimates based on population averages. They do not account for muscle mass, bone density, or body composition. Always consult with a healthcare professional for medical advice.
 </p>
 </div>
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Stats",
    description:"Add height, age, sex.",
    icon: Ruler,
  },
{
    step:"02",
    title:"Calculate",
    description:"See healthy weight range.",
    icon: Calculator,
  },
{
    step:"03",
    title:"Interpret",
    description:"Understand the range context.",
    icon: Activity,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Ruler,
    title:"Height Based",
    description:"Uses standard formulas.",
  },
{
    icon: Calculator,
    title:"Range View",
    description:"Healthy weight span.",
  },
{
    icon: Activity,
    title:"Context",
    description:"Muscle and frame vary.",
  },
{
    icon: TrendingUp,
    title:"Goal Setting",
    description:"Informs targets.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An ideal weight calculator estimates a healthy range from height, age, and sex using standard formulas. It returns a span, not a single number, acknowledging natural variation. This tool gives a reference point for goal setting without implying one &quot;correct&quot; weight.</p>
  <p>Context is critical. Muscle mass, bone structure, and genetics shift where an individual sits in the range; athletes may exceed it while healthy. The calculator provides a frame, not a verdict, so interpret it alongside how you feel and perform.</p>
  <p>Treat the range as informational, not a target to chase anxiously. Body composition often matters more than the scale. The tool's value is a sensible, personalized benchmark that informs realistic, healthy goals.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is ideal weight?",
    answer:"A healthy range for your height, not a single number.",
  },
{
    question:"Accurate?",
    answer:"Formulas estimate; bodies differ.",
  },
{
    question:"Muscle affects it?",
    answer:"Yes, athletes weigh more at same health.",
  },
{
    question:"Use for goals?",
    answer:"As a reference, not obsession.",
  },
{
    question:"Better metric?",
    answer:"Body composition beats weight alone.",
  }
  ]}
/>
</div>
 );
}
