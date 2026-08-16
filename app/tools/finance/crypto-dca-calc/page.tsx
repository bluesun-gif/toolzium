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

<<<<<<< HEAD
export default function CryptoDcaPage() {
  return (
    <><CryptoDcaClient />
      <RelatedTools currentToolUrl="/tools/finance/crypto-dca-calc" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Crypto Dollar-Cost-Averaging (DCA) & Profit Calculator",
    description: "Calculate compound returns and projected portfolio value when dollar-cost-averaging into Bitcoin, Ethereum, and Solana.",
    path: "/tools/finance/crypto-dca-calc",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CryptoDcaClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
