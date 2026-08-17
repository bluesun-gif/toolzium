import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SaasPricingCalculatorClient from "@/components/tools/finance/saas-pricing-calculator-client";

const TITLE = "AI SaaS Pricing Strategy & Tier Matrix Calculator";
const DESCRIPTION = "Design optimal 3-tier SaaS pricing models (Starter, Pro, Enterprise), value metric limits, and expansion revenue strategies powered by live AI.";
const PATH = "/tools/finance/saas-pricing-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI SaaS Pricing Strategy & Tier Matrix Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SaasPricingCalculatorClient />
    </>
  );
}
