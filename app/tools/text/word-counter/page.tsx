import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WordCounterClient from "@/components/tools/text/word-counter-client";

const TITLE = "Word Counter | Toolzium";
const DESCRIPTION = "Free online word counter tool with instant calculation and privacy.";
const PATH = "/tools/text/word-counter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Word Counter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WordCounterClient />
    </>
  );
}
