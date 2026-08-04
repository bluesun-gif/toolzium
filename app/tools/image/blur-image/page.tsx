import JsonLd from "@/components/seo/json-ld";
import { BlurImageClient } from "@/components/tools/image/blur-image-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Image Area Blur & Anonymizer | Toolzium",
  description: "Blur or pixelate sensitive parts of an image such as faces, names, or license plates locally in your browser.",
  path: "/tools/image/blur-image",
  keywords: ["image blur", "pixelate image", "anonymize image", "censor image", "privacy tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/blur-image";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image Area Blur",
    url: toolUrl,
    description: "Blur or pixelate sensitive parts of an image.",
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
      { "@type": "ListItem", position: 3, name: "Image Area Blur", item: toolUrl }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <BlurImageClient />
    </div>
  );
}
