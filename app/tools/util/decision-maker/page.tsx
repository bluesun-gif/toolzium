import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DecisionMakerClient from "@/components/tools/util/decision-maker-client";

const TITLE = "Decision Maker | Toolzium";
const DESCRIPTION = "Help make decisions with simple random choice or weighted criteria.";
const PATH = "/tools/util/decision-maker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Decision Maker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DecisionMakerClient />
    </>
  );
}
