import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CryptoDcaClient from "@/components/tools/finance/crypto-dca-client";

const TITLE = "Crypto Dollar-Cost-Averaging (DCA) & Profit Calculator";
const DESCRIPTION = "Calculate compound returns and projected portfolio value when dollar-cost-averaging into Bitcoin, Ethereum, and Solana.";
const PATH = "/tools/finance/crypto-dca-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Crypto Dollar-Cost-Averaging (DCA) & Profit Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CryptoDcaClient />
    </>
  );
}
