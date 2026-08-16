import JsonLd from "@/components/seo/json-ld";
import { PhrasebookClient } from "@/components/tools/travel/phrasebook-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Travel Phrasebook | Toolzium",
  description: "Essential travel phrases in multiple languages with pronunciation and audio playback.",
  path: "/tools/travel/phrasebook",
  keywords: ["travel phrasebook", "language translator", "common phrases", "travel languages"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/phrasebook`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Travel Phrasebook", url: toolUrl, description: "Essential travel phrases in multiple languages with pronunciation.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` }, { "@type": "ListItem", position: 3, name: "Travel Phrasebook", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Travel Phrase Book work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Travel Phrase Book runs instantly in your browser. Common travel phrases in 8 languages. Greetings, Directions, Food, Emergency. Phonetic pronunciation. Audio playback. Bookmark favorites. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Travel Phrase Book 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Travel Phrase Book is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Travel Phrase Book?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PhrasebookClient />
    
      <RelatedTools currentToolUrl="/tools/travel/phrasebook" />
</div>
  );
}
