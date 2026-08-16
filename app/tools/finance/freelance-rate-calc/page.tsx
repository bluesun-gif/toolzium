import { Metadata } from "next";
import FreelanceRateCalcClient from "@/components/tools/finance/freelance-rate-calc-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "Freelance Hourly Rate & Project Pricing Calculator | Toolzium",
  description:
    "Calculate your minimum required hourly rate, day rate, and project pricing based on target annual income, taxes, and overhead.",
};

export default function FreelanceRateCalcPage() {
  return (
    <><FreelanceRateCalcClient />
      <RelatedTools currentToolUrl="/tools/finance/freelance-rate-calc" />
    </>
  );
}
