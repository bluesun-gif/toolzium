import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TictactoeAiClient from "@/components/tools/fun/tictactoe-ai-client";

const TITLE = "Tic-Tac-Toe AI Unbeatable Challenge | Toolzium";
const DESCRIPTION = "Play Tic-Tac-Toe against an Unbeatable Minimax AI or a friend.";
const PATH = "/tools/fun/tictactoe-ai";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Tic-Tac-Toe AI Unbeatable Challenge",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TictactoeAiClient />
    </>
  );
}
