import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TwoTruthsClient from "@/components/tools/fun/two-truths-client";

const TITLE = "Two Truths | Toolzium";
const DESCRIPTION = "Free online two truths tool with instant calculation and privacy.";
const PATH = "/tools/fun/two-truths";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Two Truths",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TwoTruthsClient />
    </>
  );
}
