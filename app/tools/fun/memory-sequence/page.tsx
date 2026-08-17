import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MemorySequenceClient from "@/components/tools/fun/memory-sequence-client";

const TITLE = "Memory Tile Sequence Challenge | Toolzium";
const DESCRIPTION = "Test your memory with this interactive Simon-says style tile sequence game. Various grid sizes and speeds.";
const PATH = "/tools/fun/memory-sequence";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Memory Tile Sequence Challenge",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MemorySequenceClient />
    </>
  );
}
