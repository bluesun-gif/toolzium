import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorMemoryClient from "@/components/tools/fun/color-memory-client";

const TITLE = "Color Memory | Toolzium";
const DESCRIPTION = "Free online color memory tool with instant calculation and privacy.";
const PATH = "/tools/fun/color-memory";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Memory",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorMemoryClient />
    </>
  );
}
