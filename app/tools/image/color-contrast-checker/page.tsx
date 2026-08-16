import JsonLd from "@/components/seo/json-ld";
import { ColorContrastClient } from "@/components/tools/image/color-contrast-checker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image & Palette Color Contrast Checker | Toolzium",
  description: "Check WCAG 2.1 accessibility color contrast ratios between text color and background color.",
  path: "/tools/image/color-contrast-checker",
  keywords: ["color contrast checker", "wcag", "accessibility", "contrast ratio", "color palette"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/color-contrast-checker`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image & Palette Color Contrast Checker",
    url: toolUrl,
    description: "Check WCAG 2.1 accessibility color contrast ratios between text color and background color.",
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` },
      { "@type": "ListItem", position: 3, name: "Color Contrast Checker", item: toolUrl }
    ]
  };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Image & Palette Color Contrast Checker work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Image & Palette Color Contrast Checker runs instantly in your browser. Check WCAG 2.1 accessibility color contrast ratios between text and background colors with AA/AAA pass/fail badges. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Image & Palette Color Contrast Checker 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Image & Palette Color Contrast Checker is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Image & Palette Color Contrast Checker?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ColorContrastClient />
    
      <RelatedTools currentToolUrl="/tools/image/color-contrast-checker" />
</div>
  );
}
