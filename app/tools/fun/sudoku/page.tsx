import JsonLd from "@/components/seo/json-ld";
import { SudokuClient } from "@/components/tools/fun/sudoku-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Sudoku Puzzle & Solver | Toolzium",
  description: "Play and solve Sudoku puzzles with multiple difficulty levels.",
  path: "/tools/fun/sudoku",
  keywords: ["sudoku", "puzzle", "solver", "game"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/sudoku";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Sudoku Puzzle & Solver", url: toolUrl, description: "Play and solve Sudoku puzzles with multiple difficulty levels.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Sudoku Puzzle & Solver", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to play Sudoku?", acceptedAnswer: { "@type": "Answer", text: "Fill the 9x9 grid with numbers 1-9 so that each row, column, and 3x3 section contain all of the digits between 1 and 9." } }, { "@type": "Question", name: "Does it have a solver?", acceptedAnswer: { "@type": "Answer", text: "Yes, it includes an automatic solver." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><SudokuClient />
      <RelatedTools currentToolUrl="/tools/fun/sudoku" />
</div>);
}
