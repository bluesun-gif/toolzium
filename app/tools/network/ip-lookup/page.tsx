import JsonLd from "@/components/seo/json-ld";
import IpLookupClient from "@/components/tools/network/ip-lookup-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "IP Geolocation Lookup",
  description: "Find the geographical location, ISP, timezone, and other details for any IP address with our free IP lookup tool.",
  path: "/tools/network/ip-lookup",
  keywords: ["IP lookup", "IP geolocation", "find IP address location", "IP address tracker", "ISP lookup", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/ip-lookup`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "IP Geolocation Lookup — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Find the geographical location, ISP, timezone, and other details for any IP address with our free IP lookup tool.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["IP Geolocation", "ISP Information", "Timezone lookup", "ASN Lookup", "IP location finder"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network & Security", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "IP Geolocation Lookup", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <IpLookupClient />
    
      <RelatedTools currentToolUrl="/tools/network/ip-lookup" />
</div>
  );
}
