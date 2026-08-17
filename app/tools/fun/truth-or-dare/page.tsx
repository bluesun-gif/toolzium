import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TruthOrDareClient from "@/components/tools/fun/truth-or-dare-client";

const TITLE = "Truth Or Dare | Toolzium";
const DESCRIPTION = "Free online truth or dare tool with instant calculation and privacy.";
const PATH = "/tools/fun/truth-or-dare";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Truth Or Dare",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TruthOrDareClient />
    </>
  );
}
