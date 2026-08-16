import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CompoundInterestClient from "@/components/tools/finance/compound-interest-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "Compound Interest Calculator",
  description: "Calculate compound interest with monthly contributions. See year-by-year breakdown of principal, interest earned, and total balance. Free compound interest calculator with formula display.",
  path: "/tools/finance/compound-interest",
  keywords: ["compound", "with", "calculate", "interest", "year", "breakdown", "contributions", "principal", "earned", "monthly"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Compound Interest Calculator",
    description: "Calculate compound interest with monthly contributions. See year-by-year breakdown of principal, interest earned, and total balance. Free compound interest calculator with formula display.",
    path: "/tools/finance/compound-interest",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CompoundInterestClient />
    
      <RelatedTools currentToolUrl="/tools/finance/compound-interest" />
</div>
  );
}
