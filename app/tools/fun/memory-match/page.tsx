import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MemoryMatchClient from "@/components/tools/fun/memory-match-client";

const TITLE = "Memory Match Game | Toolzium";
const DESCRIPTION = "Play the classic card memory matching game. Test your memory with different themes like animals, food, and flags.";
const PATH = "/tools/fun/memory-match";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Memory Match Game",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MemoryMatchClient />
    </>
  );
}
