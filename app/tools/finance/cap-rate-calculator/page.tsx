import { Metadata } from "next";
import CapRateCalculatorClient from "@/components/tools/finance/cap-rate-calculator-client";

export const metadata: Metadata = {
  title: "AI Real Estate Cap Rate & Cash-on-Cash Investment Auditor | Toolzium",
  description:
    "Calculate capitalization rate (Cap Rate), Net Operating Income (NOI), and audit rental property return quality with live AI.",
};

export default function CapRateCalculatorPage() {
  return <CapRateCalculatorClient />;
}
