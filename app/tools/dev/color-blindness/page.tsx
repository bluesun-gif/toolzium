import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorBlindnessClient from "@/components/tools/dev/color-blindness-client";

const TITLE = "Color Blindness | Toolzium";
const DESCRIPTION = "Free online color blindness tool with instant calculation and privacy.";
const PATH = "/tools/dev/color-blindness";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Blindness",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorBlindnessClient />
    </>
  );
}
