import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TiktokCalcClient from "@/components/tools/social/tiktok-calc-client";

export const metadata = buildMetadata({
  title: "TikTok Engagement & Creator Fund Calculator",
  description: "Calculate your TikTok engagement rate, estimated Creator Fund payouts, and sponsored post value.",
  path: "/tools/social/tiktok-engagement-calc",
  keywords: ["sponsored", "your", "calculate", "engagement", "rate", "estimated", "fund", "value", "creator", "post", "payouts", "tiktok"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "TikTok Engagement & Creator Fund Calculator",
    description: "Calculate your TikTok engagement rate, estimated Creator Fund payouts, and sponsored post value.",
    path: "/tools/social/tiktok-engagement-calc",
    categoryName: "Social",
    categoryPath: "/tools/social",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TiktokCalcClient />
    </div>
  );
}
