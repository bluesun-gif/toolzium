import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FontPairingClient from "@/components/tools/image/font-pairing-client";

const TITLE = "Font Pairing Suggester | Toolzium";
const DESCRIPTION = "Discover beautiful font pairings for your next design project.";
const PATH = "/tools/image/font-pairing";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Font Pairing Suggester",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FontPairingClient />
    </>
  );
}
