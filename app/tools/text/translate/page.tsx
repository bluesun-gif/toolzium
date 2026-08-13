import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ClientComponent from "@/components/tools/text/translate-client";

export const metadata = buildMetadata({
  title: "Translate Text",
  description: "Translate text between 100+ languages online for free. Auto-detect source language, swap languages, and listen to translations with text-to-speech. Fast and accurate translation tool.",
  path: "/tools/text/translate",
  keywords: ["source", "between", "translate", "swap", "language", "online", "free", "detect", "languages", "auto", "text"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Translate Text",
    description: "Translate text between 100+ languages online for free. Auto-detect source language, swap languages, and listen to translations with text-to-speech. Fast and accurate translation tool.",
    path: "/tools/text/translate",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ClientComponent />
    </div>
  );
}
