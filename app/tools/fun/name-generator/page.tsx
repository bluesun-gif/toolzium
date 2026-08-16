import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NameGeneratorClient from "@/components/tools/fun/name-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Random Name Generator",
  description: "Generate random names for characters, babies, usernames, and pen names. 200+ first names, fantasy names, and username patterns. Filter by gender, starting letter, and category.",
  path: "/tools/fun/name-generator",
  keywords: ["first", "username", "random", "generate", "names", "fantasy", "babies", "characters", "usernames"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/name-generator`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Random Name Generator", url: toolUrl, description: "Generate random names for characters, babies, usernames, or pen names.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Random Name Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What types of names can I generate?", acceptedAnswer: { "@type": "Answer", text: "You can generate first names, full names, fantasy names, usernames, and team/project names." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><NameGeneratorClient />
      <RelatedTools currentToolUrl="/tools/fun/name-generator" />
</div>);
}
