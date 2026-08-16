import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CoinFlipClient from "@/components/tools/util/coin-flip-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Flip a Coin",
  description: "Flip a virtual coin online with realistic 3D animation. Fair and unbiased heads or tails coin flipper using cryptographic randomness. Track flip history and statistics.",
  path: "/tools/util/coin-flip",
  keywords: ["virtual", "flip", "with", "animation", "coin", "unbiased", "fair", "heads", "online", "realistic", "tails"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Flip a Coin",
    description: "Flip a virtual coin online with realistic 3D animation. Fair and unbiased heads or tails coin flipper using cryptographic randomness. Track flip history and statistics.",
    path: "/tools/util/coin-flip",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CoinFlipClient />
    
      <RelatedTools currentToolUrl="/tools/util/coin-flip" />
</div>
  );
}
