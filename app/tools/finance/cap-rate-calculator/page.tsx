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

<<<<<<< HEAD
export default function CapRateCalculatorPage() {
  return (
    <><CapRateCalculatorClient />
      <RelatedTools currentToolUrl="/tools/finance/cap-rate-calculator" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Real Estate Cap Rate & Cash-on-Cash Investment Auditor",
    description: "Calculate capitalization rate (Cap Rate), Net Operating Income (NOI), and audit rental property return quality with live AI.",
    path: "/tools/finance/cap-rate-calculator",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CapRateCalculatorClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
