import JsonLd from "@/components/seo/json-ld";
import { QuoteGeneratorClient } from "@/components/tools/office/quote-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Price Quotation & Estimate Generator | Toolzium",
  description: "Create and generate professional price quotes and business estimates quickly. Add items, apply taxes, and manage terms effortlessly.",
  path: "/tools/office/quote-generator",
  keywords: ["price quotation", "estimate generator", "business quote tool", "invoice template"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/quote-generator";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Price Quotation & Estimate Generator", 
    url: toolUrl, 
    description: "Create formal business estimates and quotes with ease.", 
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
      { "@type": "ListItem", position: 3, name: "Price Quotation & Estimate Generator", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "How do I create a price quote?", acceptedAnswer: { "@type": "Answer", text: "Fill in the provider and client details, add items with rates and quantities, and the total will be automatically calculated." } }, 
      { "@type": "Question", name: "Can I add tax to my items?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can specify a tax percentage for each individual item on the quote." } }
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <QuoteGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/office/quote-generator" />
</div>
  );
}
