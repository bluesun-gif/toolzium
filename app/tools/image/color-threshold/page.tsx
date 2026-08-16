import JsonLd from "@/components/seo/json-ld";
import { ColorThresholdClient } from "@/components/tools/image/color-threshold-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image Color Threshold & Binarizer | Toolzium",
  description: "Convert images to high-contrast black and white with adjustable thresholds.",
  path: "/tools/image/color-threshold",
  keywords: ["image threshold", "binarize image", "black and white", "otsu threshold", "ocr prep"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/color-threshold";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Image Color Threshold", url: toolUrl, description: "Convert images to B&W or binary.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "Color Threshold", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is binarization?", acceptedAnswer: { "@type": "Answer", text: "It converts an image to just black and white pixels based on a threshold." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ColorThresholdClient />
      <RelatedTools currentToolUrl="/tools/image/color-threshold" />
</div>);
}
