import JsonLd from "@/components/seo/json-ld";
import { TictactoeAiClient } from "@/components/tools/fun/tictactoe-ai-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Tic-Tac-Toe AI Unbeatable Challenge | Toolzium",
  description: "Play Tic-Tac-Toe against an Unbeatable Minimax AI or a friend.",
  path: "/tools/fun/tictactoe-ai",
  keywords: ["tic-tac-toe", "minimax", "ai", "game", "unbeatable"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/tictactoe-ai";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tic-Tac-Toe AI Unbeatable Challenge", url: toolUrl, description: "Play Tic-Tac-Toe against an Unbeatable Minimax AI or a friend.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Tic-Tac-Toe AI Unbeatable Challenge", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Can you beat the unbeatable AI?", acceptedAnswer: { "@type": "Answer", text: "No, the Minimax algorithm ensures the AI will either win or draw." } }] };
  return (<div className={"space-y-4"}><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><TictactoeAiClient />
      <RelatedTools currentToolUrl="/tools/fun/tictactoe-ai" />
</div>);
}
