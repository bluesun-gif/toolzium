import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AnagramSolverClient from "@/components/tools/fun/anagram-solver-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Anagram Finder & Solver",
  description: "Find all possible valid English anagram words from input letters. Length filters, wildcards, Scrabble letter scores.",
  path: "/tools/fun/anagram-solver",
  keywords: ["from", "filters", "english", "length", "letters", "valid", "find", "anagram", "words", "input", "possible", "wildcards"],
});

export default function Page() {
<<<<<<< HEAD
  const toolUrl = siteURL + "/tools/fun/anagram-solver";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Anagram Finder & Solver", url: toolUrl, description: "Find all possible valid English anagram words from input letters.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Anagram Finder & Solver", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How does it work?", acceptedAnswer: { "@type": "Answer", text: "Enter letters to find all possible anagrams." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><AnagramSolverClient />
      <RelatedTools currentToolUrl="/tools/fun/anagram-solver" />
</div>);
=======
  const jsonLd = buildToolJsonLd({
    name: "Anagram Finder & Solver",
    description: "Find all possible valid English anagram words from input letters. Length filters, wildcards, Scrabble letter scores.",
    path: "/tools/fun/anagram-solver",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AnagramSolverClient />
    </div>
  );
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
