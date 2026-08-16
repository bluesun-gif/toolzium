import JsonLd from "@/components/seo/json-ld";
import { ContrastComplianceSheetClient } from "@/components/tools/image/contrast-compliance-sheet-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Color Contrast Ratio Compliance Sheet | Toolzium",
  description: "Design system WCAG accessibility contrast compliance test sheet. Generate matrix for your colors.",
  path: "/tools/image/contrast-compliance-sheet",
  keywords: ["color contrast", "wcag", "accessibility", "design system"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/contrast-compliance-sheet`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color Contrast Ratio Compliance Sheet", url: toolUrl, description: "Design system WCAG accessibility contrast compliance test sheet.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Color Contrast Ratio Compliance Sheet", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is WCAG?", acceptedAnswer: { "@type": "Answer", text: "Web Content Accessibility Guidelines. It defines how to make web content more accessible to people with disabilities." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ContrastComplianceSheetClient />
      <RelatedTools currentToolUrl="/tools/image/contrast-compliance-sheet" />
</div>);
}
