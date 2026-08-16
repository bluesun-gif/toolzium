import JsonLd from "@/components/seo/json-ld";
import { GratitudeClient } from "@/components/tools/productivity/gratitude-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Gratitude Journal | Toolzium",
  description: "Track your daily gratitude, build a streak, and reflect on what matters.",
  path: "/tools/productivity/gratitude",
  keywords: ["gratitude journal", "daily reflection", "productivity", "mindfulness"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/gratitude`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Gratitude Journal", url: toolUrl, description: "Daily gratitude journal.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Gratitude Journal", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><GratitudeClient />
      <RelatedTools currentToolUrl="/tools/productivity/gratitude" />
</div>);
}
