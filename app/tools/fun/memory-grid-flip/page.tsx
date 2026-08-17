import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MemoryGridFlipClient from "@/components/tools/fun/memory-grid-flip-client";

const TITLE = "Memory Grid Flip Challenge | Toolzium";
const DESCRIPTION = "Interactive memory grid pattern flip challenge game.";
const PATH = "/tools/fun/memory-grid-flip";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Memory Grid Flip Challenge",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MemoryGridFlipClient />
    </>
  );
}
