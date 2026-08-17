import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AsciiArtClient from "@/components/tools/fun/ascii-art-client";

const TITLE = "Ascii Art | Toolzium";
const DESCRIPTION = "Free online ascii art tool with instant calculation and privacy.";
const PATH = "/tools/fun/ascii-art";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Ascii Art",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AsciiArtClient />
    </>
  );
}
