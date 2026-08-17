import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageToTextClient from "@/components/tools/image/image-to-text-client";

const TITLE = "Image To Text | Toolzium";
const DESCRIPTION = "Free online image to text tool with instant calculation and privacy.";
const PATH = "/tools/image/image-to-text";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image To Text",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ImageToTextClient />
    </>
  );
}
