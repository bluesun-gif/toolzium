import JsonLd from "@/components/seo/json-ld";
import { PassportPhotoClient } from "@/components/tools/travel/passport-photo-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Passport Photo Crop & Grid | Toolzium",
  description: "Format photos for passport & visa applications with printable grids.",
  path: "/tools/travel/passport-photo",
  keywords: ["passport photo", "visa photo", "travel tool", "photo crop"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/passport-photo";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Passport Photo Crop", url: toolUrl, description: "Format photos for passport & visa applications with printable grids.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Passport Photo", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to crop a passport photo?", acceptedAnswer: { "@type": "Answer", text: "Upload a photo, select your country, align your face, and download." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PassportPhotoClient />
    
      <RelatedTools currentToolUrl="/tools/travel/passport-photo" />
</div>
  );
}
