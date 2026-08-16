import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TiktokCalcClient from "@/components/tools/social/tiktok-calc-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "TikTok Engagement & Creator Fund Calculator",
  description: "Calculate your TikTok engagement rate, estimated Creator Fund payouts, and sponsored post value.",
  path: "/tools/social/tiktok-engagement-calc",
  keywords: ["sponsored", "your", "calculate", "engagement", "rate", "estimated", "fund", "value", "creator", "post", "payouts", "tiktok"],
});

export default function TiktokCalcPage() {
  return (
    <><TiktokCalcClient />
      <RelatedTools currentToolUrl="/tools/social/tiktok-engagement-calc" />
    </>
  );
}
