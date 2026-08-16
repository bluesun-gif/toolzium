import JsonLd from "@/components/seo/json-ld";
import TwoTruthsClient from "@/components/tools/fun/two-truths-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Two Truths and a Lie Generator | Toolzium",
  description: "Play Two Truths and a Lie. Test your knowledge across categories like Science, History, Animals, and more. Keep track of your score.",
  path: "/tools/fun/two-truths",
  keywords: ["two truths and a lie", "party game", "trivia game", "fun facts generator"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/two-truths`;
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Two Truths and a Lie Generator", 
    url: toolUrl, 
    description: "Play Two Truths and a Lie across various categories.", 
    applicationCategory: "EntertainmentApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, 
      { "@type": "ListItem", position: 3, name: "Two Truths and a Lie", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "How to play Two Truths and a Lie?", acceptedAnswer: { "@type": "Answer", text: "Read the three statements. Two are true, and one is a lie. Click on the statement you think is the lie to see if you are right." } }
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TwoTruthsClient />
    
      <RelatedTools currentToolUrl="/tools/fun/two-truths" />
</div>
  );
}
