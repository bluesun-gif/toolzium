import JsonLd from "@/components/seo/json-ld";
import { Connect4AiClient } from "@/components/tools/fun/connect4-ai-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Connect 4 AI Challenge | Toolzium",
  description: "Play Connect 4 against a smart AI or a friend. Features interactive grid, multiple AI difficulties, and game statistics.",
  path: "/tools/fun/connect4-ai",
  keywords: ["connect 4", "ai game", "minimax", "board game", "online connect 4", "fun game"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/connect4-ai`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Connect 4 AI Challenge",
    url: toolUrl,
    description: "Play Connect 4 against a smart AI or a friend. Features interactive grid, multiple AI difficulties, and game statistics.",
    applicationCategory: "GameApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" },
      { "@type": "ListItem", position: 3, name: "Connect 4 AI Challenge", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I play against the AI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Select 'AI' as your opponent mode and choose a difficulty level. The Minimax Smart AI provides the toughest challenge!"
        }
      },
      {
        "@type": "Question",
        name: "Can I play with a friend?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can select the 2-Player Pass & Play mode to play locally with a friend on the same device."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <Connect4AiClient />
    
      <RelatedTools currentToolUrl="/tools/fun/connect4-ai" />
</div>
  );
}
