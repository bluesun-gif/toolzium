import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BaseConverterClient from "@/components/tools/dev/base-converter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Number Base Converter",
  description: "Convert numbers between binary, octal, decimal, and hexadecimal bases. Base converter with support for negative numbers and fractional values. Programmer's calculator for number systems.",
  path: "/tools/dev/base-converter",
  keywords: ["numbers", "decimal", "between", "with", "hexadecimal", "binary", "convert", "bases", "converter", "octal", "support", "base"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Number Base Converter",
    description: "Convert numbers between binary, octal, decimal, and hexadecimal bases. Base converter with support for negative numbers and fractional values. Programmer's calculator for number systems.",
    path: "/tools/dev/base-converter",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <BaseConverterClient />
    
      <RelatedTools currentToolUrl="/tools/dev/base-converter" />
</div>
  );
}
