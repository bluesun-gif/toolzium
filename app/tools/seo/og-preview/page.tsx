import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import OgPreviewClient from "@/components/tools/seo/og-preview-client";

const TITLE = "Og Preview | Toolzium";
const DESCRIPTION = "Free online og preview tool with instant calculation and privacy.";
const PATH = "/tools/seo/og-preview";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Og Preview",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <OgPreviewClient />
    </>
  );
}
