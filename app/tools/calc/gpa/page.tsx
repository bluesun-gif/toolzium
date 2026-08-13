import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import GpaCalculatorClient from "@/components/tools/calc/gpa-calculator-client";

export const metadata = buildMetadata({
  title: "GPA Calculator",
  description: "Calculate your GPA from courses, grades, and credit hours. Supports A-F grade scale with plus/minus. Add courses dynamically, view color-coded results, and export your GPA.",
  path: "/tools/calc/gpa",
  keywords: ["from", "your", "calculate", "credit", "with", "grades", "plus", "hours", "scale", "grade", "courses", "supports"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "GPA Calculator",
    description: "Calculate your GPA from courses, grades, and credit hours. Supports A-F grade scale with plus/minus. Add courses dynamically, view color-coded results, and export your GPA.",
    path: "/tools/calc/gpa",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <GpaCalculatorClient />
    </div>
  );
}
