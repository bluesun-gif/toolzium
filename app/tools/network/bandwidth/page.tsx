import JsonLd from "@/components/seo/json-ld";
import { BandwidthClient } from "@/components/tools/network/bandwidth-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bandwidth Calculator | Toolzium",
  description: "Calculate bandwidth requirements and transfer times.",
  path: "/tools/network/bandwidth",
  keywords: ["bandwidth calculator", "transfer time", "network speed"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/bandwidth`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Bandwidth Calculator", url: toolUrl, description: "Calculate bandwidth requirements and transfer times.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Network & Security Tools", item: `${siteURL}/tools#cat-network` }, { "@type": "ListItem", position: 3, name: "Bandwidth Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to calculate transfer time?", acceptedAnswer: { "@type": "Answer", text: "Divide the file size by the bandwidth speed." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><BandwidthClient /></div>);
}
