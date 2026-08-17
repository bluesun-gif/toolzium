import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorContrastClient from "@/components/tools/image/color-contrast-checker-client";

const TITLE = "Image & Palette Color Contrast Checker | Toolzium";
const DESCRIPTION = "Check WCAG 2.1 accessibility color contrast ratios between text color and background color.";
const PATH = "/tools/image/color-contrast-checker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image & Palette Color Contrast Checker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorContrastClient />
    </>
  );
}
