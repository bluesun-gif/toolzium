"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Switch } from"@/components/ui/switch";
import { ResetButton } from"@/components/shared/action-buttons";
import { Activity, Calculator, Ruler, TrendingDown, TrendingUp, User } from"lucide-react";

export function BodyFatClient() {
 const [gender, setGender] = useState<"male"|"female">("male");
 const [isMetric, setIsMetric] = useState<boolean>(true);
 
 const [weight, setWeight] = useState<string>("70");
 const [height, setHeight] = useState<string>("175");
 const [neck, setNeck] = useState<string>("38");
 const [waist, setWaist] = useState<string>("85");
 const [hip, setHip] = useState<string>("100"); // for women

 const result = useMemo(() => {
 let w = parseFloat(weight);
 let h = parseFloat(height);
 let n = parseFloat(neck);
 let wa = parseFloat(waist);
 let hi = parseFloat(hip);

 if (!isMetric) {
 w = w * 0.453592;
 h = h * 2.54;
 n = n * 2.54;
 wa = wa * 2.54;
 hi = hi * 2.54;
 }

 if (!w || !h || !n || !wa || (gender ==="female"&& !hi)) return null;

 let bodyFat = 0;
 if (gender ==="male") {
 bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450;
 } else {
 bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(wa + hi - n) + 0.22100 * Math.log10(h)) - 450;
 }

 if (isNaN(bodyFat) || bodyFat < 0 || bodyFat > 100) return null;

 const fatMass = w * (bodyFat / 100);
 const leanMass = w - fatMass;

 let category ="Unknown";
 if (gender ==="male") {
 if (bodyFat >= 2 && bodyFat <= 5) category ="Essential fat";
 else if (bodyFat > 5 && bodyFat <= 13) category ="Athletes";
 else if (bodyFat > 13 && bodyFat <= 17) category ="Fitness";
 else if (bodyFat > 17 && bodyFat <= 24) category ="Average";
 else if (bodyFat > 24) category ="Obese";
 } else {
 if (bodyFat >= 10 && bodyFat <= 13) category ="Essential fat";
 else if (bodyFat > 13 && bodyFat <= 20) category ="Athletes";
 else if (bodyFat > 20 && bodyFat <= 24) category ="Fitness";
 else if (bodyFat > 24 && bodyFat <= 31) category ="Average";
 else if (bodyFat > 31) category ="Obese";
 }

 return {
 bodyFat: bodyFat.toFixed(1),
 fatMass: (isMetric ? fatMass : fatMass / 0.453592).toFixed(1),
 leanMass: (isMetric ? leanMass : leanMass / 0.453592).toFixed(1),
 category,
 unit: isMetric ?"kg":"lbs"
 };
 }, [gender, isMetric, weight, height, neck, waist, hip]);

 const reset = () => {
 setGender("male");
 setIsMetric(true);
 setWeight("70");
 setHeight("175");
 setNeck("38");
 setWaist("85");
 setHip("100");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Ruler}
 title="Body Fat Calculator"
 description="Estimate your body fat percentage using the US Navy method."
 actions={<ResetButton onClick={reset} label="Reset"/>}
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Measurements</CardTitle>
 <CardDescription>Enter your body measurements</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex items-center justify-between">
 <Label>Unit System</Label>
 <div className="flex items-center gap-2">
 <span className={"text-sm"+ (!isMetric ?"font-bold":"text-muted-foreground")}>Imperial (in/lbs)</span>
 <Switch checked={isMetric} onCheckedChange={setIsMetric} />
 <span className={"text-sm"+ (isMetric ?"font-bold":"text-muted-foreground")}>Metric (cm/kg)</span>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Gender</Label>
 <Select value={gender} onValueChange={(v:"male"|"female") => setGender(v)}>
 <SelectTrigger>
 <SelectValue placeholder="Gender"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="male">Male</SelectItem>
 <SelectItem value="female">Female</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Weight ({isMetric ?"kg":"lbs"})</Label>
 <Input type="number"value={weight} onChange={(e) => setWeight(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Height ({isMetric ?"cm":"in"})</Label>
 <Input type="number"value={height} onChange={(e) => setHeight(e.target.value)} />
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Neck ({isMetric ?"cm":"in"})</Label>
 <Input type="number"value={neck} onChange={(e) => setNeck(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Waist ({isMetric ?"cm":"in"})</Label>
 <Input type="number"value={waist} onChange={(e) => setWaist(e.target.value)} />
 </div>
 </div>

 {gender ==="female"&& (
 <div className="space-y-2">
 <Label>Hip ({isMetric ?"cm":"in"})</Label>
 <Input type="number"value={hip} onChange={(e) => setHip(e.target.value)} />
 </div>
 )}
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><TrendingDown className="w-5 h-5 text-green-500"/> Result</CardTitle>
 </CardHeader>
 <CardContent>
 {result ? (
 <div className="space-y-6">
 <div className="text-center py-4">
 <div className="text-5xl font-bold text-primary">{result.bodyFat}%</div>
 <div className="text-lg font-medium mt-2 text-muted-foreground">{result.category}</div>
 </div>
 
 <div className="space-y-2">
 <div className="flex justify-between text-sm">
 <span>Body Fat</span>
 <span>{result.bodyFat}%</span>
 </div>
 <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
 <div className="h-full bg-primary"style={{ width: `${Math.min(parseFloat(result.bodyFat), 100)}%` }} />
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4 pt-4 border-t">
 <div className="text-center">
 <div className="text-sm text-muted-foreground">Fat Mass</div>
 <div className="text-xl font-semibold">{result.fatMass} {result.unit}</div>
 </div>
 <div className="text-center">
 <div className="text-sm text-muted-foreground">Lean Mass</div>
 <div className="text-xl font-semibold">{result.leanMass} {result.unit}</div>
 </div>
 </div>
 </div>
 ) : (
 <div className="text-center py-6 text-muted-foreground">
 Enter valid measurements to see results
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Measurements",
    description:"Add gender, weight, and metrics.",
    icon: Ruler,
  },
{
    step:"02",
    title:"Calculate",
    description:"Estimate body fat percentage.",
    icon: Calculator,
  },
{
    step:"03",
    title:"Interpret",
    description:"See category and health range.",
    icon: Activity,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Ruler,
    title:"Measurement Based",
    description:"Uses simple inputs.",
  },
{
    icon: Calculator,
    title:"BF% Estimate",
    description:"Approximates composition.",
  },
{
    icon: Activity,
    title:"Category View",
    description:"Essential to athletic ranges.",
  },
{
    icon: TrendingUp,
    title:"Progress Track",
    description:"Monitor over time.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A body fat calculator estimates composition, a sharper lens than weight alone. The scale cannot tell muscle from fat; body fat percentage can. This tool uses simple measurements to approximate it, helping you track whether changes come from fat loss or muscle gain — the distinction that defines fitness progress.</p>
  <p>Estimates vary by method. Home calculations are less precise than clinical tools like DEXA, but they reveal trends if measured consistently. The calculator provides a category view from essential to athletic, so you interpret the number in context rather than chasing an arbitrary figure.</p>
  <p>Use it monthly, not daily, since fluctuation is normal. Pair with photos and strength gains for a fuller picture. The tool's value is moving beyond the scale to a metric that actually reflects body composition, guiding smarter training and nutrition choices.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why measure body fat?",
    answer:"Weight alone hides muscle versus fat.",
  },
{
    question:"Accurate?",
    answer:"Estimates; DEXA is more precise.",
  },
{
    question:"What is healthy?",
    answer:"Ranges vary by age and sex.",
  },
{
    question:"Better than scale?",
    answer:"Yes, it shows composition change.",
  },
{
    question:"How often?",
    answer:"Monthly is enough to see trends.",
  }
  ]}
/>
</div>
 );
}
