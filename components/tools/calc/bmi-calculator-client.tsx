"use client";

import { ActivitySquare, Calculator, Info, Ruler, Weight, Heart, Sparkles, ShieldCheck, Scale } from "lucide-react";
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
    <>
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
        title="How to Calculate Your BMI"
        subtitle="Compute your Body Mass Index and ideal weight target in 3 steps."
        steps={steps}
      />

      {/* SECTION 4: FEATURE HIGHLIGHTS & DEEP SEO GUIDE */}
      <ToolFeatureGuides features={features}>
        <div className="space-y-6 text-sm text-muted-foreground">
          <h3 className="text-xl font-bold text-foreground">
            The Complete Medical Guide to Body Mass Index (BMI)
          </h3>
          
          <h4 className="text-lg font-semibold text-foreground pt-2">What Is BMI?</h4>
          <p>
            Body Mass Index (BMI) is a widely recognized medical screening tool designed to evaluate whether an individual possesses a healthy body weight relative to their height. By producing a simple numerical score, BMI provides individuals, physicians, and public health officials with a foundational metric for estimating total body fat and assessing potential health risks associated with being underweight, overweight, or obese.
          </p>
          <p>
            The fundamental concept of the Body Mass Index was originally developed by Belgian mathematician and sociologist Adolphe Quetelet in 1832. Originally termed the &quot;Quetelet Index,&quot; his goal was to define the &quot;average man&quot; by mapping human growth and weight mathematically. The metric gained its modern prominence and its current name in 1972 when physiological researcher Ancel Keys published studies demonstrating that BMI was the most accurate proxy for body fat percentage among simple mathematical ratios.
          </p>
          <p>
            The mathematical formula for calculating BMI is relatively straightforward. It is derived by taking an individual&apos;s weight and dividing it by the square of their height.
          </p>
          <div className="rounded-lg bg-muted/40 p-4 font-mono text-sm font-semibold text-primary">
            Metric Formula: BMI = weight (kg) / [height (m)]²
          </div>
          <p className="text-xs">
            For individuals using imperial measurements, the formula introduces a conversion multiplier: <code>BMI = 703 × [weight (lb) / height (in)²]</code>.
          </p>

          <h4 className="text-lg font-semibold text-foreground pt-2">WHO BMI Classification Table</h4>
          <p>
            The World Health Organization (WHO) has established international standard categories for BMI to help classify weight statuses and correlate them with varying degrees of health risks. The following table breaks down these universally accepted classifications:
          </p>
          
          <div className="overflow-x-auto my-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="p-3 font-semibold text-foreground">BMI Range</th>
                  <th className="p-3 font-semibold text-foreground">Category</th>
                  <th className="p-3 font-semibold text-foreground">Health Risk Level</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">&lt; 18.5</td>
                  <td className="p-3">Underweight</td>
                  <td className="p-3 text-amber-600">Elevated risk of nutritional deficiency and osteoporosis</td>
                </tr>
                <tr className="border-b bg-emerald-500/5">
                  <td className="p-3 font-medium">18.5 – 24.9</td>
                  <td className="p-3">Normal (Healthy Weight)</td>
                  <td className="p-3 text-emerald-600">Lowest risk of weight-related health complications</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">25.0 – 29.9</td>
                  <td className="p-3">Overweight</td>
                  <td className="p-3 text-orange-600">Increased risk of cardiovascular disease and type 2 diabetes</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">30.0 – 34.9</td>
                  <td className="p-3">Obese (Class I)</td>
                  <td className="p-3 text-red-600">High risk for metabolic syndrome and joint issues</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">35.0 – 39.9</td>
                  <td className="p-3">Obese (Class II)</td>
                  <td className="p-3 text-red-600 font-medium">Very high risk for severe health complications</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">≥ 40.0</td>
                  <td className="p-3">Obese (Class III)</td>
                  <td className="p-3 text-red-700 font-bold">Extremely high risk (morbid obesity)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-semibold text-foreground pt-2">Understanding BMI Limitations</h4>
          <p>
            While the Body Mass Index is incredibly useful as a rapid population-level screening tool, it possesses significant clinical limitations when applied to individuals. Because the calculation strictly relies on weight and height, it is fundamentally incapable of differentiating between fat mass and lean muscle mass.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Athletes and Bodybuilders:</strong> Highly active individuals often carry significant muscle mass, which is denser and heavier than fat. Consequently, a lean professional athlete might have a BMI of 28 (Overweight) or even over 30 (Obese), despite possessing extremely low body fat percentages and exceptional cardiovascular health.</li>
            <li><strong>Bone Density and Frame Size:</strong> The formula assumes an average skeletal structure. Individuals with naturally large, dense frames may skew higher on the BMI scale without excess adiposity.</li>
            <li><strong>Age and Muscle Loss:</strong> As people age, they naturally lose muscle mass and often replace it with fat. An elderly individual might maintain a steady weight, keeping their BMI in the &quot;Healthy&quot; range, even if their body fat percentage has reached unhealthy levels.</li>
          </ul>

          <h4 className="text-lg font-semibold text-foreground pt-2">BMI for Different Demographics</h4>
          <p>
            The standard WHO adult criteria do not universally apply to all demographic groups. Contextual adjustments are heavily recommended by medical professionals:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Children and Teenagers:</strong> Because adolescents are actively growing, their BMI must be plotted on age- and sex-specific growth charts provided by the CDC or WHO. Instead of strict cutoffs, pediatric BMI is measured in percentiles (e.g., the 85th to 95th percentile indicates overweight).</li>
            <li><strong>Older Adults:</strong> For individuals over the age of 65, studies suggest that a slightly higher BMI (typically between 25.0 and 27.0) might actually be protective against mortality, bone fractures, and nutritional deficiencies, meaning the &quot;Healthy&quot; range is effectively shifted upwards.</li>
            <li><strong>Asian Populations:</strong> Extensive research demonstrates that individuals of Asian descent often experience heightened risks for diabetes and cardiovascular diseases at lower BMI levels than individuals of European descent. Consequently, the WHO and regional health authorities recommend lower thresholds for Asian populations: a BMI of 23.0 or higher is often considered overweight, and 27.5 or higher indicates obesity.</li>
          </ul>

          <h4 className="text-lg font-semibold text-foreground pt-2">Beyond BMI: Complementary Health Metrics</h4>
          <p>
            To obtain a comprehensive picture of metabolic health, doctors rarely rely on BMI alone. Incorporating secondary measurements can circumvent the inherent flaws of the BMI formula. <strong>Waist Circumference</strong> is an excellent indicator of visceral fat (the dangerous fat surrounding internal organs); a waist size over 40 inches for men or 35 inches for women indicates elevated risk regardless of BMI. Similarly, the <strong>Waist-to-Hip Ratio (WHR)</strong> assesses fat distribution, identifying whether a person has an &quot;apple&quot; or &quot;pear&quot; body shape. Finally, direct measurements of <strong>Body Fat Percentage</strong> via DEXA scans, bioelectrical impedance scales, or skinfold calipers provide the most accurate assessment of true body composition.
          </p>

          <h4 className="text-lg font-semibold text-foreground pt-2">When to Consult a Doctor</h4>
          <p>
            Your BMI should serve as an initial benchmark rather than a definitive medical diagnosis. You should consult a healthcare provider if your BMI falls into the Underweight, Overweight, or Obese categories, particularly if you experience red flag symptoms such as chronic fatigue, unexplainable weight fluctuations, high blood pressure, or joint pain. A doctor can interpret your BMI within the context of your complete medical history, blood work (like cholesterol and blood glucose levels), family genetics, and lifestyle habits. 
          </p>
          <p className="italic text-xs">
            Disclaimer: This calculator and guide are intended solely for informational and educational purposes. They do not constitute professional medical advice, diagnosis, or treatment. Always seek the advice of a physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ & RELATED TOOLS */}
      <ToolFaqAccordion faqs={faqs} />

      <RelatedTools currentToolUrl="/tools/calc/bmi" max={6} />
    </>
  );
}
