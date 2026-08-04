import JsonLd from "@/components/seo/json-ld";
import { AspectCropperClient } from "@/components/tools/image/aspect-cropper-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Image Aspect Ratio Cropper | Toolzium",
  description: "Crop images to exact aspect ratios for social media and web.",
  path: "/tools/image/aspect-cropper",
  keywords: ["image crop", "aspect ratio", "resizer", "photo editor"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/aspect-cropper";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Image Aspect Ratio Cropper", url: toolUrl, description: "Crop images to exact aspect ratios for social media and web.", applicationCategory: "MultimediaApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "Image Aspect Ratio Cropper", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <AspectCropperClient />
    </div>
  );
}
