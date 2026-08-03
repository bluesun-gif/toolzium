import JsonLd from "@/components/seo/json-ld";
import { DateFormatterClient } from "@/components/tools/time/date-formatter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Date Formatter & Converter | Toolzium",
  description: "Convert dates between different formats like ISO 8601, RFC 2822, Unix timestamps, and locale-specific strings.",
  path: "/tools/time/date-formatter",
  keywords: ["date formatter", "date converter", "timestamp converter", "ISO 8601"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/time/date-formatter`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Date Formatter", url: toolUrl, description: "Convert dates between different formats.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Date & Time Tools", item: `${siteURL}/tools#cat-time` }, { "@type": "ListItem", position: 3, name: "Date Formatter", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <DateFormatterClient />
    </div>
  );
}
