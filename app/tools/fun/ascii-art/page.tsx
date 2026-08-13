import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AsciiArtClient from "@/components/tools/fun/ascii-art-client";

export const metadata = buildMetadata({
  title: "ASCII Art Generator",
  description: "Convert text to ASCII art with multiple font styles: Banner, Block, Standard. Preview in monospace, copy to clipboard. Fun text art for social media, comments, and messages.",
  path: "/tools/fun/ascii-art",
  keywords: ["preview", "standard", "with", "monospace", "convert", "font", "block", "styles", "text", "ascii", "banner", "multiple"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "ASCII Art Generator",
    description: "Convert text to ASCII art with multiple font styles: Banner, Block, Standard. Preview in monospace, copy to clipboard. Fun text art for social media, comments, and messages.",
    path: "/tools/fun/ascii-art",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AsciiArtClient />
    </div>
  );
}
