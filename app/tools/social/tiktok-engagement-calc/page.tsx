import { Metadata } from "next";
import TiktokCalcClient from "@/components/tools/social/tiktok-calc-client";

export const metadata: Metadata = {
  title: "TikTok Engagement & Creator Fund Earnings Calculator | Toolzium",
  description:
    "Calculate your TikTok engagement rate, estimated Creator Fund payouts, and sponsored post value.",
};

export default function TiktokCalcPage() {
  return <TiktokCalcClient />;
}
