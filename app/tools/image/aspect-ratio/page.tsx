import JsonLd from "@/components/seo/json-ld";
import { AspectRatioClient } from "@/components/tools/image/aspect-ratio-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Aspect Ratio Calculator | Toolzium",
  description: "Calculate aspect ratios for images and video. Find dimensions for common presets like 16:9, 4:3, and social media sizes.",
  path: "/tools/image/aspect-ratio",
  keywords: ["aspect ratio", "calculator", "image dimensions", "video resolution", "16:9", "social media sizes"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/aspect-ratio`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Aspect Ratio Calculator", url: toolUrl, description: "Calculate aspect ratios for images and video.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Aspect Ratio Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an aspect ratio?", acceptedAnswer: { "@type": "Answer", text: "Aspect ratio is the proportional relationship between the width and height of an image or video." } }, { "@type": "Question", name: "How do I calculate a new dimension maintaining aspect ratio?", acceptedAnswer: { "@type": "Answer", text: "Enter your original width and height, then enter either the new width or height. The other dimension will be calculated automatically." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><AspectRatioClient />
      <RelatedTools currentToolUrl="/tools/image/aspect-ratio" />
</div>);
}
