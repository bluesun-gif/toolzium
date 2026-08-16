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

<<<<<<< HEAD
export default function RoasCalculatorPage() {
  return (
    <><RoasCalculatorClient />
      <RelatedTools currentToolUrl="/tools/finance/roas-calculator" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Shopify & Amazon Profit Margin & Ad Spend (ROAS) Calculator",
    description: "Calculate return on ad spend (ROAS), net profit margins, and breakeven ROAS for e-commerce stores.",
    path: "/tools/finance/roas-calculator",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <RoasCalculatorClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
