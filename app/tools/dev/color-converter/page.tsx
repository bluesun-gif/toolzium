import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorConverterClient from "@/components/tools/dev/color-converter-client";

const TITLE = "Color Converter | Toolzium";
const DESCRIPTION = "Free online color converter tool with instant calculation and privacy.";
const PATH = "/tools/dev/color-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorConverterClient />
    </>
  );
}
