import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WhitespaceRemoverClient from "@/components/tools/text/whitespace-remover-client";

export const metadata = buildMetadata({
  title: "Whitespace Remover",
  description: "Remove extra spaces, leading/trailing whitespace, duplicate blank lines, and tab characters from text online. Clean up formatting instantly.",
  path: "/tools/text/whitespace-remover",
  keywords: ["from", "spaces", "extra", "whitespace", "text", "characters", "remove", "leading", "blank", "trailing", "lines", "duplicate"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Whitespace Remover",
    description: "Remove extra spaces, leading/trailing whitespace, duplicate blank lines, and tab characters from text online. Clean up formatting instantly.",
    path: "/tools/text/whitespace-remover",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <WhitespaceRemoverClient />
    </div>
  );
}
