import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TipSplitterClient from "@/components/tools/calc/tip-splitter-client";

const TITLE = "Tip Split | Toolzium";
const DESCRIPTION = "Free online tip split tool with instant calculation and privacy.";
const PATH = "/tools/calc/tip-split";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Tip Split",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TipSplitterClient />
    </>
  );
}
