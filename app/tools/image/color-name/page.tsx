import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorNameFinderClient from "@/components/tools/image/color-name-client";

const TITLE = "Color Name Finder | Toolzium";
const DESCRIPTION = "Find the closest named color for any hex value, including CSS named colors and extended color names.";
const PATH = "/tools/image/color-name";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Name Finder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorNameFinderClient />
    </>
  );
}
