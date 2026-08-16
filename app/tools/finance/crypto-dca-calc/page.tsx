import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CryptoDcaClient from "@/components/tools/finance/crypto-dca-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Crypto Dollar-Cost-Averaging (DCA) & Profit Calculator",
  description: "Calculate compound returns and projected portfolio value when dollar-cost-averaging into Bitcoin, Ethereum, and Solana.",
  path: "/tools/finance/crypto-dca-calc",
  keywords: ["returns", "projected", "compound", "portfolio", "calculate", "value", "into", "cost", "when", "dollar", "bitcoin", "averaging"],
});

export default function CryptoDcaPage() {
  return (
    <><CryptoDcaClient />
      <RelatedTools currentToolUrl="/tools/finance/crypto-dca-calc" />
    </>
  );
}
