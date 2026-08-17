import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CryptoProfitClient from "@/components/tools/finance/crypto-profit-client";

const TITLE = "Crypto Profit Calculator | Toolzium";
const DESCRIPTION = "Calculate your cryptocurrency trading profit, loss, and ROI including exchange fees.";
const PATH = "/tools/finance/crypto-profit";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Crypto Profit Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CryptoProfitClient />
    </>
  );
}
