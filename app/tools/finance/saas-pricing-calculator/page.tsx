import { Metadata } from "next";
import SaasPricingCalculatorClient from "@/components/tools/finance/saas-pricing-calculator-client";

export const metadata: Metadata = {
  title: "AI SaaS Pricing Strategy & Tier Matrix Calculator | Toolzium",
  description:
    "Design optimal 3-tier SaaS pricing models (Starter, Pro, Enterprise), value metric limits, and expansion revenue strategies powered by live AI.",
};

export default function SaasPricingCalculatorPage() {
  return <SaasPricingCalculatorClient />;
}
