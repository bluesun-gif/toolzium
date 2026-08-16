import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BMICalculatorClient from "@/components/tools/calc/bmi-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "BMI Calculator",
  description: "Calculate Body Mass Index (BMI) instantly from height and weight. Free BMI calculator with health category classification. Check if you're underweight, normal, overweight, or obese based on WHO standards.",
  path: "/tools/calc/bmi",
  keywords: ["from", "weight", "calculate", "with", "health", "mass", "body", "free", "calculator", "instantly", "height", "index"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "BMI Calculator",
    description: "Calculate Body Mass Index (BMI) instantly from height and weight. Free BMI calculator with health category classification. Check if you're underweight, normal, overweight, or obese based on WHO standards.",
    path: "/tools/calc/bmi",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <BMICalculatorClient />
    
      <RelatedTools currentToolUrl="/tools/calc/bmi" />
</div>
  );
}
