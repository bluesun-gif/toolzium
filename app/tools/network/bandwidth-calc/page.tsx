import JsonLd from "@/components/seo/json-ld";
import { BandwidthCalcClient } from "@/components/tools/network/bandwidth-calc-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Bandwidth Calculator | Toolzium",
  description: "Calculate download and upload times based on file size and connection speed.",
  path: "/tools/network/bandwidth-calc",
  keywords: ["bandwidth calculator", "download time", "upload time", "network speed", "file transfer"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/bandwidth-calc`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Bandwidth Calculator", url: toolUrl, description: "Calculate download and upload times.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Network & Security Tools", item: `${siteURL}/tools#cat-network` }, { "@type": "ListItem", position: 3, name: "Bandwidth Calculator", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><BandwidthCalcClient />
      <RelatedTools currentToolUrl="/tools/network/bandwidth-calc" />
</div>);
}
