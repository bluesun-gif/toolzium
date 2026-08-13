import JsonLd from "@/components/seo/json-ld";
import { ColorExtractorClient } from "@/components/tools/image/color-extractor-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Image Color Extractor | Toolzium",
  description: "Extract dominant colors and create beautiful palettes from any image.",
  path: "/tools/image/color-extractor",
  keywords: ["image color extractor", "color palette generator", "extract colors from image"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/color-extractor`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Image Color Extractor", url: toolUrl, description: "Extract dominant colors and create beautiful palettes from any image.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Image Color Extractor", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Image Color Extractor work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Image Color Extractor runs instantly in your browser. Upload an image and extract its dominant colors. Shows top 5-8 prominent colors with hex, RGB, and HSL values. Click to copy. Generate CSS color palettes from any image. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Image Color Extractor 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Image Color Extractor is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Image Color Extractor?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ColorExtractorClient />
    </div>
  );
}
