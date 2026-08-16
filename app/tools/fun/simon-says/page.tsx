import JsonLd from "@/components/seo/json-ld";
import SimonSaysClient from "@/components/tools/fun/simon-says-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Simon Says Game | Toolzium",
  description: "Classic Simon Says memory game to test and improve your memory.",
  path: "/tools/fun/simon-says",
  keywords: ["simon says", "memory game", "brain training", "fun"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/simon-says`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Simon Says Game",
    url: toolUrl,
    description: "Classic Simon Says memory game to test and improve your memory.",
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
      { "@type": "ListItem", position: 3, name: "Simon Says", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How to play Simon Says?", acceptedAnswer: { "@type": "Answer", text: "Watch the pattern of lights and sounds the computer plays, then repeat the same pattern. The sequence gets longer each round." } }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SimonSaysClient />
    
      <RelatedTools currentToolUrl="/tools/fun/simon-says" />
</div>
  );
}
