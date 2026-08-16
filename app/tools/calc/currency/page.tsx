import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurrencyConverterClient from "@/components/tools/calc/currency-converter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Currency Converter",
  description: "Convert currencies with live exchange rates. Real-time currency converter for 150+ currencies including USD, EUR, GBP, JPY, INR. Free forex calculator for international money exchange.",
  path: "/tools/calc/currency",
  keywords: ["with", "currencies", "convert", "time", "converter", "including", "real", "exchange", "rates", "currency", "live"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Currency Converter",
    description: "Convert currencies with live exchange rates. Real-time currency converter for 150+ currencies including USD, EUR, GBP, JPY, INR. Free forex calculator for international money exchange.",
    path: "/tools/calc/currency",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CurrencyConverterClient />
    
      <RelatedTools currentToolUrl="/tools/calc/currency" />
</div>
  );
}
