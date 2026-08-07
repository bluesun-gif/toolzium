import { Metadata } from "next";
import MrrChurnClient from "@/components/tools/finance/mrr-churn-client";

export const metadata: Metadata = {
  title: "SaaS Monthly Recurring Revenue (MRR) & Churn Rate Calculator | Toolzium",
  description:
    "Calculate SaaS metrics: Net MRR Growth, ARR, Churn Rate %, ARPU, and LTV metrics.",
};

export default function MrrChurnPage() {
  return <MrrChurnClient />;
}
