import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorContrastClient from "@/components/tools/image/color-contrast-extractor-client";

const TITLE = "Color Contrast Ratio & Accessibility Analyzer | Toolzium";
const DESCRIPTION = "Test color contrast ratios between text and background colors to ensure WCAG accessibility compliance.";
const PATH = "/tools/image/color-contrast-extractor";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Contrast Ratio & Accessibility Analyzer",
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
