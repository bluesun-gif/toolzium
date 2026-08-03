import JsonLd from "@/components/seo/json-ld";
import GpaCalculatorClient from "@/components/tools/calc/gpa-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "GPA Calculator",
  description: "Calculate your semester GPA and cumulative GPA (CGPA) with our free online GPA calculator. Supports multiple semesters and standard grading scales.",
  path: "/tools/calc/gpa",
  keywords: ["gpa calculator", "cgpa calculator", "grade point average", "college gpa calculator", "high school gpa", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/calc/gpa`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GPA Calculator — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Calculate your semester GPA and cumulative GPA (CGPA) with our free online GPA calculator.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["GPA calculation", "CGPA calculation", "Multi-semester support", "Export results"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteURL}/tools#cat-calculators` },
      { "@type": "ListItem", position: 3, name: "GPA Calculator", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <GpaCalculatorClient />
    </div>
  );
}
