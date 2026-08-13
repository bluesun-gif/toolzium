import JsonLd from "@/components/seo/json-ld";
import { FlashcardMakerClient } from "@/components/tools/productivity/flashcards-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Flashcard Maker | Toolzium",
  description: "Create, study, and manage your custom flashcard decks for effective learning and memorization.",
  path: "/tools/productivity/flashcards",
  keywords: ["flashcards", "study tools", "memorization", "spaced repetition", "learning"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/flashcards`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Flashcard Maker", url: toolUrl, description: "Create and study custom flashcards.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Flashcard Maker", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Flashcard Maker work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Flashcard Maker runs instantly in your browser. Create study flashcards with flip animations. Multiple deck management, shuffle mode, progress tracking, and JSON import/export. Perfect for students and self-learners. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Flashcard Maker 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Flashcard Maker is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Flashcard Maker?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <FlashcardMakerClient />
    </div>
  );
}
