import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import VatCalculatorClient from "@/components/tools/finance/vat-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "GST/VAT Calculator",
  description: "Add or remove GST/VAT from prices. Tax calculator for sales tax, VAT, GST with custom rates. Calculate inclusive and exclusive tax amounts instantly.",
  path: "/tools/finance/vat",
  keywords: ["from", "sales", "with", "calculate", "inclusive", "exclusive", "amounts", "prices", "calculator", "remove", "rates", "custom"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "GST/VAT Calculator",
    description: "Add or remove GST/VAT from prices. Tax calculator for sales tax, VAT, GST with custom rates. Calculate inclusive and exclusive tax amounts instantly.",
    path: "/tools/finance/vat",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <VatCalculatorClient />
    
      <RelatedTools currentToolUrl="/tools/finance/vat" />
</div>
  );
}
