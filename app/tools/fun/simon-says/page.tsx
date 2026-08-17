import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SimonSaysClient from "@/components/tools/fun/simon-says-client";

const TITLE = "Simon Says | Toolzium";
const DESCRIPTION = "Free online simon says tool with instant calculation and privacy.";
const PATH = "/tools/fun/simon-says";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Simon Says",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SimonSaysClient />
    </>
  );
}
