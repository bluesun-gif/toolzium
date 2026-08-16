import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmojiStoryClient from "@/components/tools/fun/emoji-story-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Emoji Story Generator",
  description: "Generate random emoji stories by category. Adventure, Romance, Mystery, Comedy, Sci-Fi, Horror. Silly text translations. Rate and share.",
  path: "/tools/fun/emoji-story",
  keywords: ["random", "comedy", "generate", "category", "adventure", "emoji", "mystery", "romance", "silly", "stories", "text", "horror"],
});

export default function Page() {
<<<<<<< HEAD
  const toolUrl = `${siteURL}/tools/fun/emoji-story`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Emoji Story Generator", url: toolUrl, description: "Generate random emoji stories.", applicationCategory: "EntertainmentApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Emoji Story Generator", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><EmojiStoryClient />
      <RelatedTools currentToolUrl="/tools/fun/emoji-story" />
</div>);
=======
  const jsonLd = buildToolJsonLd({
    name: "Emoji Story Generator",
    description: "Generate random emoji stories by category. Adventure, Romance, Mystery, Comedy, Sci-Fi, Horror. Silly text translations. Rate and share.",
    path: "/tools/fun/emoji-story",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <EmojiStoryClient />
    </div>
  );
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
