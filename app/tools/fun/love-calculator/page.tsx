import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LoveCalculatorClient from "@/components/tools/fun/love-calculator-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Love Calculator",
  description: "Calculate love compatibility between two names with our fun and deterministic love calculator.",
  path: "/tools/fun/love-calculator",
  keywords: ["between", "calculate", "with", "names", "calculator", "compatibility", "deterministic", "love"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Love Calculator",
    description: "Calculate love compatibility between two names with our fun and deterministic love calculator.",
    path: "/tools/fun/love-calculator",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <LoveCalculatorClient />
    
      <RelatedTools currentToolUrl="/tools/fun/love-calculator" />
</div>
  );
}
