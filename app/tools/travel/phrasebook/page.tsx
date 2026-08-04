import JsonLd from "@/components/seo/json-ld";
import { PhrasebookClient } from "@/components/tools/travel/phrasebook-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Travel Phrasebook | Toolzium",
  description: "Essential travel phrases in multiple languages with pronunciation and audio playback.",
  path: "/tools/travel/phrasebook",
  keywords: ["travel phrasebook", "language translator", "common phrases", "travel languages"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/phrasebook`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Travel Phrasebook", url: toolUrl, description: "Essential travel phrases in multiple languages with pronunciation.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` }, { "@type": "ListItem", position: 3, name: "Travel Phrasebook", item: toolUrl }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <PhrasebookClient />
    </div>
  );
}
