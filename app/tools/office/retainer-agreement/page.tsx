import JsonLd from "@/components/seo/json-ld";
import { RetainerAgreementClient } from "@/components/tools/office/retainer-agreement-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Professional Service Retainer Agreement Generator | Toolzium",
  description: "Generate formal Monthly Service Retainer Contracts for freelancers & agencies.",
  path: "/tools/office/retainer-agreement",
  keywords: ["retainer agreement generator", "service contract", "freelance retainer", "monthly retainer"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/retainer-agreement";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Professional Service Retainer Agreement Generator",
    url: toolUrl,
    description: "Generate formal Monthly Service Retainer Contracts for freelancers & agencies.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" },
      { "@type": "ListItem", position: 3, name: "Retainer Agreement Generator", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a retainer agreement?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A retainer agreement is a work-for-hire contract between a business and a client, where the client pays a fixed amount regularly for a set amount of hours or services.",
        },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <RetainerAgreementClient />
    
      <RelatedTools currentToolUrl="/tools/office/retainer-agreement" />
</div>
  );
}
