import JsonLd from "@/components/seo/json-ld";
import { ConsultingAgreementClient } from "@/components/tools/office/consulting-agreement-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Consulting Services Agreement Generator | Toolzium",
  description: "Generate formal Consulting Services & Client Engagement Contracts easily.",
  path: "/tools/office/consulting-agreement",
  keywords: ["consulting agreement", "contract generator", "client engagement contract", "office tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/consulting-agreement";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Consulting Services Agreement Generator", url: toolUrl, description: "Generate formal Consulting Services & Client Engagement Contracts easily.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "Consulting Services Agreement Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How does the contract generator work?", acceptedAnswer: { "@type": "Answer", text: "Fill in the consultant and client details, scope of work, and fee structure to automatically generate a formal consulting agreement." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ConsultingAgreementClient />
      <RelatedTools currentToolUrl="/tools/office/consulting-agreement" />
</div>);
}
