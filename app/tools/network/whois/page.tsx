import JsonLd from "@/components/seo/json-ld";
import WhoisClient from "@/components/tools/network/whois-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "WHOIS Domain Lookup",
  description: "Free online WHOIS domain lookup tool. Check domain registration details, registrar information, expiration date, and DNS records instantly.",
  path: "/tools/network/whois",
  keywords: ["whois lookup", "domain lookup", "check domain owner", "domain registration details", "rdap lookup", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/whois`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WHOIS Domain Lookup — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Free online WHOIS domain lookup tool. Check domain registration details, registrar information, expiration date, and DNS records instantly.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Domain lookup", "WHOIS check", "RDAP API", "DNS records", "Domain expiration checker"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network & Security", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "WHOIS Domain Lookup", item: toolUrl },
    ],
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <WhoisClient />
    </div>
  );
}
