import JsonLd from "@/components/seo/json-ld";
import UsernameCheckClient from "@/components/tools/network/username-check-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Username Availability Checker",
  description: "Check username availability and generate social media profile links for over 20+ platforms simultaneously from a single username.",
  path: "/tools/network/username-check",
  keywords: ["username checker", "social media link generator", "profile finder", "name availability", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/username-check`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Username Availability Checker — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Check username availability and generate social media profile URLs for over 20+ platforms from a single username.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Multi-platform URL generation", "Copy multiple links", "Search filter", "One-click open"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "Username Checker", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <UsernameCheckClient />
    
      <RelatedTools currentToolUrl="/tools/network/username-check" />
</div>
  );
}
