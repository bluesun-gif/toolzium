import JsonLd from "@/components/seo/json-ld";
import MacLookupClient from "@/components/tools/network/mac-lookup-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "MAC Address Lookup",
  description: "Lookup manufacturer, OUI, and details of a MAC address.",
  path: "/tools/network/mac-lookup",
  keywords: ["MAC address lookup", "MAC OUI lookup", "MAC vendor search", "network tools", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/mac-lookup`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MAC Address Lookup — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Lookup manufacturer, OUI, and details of a MAC address.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["MAC address lookup", "OUI identification", "Vendor search", "MAC details extraction"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network & Security", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "MAC Address Lookup", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <MacLookupClient />
    </div>
  );
}
