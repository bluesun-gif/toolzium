import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PercentageCalculatorClient from "@/components/tools/calc/percentage-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Percentage Calculator",
  description: "Calculate percentages, percentage increase/decrease, and percentage change. Find X% of Y, calculate tips, discounts, and markups. Free percentage calculator with multiple modes.",
  path: "/tools/calc/percentage",
  keywords: ["calculate", "decrease", "percentages", "change", "tips", "find", "markups", "increase", "percentage", "discounts"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Percentage Calculator",
    description: "Calculate percentages, percentage increase/decrease, and percentage change. Find X% of Y, calculate tips, discounts, and markups. Free percentage calculator with multiple modes.",
    path: "/tools/calc/percentage",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PercentageCalculatorClient />
    
      <RelatedTools currentToolUrl="/tools/calc/percentage" />
</div>
  );
}
