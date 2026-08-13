import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SlugifyClient from "@/components/tools/text/slugify-client";

export const metadata = buildMetadata({
  title: "Slugify Text",
  description: "Convert text into SEO-friendly URL slugs. Generate clean, lowercase, hyphenated slugs from any text. Perfect for creating blog URLs, file names, and web-safe identifiers.",
  path: "/tools/text/slugify",
  keywords: ["from", "into", "generate", "hyphenated", "convert", "slugs", "clean", "friendly", "lowercase", "text"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Slugify Text",
    description: "Convert text into SEO-friendly URL slugs. Generate clean, lowercase, hyphenated slugs from any text. Perfect for creating blog URLs, file names, and web-safe identifiers.",
    path: "/tools/text/slugify",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SlugifyClient />
    </div>
  );
}
