import { Metadata } from "next";
import RoasCalculatorClient from "@/components/tools/finance/roas-calculator-client";

export const metadata: Metadata = {
  title: "Shopify & Amazon Profit Margin & Ad Spend (ROAS) Calculator | Toolzium",
  description:
    "Calculate return on ad spend (ROAS), net profit margins, and breakeven ROAS for e-commerce stores.",
};

export default function RoasCalculatorPage() {
  return <RoasCalculatorClient />;
}
