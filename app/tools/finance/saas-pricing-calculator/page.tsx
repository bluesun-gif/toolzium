import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SaasPricingCalculatorClient from "@/components/tools/finance/saas-pricing-calculator-client";

export const metadata = buildMetadata({
  title: "AI SaaS Pricing Strategy & Tier Matrix Calculator",
  description: "Design optimal 3-tier SaaS pricing models (Starter, Pro, Enterprise), value metric limits, and expansion revenue strategies powered by live AI.",
  path: "/tools/finance/saas-pricing-calculator",
  keywords: ["starter", "metric", "value", "saas", "enterprise", "expansion", "models", "pricing", "optimal", "tier", "limits", "design"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI SaaS Pricing Strategy & Tier Matrix Calculator",
    description: "Design optimal 3-tier SaaS pricing models (Starter, Pro, Enterprise), value metric limits, and expansion revenue strategies powered by live AI.",
    path: "/tools/finance/saas-pricing-calculator",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SaasPricingCalculatorClient />
    </div>
  );
}
