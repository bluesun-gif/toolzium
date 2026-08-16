import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PercentageCalculatorClient from "@/components/tools/calc/percentage-calculator-client";
<<<<<<< HEAD
const TITLE = "Percentage Calculator — Calculate Percent, Increase & Difference | Toolzium";
const DESCRIPTION = "Free online percentage calculator. Calculate percentage of a number, percentage difference between numbers, percentage increase/decrease, and discount values with step-by-step formulas.";
const PATH = "/tools/calc/percentage-calculator";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "Percentage Calculator — Calculate Percent, Increase & Difference | Toolzium",
  description: "Free online percentage calculator. Calculate percentage of a number, percentage difference between numbers, percentage increase/decrease, and discount values with step-by-step formulas.",
  path: "/tools/calc/percentage-calculator",
  keywords: ["numbers", "calculate", "between", "online", "free", "calculator", "number", "difference", "percentage"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Percentage Calculator — Calculate Percent, Increase & Difference",
    description: "Free online percentage calculator. Calculate percentage of a number, percentage difference between numbers, percentage increase/decrease, and discount values with step-by-step formulas.",
    path: "/tools/calc/percentage-calculator",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PercentageCalculatorClient />
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/calc/percentage-calculator" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
