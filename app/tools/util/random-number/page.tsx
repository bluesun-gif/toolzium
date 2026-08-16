import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RandomNumberClient from "@/components/tools/util/random-number-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Random Number Generator",
  description: "Generate cryptographically secure random numbers with custom range. Bulk generation, no-duplicate mode, sort options, and copy to clipboard. Free random number generator.",
  path: "/tools/util/random-number",
  keywords: ["mode", "numbers", "random", "with", "generate", "bulk", "cryptographically", "secure", "generation", "custom", "range", "duplicate"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Random Number Generator",
    description: "Generate cryptographically secure random numbers with custom range. Bulk generation, no-duplicate mode, sort options, and copy to clipboard. Free random number generator.",
    path: "/tools/util/random-number",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <RandomNumberClient />
    
      <RelatedTools currentToolUrl="/tools/util/random-number" />
</div>
  );
}
