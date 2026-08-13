import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TextToListClient from "@/components/tools/text/text-to-list-client";

export const metadata = buildMetadata({
  title: "Text to List",
  description: "Convert comma-separated or newline-separated text into formatted lists. Split text by delimiters, clean entries, and export as array, JSON, or CSV. Text to list converter.",
  path: "/tools/text/to-list",
  keywords: ["split", "separated", "comma", "into", "convert", "newline", "formatted", "lists", "text", "delimiters"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Text to List",
    description: "Convert comma-separated or newline-separated text into formatted lists. Split text by delimiters, clean entries, and export as array, JSON, or CSV. Text to list converter.",
    path: "/tools/text/to-list",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TextToListClient />
    </div>
  );
}
