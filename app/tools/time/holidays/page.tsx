import JsonLd from "@/components/seo/json-ld";
import { HolidaysClient } from "@/components/tools/time/holidays-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Holiday Calendar | Toolzium",
  description: "View and filter public holidays by country and year. See upcoming holidays and count downs.",
  path: "/tools/time/holidays",
  keywords: ["holiday calendar", "public holidays", "national holidays", "calendar tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/time/holidays`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Holiday Calendar", url: toolUrl, description: "View public holidays worldwide.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: `${siteURL}/tools#cat-time` }, { "@type": "ListItem", position: 3, name: "Holiday Calendar", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <HolidaysClient />
    </div>
  );
}
