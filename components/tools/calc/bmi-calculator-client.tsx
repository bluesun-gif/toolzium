"use client";

import { ActivitySquare, Calculator, Info, Ruler, Weight, Heart, Sparkles, ShieldCheck, Scale, BookOpen, Shield, Activity, BarChart3, AlertTriangle, CheckCircle, User } from "lucide-react";
import { useMemo, useState } from "react";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SelectField from "@/components/shared/form-fields/select-field";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import Stat from "@/components/shared/stat";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";
import {
  trackToolConversion,
  trackToolUsage,
  trackUserEngagement,
} from "@/lib/gtm";
import toast from "react-hot-toast";

type HeightUnit = "cm" | "in";
type WeightUnit = "kg" | "lb";

export default function BMICalculatorClient() {
  const [heightValue, setHeightValue] = useState<string>("175");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [weightValue, setWeightValue] = useState<string>("70");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");

  const [note, setNote] = useState<string>("");

  const sanitize = (val: string) => {
    const cleaned = val.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    return parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned;
  };

  const pretty = (n: number, d = 1) => (Number.isFinite(n) ? n.toFixed(d) : "—");

  const parsed = useMemo(() => {
    const h = parseFloat(heightValue);
    const w = parseFloat(weightValue);

    if (!h || !w || h <= 0 || w <= 0) return null;
    if ((heightUnit === "cm" && h < 50) || (heightUnit === "in" && h < 20)) return null;
    if ((weightUnit === "kg" && w < 20) || (weightUnit === "lb" && w < 45)) return null;

    const meters = heightUnit === "cm" ? h / 100 : h * 0.0254;
    const kg = weightUnit === "kg" ? w : w * 0.45359237;
    const bmi = kg / (meters * meters);

    let category: "Underweight" | "Healthy Weight" | "Overweight" | "Obese" = "Healthy Weight";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Healthy Weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    const minKg = 18.5 * meters * meters;
    const maxKg = 24.9 * meters * meters;

    return { bmi, category, minKg, maxKg, meters, kg };
  }, [heightValue, heightUnit, weightValue, weightUnit]);

  const rangeText = useMemo(() => {
    if (!parsed) return "—";
    const fmt = (n: number, d = 1) =>
      n.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });

    const { minKg, maxKg } = parsed;
    if (weightUnit === "kg") return `${fmt(minKg, 1)} – ${fmt(maxKg, 1)} kg`;
    const minLb = minKg / 0.45359237;
    const maxLb = maxKg / 0.45359237;
    return `${fmt(minLb, 1)} – ${fmt(maxLb, 1)} lb`;
  }, [parsed, weightUnit]);

  const categoryBadge = (cat?: string) => {
    if (!cat) return null;
    const tone =
      cat === "Healthy Weight"
        ? "bg-emerald-500/15 text-emerald-600 font-bold border-emerald-500/30"
        : cat === "Underweight"
          ? "bg-amber-500/15 text-amber-600 font-bold border-amber-500/30"
          : cat === "Overweight"
            ? "bg-orange-500/15 text-orange-600 font-bold border-orange-500/30"
            : "bg-red-500/15 text-red-600 font-bold border-red-500/30";
    return (
      <Badge variant="outline" className={`text-sm px-3 py-1 ${tone}`}>
        {cat}
      </Badge>
    );
  };

  function resetAll() {
    setHeightValue("175");
    setHeightUnit("cm");
    setWeightValue("70");
    setWeightUnit("kg");
    setNote("");
    toast.success("BMI Calculator reset");
  }

  function calculate() {
    trackToolUsage("BMI Calculator", "Calculators");
    trackUserEngagement("BMI Calculator", "calculate_attempt");

    if (!heightValue || !weightValue) {
      toast.error("Please enter both height and weight.");
      return;
    }
    const h = parseFloat(heightValue);
    const w = parseFloat(weightValue);
    if (!h || !w || h <= 0 || w <= 0) {
      toast.error("Values must be positive numbers.");
    } else if ((heightUnit === "cm" && h < 50) || (heightUnit === "in" && h < 20)) {
      toast.error("Height looks too small — please recheck.");
    } else if ((weightUnit === "kg" && w < 20) || (weightUnit === "lb" && w < 45)) {
      toast.error("Weight looks too small — please recheck.");
    } else {
      trackToolConversion("BMI Calculator", "calculated");
      toast.success("BMI Calculated!");
    }
  }

  const steps = [
    {
      step: "01",
      title: "Enter Height & Weight",
      description: "Type your measurements and select Metric (cm/kg) or Imperial (inches/lbs) units.",
      icon: Ruler,
    },
    {
      step: "02",
      title: "Calculate BMI Score",
      description: "Click Calculate to compute your exact Body Mass Index score using WHO medical standards.",
      icon: Scale,
    },
    {
      step: "03",
      title: "View Category & Target Range",
      description: "See your color-coded category (Underweight, Healthy, Overweight, Obese) and recommended target weight range.",
      icon: Heart,
    },
  ];

  const features = [
    {
      title: "Metric & Imperial Support",
      description: "Toggle seamlessly between Centimeters (cm) & Kilograms (kg) or Inches (in) & Pounds (lb).",
      icon: Ruler,
    },
    {
      title: "WHO Standard Categories",
      description: "Instant color-coded assessment aligning with World Health Organization (WHO) clinical weight criteria.",
      icon: Heart,
    },
    {
      title: "Healthy Target Weight Range",
      description: "Automatically computes your personal optimal healthy weight boundaries for your exact height.",
      icon: Scale,
    },
    {
      title: "Personal Session Notes",
      description: "Save local notes (e.g. morning weigh-in, post-workout) stored privately in your browser session.",
      icon: ActivitySquare,
    },
    {
      title: "Instant Live Recalculation",
      description: "Updates automatically as you tweak numbers or switch measurement units without full page reloads.",
      icon: Sparkles,
    },
    {
      title: "100% In-Browser Privacy",
      description: "Your personal weight and health numbers are never recorded, logged, or uploaded to external servers.",
      icon: ShieldCheck,
    },
  ];

  const faqs = [
    {
      question: "What is Body Mass Index (BMI)?",
      answer: "Body Mass Index (BMI) is a medical calculation that uses your height and weight to estimate overall body mass. It classifies weight into four general categories: Underweight, Healthy Weight, Overweight, and Obese.",
    },
    {
      question: "What are the standard WHO BMI categories?",
      answer: "Underweight: BMI under 18.5. Healthy Weight: BMI 18.5 – 24.9. Overweight: BMI 25.0 – 29.9. Obese: BMI 30.0 or higher.",
    },
    {
      question: "Is BMI accurate for athletes and bodybuilders?",
      answer: "BMI does not distinguish between muscle mass and fat mass. Trained athletes or bodybuilders with high muscle mass may be classified as 'Overweight' despite having low body fat.",
    },
    {
      question: "How is the Healthy Weight Range calculated?",
      answer: "The healthy weight range calculates the minimum and maximum weight in kilograms or pounds that corresponds to a healthy BMI between 18.5 and 24.9 for your height.",
    },
    {
      question: "Is my personal health data stored?",
      answer: "No. Toolzium calculates all health metrics locally in your web browser. We do not store, log, or track your weight or height inputs.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* SECTION 1: HEADER */}
      <ToolPageHeader
        icon={ActivitySquare}
        title="Free BMI Calculator & Healthy Weight Range"
        description="Calculate your Body Mass Index (BMI) instantly. Supports metric (cm/kg) and imperial (in/lb) units with color-coded health risk feedback."
        actions={
          <>
            <ResetButton onClick={resetAll} />
            <ActionButton
              variant="default"
              icon={Calculator}
              label="Calculate BMI"
              onClick={calculate}
            />
          </>
        }
      />

      {/* SECTION 2: PRIMARY WORKSPACE */}
      <GlassCard className="p-4 sm:p-5">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base font-semibold">Enter Your Measurements</CardTitle>
          <CardDescription>Select metric or imperial units and type your height and weight.</CardDescription>
        </CardHeader>

        <CardContent className="px-0 grid gap-6 sm:grid-cols-2">
          {/* Height */}
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <InputField
                icon={Ruler}
                label="Height"
                inputMode="decimal"
                placeholder={heightUnit === "cm" ? "175" : "69"}
                value={heightValue}
                onChange={(e) => setHeightValue(sanitize(e.target.value))}
              />

              <SelectField
                value={heightUnit}
                onValueChange={(v) => setHeightUnit(v as HeightUnit)}
                options={[
                  { label: "CM", value: "cm" },
                  { label: "INCH", value: "in" },
                ]}
              />
            </div>
            <p className="text-xs text-muted-foreground">Example: 175 cm or 69 inches</p>
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <InputField
                icon={Weight}
                label="Weight"
                inputMode="decimal"
                placeholder={weightUnit === "kg" ? "70" : "154"}
                value={weightValue}
                onChange={(e) => setWeightValue(sanitize(e.target.value))}
              />
              <SelectField
                value={weightUnit}
                onValueChange={(v) => setWeightUnit(v as WeightUnit)}
                options={[
                  { label: "KG", value: "kg" },
                  { label: "LB", value: "lb" },
                ]}
              />
            </div>
            <p className="text-xs text-muted-foreground">Example: 70 kg or 154 lbs</p>
          </div>
        </CardContent>
      </GlassCard>

      <Separator />

      {/* Results */}
      <GlassCard className="p-4 sm:p-5 mt-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base font-semibold">Your BMI Assessment</CardTitle>
          <CardDescription>Your calculated Body Mass Index, health category, and optimal target weight range.</CardDescription>
        </CardHeader>
        <CardContent className="px-0 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <GlassCard className="p-4 flex flex-col justify-between">
              <Stat
                label="BMI Score"
                value={parsed ? pretty(parsed.bmi, 1) : "—"}
                hint={parsed ? `Formula: kg / m²` : ""}
              />
            </GlassCard>
            <GlassCard className="p-4 flex flex-col justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Health Category</span>
                <div className="mt-2">
                  {parsed ? (
                    categoryBadge(parsed.category)
                  ) : (
                    <Badge variant="outline">—</Badge>
                  )}
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-4 flex flex-col justify-between">
              <Stat
                label="Healthy Weight Range"
                value={parsed ? rangeText : "—"}
                hint="Optimal range for your height"
              />
            </GlassCard>
          </div>

          {/* interpretation + note */}
          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard className="p-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="font-semibold text-foreground">WHO BMI Reference Ranges:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• <strong>Underweight:</strong> BMI less than 18.5</li>
                    <li>• <strong>Healthy Weight:</strong> BMI 18.5 – 24.9</li>
                    <li>• <strong>Overweight:</strong> BMI 25.0 – 29.9</li>
                    <li>• <strong>Obese:</strong> BMI 30.0 or higher</li>
                  </ul>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Session Notes</p>
                <TextareaField
                  placeholder="Record local notes (e.g. morning weigh-in, target goal)..."
                  value={note}
                  onValueChange={setNote}
                  className="min-h-[70px] text-xs"
                />
              </div>
            </GlassCard>
          </div>
        </CardContent>
      </GlassCard>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Enter Height & Weight",
            description: "Input your height and weight in metric (cm, kg) or imperial (ft/in, lbs) units. Switch between unit systems with a single click.",
            icon: User,
          },
          {
            step: "02",
            title: "Get Your BMI Score",
            description: "See your BMI number instantly, along with your WHO weight category (Underweight, Normal, Overweight, or Obese) and where you fall on the BMI scale.",
            icon: Activity,
          },
          {
            step: "03",
            title: "See Your Healthy Weight Range",
            description: "The tool shows the healthy weight range for your height, the weight you'd need to lose or gain to reach the normal BMI range, and your BMI category with context.",
            icon: BarChart3,
          },
        ]}
        badges={[
          "Metric & imperial",
          "WHO classification",
          "Healthy range shown",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Activity,
            title: "BMI Score & Category",
            description: "Calculates BMI using the standard formula (weight ÷ height²) and classifies it into WHO categories: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (≥30).",
          },
          {
            icon: Scale,
            title: "Metric & Imperial Units",
            description: "Supports both metric (kg, cm) and imperial (lbs, feet/inches) input. Converts between systems automatically so you get accurate results regardless of your preferred units.",
          },
          {
            icon: Heart,
            title: "Healthy Weight Range",
            description: "Shows the exact weight range (in your preferred units) that corresponds to a Normal BMI (18.5-24.9) for your specific height — not just a number but actionable context.",
          },
          {
            icon: BarChart3,
            title: "Visual BMI Scale",
            description: "Color-coded BMI scale shows where your score falls relative to all categories — underweight, normal, overweight, and obese — for immediate visual understanding.",
          },
          {
            icon: User,
            title: "Age & Sex Context",
            description: "Notes important context: BMI is calculated the same way for adults 20+ but has different interpretations for children, athletes, elderly, and pregnant women.",
          },
          {
            icon: Shield,
            title: "Private & Offline",
            description: "All BMI calculations run in your browser. Your height, weight, and health data are never sent to any server or stored anywhere.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">BMI Explained — What It Means and Its Limitations</h3>
          <p>
            <strong>Body Mass Index (BMI)</strong> is a simple screening tool that uses height and weight
            to estimate body fatness. Developed by Belgian statistician Adolphe Quetelet in the 1830s,
            BMI is widely used in clinical and public health settings because it requires no special
            equipment. However, it has important limitations that everyone should understand.
          </p>

          <h4 className="font-semibold">BMI Categories (WHO Classification)</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">BMI Range</th>
                  <th className="border p-2 text-left">Category</th>
                  <th className="border p-2 text-left">Health Risk</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["< 18.5", "Underweight", "Increased risk of nutritional deficiency, osteoporosis"],
                  ["18.5 – 24.9", "Normal weight", "Lowest health risk for most adults"],
                  ["25.0 – 29.9", "Overweight", "Increased risk of heart disease, diabetes"],
                  ["30.0 – 34.9", "Obese Class I", "High risk — medical evaluation recommended"],
                  ["35.0 – 39.9", "Obese Class II", "Very high risk"],
                  ["≥ 40.0", "Obese Class III", "Extremely high risk — clinical intervention needed"],
                ].map(([range, category, risk]) => (
                  <tr key={range} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-primary text-xs">{range}</td>
                    <td className="border p-2 font-medium text-xs">{category}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">BMI Limitations — Who Should Not Rely on BMI Alone</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Group</th>
                  <th className="border p-2 text-left">Why BMI May Be Misleading</th>
                  <th className="border p-2 text-left">Better Measure</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Athletes / Bodybuilders", "High muscle mass raises BMI without excess fat", "Body fat % (DEXA, skinfold)"],
                  ["Elderly (65+)", "May have normal BMI but low muscle mass (sarcopenia)", "Waist circumference + muscle mass"],
                  ["Children / Teens", "BMI-for-age percentile used, not adult categories", "CDC BMI-for-age charts"],
                  ["Pregnant women", "Weight gain is expected and healthy", "Gestational weight gain guidelines"],
                  ["Asian populations", "Higher health risks at lower BMI (25 = overweight)", "Asian-adjusted thresholds (23+)"],
                  ["Short stature", "BMI overestimates fatness for shorter people", "Waist-to-height ratio"],
                ].map(([group, why, better]) => (
                  <tr key={group} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{group}</td>
                    <td className="border p-2 text-xs">{why}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{better}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Beyond BMI — Additional Health Measures</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li><strong>Waist circumference:</strong> Men &gt;40 inches (102 cm), women &gt;35 inches (88 cm) indicates elevated metabolic risk regardless of BMI.</li>
            <li><strong>Waist-to-height ratio:</strong> Waist ÷ height &lt; 0.5 is the target. More predictive of cardiovascular risk than BMI.</li>
            <li><strong>Body fat percentage:</strong> Healthy ranges: men 10-20%, women 18-28%. Measured by DEXA scan, bioelectrical impedance, or skinfold calipers.</li>
            <li><strong>Resting heart rate & blood pressure:</strong> Better indicators of cardiovascular health than BMI alone.</li>
          </ul>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "What is a normal BMI for adults?",
            answer: "For adults 20 and older, a BMI of 18.5 to 24.9 is considered normal weight by the World Health Organization (WHO). Below 18.5 is underweight; 25-29.9 is overweight; 30 and above is obese. These thresholds apply to most adults but may need adjustment for Asian populations, where 23+ indicates overweight.",
          },
          {
            question: "Is BMI an accurate measure of health?",
            answer: "BMI is a useful screening tool at the population level, but it has significant limitations for individuals. It doesn't distinguish between muscle and fat, doesn't account for fat distribution (belly fat is more dangerous than hip fat), and has different implications for different ethnicities. A muscular athlete may have a 'overweight' BMI while being very healthy. Use BMI as one data point, not the only measure.",
          },
          {
            question: "How is BMI calculated?",
            answer: "BMI = weight (kg) / height² (m²). For imperial: BMI = 703 × weight (lbs) / height² (inches²). For example, a person weighing 70 kg and 1.75 m tall: BMI = 70 / (1.75 × 1.75) = 70 / 3.0625 = 22.9 (Normal weight).",
          },
          {
            question: "Does BMI work the same for men and women?",
            answer: "The BMI formula and WHO categories are the same for both sexes, but the health implications differ. At the same BMI, women typically have higher body fat percentages than men. Some researchers advocate for sex-specific BMI thresholds, but the standard WHO classification remains the global standard.",
          },
          {
            question: "What should I do if my BMI is outside the normal range?",
            answer: "Consult your doctor — BMI alone is not a diagnosis. Your doctor will consider your BMI alongside other factors: blood pressure, cholesterol, blood sugar, waist circumference, fitness level, and family history. A BMI in the overweight range with excellent metabolic health markers may require less intervention than a normal BMI with poor metabolic health.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/calc/bmi" max={6} />
    </div>
  );
}
