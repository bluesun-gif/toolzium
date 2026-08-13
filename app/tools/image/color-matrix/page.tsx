import JsonLd from "@/components/seo/json-ld";
import { ColorMatrixClient } from "@/components/tools/image/color-matrix-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Image Color Palette Contrast Matrix | Toolzium",
  description: "Test color contrast ratios across a design system palette to ensure WCAG AA and AAA accessibility compliance.",
  path: "/tools/image/color-matrix",
  keywords: ["color", "contrast", "matrix", "accessibility", "wcag", "palette", "design"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/color-matrix";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Color Contrast Matrix", 
    url: toolUrl, 
    description: "Test color contrast ratios across a color palette.", 
    applicationCategory: "DesignApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, 
      { "@type": "ListItem", position: 3, name: "Color Contrast Matrix", item: toolUrl }
    ] 
  };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Image Color Palette Contrast Matrix work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Image Color Palette Contrast Matrix runs instantly in your browser. Test color contrast ratios across a design system palette to ensure WCAG AA and AAA accessibility compliance. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Image Color Palette Contrast Matrix 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Image Color Palette Contrast Matrix is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Image Color Palette Contrast Matrix?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ColorMatrixClient />
    </div>
  );
}
