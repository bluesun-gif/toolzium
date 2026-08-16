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

export default function AiBmrCalculatorPage() {
  return (
    <><AiBmrCalculatorClient />
      <RelatedTools currentToolUrl="/tools/health/ai-bmr-calculator" />
    </>
  );
}
