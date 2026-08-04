import JsonLd from "@/components/seo/json-ld";
import { WordleClient } from "@/components/tools/fun/wordle-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Word Guess Game | Toolzium",
  description: "Play a 5-letter word guessing game. Test your vocabulary and logic skills.",
  path: "/tools/fun/wordle",
  keywords: ["wordle", "word game", "guessing game", "vocabulary", "puzzle"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/wordle";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Word Guess Game",
    url: toolUrl,
    description: "Play a 5-letter word guessing game.",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" },
      { "@type": "ListItem", position: 3, name: "Word Guess Game", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How to play?", acceptedAnswer: { "@type": "Answer", text: "Guess the 5-letter word in 6 attempts. Green means correct letter in correct spot, yellow means correct letter in wrong spot, gray means letter not in word." } }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <WordleClient />
    </div>
  );
}
