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

<<<<<<< HEAD
export default function TiktokCalcPage() {
  return (
    <><TiktokCalcClient />
      <RelatedTools currentToolUrl="/tools/social/tiktok-engagement-calc" />
    </>
=======
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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
