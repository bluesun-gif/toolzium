import JsonLd from "@/components/seo/json-ld";
import LoveCalculatorClient from "@/components/tools/fun/love-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Love Calculator",
  description: "Calculate love compatibility between two names with our fun and deterministic love calculator.",
  path: "/tools/fun/love-calculator",
  keywords: ["Love Calculator", "Love Tester", "Name compatibility", "Relationship calculator", "Fun", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/love-calculator`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Love Calculator — Toolzium",
    url: toolUrl,
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Calculate love compatibility between two names with our fun and deterministic love calculator.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Deterministic love calculation", "Shareable results", "Fun animations"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Fun", item: `${siteURL}/tools#cat-fun` },
      { "@type": "ListItem", position: 3, name: "Love Calculator", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <LoveCalculatorClient />
    </div>
  );
}
