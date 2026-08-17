import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorThresholdClient from "@/components/tools/image/color-threshold-client";

const TITLE = "Image Color Threshold & Binarizer | Toolzium";
const DESCRIPTION = "Convert images to high-contrast black and white with adjustable thresholds.";
const PATH = "/tools/image/color-threshold";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Color Threshold & Binarizer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorThresholdClient />
    </>
  );
}
