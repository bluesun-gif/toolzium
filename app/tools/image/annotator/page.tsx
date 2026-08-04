import JsonLd from "@/components/seo/json-ld";
import { AnnotatorClient } from "@/components/tools/image/annotator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Screenshot Annotator | Toolzium",
  description: "Annotate screenshots and images with rectangles, circles, arrows, and text right in your browser.",
  path: "/tools/image/annotator",
  keywords: ["screenshot annotator", "image editor", "draw on image", "image annotation"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/annotator`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Screenshot Annotator",
    url: toolUrl,
    description: "Annotate screenshots and images with rectangles, circles, arrows, and text right in your browser.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` },
      { "@type": "ListItem", position: 3, name: "Screenshot Annotator", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How can I annotate an image?", acceptedAnswer: { "@type": "Answer", text: "Upload an image, then use the toolbar to select a drawing tool like a rectangle, arrow, or text. Click and drag on the canvas to draw. Then download the annotated image." } }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <AnnotatorClient />
    </div>
  );
}
