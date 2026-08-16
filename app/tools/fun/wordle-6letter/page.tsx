import JsonLd from "@/components/seo/json-ld";
import { Wordle6LetterClient } from "@/components/tools/fun/wordle-6letter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "6-Letter Wordle Challenge Game | Toolzium",
  description: "Play the 6-letter Wordle puzzle challenge game. 6 attempts to guess a secret 6-letter word with color feedback.",
  path: "/tools/fun/wordle-6letter",
  keywords: ["wordle", "6 letter wordle", "word game", "puzzle challenge", "fun tool", "toolzium"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/wordle-6letter`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "6-Letter Wordle Challenge Game", url: toolUrl, description: "Play the 6-letter Wordle puzzle challenge game. 6 attempts to guess a secret 6-letter word with color feedback.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "6-Letter Wordle", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to play 6-Letter Wordle?", acceptedAnswer: { "@type": "Answer", text: "Guess the 6-letter secret word in 6 tries. Green means correct letter in correct spot, yellow means correct letter in wrong spot, and gray means letter is not in the word." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><Wordle6LetterClient />
      <RelatedTools currentToolUrl="/tools/fun/wordle-6letter" />
</div>);
}
