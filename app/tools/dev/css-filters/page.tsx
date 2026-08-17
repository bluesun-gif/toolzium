import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssFiltersClient from "@/components/tools/dev/css-filters-client";

const TITLE = "CSS Filter Generator | Toolzium";
const DESCRIPTION = "Visually generate and preview CSS filter effects like blur, brightness, contrast, and more.";
const PATH = "/tools/dev/css-filters";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Filter Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssFiltersClient />
    </>
  );
}
