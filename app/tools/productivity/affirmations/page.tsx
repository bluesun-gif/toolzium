import JsonLd from "@/components/seo/json-ld";
import { AffirmationsClient } from "@/components/tools/productivity/affirmations-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Daily Affirmations Generator | Toolzium",
  description: "Generate positive daily affirmations for self-worth, career, health, relationships, and growth.",
  path: "/tools/productivity/affirmations",
  keywords: ["affirmations", "daily affirmations", "positive quotes", "motivation", "self-care"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/affirmations`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Daily Affirmations", url: toolUrl, description: "Generate positive daily affirmations.", applicationCategory: "LifestyleApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Daily Affirmations", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><AffirmationsClient />
      <RelatedTools currentToolUrl="/tools/productivity/affirmations" />
</div>);
}
