import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SvgOptimizerClient from "@/components/tools/dev/svg-optimizer-client";

const TITLE = "Svg Optimizer | Toolzium";
const DESCRIPTION = "Free online svg optimizer tool with instant calculation and privacy.";
const PATH = "/tools/dev/svg-optimizer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Svg Optimizer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SvgOptimizerClient />
    </>
  );
}
