import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PercentageCalculatorClient from "@/components/tools/calc/percentage-calculator-client";

const TITLE = "Free Online Percentage Calculator - Calculate %, Increase & Discounts";
const DESCRIPTION =
  "Free percentage calculator. Calculate X% of Y, percent change, percentage increase and decrease, and sales discounts with step-by-step math formulas.";
const PATH = "/tools/calc/percentage-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "percentage calculator",
    "percent calculator",
    "calculate percentage",
    "percent increase calculator",
    "percent decrease",
    "discount calculator",
    "what percent of",
    "percentage change",
    "free math calculator",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free Online Percentage Calculator & Discount Suite",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PercentageCalculatorClient />
    </>
  );
}
