import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RandomNumberClient from "@/components/tools/util/random-number-client";

const TITLE = "Random Number | Toolzium";
const DESCRIPTION = "Free online random number tool with instant calculation and privacy.";
const PATH = "/tools/util/random-number";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Random Number",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RandomNumberClient />
    </>
  );
}
