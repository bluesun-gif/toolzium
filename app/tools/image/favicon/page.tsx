import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FaviconGeneratorClient from "@/components/tools/image/favicon-client";

const TITLE = "Favicon Generator | Toolzium";
const DESCRIPTION = "Generate favicons from text, emoji, or images. Preview and download in multiple sizes.";
const PATH = "/tools/image/favicon";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Favicon Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FaviconGeneratorClient />
    </>
  );
}
