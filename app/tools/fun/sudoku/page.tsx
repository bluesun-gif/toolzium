import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SudokuClient from "@/components/tools/fun/sudoku-client";

const TITLE = "Sudoku Puzzle & Solver | Toolzium";
const DESCRIPTION = "Play and solve Sudoku puzzles with multiple difficulty levels.";
const PATH = "/tools/fun/sudoku";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sudoku Puzzle & Solver",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SudokuClient />
    </>
  );
}
