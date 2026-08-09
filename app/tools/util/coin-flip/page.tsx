import JsonLd from "@/components/seo/json-ld";
import CoinFlipClient from "@/components/tools/util/coin-flip-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Flip a Coin",
  description: "A virtual coin flipper with true randomness, history tracking, and statistics. Flip a coin online instantly.",
  path: "/tools/util/coin-flip",
  keywords: ["flip a coin", "coin flipper", "heads or tails", "random coin flip", "online coin toss", "Toolzium"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/util/coin-flip`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Flip a Coin — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "A virtual coin flipper with true randomness, history tracking, and statistics. Flip a coin online instantly.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["3D coin flip animation", "Flip history", "Statistics tracking", "True randomness"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Utilities", item: `${siteURL}/tools#cat-utilities` },
      { "@type": "ListItem", position: 3, name: "Flip a Coin", item: toolUrl },
    ],
  };
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <CoinFlipClient />
    </div>
  );
}
