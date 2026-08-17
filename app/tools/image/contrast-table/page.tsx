import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ContrastTableClient from "@/components/tools/image/contrast-table-client";

const TITLE = "Color Contrast Ratio Compliance Table | Toolzium";
const DESCRIPTION = "Generate WCAG 2.1 accessibility contrast comparison tables for design systems.";
const PATH = "/tools/image/contrast-table";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Contrast Ratio Compliance Table",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContrastTableClient />
    </>
  );
}
