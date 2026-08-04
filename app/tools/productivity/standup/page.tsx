import JsonLd from "@/components/seo/json-ld";
import { StandupClient } from "@/components/tools/productivity/standup-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Daily Standup Generator | Toolzium",
  description: "Generate and format your daily standup reports easily. Organize your tasks, blockers, and achievements for team meetings.",
  path: "/tools/productivity/standup",
  keywords: ["daily standup", "standup generator", "agile meeting report", "slack standup formatter"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/standup`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Daily Standup Generator",
    url: toolUrl,
    description: "Generate and format your daily standup reports easily.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` },
      { "@type": "ListItem", position: 3, name: "Daily Standup Generator", item: toolUrl }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <StandupClient />
    </div>
  );
}
