import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TextCleanerClient from "@/components/tools/text/text-cleaner-client";

export const metadata = buildMetadata({
  title: "Text Cleaner",
  description: "Remove extra spaces, line breaks, HTML tags, emojis, and special characters from text. Clean and format text for databases, CSV files, and data processing. Bulk text cleanup tool.",
  path: "/tools/text/cleaner",
  keywords: ["from", "spaces", "extra", "characters", "special", "line", "remove", "emojis", "breaks", "text", "tags", "html"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Text Cleaner",
    description: "Remove extra spaces, line breaks, HTML tags, emojis, and special characters from text. Clean and format text for databases, CSV files, and data processing. Bulk text cleanup tool.",
    path: "/tools/text/cleaner",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TextCleanerClient />
    </div>
  );
}
