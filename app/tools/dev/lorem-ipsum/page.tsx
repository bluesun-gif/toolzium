import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LoremIpsumClient from "@/components/tools/dev/lorem-ipsum-client";

const TITLE = "Lorem Ipsum | Toolzium";
const DESCRIPTION = "Free online lorem ipsum tool with instant calculation and privacy.";
const PATH = "/tools/dev/lorem-ipsum";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Lorem Ipsum",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LoremIpsumClient />
    </>
  );
}
