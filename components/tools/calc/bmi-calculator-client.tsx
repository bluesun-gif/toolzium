"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Heart, Copy } from"lucide-react";
import { CopyButton } from"@/components/shared/action-buttons";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

export default function BmiCalculatorClient() {
 const [weight, setWeight] = useState<number>(70);
 const [height, setHeight] = useState<number>(175);
 const [weightUnit, setWeightUnit] = useState<"kg"|"lbs">("kg");
 const [heightUnit, setHeightUnit] = useState<"cm"|"ft">("cm");

 const bmi = useMemo(() => {
 let weightKg = weight;
 let heightM = height / 100;

 if (weightUnit ==="lbs") {
 weightKg = weight * 0.453592;
 }

 if (heightUnit ==="ft") {
 heightM = height * 0.3048;
 }

 if (weightKg <= 0 || heightM <= 0) return null;

 return weightKg / (heightM * heightM);
 }, [weight, height, weightUnit, heightUnit]);

 const category = useMemo(() => {
 if (bmi === null) return { label:"—", color:"text-muted-foreground"};
 if (bmi < 18.5) return { label:"Underweight", color:"text-primary"};
 if (bmi < 25) return { label:"Normal weight", color:"text-green-500"};
 if (bmi < 30) return { label:"Overweight", color:"text-yellow-500"};
 return { label:"Obese", color:"text-red-500"};
 }, [bmi]);

 const bmiScalePosition = useMemo(() => {
 if (bmi === null) return 0;
 const clamped = Math.min(Math.max(bmi, 15), 40);
 return ((clamped - 15) / 25) * 100;
 }, [bmi]);

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Heart}
 title="BMI Calculator"
 description="Calculate your Body Mass Index and understand what it means for your health."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Heart className="w-4 h-4 text-primary"/> Your Measurements
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">Weight</label>
 <div className="flex gap-2">
 <Input
 type="number"
 value={weight}
 onChange={(e) => setWeight(Number(e.target.value))}
 min={1}
 className="flex-1"
 />
 <select
 value={weightUnit}
 onChange={(e) => setWeightUnit(e.target.value as any)}
 className="rounded-lg border border-border/70 bg-background/80 px-3 text-sm"
 >
 <option value="kg">kg</option>
 <option value="lbs">lbs</option>
 </select>
 </div>
 </div>

 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">Height</label>
 <div className="flex gap-2">
 <Input
 type="number"
 value={height}
 onChange={(e) => setHeight(Number(e.target.value))}
 min={1}
 className="flex-1"
 />
 <select
 value={heightUnit}
 onChange={(e) => setHeightUnit(e.target.value as any)}
 className="rounded-lg border border-border/70 bg-background/80 px-3 text-sm"
 >
 <option value="cm">cm</option>
 <option value="ft">ft</option>
 </select>
 </div>
 </div>
 </div>

 {bmi !== null && (
 <div className="space-y-4">
 <div className="p-6 bg-muted/40 rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-2">Your BMI</div>
 <div className="text-5xl font-bold mb-2">{bmi.toFixed(1)}</div>
 <div className={`text-lg font-semibold ${category.color}`}>
 {category.label}
 </div>
 <div className="mt-3">
 <CopyButton getText={() => bmi.toFixed(1)} label="Copy BMI"/>
 </div>
 </div>

 <div className="space-y-2">
 <div className="text-xs text-muted-foreground">BMI Scale</div>
 <div className="relative h-8 bg-gradient-to-r from-primary via-green-400 via-yellow-400 to-red-400 rounded-full overflow-hidden">
 <div
 className="absolute top-0 w-1 h-full bg-background border-2 border-black"
 style={{ left: `${bmiScalePosition}%` }}
 />
 </div>
 <div className="flex justify-between text-xs text-muted-foreground">
 <span>15</span>
 <span>18.5</span>
 <span>25</span>
 <span>30</span>
 <span>40</span>
 </div>
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Enter Weight", description:"Input your weight in kilograms or pounds.", icon: Heart },
 { step:"02", title:"Enter Height", description:"Input your height in centimeters or feet.", icon: Heart },
 { step:"03", title:"View Results", description:"See your BMI value, category, and position on the scale.", icon: Copy },
 ]}
 badges={["100% Free","Client-Side","Instant"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Heart, title:"Unit Flexibility", description:"Supports both metric (kg/cm) and imperial (lbs/ft) measurements."},
 { icon: Copy, title:"Visual BMI Scale", description:"See where your BMI falls on a color-coded health spectrum."},
 { icon: Heart, title:"Health Categories", description:"Automatically classifies your BMI into standard health categories."},
 { icon: Copy, title:"Instant Calculation", description:"BMI updates in real-time as you adjust your measurements."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Body Mass Index (BMI) is a widely used screening tool that estimates whether a person has a healthy body weight for their height. Calculated as weight in kilograms divided by height in meters squared (kg/m²), BMI provides a simple numeric indicator that correlates with body fatness for most people.</p>
 <p>The World Health Organization classifies BMI into four main categories: underweight (below 18.5), normal weight (18.5-24.9), overweight (25-29.9), and obese (30 and above). While BMI is useful for population-level health assessments, it has limitations — it doesn't distinguish between muscle and fat mass, so very muscular individuals may be classified as overweight despite having low body fat.</p>
 <p>This calculator supports both metric and imperial units for convenience. The visual BMI scale shows exactly where you fall on the health spectrum, making it easy to understand your results at a glance. Remember that BMI is just one health indicator — factors like body composition, waist circumference, fitness level, and overall health markers provide a more complete picture of your wellness.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What is a healthy BMI range?", answer:"A BMI between 18.5 and 24.9 is considered normal/healthy for most adults."},
 { question:"Is BMI accurate for athletes?", answer:"BMI may overestimate body fat in very muscular people since it doesn't distinguish between muscle and fat mass."},
 { question:"Does BMI apply to children?", answer:"Children and teens use age and sex-specific BMI percentiles rather than adult categories. Consult a pediatrician for children's BMI assessment."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/calc/bmi-calculator" max={6} />
 </div>
 );
}
