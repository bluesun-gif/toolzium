import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiBmrCalculatorClient from "@/components/tools/health/ai-bmr-calculator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI BMR & TDEE Metabolism Calculator Studio",
  description: "Calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) with Mifflin-St Jeor equation and AI metabolic optimization.",
  path: "/tools/health/ai-bmr-calculator",
  keywords: ["total", "calculate", "daily", "with", "rate", "energy", "mifflin", "basal", "expenditure", "metabolic", "tdee", "jeor"],
});

<<<<<<< HEAD
export default function AiBmrCalculatorPage() {
  return (
    <><AiBmrCalculatorClient />
      <RelatedTools currentToolUrl="/tools/health/ai-bmr-calculator" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI BMR & TDEE Metabolism Calculator Studio",
    description: "Calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) with Mifflin-St Jeor equation and AI metabolic optimization.",
    path: "/tools/health/ai-bmr-calculator",
    categoryName: "Health",
    categoryPath: "/tools/health",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiBmrCalculatorClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
