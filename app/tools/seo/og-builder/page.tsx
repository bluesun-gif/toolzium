import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import OgBuilderClient from "@/components/tools/seo/og-builder-client";

const TITLE = "Og Builder | Toolzium";
const DESCRIPTION = "Free online og builder tool with instant calculation and privacy.";
const PATH = "/tools/seo/og-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Og Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <OgBuilderClient />
    </>
  );
}
