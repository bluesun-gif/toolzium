import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TriviaGeneratorClient from "@/components/tools/fun/trivia-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Trivia Generator",
  description: "100 fun facts across Science, History, Geography, Animals, Food, Space, Sports, Technology. Filter by category. Save favorites.",
  path: "/tools/fun/trivia",
  keywords: ["across", "science", "sports", "category", "space", "filter", "animals", "facts", "geography", "history", "technology", "food"],
});

export default function Page() {
<<<<<<< HEAD
  const toolUrl = `${siteURL}/tools/fun/trivia`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Trivia Generator", url: toolUrl, description: "Generate random trivia facts across various categories.", applicationCategory: "EntertainmentApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Trivia Generator", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><TriviaGeneratorClient />
      <RelatedTools currentToolUrl="/tools/fun/trivia" />
</div>);
=======
  const jsonLd = buildToolJsonLd({
    name: "Trivia Generator",
    description: "100 fun facts across Science, History, Geography, Animals, Food, Space, Sports, Technology. Filter by category. Save favorites.",
    path: "/tools/fun/trivia",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TriviaGeneratorClient />
    </div>
  );
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
