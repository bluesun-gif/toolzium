import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageResizerClient from "@/components/tools/image/image-resizer-client";

const TITLE = "Image Resizer — Resize Images Online in KB / Pixels | Toolzium";
const DESCRIPTION = "Free online image resizer. Resize single or bulk images by pixels or percentage, maintain aspect ratio, adjust quality, and target file size in KB. Instant 100% browser-based photo resizer.";
const PATH = "/tools/image/image-resizer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Resizer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ImageResizerClient />
    </>
  );
}
