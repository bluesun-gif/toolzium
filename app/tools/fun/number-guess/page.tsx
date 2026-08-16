import JsonLd from "@/components/seo/json-ld";
import NumberGuessClient from "@/components/tools/fun/number-guess-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Number Guessing Game | Toolzium",
  description: "A fun and interactive number guessing game. Test your skills and try to guess the hidden number in the fewest attempts possible.",
  path: "/tools/fun/number-guess",
  keywords: ["number guessing game", "guess the number", "fun web game", "browser game"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/number-guess`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Number Guessing Game",
    url: toolUrl,
    description: "A fun and interactive number guessing game.",
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
      { "@type": "ListItem", position: 3, name: "Number Guessing Game", item: toolUrl }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <NumberGuessClient />
    
      <RelatedTools currentToolUrl="/tools/fun/number-guess" />
</div>
  );
}
