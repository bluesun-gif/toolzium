import JsonLd from "@/components/seo/json-ld";
import { PortReferenceClient } from "@/components/tools/network/port-reference-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Port Number Reference | Toolzium",
  description: "Searchable database of common network ports and their associated services.",
  path: "/tools/network/port-reference",
  keywords: ["network ports", "port number", "tcp ports", "udp ports", "networking"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/port-reference`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Port Number Reference", url: toolUrl, description: "Network port directory", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Network & Security Tools", item: `${siteURL}/tools#cat-network` }, { "@type": "ListItem", position: 3, name: "Port Number Reference", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is port 80?", acceptedAnswer: { "@type": "Answer", text: "Port 80 is HTTP." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><PortReferenceClient /></div>);
}
