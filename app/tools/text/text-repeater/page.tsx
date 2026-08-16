import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TextRepeaterClient from "@/components/tools/text/text-repeater-client";
export const metadata = buildMetadata({
  title: "Text Repeater",
  description: "Repeat any text or string multiple times with custom delimiters (new line, space, comma, custom). Copy or download repeated text instantly.",
  path: "/tools/text/text-repeater",
  keywords: ["string", "with", "comma", "repeat", "times", "space", "delimiters", "line", "custom", "text", "multiple"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Text Repeater",
    description: "Repeat any text or string multiple times with custom delimiters (new line, space, comma, custom). Copy or download repeated text instantly.",
    path: "/tools/text/text-repeater",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

<<<<<<< HEAD
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Text Repeater",
          description: "Repeat any text multiple times with custom separators.",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />
    
      <RelatedTools currentToolUrl="/tools/text/text-repeater" />
</>
=======
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TextRepeaterClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
