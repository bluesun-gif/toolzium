import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MorseCodeClient from "@/components/tools/text/morse-code-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Morse Code Translator",
  description: "Convert text to Morse code and Morse code to text instantly. Listen to Morse code audio beeps with adjustable speed. Supports letters, numbers, and punctuation. Free online Morse code translator.",
  path: "/tools/text/morse-code",
  keywords: ["convert", "audio", "morse", "instantly", "text", "listen", "code"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Morse Code Translator",
    description: "Convert text to Morse code and Morse code to text instantly. Listen to Morse code audio beeps with adjustable speed. Supports letters, numbers, and punctuation. Free online Morse code translator.",
    path: "/tools/text/morse-code",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MorseCodeClient />
    
      <RelatedTools currentToolUrl="/tools/text/morse-code" />
</div>
  );
}
