import { Metadata } from "next";
import StartupRunwayCalcClient from "@/components/tools/finance/startup-runway-calc-client";

export const metadata: Metadata = {
  title: "AI Startup Runway & Net Burn Rate Calculator | Toolzium",
  description:
    "Calculate startup cash runway months, net burn rate, fundraising urgency timelines, and audit Default Alive vs Default Dead status with live AI.",
};

export default function StartupRunwayCalcPage() {
  return <StartupRunwayCalcClient />;
}
