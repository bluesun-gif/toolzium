import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UTMBuilderClient from "@/components/tools/url/utm-builder-client";

const TITLE = "Utm Builder | Toolzium";
const DESCRIPTION = "Free online utm builder tool with instant calculation and privacy.";
const PATH = "/tools/url/utm-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Utm Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <UTMBuilderClient />
    </>
  );
}
