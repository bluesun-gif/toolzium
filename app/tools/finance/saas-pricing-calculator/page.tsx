import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SaasPricingCalculatorClient from "@/components/tools/finance/saas-pricing-calculator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI SaaS Pricing Strategy & Tier Matrix Calculator",
  description: "Design optimal 3-tier SaaS pricing models (Starter, Pro, Enterprise), value metric limits, and expansion revenue strategies powered by live AI.",
  path: "/tools/finance/saas-pricing-calculator",
  keywords: ["starter", "metric", "value", "saas", "enterprise", "expansion", "models", "pricing", "optimal", "tier", "limits", "design"],
});

export default function SaasPricingCalculatorPage() {
  return (
    <><SaasPricingCalculatorClient />
      <RelatedTools currentToolUrl="/tools/finance/saas-pricing-calculator" />
    </>
  );
}
