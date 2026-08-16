import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RpsClient from "@/components/tools/fun/rps-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Rock Paper Scissors",
  description: "Play Rock Paper Scissors vs computer. Score tracker. Best of 3/5/7 mode. Win streak counter. Match history. Emoji buttons.",
  path: "/tools/fun/rps",
  keywords: ["rock", "best", "mode", "score", "tracker", "scissors", "streak", "play", "computer", "match", "paper", "counter"],
});

export default function Page() {
<<<<<<< HEAD
  const toolUrl = siteURL + "/tools/fun/rps";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Rock Paper Scissors", url: toolUrl, description: "Play Rock Paper Scissors against the computer.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Rock Paper Scissors", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to play?", acceptedAnswer: { "@type": "Answer", text: "Select rock, paper, or scissors to play against the computer." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><RpsClient />
      <RelatedTools currentToolUrl="/tools/fun/rps" />
</div>);
=======
  const jsonLd = buildToolJsonLd({
    name: "Rock Paper Scissors",
    description: "Play Rock Paper Scissors vs computer. Score tracker. Best of 3/5/7 mode. Win streak counter. Match history. Emoji buttons.",
    path: "/tools/fun/rps",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <RpsClient />
    </div>
  );
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
