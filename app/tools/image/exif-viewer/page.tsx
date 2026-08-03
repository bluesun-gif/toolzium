import JsonLd from "@/components/seo/json-ld";
import ExifViewerClient from "@/components/tools/image/exif-viewer-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "EXIF & Image Metadata Viewer",
  description: "View hidden EXIF metadata and GPS data from your photos 100% online. Your images never leave your browser.",
  path: "/tools/image/exif-viewer",
  keywords: ["exif viewer", "image metadata", "photo gps data", "camera settings", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/exif-viewer`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "EXIF Viewer — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "View hidden EXIF metadata and GPS data from your photos 100% online.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["View EXIF data", "Extract camera settings", "View GPS coordinates", "100% client-side privacy"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Image", item: `${siteURL}/tools#cat-image` },
      { "@type": "ListItem", position: 3, name: "EXIF Viewer", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <ExifViewerClient />
    </div>
  );
}
