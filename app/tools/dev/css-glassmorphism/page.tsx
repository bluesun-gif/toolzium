import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssGlassmorphismClient from "@/components/tools/dev/css-glassmorphism-client";

const TITLE = "CSS Glassmorphism & Backdrop Filter Generator | Toolzium";
const DESCRIPTION = "Visual CSS Glassmorphism generator. Controls for blur, transparency, saturation, border width, and shadow.";
const PATH = "/tools/dev/css-glassmorphism";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Glassmorphism & Backdrop Filter Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssGlassmorphismClient />
    </>
  );
}
