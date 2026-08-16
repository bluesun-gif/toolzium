import JsonLd from "@/components/seo/json-ld";
import WordScrambleClient from "@/components/tools/fun/word-scramble-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Word Scramble Game | Toolzium",
  description: "Play a fun word scramble game. Choose categories, unscramble letters, and track your score and streak.",
  path: "/tools/fun/word-scramble",
  keywords: ["word scramble", "game", "puzzle", "fun", "brain teaser"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/word-scramble";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Word Scramble Game", url: toolUrl, description: "Play a fun word scramble game. Choose categories, unscramble letters, and track your score and streak.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Word Scramble", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I play the word scramble game?", acceptedAnswer: { "@type": "Answer", text: "Select a category, then try to guess the original word from the scrambled letters before the timer runs out." } }, { "@type": "Question", name: "What categories are available?", acceptedAnswer: { "@type": "Answer", text: "Categories include Technology, Animals, Food, Science, and Travel." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><WordScrambleClient />
      <RelatedTools currentToolUrl="/tools/fun/word-scramble" />
</div>);
}
