import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FreelanceRateCalcClient from "@/components/tools/finance/freelance-rate-calc-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Freelance Hourly Rate & Project Pricing Calculator",
  description: "Calculate your minimum required hourly rate, day rate, and project pricing based on target annual income, taxes, and overhead.",
  path: "/tools/finance/freelance-rate-calc",
  keywords: ["based", "your", "calculate", "rate", "minimum", "project", "annual", "pricing", "required", "target", "hourly"],
});

<<<<<<< HEAD
export default function FreelanceRateCalcPage() {
  return (
    <><FreelanceRateCalcClient />
      <RelatedTools currentToolUrl="/tools/finance/freelance-rate-calc" />
    </>
=======
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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
