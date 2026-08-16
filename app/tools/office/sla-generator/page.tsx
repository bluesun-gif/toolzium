import JsonLd from "@/components/seo/json-ld";
import { SlaGeneratorClient } from "@/components/tools/office/sla-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "SLA (Service Level Agreement) Document Generator | Toolzium",
  description: "Generate formal Service Level Agreement (SLA) contracts with customizable uptime, response times, and penalties.",
  path: "/tools/office/sla-generator",
  keywords: ["sla generator", "service level agreement", "office tool", "contract generator", "uptime agreement"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/sla-generator";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "SLA Document Generator", url: toolUrl, description: "Generate formal Service Level Agreement contracts.", applicationCategory: "BusinessApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "SLA Document Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an SLA?", acceptedAnswer: { "@type": "Answer", text: "A Service Level Agreement is a contract between a service provider and a client that defines the level of service expected." } }, { "@type": "Question", name: "Can I print the generated SLA?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can copy the text or print it using your browser's print functionality." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><SlaGeneratorClient />
      <RelatedTools currentToolUrl="/tools/office/sla-generator" />
</div>);
}
