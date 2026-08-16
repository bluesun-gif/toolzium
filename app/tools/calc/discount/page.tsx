import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiscountFinderClient from "@/components/tools/calc/discount-finder-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "Discount Calculator",
  description: "Calculate discounted prices and savings from original price. Find final price after discount, percentage off, and amount saved. Free discount calculator for shopping and sales.",
  path: "/tools/calc/discount",
  keywords: ["price", "from", "calculate", "final", "discount", "discounted", "original", "prices", "savings", "find", "after"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Discount Calculator",
    description: "Calculate discounted prices and savings from original price. Find final price after discount, percentage off, and amount saved. Free discount calculator for shopping and sales.",
    path: "/tools/calc/discount",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <DiscountFinderClient />
    
      <RelatedTools currentToolUrl="/tools/calc/discount" />
</div>
  );
}
