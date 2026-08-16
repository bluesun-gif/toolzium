import { Metadata } from "next";
import SaasPricingCalculatorClient from "@/components/tools/finance/saas-pricing-calculator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "AI SaaS Pricing Strategy & Tier Matrix Calculator | Toolzium",
  description:
    "Design optimal 3-tier SaaS pricing models (Starter, Pro, Enterprise), value metric limits, and expansion revenue strategies powered by live AI.",
};

export default function SaasPricingCalculatorPage() {
  return (
    <><SaasPricingCalculatorClient />
      <RelatedTools currentToolUrl="/tools/finance/saas-pricing-calculator" />
    </>
  );
}
