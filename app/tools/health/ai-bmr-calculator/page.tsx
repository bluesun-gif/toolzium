import { Metadata } from "next";
import AiBmrCalculatorClient from "@/components/tools/health/ai-bmr-calculator-client";

export const metadata: Metadata = {
  title: "AI BMR & TDEE Metabolism Calculator Studio | Toolzium",
  description:
    "Calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) with Mifflin-St Jeor equation and AI metabolic optimization.",
};

export default function AiBmrCalculatorPage() {
  return <AiBmrCalculatorClient />;
}
