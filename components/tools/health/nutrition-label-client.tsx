"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { Apple, Download, Eye, FileText, LayoutGrid, Printer, Weight, Copy } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import { toast } from"react-hot-toast";

type Nutrients = {
  servingSize: string;
  servingsPerContainer: string;
  calories: string;
  totalFat: string;
  saturatedFat: string;
  transFat: string;
  cholesterol: string;
  sodium: string;
  totalCarbs: string;
  dietaryFiber: string;
  totalSugars: string;
  addedSugars: string;
  protein: string;
  vitaminD: string;
  calcium: string;
  iron: string;
  potassium: string;
};
const DV = {
  totalFat: 78,
  // g
  saturatedFat: 20,
  // g
  cholesterol: 300,
  // mg
  sodium: 2300,
  // mg
  totalCarbs: 275,
  // g
  dietaryFiber: 28,
  // g
  addedSugars: 50,
  // g
  vitaminD: 20,
  // mcg
  calcium: 1300,
  // mg
  iron: 18,
  // mg
  potassium: 4700 // mg
};
export function NutritionLabelClient() {
  const [data, setData] = useState<Nutrients>({
    servingSize: "1 cup (240ml)",
    servingsPerContainer: "About 4",
    calories: "120",
    totalFat: "2",
    saturatedFat: "0.5",
    transFat: "0",
    cholesterol: "5",
    sodium: "150",
    totalCarbs: "20",
    dietaryFiber: "3",
    totalSugars: "10",
    addedSugars: "5",
    protein: "4",
    vitaminD: "2",
    calcium: "260",
    iron: "1.8",
    potassium: "470"
  });
  const handleReset = () => {
    setData({
      servingSize: "1 cup (240ml)",
      servingsPerContainer: "About 4",
      calories: "120",
      totalFat: "2",
      saturatedFat: "0.5",
      transFat: "0",
      cholesterol: "5",
      sodium: "150",
      totalCarbs: "20",
      dietaryFiber: "3",
      totalSugars: "10",
      addedSugars: "5",
      protein: "4",
      vitaminD: "2",
      calcium: "260",
      iron: "1.8",
      potassium: "470"
    });
    toast.success("Reset to defaults");
  };
  const updateData = (key: keyof Nutrients, value: string) => {
    setData({
      ...data,
      [key]: value
    });
  };
  const calcDV = (val: string, dv: number) => {
    const num = parseFloat(val);
    if (isNaN(num)) return 0;
    return Math.round(num / dv * 100);
  };
  const printLabel = () => {
    window.print();
  };
  const getTextFormat = () => {
    return `Nutrition Facts
${data.servingsPerContainer} servings per container
Serving size: ${data.servingSize}
Amount per serving
Calories: ${data.calories}
% Daily Value*
Total Fat ${data.totalFat}g (${calcDV(data.totalFat, DV.totalFat)}%)
 Saturated Fat ${data.saturatedFat}g (${calcDV(data.saturatedFat, DV.saturatedFat)}%)
 Trans Fat ${data.transFat}g
Cholesterol ${data.cholesterol}mg (${calcDV(data.cholesterol, DV.cholesterol)}%)
Sodium ${data.sodium}mg (${calcDV(data.sodium, DV.sodium)}%)
Total Carbohydrate ${data.totalCarbs}g (${calcDV(data.totalCarbs, DV.totalCarbs)}%)
 Dietary Fiber ${data.dietaryFiber}g (${calcDV(data.dietaryFiber, DV.dietaryFiber)}%)
 Total Sugars ${data.totalSugars}g
 Includes ${data.addedSugars}g Added Sugars (${calcDV(data.addedSugars, DV.addedSugars)}%)
Protein ${data.protein}g

Vitamin D ${data.vitaminD}mcg (${calcDV(data.vitaminD, DV.vitaminD)}%)
Calcium ${data.calcium}mg (${calcDV(data.calcium, DV.calcium)}%)
Iron ${data.iron}mg (${calcDV(data.iron, DV.iron)}%)
Potassium ${data.potassium}mg (${calcDV(data.potassium, DV.potassium)}%)
`;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={FileText} title="Nutrition Label Maker" description="Create FDA-style nutrition labels with automatically calculated daily values." actions={<>
 <ActionButton onClick={printLabel} icon={Printer} label="Print" />
 <CopyButton getText={getTextFormat} label="Copy Text" />
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Input Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4 max-h-[700px] overflow-y-auto">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Serving Size</Label>
 <Input value={data.servingSize} onChange={e => updateData('servingSize', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Servings Per Container</Label>
 <Input value={data.servingsPerContainer} onChange={e => updateData('servingsPerContainer', e.target.value)} />
 </div>
 <div className="space-y-2 col-span-2">
 <Label>Calories</Label>
 <Input value={data.calories} onChange={e => updateData('calories', e.target.value)} />
 </div>
 </div>
 <Separator />
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Total Fat (g)</Label>
 <Input value={data.totalFat} onChange={e => updateData('totalFat', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Saturated Fat (g)</Label>
 <Input value={data.saturatedFat} onChange={e => updateData('saturatedFat', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Trans Fat (g)</Label>
 <Input value={data.transFat} onChange={e => updateData('transFat', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Cholesterol (mg)</Label>
 <Input value={data.cholesterol} onChange={e => updateData('cholesterol', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Sodium (mg)</Label>
 <Input value={data.sodium} onChange={e => updateData('sodium', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Total Carbs (g)</Label>
 <Input value={data.totalCarbs} onChange={e => updateData('totalCarbs', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Dietary Fiber (g)</Label>
 <Input value={data.dietaryFiber} onChange={e => updateData('dietaryFiber', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Total Sugars (g)</Label>
 <Input value={data.totalSugars} onChange={e => updateData('totalSugars', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Added Sugars (g)</Label>
 <Input value={data.addedSugars} onChange={e => updateData('addedSugars', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Protein (g)</Label>
 <Input value={data.protein} onChange={e => updateData('protein', e.target.value)} />
 </div>
 </div>
 <Separator />
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Vitamin D (mcg)</Label>
 <Input value={data.vitaminD} onChange={e => updateData('vitaminD', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Calcium (mg)</Label>
 <Input value={data.calcium} onChange={e => updateData('calcium', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Iron (mg)</Label>
 <Input value={data.iron} onChange={e => updateData('iron', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Potassium (mg)</Label>
 <Input value={data.potassium} onChange={e => updateData('potassium', e.target.value)} />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <div className="print-area">
 <GlassCard className="max-w-[400px] mx-auto bg-background text-black font-sans">
 <div className="p-4 border-black border-4 bg-background text-black print:border-none print:p-0">
 <h1 className="text-4xl font-black mb-1 leading-none tracking-tighter">Nutrition Facts</h1>
 <div className="border-b-8 border-black pb-1 mb-1">
 <p className="text-base leading-tight">{data.servingsPerContainer} servings per container</p>
 <p className="text-lg font-bold flex justify-between">
 <span>Serving size</span>
 <span>{data.servingSize}</span>
 </p>
 </div>

 <div className="border-b-4 border-black pb-1 mb-1">
 <p className="text-sm font-bold">Amount per serving</p>
 <div className="flex justify-between items-baseline">
 <span className="text-4xl font-black">Calories</span>
 <span className="text-4xl font-black">{data.calories}</span>
 </div>
 </div>

 <p className="text-xs font-bold text-right border-b-2 border-black pb-1 mb-1">% Daily Value*</p>

 <div className="space-y-1 border-b-8 border-black pb-2 mb-1 text-sm">
 <div className="flex justify-between border-b border-black pb-1">
 <span><span className="font-bold">Total Fat</span> {data.totalFat}g</span>
 <span className="font-bold">{calcDV(data.totalFat, DV.totalFat)}%</span>
 </div>
 <div className="flex justify-between border-b border-black pb-1 pl-4">
 <span>Saturated Fat {data.saturatedFat}g</span>
 <span className="font-bold">{calcDV(data.saturatedFat, DV.saturatedFat)}%</span>
 </div>
 <div className="flex justify-between border-b border-black pb-1 pl-4">
 <span>Trans Fat {data.transFat}g</span>
 <span></span>
 </div>
 <div className="flex justify-between border-b border-black pb-1">
 <span><span className="font-bold">Cholesterol</span> {data.cholesterol}mg</span>
 <span className="font-bold">{calcDV(data.cholesterol, DV.cholesterol)}%</span>
 </div>
 <div className="flex justify-between border-b border-black pb-1">
 <span><span className="font-bold">Sodium</span> {data.sodium}mg</span>
 <span className="font-bold">{calcDV(data.sodium, DV.sodium)}%</span>
 </div>
 <div className="flex justify-between border-b border-black pb-1">
 <span><span className="font-bold">Total Carbohydrate</span> {data.totalCarbs}g</span>
 <span className="font-bold">{calcDV(data.totalCarbs, DV.totalCarbs)}%</span>
 </div>
 <div className="flex justify-between border-b border-black pb-1 pl-4">
 <span>Dietary Fiber {data.dietaryFiber}g</span>
 <span className="font-bold">{calcDV(data.dietaryFiber, DV.dietaryFiber)}%</span>
 </div>
 <div className="flex justify-between border-b border-black pb-1 pl-4">
 <span>Total Sugars {data.totalSugars}g</span>
 <span></span>
 </div>
 <div className="flex justify-between border-b border-black pb-1 pl-8">
 <span>Includes {data.addedSugars}g Added Sugars</span>
 <span className="font-bold">{calcDV(data.addedSugars, DV.addedSugars)}%</span>
 </div>
 <div className="flex justify-between pb-1">
 <span><span className="font-bold">Protein</span> {data.protein}g</span>
 <span></span>
 </div>
 </div>

 <div className="space-y-1 border-b-4 border-black pb-2 mb-2 text-sm">
 <div className="flex justify-between border-b border-black pb-1">
 <span>Vitamin D {data.vitaminD}mcg</span>
 <span>{calcDV(data.vitaminD, DV.vitaminD)}%</span>
 </div>
 <div className="flex justify-between border-b border-black pb-1">
 <span>Calcium {data.calcium}mg</span>
 <span>{calcDV(data.calcium, DV.calcium)}%</span>
 </div>
 <div className="flex justify-between border-b border-black pb-1">
 <span>Iron {data.iron}mg</span>
 <span>{calcDV(data.iron, DV.iron)}%</span>
 </div>
 <div className="flex justify-between pb-1">
 <span>Potassium {data.potassium}mg</span>
 <span>{calcDV(data.potassium, DV.potassium)}%</span>
 </div>
 </div>

 <p className="text-xs text-muted-foreground leading-tight">
 * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
 </p>
 </div>
 </GlassCard>
 </div>
 </div>
 <style dangerouslySetInnerHTML={{
        __html: `
 @media print {
 body * { visibility: hidden; }
 .print-area, .print-area * { visibility: visible; }
 .print-area { position: absolute; left: 0; top: 0; width: 100%; }
 }
 `}} />
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Values",
    description:"Add calories, macros, serving.",
    icon: FileText,
  },
{
    step:"02",
    title:"Format",
    description:"Arrange like a standard label.",
    icon: LayoutGrid,
  },
{
    step:"03",
    title:"Generate",
    description:"Create a clean label.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: FileText,
    title:"Data Entry",
    description:"Input your nutrition facts.",
  },
{
    icon: LayoutGrid,
    title:"Label Layout",
    description:"Familiar format.",
  },
{
    icon: Download,
    title:"Export",
    description:"Save or share.",
  },
{
    icon: Apple,
    title:"Clarity",
    description:"Communicates contents.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A nutrition label maker formats your product or recipe facts into a familiar label layout. By entering calories, macros, and serving size, you produce a clear, scannable panel. This tool helps makers, coaches, and small food businesses communicate contents professionally.</p>
  <p>Clarity drives trust. A standard-format label lets consumers understand at a glance, which matters for homemade or small-batch items lacking commercial packaging. The tool arranges entries logically so the result reads like a real label.</p>
  <p>For selling, confirm local regulations on claims and formatting. The tool's value is turning raw nutrition data into a presentable label that informs and builds credibility.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/health/nutrition-label" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"Who uses this?",
    answer:"Makers, coaches, food businesses.",
  },
{
    question:"Accurate?",
    answer:"Reflects what you enter.",
  },
{
    question:"Standard format?",
    answer:"Mirrors common labels.",
  },
{
    question:"Export?",
    answer:"Download for use.",
  },
{
    question:"Regulatory?",
    answer:"Verify local rules for selling.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default NutritionLabelClient;
