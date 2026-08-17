import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HtmlEntitiesClient from "@/components/tools/dev/html-entities-client";

const TITLE = "Html Entities | Toolzium";
const DESCRIPTION = "Free online html entities tool with instant calculation and privacy.";
const PATH = "/tools/dev/html-entities";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Html Entities",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HtmlEntitiesClient />
    </>
  );
}
