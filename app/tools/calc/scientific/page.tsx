import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ScientificCalculatorClient from "@/components/tools/calc/scientific-calculator-client";

const TITLE = "Scientific | Toolzium";
const DESCRIPTION = "Free online scientific tool with instant calculation and privacy.";
const PATH = "/tools/calc/scientific";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Scientific",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScientificCalculatorClient />
    </>
  );
}
