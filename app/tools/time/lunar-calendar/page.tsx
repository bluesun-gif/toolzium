import JsonLd from "@/components/seo/json-ld";
import { LunarCalendarClient } from "@/components/tools/time/lunar-calendar-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Lunar Calendar | Toolzium",
  description: "View moon phases for any month and year.",
  path: "/tools/time/lunar-calendar",
  keywords: ["lunar", "calendar", "moon phase"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/lunar-calendar";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Lunar Calendar", url: toolUrl, description: "View moon phases.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "Lunar Calendar", item: toolUrl }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <LunarCalendarClient />
    </div>
  );
}
