import JsonLd from "@/components/seo/json-ld";
import { ScreenTimeClient } from "@/components/tools/health/screen-time-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Screen Time Calculator | Toolzium",
  description: "Track and analyze your daily screen time across different devices and apps.",
  path: "/tools/health/screen-time",
  keywords: ["screen time", "calculator", "health", "tracker", "digital wellbeing"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/screen-time`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Screen Time Calculator", url: toolUrl, description: "Track and analyze your daily screen time across different devices and apps.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Screen Time Calculator", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <ScreenTimeClient />
    
      <RelatedTools currentToolUrl="/tools/health/screen-time" />
</div>
  );
}
