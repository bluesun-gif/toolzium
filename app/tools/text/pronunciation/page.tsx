import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PronunciationClient from "@/components/tools/text/pronunciation-client";

const TITLE = "Pronunciation Guide | Toolzium";
const DESCRIPTION = "Learn how to pronounce commonly mispronounced English words.";
const PATH = "/tools/text/pronunciation";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Pronunciation Guide",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PronunciationClient />
    </>
  );
}
