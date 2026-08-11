import JsonLd from "@/components/seo/json-ld";
import RpsClient from "@/components/tools/fun/rps-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Rock Paper Scissors | Toolzium",
  description: "Play Rock Paper Scissors against the computer.",
  path: "/tools/fun/rps",
  keywords: ["rock paper scissors", "game", "fun"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/rps";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Rock Paper Scissors", url: toolUrl, description: "Play Rock Paper Scissors against the computer.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Rock Paper Scissors", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to play?", acceptedAnswer: { "@type": "Answer", text: "Select rock, paper, or scissors to play against the computer." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><RpsClient /></div>);
}
