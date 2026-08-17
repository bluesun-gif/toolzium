import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FancyTextClient from "@/components/tools/text/fancy-text-client";

const TITLE = "Fancy Text | Toolzium";
const DESCRIPTION = "Free online fancy text tool with instant calculation and privacy.";
const PATH = "/tools/text/fancy-text";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Fancy Text",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FancyTextClient />
    </>
  );
}
