import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BinaryTextClient from "@/components/tools/text/binary-text-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Binary/Hex Text Converter",
  description: "Convert text to binary, hexadecimal, octal, and decimal — and back. Supports ASCII and Unicode. Live conversion with configurable separators. Free binary to text converter online.",
  path: "/tools/text/binary-text",
  keywords: ["decimal", "hexadecimal", "binary", "convert", "ascii", "unicode", "live", "octal", "text", "supports", "conversion", "back"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Binary/Hex Text Converter",
    description: "Convert text to binary, hexadecimal, octal, and decimal — and back. Supports ASCII and Unicode. Live conversion with configurable separators. Free binary to text converter online.",
    path: "/tools/text/binary-text",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <BinaryTextClient />
    
      <RelatedTools currentToolUrl="/tools/text/binary-text" />
</div>
  );
}
