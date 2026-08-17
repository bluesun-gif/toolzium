import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MemeGeneratorClient from "@/components/tools/image/meme-generator-client";

const TITLE = "Meme Generator | Toolzium";
const DESCRIPTION = "Free online meme generator tool with instant calculation and privacy.";
const PATH = "/tools/image/meme-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Meme Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MemeGeneratorClient />
    </>
  );
}
