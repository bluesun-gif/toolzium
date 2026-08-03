import JsonLd from "@/components/seo/json-ld";
import { TruthOrDareClient } from "@/components/tools/fun/truth-or-dare-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Truth or Dare Generator — Random Questions & Dares | Toolzium",
  description: "Generate random truth questions and dare challenges for your next party or game night. Features family-friendly and adult modes with multiple difficulties.",
  path: "/tools/fun/truth-or-dare",
  keywords: ["truth or dare", "random truth generator", "random dare generator", "party game", "icebreaker", "fun tools", "party tools", "game night"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/truth-or-dare`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Truth or Dare Generator",
    "url": toolUrl,
    "description": "Generate random truth questions and dare challenges for your next party or game night. Features family-friendly and adult modes with multiple difficulties.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteURL },
      { "@type": "ListItem", "position": 2, "name": "Fun Tools", "item": `${siteURL}/tools#cat-fun` },
      { "@type": "ListItem", "position": 3, "name": "Truth or Dare Generator", "item": toolUrl }
    ]
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the Truth or Dare Generator work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply choose whether you want a truth or a dare by clicking the respective button. The tool will randomly select a prompt based on your selected difficulty and age rating."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Truth or Dare Generator family-friendly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer a Family Friendly mode suitable for all ages, as well as an Adult (18+) mode for more mature audiences."
        }
      },
      {
        "@type": "Question",
        "name": "Can I choose the difficulty level?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can filter prompts by Easy, Medium, or Spicy difficulty to tailor the game to your group's comfort level."
        }
      }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TruthOrDareClient />
    </div>
  );
}
