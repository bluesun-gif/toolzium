import JsonLd from "@/components/seo/json-ld";
<<<<<<< HEAD
import RelatedTools from "@/components/shared/related-tools";
=======
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CalorieCalculatorClient from "@/components/tools/health/calorie-calculator-client";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "Calorie Calculator",
  description: "Calculate your daily calorie needs and TDEE (Total Daily Energy Expenditure) for free. Uses the Mifflin-St Jeor formula with activity level. Get macronutrient breakdown for weight loss, maintenance, or gain goals.",
  path: "/tools/health/calorie-calculator",
  keywords: ["calorie", "total", "needs", "daily", "your", "calculate", "energy", "free", "expenditure", "uses", "tdee"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Calorie Calculator",
    description: "Calculate your daily calorie needs and TDEE (Total Daily Energy Expenditure) for free. Uses the Mifflin-St Jeor formula with activity level. Get macronutrient breakdown for weight loss, maintenance, or gain goals.",
    path: "/tools/health/calorie-calculator",
    categoryName: "Health",
    categoryPath: "/tools/health",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CalorieCalculatorClient />
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/health/calorie-calculator" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
