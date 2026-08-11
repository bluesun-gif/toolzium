import JsonLd from "@/components/seo/json-ld";
import TriviaGeneratorClient from "@/components/tools/fun/trivia-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Trivia Generator | Toolzium",
  description: "Generate random trivia facts across various categories.",
  path: "/tools/fun/trivia",
  keywords: ["trivia generator", "random facts", "fun facts"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/trivia`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Trivia Generator", url: toolUrl, description: "Generate random trivia facts across various categories.", applicationCategory: "EntertainmentApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Trivia Generator", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><TriviaGeneratorClient /></div>);
}
