import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageResizerClient from "@/components/tools/image/image-resize-client";

const TITLE = "Bulk Image Resizer — Resize PNG, JPG & WebP Online Free | Toolzium";
const DESCRIPTION = "Free online bulk image resizer. Resize multiple images by exact dimensions, percentages, or social media presets (Instagram, Facebook, LinkedIn, YouTube) with 100% client-side privacy.";
const PATH = "/tools/image/resize";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Bulk Image Resizer & Compressor",
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
