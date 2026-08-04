import JsonLd from "@/components/seo/json-ld";
import { ReadingListClient } from "@/components/tools/productivity/reading-list-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reading List Manager | Toolzium",
  description: "Manage your reading list of books, articles, and papers with our free online tool.",
  path: "/tools/productivity/reading-list",
  keywords: ["reading list", "book tracker", "productivity tools", "reading tracker"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/reading-list`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Reading List Manager", url: toolUrl, description: "Manage your reading list of books and articles.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Reading List Manager", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <ReadingListClient />
    </div>
  );
}
