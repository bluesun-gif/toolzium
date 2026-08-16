import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RoasCalculatorClient from "@/components/tools/finance/roas-calculator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Shopify & Amazon Profit Margin & Ad Spend (ROAS) Calculator",
  description: "Calculate return on ad spend (ROAS), net profit margins, and breakeven ROAS for e-commerce stores.",
  path: "/tools/finance/roas-calculator",
  keywords: ["breakeven", "calculate", "stores", "commerce", "profit", "margins", "roas", "return", "spend"],
});

export default function RoasCalculatorPage() {
  return (
    <><RoasCalculatorClient />
      <RelatedTools currentToolUrl="/tools/finance/roas-calculator" />
    </>
  );
}
