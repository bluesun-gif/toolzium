import JsonLd from "@/components/seo/json-ld";
import { ContrastSheetExporterClient } from "@/components/tools/image/contrast-sheet-exporter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Color Palette Contrast Sheet Exporter | Toolzium",
  description: "Generate and export WCAG 2.1 design system color contrast sheets.",
  path: "/tools/image/contrast-sheet-exporter",
  keywords: ["color", "palette", "contrast", "wcag", "accessibility", "design"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/contrast-sheet-exporter`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color Palette Contrast Sheet Exporter", url: toolUrl, description: "Generate and export WCAG 2.1 design system color contrast sheets.", applicationCategory: "DesignApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Color Palette Contrast Sheet Exporter", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is WCAG 2.1 contrast?", acceptedAnswer: { "@type": "Answer", text: "WCAG 2.1 defines contrast ratio requirements for accessible web design, ensuring text is readable against its background." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ContrastSheetExporterClient />
    
      <RelatedTools currentToolUrl="/tools/image/contrast-sheet-exporter" />
</div>
  );
}
