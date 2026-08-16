import JsonLd from "@/components/seo/json-ld";
import { EmojiPickerClient } from "@/components/tools/text/emoji-picker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Emoji Picker & Search | Toolzium",
  description: "Search and copy emojis easily. Browse by categories like Smileys, People, Animals, Food, and more.",
  path: "/tools/text/emoji-picker",
  keywords: ["emoji picker", "emoji search", "copy emoji", "text tools", "emoji grid"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/emoji-picker`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Emoji Picker & Search",
    url: toolUrl,
    description: "Search and copy emojis easily with an intuitive categorised grid.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Text Tools", item: `${siteURL}/tools#cat-text` },
      { "@type": "ListItem", position: 3, name: "Emoji Picker & Search", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I copy an emoji?",
        acceptedAnswer: { "@type": "Answer", text: "Simply click on any emoji in the grid to instantly copy it to your clipboard." }
      },
      {
        "@type": "Question",
        name: "Can I search for emojis?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, use the search bar to find emojis by name or keyword." }
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EmojiPickerClient />
    
      <RelatedTools currentToolUrl="/tools/text/emoji-picker" />
</div>
  );
}
