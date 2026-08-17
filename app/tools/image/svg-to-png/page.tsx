import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SvgToPngClient from "@/components/tools/image/svg-to-png-client";

const TITLE = "Svg To Png | Toolzium";
const DESCRIPTION = "Free online svg to png tool with instant calculation and privacy.";
const PATH = "/tools/image/svg-to-png";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Svg To Png",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SvgToPngClient />
    </>
  );
}
