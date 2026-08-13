import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DateDifferenceClient from "@/components/tools/calc/date-difference-client";

export const metadata = buildMetadata({
  title: "Date Difference Calculator",
  description: "Calculate days, weeks, months, and years between two dates. Find the exact time difference between dates with business days calculation. Free date calculator for planning and scheduling.",
  path: "/tools/calc/date-diff",
  keywords: ["calculate", "between", "time", "difference", "weeks", "days", "find", "exact", "years", "dates", "months"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Date Difference Calculator",
    description: "Calculate days, weeks, months, and years between two dates. Find the exact time difference between dates with business days calculation. Free date calculator for planning and scheduling.",
    path: "/tools/calc/date-diff",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <DateDifferenceClient />
    </div>
  );
}
