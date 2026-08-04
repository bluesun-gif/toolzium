import JsonLd from "@/components/seo/json-ld";
import { WatermarkCreatorClient } from "@/components/tools/image/watermark-creator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Image Watermark Creator | Toolzium",
  description: "Add text or image watermarks to your photos easily and download them in high quality.",
  path: "/tools/image/watermark-creator",
  keywords: ["image watermark", "add watermark", "photo watermark", "watermark maker"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/watermark-creator";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image Watermark Creator",
    url: toolUrl,
    description: "Add text or image watermarks to photos.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" },
      { "@type": "ListItem", position: 3, name: "Image Watermark Creator", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Can I add a logo as a watermark?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can upload an image logo to use as a watermark or use plain text." } }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <WatermarkCreatorClient />
    </div>
  );
}
