import JsonLd from "@/components/seo/json-ld";
import { PhotoGridClient } from "@/components/tools/image/photo-grid-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Photo Grid Maker | Toolzium",
  description: "Arrange multiple photos into a grid layout.",
  path: "/tools/image/photo-grid",
  keywords: ["photo grid", "image collage", "collage maker"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/photo-grid";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Photo Grid Maker", url: toolUrl, description: "Arrange multiple photos into a grid layout.", applicationCategory: "MultimediaApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "Photo Grid Maker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to use?", acceptedAnswer: { "@type": "Answer", text: "Upload images, select a layout, and download." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><PhotoGridClient />
      <RelatedTools currentToolUrl="/tools/image/photo-grid" />
</div>);
}
