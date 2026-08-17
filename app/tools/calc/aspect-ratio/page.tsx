import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AspectRatioClient from "@/components/tools/calc/aspect-ratio-client";

const TITLE = "Aspect Ratio | Toolzium";
const DESCRIPTION = "Free online aspect ratio tool with instant calculation and privacy.";
const PATH = "/tools/calc/aspect-ratio";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Aspect Ratio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AspectRatioClient />
    </>
  );
}
