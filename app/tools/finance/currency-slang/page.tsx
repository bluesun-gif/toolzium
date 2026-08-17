import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurrencySlangClient from "@/components/tools/finance/currency-slang-client";

const TITLE = "Currency Slang Dictionary | Toolzium";
const DESCRIPTION = "Dictionary of money and currency slang terms worldwide. Learn terms from the US, UK, Crypto, and more.";
const PATH = "/tools/finance/currency-slang";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Currency Slang Dictionary",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CurrencySlangClient />
    </>
  );
}
