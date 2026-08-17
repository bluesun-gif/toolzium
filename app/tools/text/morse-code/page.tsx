import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MorseCodeClient from "@/components/tools/text/morse-code-client";

const TITLE = "Morse Code | Toolzium";
const DESCRIPTION = "Free online morse code tool with instant calculation and privacy.";
const PATH = "/tools/text/morse-code";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Morse Code",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MorseCodeClient />
    </>
  );
}
