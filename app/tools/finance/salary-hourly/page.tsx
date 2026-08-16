import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SalaryHourlyClient from "@/components/tools/finance/salary-hourly-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "Salary to Hourly Converter",
  description: "Convert annual salary to hourly rate and vice versa. Salary calculator with work hours, overtime, and take-home pay estimation. Compare job offers and negotiate better.",
  path: "/tools/finance/salary-hourly",
  keywords: ["with", "rate", "salary", "convert", "hours", "annual", "calculator", "work", "vice", "versa", "hourly"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Salary to Hourly Converter",
    description: "Convert annual salary to hourly rate and vice versa. Salary calculator with work hours, overtime, and take-home pay estimation. Compare job offers and negotiate better.",
    path: "/tools/finance/salary-hourly",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SalaryHourlyClient />
    
      <RelatedTools currentToolUrl="/tools/finance/salary-hourly" />
</div>
  );
}
