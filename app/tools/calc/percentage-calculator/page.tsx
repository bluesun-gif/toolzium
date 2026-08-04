import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import PercentageCalculatorClient from "@/components/tools/calc/percentage-calculator-client";

const TITLE = "Percentage Calculator — Calculate Percent, Increase & Difference | Toolzium";
const DESCRIPTION = "Free online percentage calculator. Calculate percentage of a number, percentage difference between numbers, percentage increase/decrease, and discount values with step-by-step formulas.";
const PATH = "/tools/calc/percentage-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "percentage calculator", "percent difference calculator", "calculate percentage increase", 
    "what percent of", "discount calculator", "percent change", "percentage solver", 
    "online percent calculator", "Toolzium"
  ],
});

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Percentage Calculator",
      description: DESCRIPTION,
      url: siteURL + PATH,
      applicationCategory: "CalculatorApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteURL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Calculator Tools",
          item: siteURL + "/tools/calc",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Percentage Calculator",
          item: siteURL + PATH,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd as any} />
      <PercentageCalculatorClient />
    </>
  );
}
