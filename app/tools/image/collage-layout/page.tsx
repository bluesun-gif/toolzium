import JsonLd from "@/components/seo/json-ld";
import { CollageLayoutClient } from "@/components/tools/image/collage-layout-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Photo Collage Layout | Toolzium",
  description: "Design photo collage layouts visually.",
  path: "/tools/image/collage-layout",
  keywords: ["photo collage", "collage maker", "image layout", "picture grid"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/collage-layout`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Photo Collage Layout", url: toolUrl, description: "Design photo collages.", applicationCategory: "MultimediaApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Collage Layout", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the Photo Collage Layout?", acceptedAnswer: { "@type": "Answer", text: "A tool to design and export photo collages visually." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CollageLayoutClient />
    
      <RelatedTools currentToolUrl="/tools/image/collage-layout" />
</div>
  );
}
