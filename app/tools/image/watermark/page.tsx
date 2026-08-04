import JsonLd from "@/components/seo/json-ld";
import { WatermarkClient } from "@/components/tools/image/watermark-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Image Watermark Tool | Toolzium",
  description: "Add text watermarks to your images easily. Customize font, color, opacity, and position.",
  path: "/tools/image/watermark",
  keywords: ["image watermark", "add watermark", "protect image", "watermark maker"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/watermark`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Image Watermark Tool", url: toolUrl, description: "Add customizable text watermarks to images.", applicationCategory: "MultimediaApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Image Watermark", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Does this tool support batch processing?", acceptedAnswer: { "@type": "Answer", text: "You can apply the same watermark settings to multiple uploaded images." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <WatermarkClient />
    </div>
  );
}
