import JsonLd from "@/components/seo/json-ld";
import { WordAssociationClient } from "@/components/tools/fun/word-association-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Word Association Game | Toolzium",
  description: "Play a word association chain game. Build chains of associated words, beat the timer, and share your longest chain.",
  path: "/tools/fun/word-association",
  keywords: ["word association", "word game", "fun tools", "brain game", "word chain"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/word-association`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Word Association Game", url: toolUrl, description: "Play a word association chain game.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Word Association Game", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I play the word association game?", acceptedAnswer: { "@type": "Answer", text: "Start with a random word and type the first word that comes to mind, building a chain of associated words." } }, { "@type": "Question", name: "Is there a time limit?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can play in a 60-second timer mode to see how many words you can associate." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><WordAssociationClient /></div>);
}
