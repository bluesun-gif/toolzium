import { Metadata } from "next";
import TiktokCalcClient from "@/components/tools/social/tiktok-calc-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "TikTok Engagement & Creator Fund Earnings Calculator | Toolzium",
  description:
    "Calculate your TikTok engagement rate, estimated Creator Fund payouts, and sponsored post value.",
};

export default function TiktokCalcPage() {
  return (
    <><TiktokCalcClient />
      <RelatedTools currentToolUrl="/tools/social/tiktok-engagement-calc" />
    </>
  );
}
