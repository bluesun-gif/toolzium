import JsonLd from "@/components/seo/json-ld";
import CgpaCalculatorClient from "@/components/tools/calc/cgpa-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CGPA Calculator",
  description: "Calculate your Cumulative Grade Point Average (CGPA) semester by semester or course by course.",
  path: "/tools/calc/cgpa",
  keywords: ["CGPA Calculator", "GPA Calculator", "college GPA", "university GPA", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/calc/cgpa`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CGPA Calculator — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Calculate your Cumulative Grade Point Average (CGPA) semester by semester or course by course.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Add multiple semesters", "Calculate CGPA", "Course by course calculation", "Visual result"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteURL}/tools#cat-calculators` },
      { "@type": "ListItem", position: 3, name: "CGPA Calculator", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <CgpaCalculatorClient />
    </div>
  );
}
