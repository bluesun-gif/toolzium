import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TicTacToeClient from "@/components/tools/fun/tic-tac-toe-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Tic Tac Toe with AI",
  description: "Tic Tac Toe game with 2-Player mode & AI opponent (Easy, Medium, Unbeatable Minimax). Win line highlights, audio feedback, score tracking.",
  path: "/tools/fun/tic-tac-toe",
  keywords: ["mode", "easy", "with", "opponent", "unbeatable", "highlights", "medium", "line", "audio", "game", "player", "minimax"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/tic-tac-toe`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tic Tac Toe with AI", url: toolUrl, description: "Play Tic Tac Toe against an AI or human.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Tic Tac Toe", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Is the unbeatable AI really unbeatable?", acceptedAnswer: { "@type": "Answer", text: "Yes, it uses the Minimax algorithm to evaluate all possible moves." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><TicTacToeClient />
      <RelatedTools currentToolUrl="/tools/fun/tic-tac-toe" />
</div>);
}
