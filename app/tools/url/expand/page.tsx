import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LinkExpandClient from "@/components/tools/url/link-expand-client";

const TITLE = "Expand | Toolzium";
const DESCRIPTION = "Free online expand tool with instant calculation and privacy.";
const PATH = "/tools/url/expand";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Expand",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LinkExpandClient />
    </>
  );
}
