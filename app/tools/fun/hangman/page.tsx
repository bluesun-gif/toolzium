import JsonLd from "@/components/seo/json-ld";
import HangmanClient from "@/components/tools/fun/hangman-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Hangman Word Game | Toolzium",
  description: "Play classic Hangman word guessing game with various categories. Test your vocabulary and save your win streaks.",
  path: "/tools/fun/hangman",
  keywords: ["hangman", "word game", "guessing game", "vocabulary", "fun tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/hangman";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Hangman Word Game",
    url: toolUrl,
    description: "Play classic Hangman word guessing game with various categories. Test your vocabulary and save your win streaks.",
    applicationCategory: "GameApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" },
      { "@type": "ListItem", position: 3, name: "Hangman Word Game", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many wrong guesses are allowed in Hangman?",
        acceptedAnswer: { "@type": "Answer", text: "You can make up to 6 wrong guesses before the game is over." }
      },
      {
        "@type": "Question",
        name: "What categories are available?",
        acceptedAnswer: { "@type": "Answer", text: "The available categories are Tech & Coding, Animals, Countries, Movies, and Food." }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <HangmanClient />
    
      <RelatedTools currentToolUrl="/tools/fun/hangman" />
</div>
  );
}
