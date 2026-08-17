import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BlurImageClient from "@/components/tools/image/blur-image-client";

const TITLE = "Image Area Blur & Anonymizer | Toolzium";
const DESCRIPTION = "Blur or pixelate sensitive parts of an image such as faces, names, or license plates locally in your browser.";
const PATH = "/tools/image/blur-image";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Area Blur & Anonymizer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlurImageClient />
    </>
  );
}
