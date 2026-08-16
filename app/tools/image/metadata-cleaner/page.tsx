import JsonLd from "@/components/seo/json-ld";
import { MetadataCleanerClient } from "@/components/tools/image/metadata-cleaner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image Privacy & EXIF Cleaner | Toolzium",
  description: "Remove EXIF metadata, GPS coordinates, and camera info from images to protect your privacy before sharing online.",
  path: "/tools/image/metadata-cleaner",
  keywords: ["exif cleaner", "remove metadata", "image privacy", "strip exif", "gps remover"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/metadata-cleaner";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Image Privacy Cleaner", url: toolUrl, description: "Remove EXIF metadata from images.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "Image Privacy Cleaner", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is EXIF metadata?", acceptedAnswer: { "@type": "Answer", text: "EXIF data is hidden information in images like GPS location, camera model, and date taken, which can compromise privacy." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <MetadataCleanerClient />
    
      <RelatedTools currentToolUrl="/tools/image/metadata-cleaner" />
</div>
  );
}
