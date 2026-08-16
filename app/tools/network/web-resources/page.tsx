import JsonLd from "@/components/seo/json-ld";
import WebResourcesClient from "@/components/tools/network/web-resources-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Web & Security Resources Directory",
  description: "Curated collection of the best online security and network investigation resources. Explore search engines, identity searchers, email analyzers, threat registries, and trackers.",
  path: "/tools/network/web-resources",
  keywords: ["network resources", "web directories", "security tools list", "investigation tools", "search people finder", "cyber threat intel", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/web-resources`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Web & Security Resources — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Curated collection of the best online security and network investigation resources. Explore search engines, identity searchers, email analyzers, threat registries, and trackers.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Web search", "Tool directory", "Identity lookup", "Threat intelligence"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network & Security", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "Web & Security Resources", item: toolUrl },
    ],
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <WebResourcesClient />
    
      <RelatedTools currentToolUrl="/tools/network/web-resources" />
</div>
  );
}
