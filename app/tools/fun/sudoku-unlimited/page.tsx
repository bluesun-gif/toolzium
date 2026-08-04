import JsonLd from "@/components/seo/json-ld";
import { SudokuUnlimitedClient } from "@/components/tools/fun/sudoku-unlimited-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sudoku Unlimited Puzzle Generator & Solver | Toolzium",
  description: "Play, generate, and solve Sudoku puzzles with various difficulties, pencil notes, hints, and error checking.",
  path: "/tools/fun/sudoku-unlimited",
  keywords: ["sudoku", "puzzle", "generator", "solver", "game"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/sudoku-unlimited";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Sudoku Unlimited", 
    url: toolUrl, 
    description: "Play, generate, and solve Sudoku puzzles.", 
    applicationCategory: "GameApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, 
      { "@type": "ListItem", position: 3, name: "Sudoku Unlimited", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "How do I use pencil notes?", acceptedAnswer: { "@type": "Answer", text: "Toggle the pencil icon to draft potential numbers in a cell." } }
    ] 
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SudokuUnlimitedClient />
    </div>
  );
}
