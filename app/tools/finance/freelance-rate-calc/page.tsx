import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FreelanceRateCalcClient from "@/components/tools/finance/freelance-rate-calc-client";

export const metadata = buildMetadata({
  title: "Freelance Hourly Rate & Project Pricing Calculator",
  description: "Calculate your minimum required hourly rate, day rate, and project pricing based on target annual income, taxes, and overhead.",
  path: "/tools/finance/freelance-rate-calc",
  keywords: ["based", "your", "calculate", "rate", "minimum", "project", "annual", "pricing", "required", "target", "hourly"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Freelance Hourly Rate & Project Pricing Calculator",
    description: "Calculate your minimum required hourly rate, day rate, and project pricing based on target annual income, taxes, and overhead.",
    path: "/tools/finance/freelance-rate-calc",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <FreelanceRateCalcClient />
    </div>
  );
}
