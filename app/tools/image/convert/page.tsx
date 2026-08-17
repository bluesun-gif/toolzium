import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageConvertClient from "@/components/tools/image/image-convert-client";

const TITLE = "Convert | Toolzium";
const DESCRIPTION = "Free online convert tool with instant calculation and privacy.";
const PATH = "/tools/image/convert";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Convert",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ImageConvertClient />
    </>
  );
}
