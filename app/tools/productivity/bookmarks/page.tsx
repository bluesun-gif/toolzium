import JsonLd from "@/components/seo/json-ld";
import { BookmarksClient } from "@/components/tools/productivity/bookmarks-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bookmark Manager | Toolzium",
  description: "Organize and manage your bookmarks and links.",
  path: "/tools/productivity/bookmarks",
  keywords: ["bookmark", "manager", "links", "productivity"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/bookmarks";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Bookmark Manager", url: toolUrl, description: "Organize and manage your bookmarks.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Bookmark Manager", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to use?", acceptedAnswer: { "@type": "Answer", text: "Add URLs and organize them into categories." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><BookmarksClient /></div>);
}
