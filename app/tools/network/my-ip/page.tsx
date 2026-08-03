import JsonLd from "@/components/seo/json-ld";
import MyIpClient from "@/components/tools/network/my-ip-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "What is My IP Address - Check Your Public IP",
  description: "Find out your public IPv4 and IPv6 address instantly. Get detailed information about your location, ISP, and network connection.",
  path: "/tools/network/my-ip",
  keywords: ["what is my ip", "my ip address", "ip lookup", "find ip address", "public ip", "IPv4", "IPv6", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/my-ip`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "What is My IP Address — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Find out your public IPv4 and IPv6 address instantly. Get detailed information about your location, ISP, and network connection.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Detect IPv4", "Detect IPv6", "IP Geolocation", "ISP Information"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network & Security", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "What is My IP Address", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <MyIpClient />
    </div>
  );
}
