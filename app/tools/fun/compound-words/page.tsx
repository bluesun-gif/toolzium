import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CompoundWordsClient from "@/components/tools/fun/compound-words-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Compound Words Game | Toolzium",
  description: "Test your vocabulary with this fun compound words puzzle game.",
  path: "/tools/fun/compound-words",
  keywords: ["compound", "with", "your", "puzzle", "test", "words", "game", "this", "vocabulary"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/compound-words`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Compound Words Game", url: toolUrl, description: "A fun word puzzle game.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Compound Words Game", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><CompoundWordsClient />
      <RelatedTools currentToolUrl="/tools/fun/compound-words" />
</div>);
}
