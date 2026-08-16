import JsonLd from "@/components/seo/json-ld";
import { JournalClient } from "@/components/tools/productivity/journal-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Daily Journal | Toolzium",
  description: "Simple daily journal with mood tracking and date navigation.",
  path: "/tools/productivity/journal",
  keywords: ["journal", "diary", "mood tracker", "productivity"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/journal`;
  
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Daily Journal", 
    url: toolUrl, 
    description: "Simple daily journal with mood tracking.", 
    applicationCategory: "UtilitiesApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, 
      { "@type": "ListItem", position: 3, name: "Daily Journal", item: toolUrl }
    ] 
  };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Daily Journal work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Daily Journal runs instantly in your browser. Simple daily journal with mood tracking (5 levels), tags, calendar view, and search. Word count per entry. Export entries. All saved locally. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Daily Journal 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Daily Journal is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Daily Journal?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <JournalClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/journal" />
</div>
  );
}
