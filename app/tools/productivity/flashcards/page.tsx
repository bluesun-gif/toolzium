import JsonLd from "@/components/seo/json-ld";
import { FlashcardMakerClient } from "@/components/tools/productivity/flashcards-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

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
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <FlashcardMakerClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/flashcards" />
</div>
  );
}
