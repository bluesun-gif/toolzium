import { Metadata } from "next";
import FreelanceRateCalcClient from "@/components/tools/finance/freelance-rate-calc-client";

export const metadata: Metadata = {
  title: "Freelance Hourly Rate & Project Pricing Calculator | Toolzium",
  description:
    "Calculate your minimum required hourly rate, day rate, and project pricing based on target annual income, taxes, and overhead.",
};

export default function FreelanceRateCalcPage() {
  return <FreelanceRateCalcClient />;
}
