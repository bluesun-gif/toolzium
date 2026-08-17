import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PatternTileMemoryClient from "@/components/tools/fun/pattern-tile-memory-client";

const TITLE = "Tile Sequence Pattern Memory Challenge | Toolzium";
const DESCRIPTION = "Test and improve your spatial memory with this interactive sequence puzzle game.";
const PATH = "/tools/fun/pattern-tile-memory";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Tile Sequence Pattern Memory Challenge",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PatternTileMemoryClient />
    </>
  );
}
