import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import InterestCompareClient from "@/components/tools/finance/interest-compare-client";

const TITLE = "Interest Rate Comparison | Toolzium";
const DESCRIPTION = "Compare savings and investment returns across different interest rates and compounding frequencies.";
const PATH = "/tools/finance/interest-compare";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Interest Rate Comparison",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <InterestCompareClient />
    </>
  );
}
