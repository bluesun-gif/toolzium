import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AgeCalculatorClient from "@/components/tools/time/age-calculator-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

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
    
      <RelatedTools currentToolUrl="/tools/time/age" />
</div>
  );
}
