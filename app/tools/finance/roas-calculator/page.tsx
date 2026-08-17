import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RoasCalculatorClient from "@/components/tools/finance/roas-calculator-client";

const TITLE = "Shopify & Amazon Profit Margin & Ad Spend (ROAS) Calculator";
const DESCRIPTION = "Calculate return on ad spend (ROAS), net profit margins, and breakeven ROAS for e-commerce stores.";
const PATH = "/tools/finance/roas-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Shopify & Amazon Profit Margin & Ad Spend (ROAS) Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RoasCalculatorClient />
    </>
  );
}
