import JsonLd from "@/components/seo/json-ld";
export const metadata: Metadata = generateSEOMetadata({
  title: "Translate Text Online — Free Language Translator",
  description: "Translate text between 100+ languages online for free. Auto-detect source language, swap languages, listen with text-to-speech. Fast translation tool.",
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
    
      <RelatedTools currentToolUrl="/tools/text/translate" />
</>
  );
}
