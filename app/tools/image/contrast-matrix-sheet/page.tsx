import JsonLd from "@/components/seo/json-ld";
import { ContrastMatrixSheetClient } from "@/components/tools/image/contrast-matrix-sheet-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contrast Compliance Color Matrix Sheet Exporter | Toolzium",
  description: "Test brand palette colors against each other for WCAG 2.1 AA/AAA accessibility compliance.",
  path: "/tools/image/contrast-matrix-sheet",
  keywords: ["color contrast", "wcag compliance", "accessibility matrix", "color palette tester", "design system tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/contrast-matrix-sheet";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Contrast Compliance Color Matrix Sheet", url: toolUrl, description: "Test brand palette colors against each other for WCAG 2.1 AA/AAA accessibility compliance.", applicationCategory: "DesignApplication", operatingSystem: "All" };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "Contrast Color Matrix", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Contrast Compliance Color Matrix Sheet Exporter work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Contrast Compliance Color Matrix Sheet Exporter runs instantly in your browser. Test brand palette colors against each other for WCAG 2.1 AA/AAA accessibility compliance. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Contrast Compliance Color Matrix Sheet Exporter 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Contrast Compliance Color Matrix Sheet Exporter is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Contrast Compliance Color Matrix Sheet Exporter?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><ContrastMatrixSheetClient /></div>);
}
