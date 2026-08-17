import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ProteinCalcClient from "@/components/tools/health/protein-calc-client";

const TITLE = "Protein Intake Calculator | Toolzium";
const DESCRIPTION = "Calculate your daily recommended protein intake based on your goals.";
const PATH = "/tools/health/protein-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Protein Intake Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProteinCalcClient />
    </>
  );
}
