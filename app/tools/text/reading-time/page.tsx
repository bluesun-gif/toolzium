import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ReadingTimeClient from "@/components/tools/text/reading-time-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Reading Time Calculator",
  description: "Estimate reading and speaking time for any text. Shows word count, sentence count, paragraph count, and Flesch-Kincaid readability score. Adjustable WPM for slow, average, and fast readers.",
  path: "/tools/text/reading-time",
  keywords: ["shows", "time", "sentence", "estimate", "speaking", "count", "word", "paragraph", "reading", "text"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Reading Time Calculator",
    description: "Estimate reading and speaking time for any text. Shows word count, sentence count, paragraph count, and Flesch-Kincaid readability score. Adjustable WPM for slow, average, and fast readers.",
    path: "/tools/text/reading-time",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ReadingTimeClient />
    
      <RelatedTools currentToolUrl="/tools/text/reading-time" />
</div>
  );
}
