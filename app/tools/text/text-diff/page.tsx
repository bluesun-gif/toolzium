import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TextDiffClient from "@/components/tools/text/text-diff-client";

const TITLE = "Text Diff | Toolzium";
const DESCRIPTION = "Free online text diff tool with instant calculation and privacy.";
const PATH = "/tools/text/text-diff";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Text Diff",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TextDiffClient />
    </>
  );
}
