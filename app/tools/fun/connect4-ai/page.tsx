import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import Connect4AiClient from "@/components/tools/fun/connect4-ai-client";

const TITLE = "Connect 4 AI Challenge | Toolzium";
const DESCRIPTION = "Play Connect 4 against a smart AI or a friend. Features interactive grid, multiple AI difficulties, and game statistics.";
const PATH = "/tools/fun/connect4-ai";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Connect 4 AI Challenge",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Connect4AiClient />
    </>
  );
}
