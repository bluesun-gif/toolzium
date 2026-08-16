import JsonLd from "@/components/seo/json-ld";
import { DnsGeneratorClient } from "@/components/tools/network/dns-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "DNS Record Generator | Toolzium",
  description: "Generate standard DNS records for web and email setups.",
  path: "/tools/network/dns-generator",
  keywords: ["dns generator", "dns records", "zone file"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/dns-generator`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "DNS Record Generator", url: toolUrl, description: "Generate standard DNS records for web and email setups.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Network & Security Tools", item: `${siteURL}/tools#cat-network` }, { "@type": "ListItem", position: 3, name: "DNS Record Generator", item: toolUrl }] };
  
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><DnsGeneratorClient />
      <RelatedTools currentToolUrl="/tools/network/dns-generator" />
</div>);
}
