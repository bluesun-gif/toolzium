import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import GradientGeneratorClient from "@/components/tools/dev/gradient-generator-client";

const TITLE = "Color Gradient Generator | Toolzium";
const DESCRIPTION = "Create beautiful CSS gradients visually. Support for linear and radial gradients with adjustable angles and multiple color stops.";
const PATH = "/tools/dev/gradient-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Gradient Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <GradientGeneratorClient />
    </>
  );
}
