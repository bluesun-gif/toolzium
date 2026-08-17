import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CompoundGrowthClient from "@/components/tools/finance/compound-growth-client";

const TITLE = "Investment Compound Growth Visualizer | Toolzium";
const DESCRIPTION = "Calculate and visualize your investment growth with compound interest.";
const PATH = "/tools/finance/compound-growth";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Investment Compound Growth Visualizer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CompoundGrowthClient />
    </>
  );
}
