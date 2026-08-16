import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CgpaCalculatorClient from "@/components/tools/calc/cgpa-calculator-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "CGPA Calculator",
  description: "Calculate Cumulative GPA across multiple semesters. Add semesters with GPA and credits, get CGPA with academic classification. Free CGPA calculator for students.",
  path: "/tools/calc/cgpa",
  keywords: ["across", "cgpa", "credits", "calculate", "with", "cumulative", "academic", "semesters", "classification", "multiple"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CGPA Calculator",
    description: "Calculate Cumulative GPA across multiple semesters. Add semesters with GPA and credits, get CGPA with academic classification. Free CGPA calculator for students.",
    path: "/tools/calc/cgpa",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CgpaCalculatorClient />
    
      <RelatedTools currentToolUrl="/tools/calc/cgpa" />
</div>
  );
}
