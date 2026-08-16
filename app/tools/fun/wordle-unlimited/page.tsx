import JsonLd from "@/components/seo/json-ld";
import { WordleUnlimitedClient } from "@/components/tools/fun/wordle-unlimited-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Wordle Unlimited Game & Word Helper | Toolzium",
  description: "Play unlimited Wordle games and use the built-in solver to find 5-letter words.",
  path: "/tools/fun/wordle-unlimited",
  keywords: ["wordle unlimited", "wordle solver", "wordle helper", "word game", "5-letter words"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/wordle-unlimited`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Wordle Unlimited Game & Word Helper",
    url: toolUrl,
    description: "Play unlimited Wordle games and use the built-in solver to find 5-letter words.",
    applicationCategory: "GameApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` },
      { "@type": "ListItem", position: 3, name: "Wordle Unlimited", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How many times can I play?", acceptedAnswer: { "@type": "Answer", text: "You can play an unlimited number of times!" } }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <WordleUnlimitedClient />
    
      <RelatedTools currentToolUrl="/tools/fun/wordle-unlimited" />
</div>
  );
}
