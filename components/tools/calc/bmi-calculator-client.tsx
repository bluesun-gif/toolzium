"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, Copy, Activity, Scale, TrendingUp, ShieldCheck, Info } from "lucide-react";
import { CopyButton } from "@/components/shared/action-buttons";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ToolBackground } from "@/components/shared/tool-background";

const BMI_ZONES = [
  { label: "Severely Underweight", range: "< 16", color: "#6366f1", textColor: "text-indigo-500", pct: 0 },
  { label: "Underweight",          range: "16–18.5", color: "#3b82f6", textColor: "text-blue-500", pct: 14 },
  { label: "Normal Weight",        range: "18.5–25", color: "#22c55e", textColor: "text-green-500", pct: 30 },
  { label: "Overweight",           range: "25–30",   color: "#eab308", textColor: "text-yellow-500", pct: 60 },
  { label: "Obese Class I",        range: "30–35",   color: "#f97316", textColor: "text-orange-500", pct: 75 },
  { label: "Obese Class II+",      range: "> 35",    color: "#ef4444", textColor: "text-red-500", pct: 90 },
];

export default function BmiCalculatorClient() {
  const [weight, setWeight]           = useState<number>(70);
  const [height, setHeight]           = useState<number>(175);
  const [weightUnit, setWeightUnit]   = useState<"kg" | "lbs">("kg");
  const [heightUnit, setHeightUnit]   = useState<"cm" | "ft">("cm");

  const bmi = useMemo(() => {
    let weightKg = weight;
    let heightM  = height / 100;
    if (weightUnit === "lbs") weightKg = weight * 0.453592;
    if (heightUnit === "ft")  heightM  = height * 0.3048;
    if (weightKg <= 0 || heightM <= 0) return null;
    return weightKg / (heightM * heightM);
  }, [weight, height, weightUnit, heightUnit]);

  const category = useMemo(() => {
    if (bmi === null) return { label: "—", color: "text-muted-foreground", description: "", advice: "" };
    if (bmi < 16)   return { label: "Severely Underweight", color: "text-indigo-500", description: "BMI below 16 is associated with serious health risks and requires medical attention.", advice: "Consult a healthcare professional. Focus on nutrient-dense foods and strength training." };
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500", description: "Your weight is below the healthy range for your height.", advice: "Increase calorie intake with whole foods. Consider consulting a dietitian." };
    if (bmi < 25)   return { label: "Normal Weight ✓", color: "text-green-500", description: "Your BMI is within the healthy range. Maintain your current lifestyle.", advice: "Continue balanced nutrition, regular exercise, and routine health check-ups." };
    if (bmi < 30)   return { label: "Overweight", color: "text-yellow-500", description: "Your weight is slightly above the healthy range for your height.", advice: "Aim for 150+ min/week of moderate exercise and reduce processed food intake." };
    if (bmi < 35)   return { label: "Obese (Class I)", color: "text-orange-500", description: "Your BMI indicates obesity, which increases health risks.", advice: "Work with a healthcare provider on a structured diet and exercise plan." };
    return { label: "Obese (Class II+)", color: "text-red-500", description: "Your BMI is significantly elevated. Medical guidance is strongly recommended.", advice: "Seek support from a physician or specialist for a safe weight management strategy." };
  }, [bmi]);

  const bmiScalePosition = useMemo(() => {
    if (bmi === null) return 0;
    const clamped = Math.min(Math.max(bmi, 15), 40);
    return ((clamped - 15) / 25) * 100;
  }, [bmi]);

  const idealWeightRange = useMemo(() => {
    let heightM = height / 100;
    if (heightUnit === "ft") heightM = height * 0.3048;
    if (heightM <= 0) return null;
    const minKg = 18.5 * heightM * heightM;
    const maxKg = 24.9 * heightM * heightM;
    if (weightUnit === "lbs") return { min: (minKg * 2.20462).toFixed(1), max: (maxKg * 2.20462).toFixed(1), unit: "lbs" };
    return { min: minKg.toFixed(1), max: maxKg.toFixed(1), unit: "kg" };
  }, [height, heightUnit, weightUnit]);

  const steps = [
    { step: "01", title: "Enter Your Weight", description: "Input your weight in kilograms or pounds using the unit selector.", icon: Scale },
    { step: "02", title: "Enter Your Height", description: "Input your height in centimeters or feet for accurate calculation.", icon: TrendingUp },
    { step: "03", title: "Get Instant Results", description: "See your BMI score, health category, visual scale, and personalized advice instantly.", icon: Activity },
  ];

  const features = [
    { icon: Scale,       title: "Dual Unit Support",       description: "Instantly switch between metric (kg/cm) and imperial (lbs/ft) without recalculating." },
    { icon: Activity,    title: "Animated Visual BMI Scale", description: "A color-coded gradient scale shows exactly where your BMI falls across 6 health zones." },
    { icon: Heart,       title: "6 WHO Health Categories",  description: "Classifies into all 6 WHO BMI categories from Severely Underweight to Obese Class II+." },
    { icon: TrendingUp,  title: "Ideal Weight Range",       description: "Calculates your healthy weight range based on your exact height for a goal target." },
    { icon: Info,        title: "Personalized Health Tips", description: "Provides actionable, category-specific diet and exercise advice for each BMI range." },
    { icon: ShieldCheck, title: "100% Private Calculation", description: "All computation runs locally in your browser. No personal health data ever leaves your device." },
  ];

  const faqs = [
    {
      question: "What is BMI and how is it calculated?",
      answer: "Body Mass Index (BMI) is a numerical value calculated by dividing your weight in kilograms by the square of your height in meters (kg/m²). For example, a person weighing 70 kg at 1.75 m has a BMI of 70 ÷ (1.75 × 1.75) = 22.9. It was developed by Belgian statistician Adolphe Quetelet in the 1830s and is now the most widely used screening tool for assessing healthy body weight."
    },
    {
      question: "What is a healthy BMI range for adults?",
      answer: "According to the World Health Organization (WHO), a BMI between 18.5 and 24.9 is considered normal and healthy for most adults. Below 18.5 indicates underweight, 25–29.9 indicates overweight, and 30 or above indicates obesity. For Asian populations, the WHO recommends using slightly lower cutoffs (23 for overweight, 27.5 for obesity) due to differences in body composition and health risk."
    },
    {
      question: "Is BMI accurate for athletes and muscular people?",
      answer: "BMI is a screening tool, not a diagnostic one, and it has notable limitations for athletes and bodybuilders. Since muscle is denser than fat, highly muscular individuals may score in the 'overweight' or 'obese' range despite having very low body fat percentages. For athletes, body composition measurements like DEXA scans, hydrostatic weighing, or skinfold calipers provide a more accurate picture of health than BMI alone."
    },
    {
      question: "Does BMI apply to children and teenagers?",
      answer: "Standard adult BMI categories do not apply to children and adolescents. For people aged 2–19, BMI is plotted on age and sex-specific growth charts as a 'BMI-for-age percentile.' A child at the 85th–95th percentile is considered overweight, and at or above the 95th percentile is considered obese. Always consult a pediatrician for children's weight assessments rather than using adult BMI calculations."
    },
    {
      question: "How is BMI different from body fat percentage?",
      answer: "BMI is a proxy measurement based only on height and weight — it doesn't directly measure fat. Body fat percentage measures the actual proportion of your body that is fat tissue. Two people with identical BMIs can have very different body fat percentages depending on their muscle mass, bone density, and body water content. While BMI is useful for large-scale population studies, body fat percentage is a more precise health indicator for individuals."
    },
    {
      question: "How can I lower my BMI safely?",
      answer: "Sustainable BMI reduction comes from a caloric deficit combined with strength training to preserve muscle mass. Evidence-based guidelines suggest aiming for 0.5–1 kg (1–2 lbs) of weight loss per week maximum — faster loss often causes muscle loss and nutritional deficiencies. Key strategies include: portion control, prioritizing protein and vegetables, 150–300 minutes of weekly moderate cardio, and progressive resistance training. Always consult a registered dietitian or physician before starting any weight loss program."
    },
  ];

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6 max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8">

        <ToolPageHeader
          icon={Heart}
          title="BMI Calculator & Health Weight Analyzer"
          description="Calculate your Body Mass Index (BMI) instantly. Get your WHO health category, visual scale position, ideal weight range, and personalized advice — all computed locally with zero data uploads."
        />

        {/* Main workspace */}
        <BlurFade delay={0.1} inView>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input card */}
            <GlassCard className="p-5 sm:p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" /> Your Measurements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-5">
                {/* Weight */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground block">Weight</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={weight}
                      onChange={e => setWeight(Number(e.target.value))}
                      min={1} max={500}
                      className="flex-1 font-mono font-bold text-base"
                    />
                    <div className="flex rounded-lg border border-border overflow-hidden text-xs font-semibold">
                      {(["kg", "lbs"] as const).map(u => (
                        <button key={u} type="button" onClick={() => setWeightUnit(u)}
                          className={`px-3 py-2 transition-colors ${weightUnit === u ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}>
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Height */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground block">Height</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={height}
                      onChange={e => setHeight(Number(e.target.value))}
                      min={1} max={300}
                      className="flex-1 font-mono font-bold text-base"
                    />
                    <div className="flex rounded-lg border border-border overflow-hidden text-xs font-semibold">
                      {(["cm", "ft"] as const).map(u => (
                        <button key={u} type="button" onClick={() => setHeightUnit(u)}
                          className={`px-3 py-2 transition-colors ${heightUnit === u ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}>
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BMI Zone reference table */}
                <div className="mt-4 space-y-1.5">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">WHO BMI Categories</div>
                  {BMI_ZONES.map(z => (
                    <div key={z.label} className={`flex justify-between text-xs py-1 px-2 rounded-lg ${bmi !== null && Math.abs(bmiScalePosition - z.pct) < 15 ? "bg-primary/5 font-bold" : ""}`}>
                      <span className={z.textColor}>{z.label}</span>
                      <span className="text-muted-foreground font-mono">{z.range}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </GlassCard>

            {/* Result card */}
            <GlassCard beam={bmi !== null} className="p-5 sm:p-6 flex flex-col justify-between">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" /> Your Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-1 flex flex-col gap-5">
                <AnimatePresence mode="wait">
                  {bmi !== null ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="space-y-5"
                    >
                      {/* Big BMI number */}
                      <div className="text-center p-6 rounded-2xl bg-muted/40">
                        <div className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Your BMI</div>
                        <motion.div
                          key={bmi.toFixed(1)}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="text-6xl font-black tracking-tight text-foreground tabular-nums"
                        >
                          {bmi.toFixed(1)}
                        </motion.div>
                        <div className={`text-lg font-bold mt-1 ${category.color}`}>{category.label}</div>
                        <div className="text-xs text-muted-foreground mt-2 max-w-xs mx-auto leading-relaxed">{category.description}</div>
                        <div className="mt-3">
                          <CopyButton getText={() => bmi.toFixed(1)} label="Copy BMI" />
                        </div>
                      </div>

                      {/* Animated BMI scale */}
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">BMI Scale</div>
                        <div className="relative h-5 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right, #6366f1, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)" }}>
                          <motion.div
                            className="absolute top-0 w-2 h-full bg-white border-2 border-gray-800 rounded-full shadow-lg"
                            initial={{ left: "0%" }}
                            animate={{ left: `${bmiScalePosition}%` }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            style={{ transform: "translateX(-50%)" }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                          <span>15</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40</span>
                        </div>
                      </div>

                      {/* Ideal weight range */}
                      {idealWeightRange && (
                        <div className="p-3 rounded-xl bg-primary/5 border border-primary/15">
                          <div className="text-xs font-semibold text-muted-foreground mb-1">Ideal Weight Range for Your Height</div>
                          <div className="text-base font-bold text-foreground">
                            {idealWeightRange.min}–{idealWeightRange.max} {idealWeightRange.unit}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">Based on WHO healthy BMI range (18.5–24.9)</div>
                        </div>
                      )}

                      {/* Advice */}
                      <div className="p-3 rounded-xl bg-muted/30 border border-border/60">
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Personalized Advice</div>
                        <div className="text-xs text-foreground leading-relaxed">{category.advice}</div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground py-12 space-y-3">
                      <Heart className="w-12 h-12 mx-auto opacity-20" />
                      <p className="text-sm font-semibold">Enter measurements to calculate</p>
                    </div>
                  )}
                </AnimatePresence>
              </CardContent>
            </GlassCard>
          </div>
        </BlurFade>

        <ToolHowItWorks steps={steps} badges={["WHO Standards", "Instant Results", "Zero Data Upload", "Metric & Imperial"]} />

        <ToolFeatureGuides features={features}>
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>What Is BMI and Why Does It Matter?</h3>
            <p>Body Mass Index (BMI) is the global standard screening tool recommended by the World Health Organization (WHO) and the Centers for Disease Control (CDC) for assessing whether a person has a healthy body weight relative to their height. Calculated as weight (kg) divided by height squared (m²), BMI is used by healthcare providers, insurance companies, fitness professionals, and public health researchers to categorize populations into weight status groups and identify individuals at higher risk of weight-related health conditions.</p>

            <h3>BMI vs. Body Fat Percentage vs. Waist Circumference</h3>
            <p>While BMI is universally used due to its simplicity, it is just one of several body composition metrics. Body fat percentage (measured by DEXA scan or bioelectrical impedance) directly quantifies fat tissue, making it more accurate for athletes. Waist-to-height ratio is increasingly recognized as a stronger predictor of cardiovascular risk. For the most complete picture, health professionals typically use a combination of BMI, waist circumference, and metabolic markers (blood pressure, cholesterol, fasting glucose).</p>

            <h3>BMI Limitations to Know</h3>
            <ul>
              <li><strong>Doesn't measure fat vs. muscle:</strong> A bodybuilder may be classified as "obese" by BMI despite having very low body fat.</li>
              <li><strong>Age differences:</strong> Older adults naturally have more body fat at the same BMI as younger adults.</li>
              <li><strong>Ethnic variations:</strong> Research shows Asian populations have higher health risks at lower BMI thresholds than Western populations.</li>
              <li><strong>Sex differences:</strong> Women naturally carry more body fat than men at the same BMI.</li>
              <li><strong>Not suitable for children:</strong> Children require age-specific BMI-for-age percentiles.</li>
            </ul>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion faqs={faqs} />
        <RelatedTools currentToolUrl="/tools/calc/bmi-calculator" max={6} />
      </div>
    </div>
  );
}
