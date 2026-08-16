import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ClipboardCleanerClient from "@/components/tools/util/clipboard-cleaner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Clipboard Cleaner",
  description: "Remove formatting from copied text and paste as plain text. Strip HTML, Rich Text formatting, and hidden characters. Clean clipboard content for emails and documents.",
  path: "/tools/util/clipboard-cleaner",
  keywords: ["formatting", "from", "paste", "strip", "copied", "plain", "remove", "rich", "text", "html"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Clipboard Cleaner",
    description: "Remove formatting from copied text and paste as plain text. Strip HTML, Rich Text formatting, and hidden characters. Clean clipboard content for emails and documents.",
    path: "/tools/util/clipboard-cleaner",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ClipboardCleanerClient />
    
      <RelatedTools currentToolUrl="/tools/util/clipboard-cleaner" />
</div>
  );
}
