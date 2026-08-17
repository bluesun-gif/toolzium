import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageAsciiClient from "@/components/tools/image/image-ascii-client";

const TITLE = "Image to ASCII Art Generator | Toolzium";
const DESCRIPTION = "Convert your images into amazing ASCII text art with customizable character sets and colors.";
const PATH = "/tools/image/image-ascii";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image to ASCII Art Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ImageAsciiClient />
    </>
  );
}
