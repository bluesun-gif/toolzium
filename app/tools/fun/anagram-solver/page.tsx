import JsonLd from "@/components/seo/json-ld";
import { AnagramSolverClient } from "@/components/tools/fun/anagram-solver-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Anagram Finder & Solver | Toolzium",
  description: "Find all possible valid English anagram words from input letters.",
  path: "/tools/fun/anagram-solver",
  keywords: ["anagram", "solver", "word finder", "scrabble", "wordle"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/anagram-solver";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Anagram Finder & Solver", url: toolUrl, description: "Find all possible valid English anagram words from input letters.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Anagram Finder & Solver", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How does it work?", acceptedAnswer: { "@type": "Answer", text: "Enter letters to find all possible anagrams." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><AnagramSolverClient /></div>);
}
