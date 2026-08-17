import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MemoryCardMatchClient from "@/components/tools/fun/memory-card-match-client";

const TITLE = "Memory Card Match | Toolzium";
const DESCRIPTION = "Free online memory card match tool with instant calculation and privacy.";
const PATH = "/tools/fun/memory-card-match";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Memory Card Match",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MemoryCardMatchClient />
    </>
  );
}
