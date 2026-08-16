import JsonLd from "@/components/seo/json-ld";
import { SpeedConverterClient } from "@/components/tools/network/speed-converter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Network Speed Converter | Toolzium",
  description: "Convert network speeds between bits and bytes (Mbps, MBps, Gbps) and calculate file download times.",
  path: "/tools/network/speed-converter",
  keywords: ["network speed converter", "mbps to mb/s", "download time calculator", "bandwidth converter", "internet speed"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/speed-converter`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Network Speed Converter", url: toolUrl, description: "Convert network speeds between bits and bytes (Mbps, MBps, Gbps) and calculate file download times.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Network & Security Tools", item: `${siteURL}/tools#cat-network` }, { "@type": "ListItem", position: 3, name: "Network Speed Converter", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the difference between Mbps and MBps?", acceptedAnswer: { "@type": "Answer", text: "Mbps (Megabits per second) measures network bandwidth. MBps (Megabytes per second) measures file transfer speed. 1 Byte = 8 bits, so 8 Mbps = 1 MBps." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SpeedConverterClient />
    
      <RelatedTools currentToolUrl="/tools/network/speed-converter" />
</div>
  );
}
