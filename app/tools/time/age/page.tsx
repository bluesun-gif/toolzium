import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AgeCalculatorClient from "@/components/tools/time/age-calculator-client";

export const metadata = buildMetadata({
  title: "Age Calculator",
  description: "Calculate exact age in years, months, weeks, days, hours from date of birth. Free age calculator with next birthday countdown. Find your age down to the second.",
  path: "/tools/time/age",
  keywords: ["from", "calculate", "hours", "free", "calculator", "weeks", "birth", "days", "exact", "years", "date", "months"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Age Calculator",
    description: "Calculate exact age in years, months, weeks, days, hours from date of birth. Free age calculator with next birthday countdown. Find your age down to the second.",
    path: "/tools/time/age",
    categoryName: "Time",
    categoryPath: "/tools/time",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AgeCalculatorClient />
    </div>
  );
}
