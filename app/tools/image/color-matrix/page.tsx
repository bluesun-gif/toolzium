import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorMatrixClient from "@/components/tools/image/color-matrix-client";

const TITLE = "Image Color Palette Contrast Matrix | Toolzium";
const DESCRIPTION = "Test color contrast ratios across a design system palette to ensure WCAG AA and AAA accessibility compliance.";
const PATH = "/tools/image/color-matrix";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Color Palette Contrast Matrix",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorMatrixClient />
    </>
  );
}
