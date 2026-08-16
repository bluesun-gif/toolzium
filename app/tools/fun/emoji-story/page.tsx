import JsonLd from "@/components/seo/json-ld";
import EmojiStoryClient from "@/components/tools/fun/emoji-story-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Emoji Story Generator | Toolzium",
  description: "Generate random emoji stories and scenarios with silly text translations.",
  path: "/tools/fun/emoji-story",
  keywords: ["emoji story", "generator", "fun", "random emoji", "storytelling"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/emoji-story`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Emoji Story Generator", url: toolUrl, description: "Generate random emoji stories.", applicationCategory: "EntertainmentApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Emoji Story Generator", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><EmojiStoryClient />
      <RelatedTools currentToolUrl="/tools/fun/emoji-story" />
</div>);
}
