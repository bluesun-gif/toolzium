import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TicTacToeClient from "@/components/tools/fun/tic-tac-toe-client";

const TITLE = "Tic Tac Toe | Toolzium";
const DESCRIPTION = "Free online tic tac toe tool with instant calculation and privacy.";
const PATH = "/tools/fun/tic-tac-toe";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Tic Tac Toe",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TicTacToeClient />
    </>
  );
}
