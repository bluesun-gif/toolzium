import JsonLd from "@/components/seo/json-ld";
import DnsLookupClient from "@/components/tools/network/dns-lookup-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "DNS Lookup Tool",
  description: "Perform DNS lookups to check A, AAAA, MX, NS, TXT, CNAME, and SOA records for any domain name.",
  path: "/tools/network/dns-lookup",
  keywords: ["DNS lookup", "DNS records", "check DNS", "A record", "MX record", "TXT record", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/dns-lookup`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DNS Lookup Tool — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Perform DNS lookups to check A, AAAA, MX, NS, TXT, CNAME, and SOA records for any domain name.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["DNS lookup", "Check multiple record types", "DNS resolution time", "Lookup history"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network & Security", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "DNS Lookup", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <DnsLookupClient />
    
      <RelatedTools currentToolUrl="/tools/network/dns-lookup" />
</div>
  );
}
