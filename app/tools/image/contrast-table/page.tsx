import JsonLd from "@/components/seo/json-ld";
import { ContrastTableClient } from "@/components/tools/image/contrast-table-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Color Contrast Ratio Compliance Table | Toolzium",
  description: "Generate WCAG 2.1 accessibility contrast comparison tables for design systems.",
  path: "/tools/image/contrast-table",
  keywords: ["color", "contrast", "wcag", "accessibility", "a11y", "design system", "compliance"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/contrast-table";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color Contrast Ratio Compliance Table", url: toolUrl, description: "Generate WCAG 2.1 accessibility contrast comparison tables for design systems.", applicationCategory: "DesignApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "Color Contrast Ratio Compliance Table", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Color Contrast Ratio Compliance Table work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Color Contrast Ratio Compliance Table runs instantly in your browser. Generate WCAG 2.1 accessibility contrast comparison tables for design systems. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Color Contrast Ratio Compliance Table 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Color Contrast Ratio Compliance Table is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Color Contrast Ratio Compliance Table?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className={"space-y-4"}><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><ContrastTableClient /></div>);
}
