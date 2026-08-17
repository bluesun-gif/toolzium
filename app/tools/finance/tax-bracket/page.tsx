import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TaxBracketClient from "@/components/tools/finance/tax-bracket-client";

const TITLE = "Tax Bracket Calculator | Toolzium";
const DESCRIPTION = "Calculate income tax by brackets for various countries. Estimate total tax, effective tax rate, and take-home pay.";
const PATH = "/tools/finance/tax-bracket";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Tax Bracket Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TaxBracketClient />
    </>
  );
}
