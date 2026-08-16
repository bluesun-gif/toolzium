import JsonLd from "@/components/seo/json-ld";
import { CompletionLetterClient } from "@/components/tools/office/completion-letter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Work Completion Letter Generator | Toolzium",
  description: "Generate formal Work Completion Certificates & Project Sign-off Letters.",
  path: "/tools/office/completion-letter",
  keywords: ["work completion letter", "project sign-off", "certificate generator", "office tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/completion-letter";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Work Completion Letter Generator",
    url: toolUrl,
    description: "Generate formal Work Completion Certificates & Project Sign-off Letters.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" },
      { "@type": "ListItem", position: 3, name: "Work Completion Letter Generator", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is a work completion letter?", acceptedAnswer: { "@type": "Answer", text: "A formal document acknowledging that a project or specific scope of work has been successfully completed according to agreed terms." } }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CompletionLetterClient />
    
      <RelatedTools currentToolUrl="/tools/office/completion-letter" />
</div>
  );
}
