import JsonLd from "@/components/seo/json-ld";
import DiceProbabilityClient from "@/components/tools/fun/dice-probability-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Dice Probability Calculator | Toolzium",
  description: "Calculate probabilities for dice rolls. Select number of dice and sides, and see the odds.",
  path: "/tools/fun/dice-probability",
  keywords: ["dice", "probability", "dnd", "calculator", "yahtzee"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/dice-probability`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Dice Probability Calculator", url: toolUrl, description: "Calculate probabilities for dice rolls.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Dice Probability Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to calculate dice probability?", acceptedAnswer: { "@type": "Answer", text: "Select the number of dice, sides per die, and your target condition to see the exact probability." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <DiceProbabilityClient />
    
      <RelatedTools currentToolUrl="/tools/fun/dice-probability" />
</div>
  );
}
