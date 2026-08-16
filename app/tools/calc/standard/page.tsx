import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StandardCalculatorClient from "@/components/tools/calc/standard-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Standard Calculator",
  description: "Free online calculator for basic arithmetic operations. Add, subtract, multiply, divide with keyboard support. Simple calculator for everyday math and quick calculations.",
  path: "/tools/calc/standard",
  keywords: ["divide", "with", "support", "basic", "arithmetic", "online", "calculator", "free", "subtract", "operations", "multiply", "keyboard"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Standard Calculator",
    description: "Free online calculator for basic arithmetic operations. Add, subtract, multiply, divide with keyboard support. Simple calculator for everyday math and quick calculations.",
    path: "/tools/calc/standard",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <StandardCalculatorClient />
    
      <RelatedTools currentToolUrl="/tools/calc/standard" />
</div>
  );
}
