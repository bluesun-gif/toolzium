import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CompoundWordsClient from "@/components/tools/fun/compound-words-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Compound Words Game | Toolzium",
  description: "Test your vocabulary with this fun compound words puzzle game.",
  path: "/tools/fun/compound-words",
  keywords: ["compound", "with", "your", "puzzle", "test", "words", "game", "this", "vocabulary"],
});

export default function Page() {
<<<<<<< HEAD
  const toolUrl = `${siteURL}/tools/fun/compound-words`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Compound Words Game", url: toolUrl, description: "A fun word puzzle game.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Compound Words Game", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><CompoundWordsClient />
      <RelatedTools currentToolUrl="/tools/fun/compound-words" />
</div>);
=======
  const jsonLd = buildToolJsonLd({
    name: "Compound Words Game",
    description: "Test your vocabulary with this fun compound words puzzle game.",
    path: "/tools/fun/compound-words",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CompoundWordsClient />
    </div>
  );
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
