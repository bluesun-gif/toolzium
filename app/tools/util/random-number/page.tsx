import JsonLd from "@/components/seo/json-ld";
import RandomNumberClient from "@/components/tools/util/random-number-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Random Number Generator",
  description: "Generate cryptographically secure random numbers within a specified range. Support for single, multiple, unique, and sorted results.",
  path: "/tools/util/random-number",
  keywords: ["Random Number Generator", "RNG", "secure random", "number generator", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/util/random-number`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Random Number Generator — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Generate cryptographically secure random numbers within a specified range. Support for single, multiple, unique, and sorted results.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Cryptographically secure random numbers", "Multiple random numbers", "Sort results", "Disallow duplicates"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Utilities", item: `${siteURL}/tools#cat-utilities` },
      { "@type": "ListItem", position: 3, name: "Random Number Generator", item: toolUrl },
    ],
  };
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <RandomNumberClient />
    </div>
  );
}
