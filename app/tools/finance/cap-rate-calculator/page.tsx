import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CapRateCalculatorClient from "@/components/tools/finance/cap-rate-calculator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI Real Estate Cap Rate & Cash-on-Cash Investment Auditor",
  description: "Calculate capitalization rate (Cap Rate), Net Operating Income (NOI), and audit rental property return quality with live AI.",
  path: "/tools/finance/cap-rate-calculator",
  keywords: ["property", "income", "calculate", "with", "rate", "audit", "capitalization", "quality", "operating", "return", "rental"],
});

export default function CapRateCalculatorPage() {
  return (
    <><CapRateCalculatorClient />
      <RelatedTools currentToolUrl="/tools/finance/cap-rate-calculator" />
    </>
  );
}
