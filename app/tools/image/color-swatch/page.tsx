import JsonLd from "@/components/seo/json-ld";
import { ColorSwatchClient } from "@/components/tools/image/color-swatch-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image Color Swatch Extractor | Toolzium",
  description: "Extract prominent color palettes & swatches from any image.",
  path: "/tools/image/color-swatch",
  keywords: ["image", "color", "swatch", "palette", "extractor"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/color-swatch";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Image Color Swatch Extractor", url: toolUrl, description: "Extract prominent color palettes & swatches from any image.", applicationCategory: "MultimediaApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "Image Color Swatch Extractor", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is Image Color Swatch Extractor?", acceptedAnswer: { "@type": "Answer", text: "It extracts prominent color palettes from any image." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ColorSwatchClient />
      <RelatedTools currentToolUrl="/tools/image/color-swatch" />
</div>);
}
