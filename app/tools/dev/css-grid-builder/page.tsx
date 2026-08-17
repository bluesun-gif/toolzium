import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssGridBuilderClient from "@/components/tools/dev/css-grid-builder-client";

const TITLE = "CSS Grid Layout Visual Builder | Toolzium";
const DESCRIPTION = "Interactive visual CSS Grid builder and playground. Create grid layouts and generate CSS code snippets.";
const PATH = "/tools/dev/css-grid-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Grid Layout Visual Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssGridBuilderClient />
    </>
  );
}
