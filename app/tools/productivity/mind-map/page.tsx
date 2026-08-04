import JsonLd from "@/components/seo/json-ld";
import { MindMapClient } from "@/components/tools/productivity/mind-map-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Mind Map Builder | Toolzium",
  description: "Create and export visual mind maps easily.",
  path: "/tools/productivity/mind-map",
  keywords: ["mind map", "brainstorming", "visualizer", "tree diagram"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/mind-map`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Mind Map Builder", url: toolUrl, description: "Create and export visual mind maps easily.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Mind Map Builder", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Can I export my mind map?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can export it as JSON or a text outline." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><MindMapClient /></div>);
}
