import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TextToListClient from "@/components/tools/text/text-to-list-client";

const TITLE = "To List | Toolzium";
const DESCRIPTION = "Free online to list tool with instant calculation and privacy.";
const PATH = "/tools/text/to-list";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "To List",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TextToListClient />
    </>
  );
}
