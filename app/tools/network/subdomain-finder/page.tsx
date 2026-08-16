import JsonLd from "@/components/seo/json-ld";
import SubdomainFinderClient from "@/components/tools/network/subdomain-finder-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Subdomain Finder & Scanner",
  description: "Free online subdomain finder. Scan public Certificate Transparency (CT) logs to find all registered subdomains for any domain instantly.",
  path: "/tools/network/subdomain-finder",
  keywords: ["subdomain finder", "find subdomains", "subdomain scanner", "domain enum", "certificate transparency logs", "crt.sh lookup", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/subdomain-finder`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Subdomain Finder — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Free online subdomain finder. Scan public Certificate Transparency (CT) logs to find all registered subdomains for any domain instantly.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Subdomain enumeration", "CT Log search", "Subdomain export", "Domain analysis"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network & Security", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "Subdomain Finder", item: toolUrl },
    ],
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <SubdomainFinderClient />
    
      <RelatedTools currentToolUrl="/tools/network/subdomain-finder" />
</div>
  );
}
