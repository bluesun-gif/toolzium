import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UnitPriceClient from "@/components/tools/util/unit-price-client";

export const metadata = buildMetadata({
  title: "Unit Price Comparator",
  description: "Compare unit prices to find the best value. Calculate price per unit, ounce, kilogram, or liter. Smart shopping tool to compare product sizes and save money.",
  path: "/tools/util/unit-price",
  keywords: ["unit", "best", "price", "value", "calculate", "ounce", "prices", "find", "liter", "kilogram", "compare"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Unit Price Comparator",
    description: "Compare unit prices to find the best value. Calculate price per unit, ounce, kilogram, or liter. Smart shopping tool to compare product sizes and save money.",
    path: "/tools/util/unit-price",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <UnitPriceClient />
    </div>
  );
}
