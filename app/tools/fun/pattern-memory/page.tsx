import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PatternMemoryClient from "@/components/tools/fun/pattern-memory-client";

const TITLE = "Memory Pattern Game | Toolzium";
const DESCRIPTION = "Test your memory with this visual grid pattern game.";
const PATH = "/tools/fun/pattern-memory";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Memory Pattern Game",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PatternMemoryClient />
    </>
  );
}
