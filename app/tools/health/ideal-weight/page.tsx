import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import IdealWeightClient from "@/components/tools/health/ideal-weight-client";

const TITLE = "Ideal Weight Calculator | Toolzium";
const DESCRIPTION = "Calculate ideal body weight using multiple formulas.";
const PATH = "/tools/health/ideal-weight";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Ideal Weight Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <IdealWeightClient />
    </>
  );
}
