import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageCompressClient from "@/components/tools/image/image-compress-client";

const TITLE = "Compress | Toolzium";
const DESCRIPTION = "Free online compress tool with instant calculation and privacy.";
const PATH = "/tools/image/compress";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Compress",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ImageCompressClient />
    </>
  );
}
