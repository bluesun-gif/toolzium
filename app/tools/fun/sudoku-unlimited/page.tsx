import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SudokuUnlimitedClient from "@/components/tools/fun/sudoku-unlimited-client";

const TITLE = "Sudoku Unlimited Puzzle Generator & Solver | Toolzium";
const DESCRIPTION = "Play, generate, and solve Sudoku puzzles with various difficulties, pencil notes, hints, and error checking.";
const PATH = "/tools/fun/sudoku-unlimited";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sudoku Unlimited Puzzle Generator & Solver",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SudokuUnlimitedClient />
    </>
  );
}
