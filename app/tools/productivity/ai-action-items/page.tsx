import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiActionItemsClient from "@/components/tools/productivity/ai-action-items-client";

const TITLE = "AI Meeting Action Items Extractor Studio | Toolzium";
const DESCRIPTION = "Convert raw meeting transcripts and notes into clear owner assignments, deadlines, and task cards using live AI.";
const PATH = "/tools/productivity/ai-action-items";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Meeting Action Items Extractor Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiActionItemsClient />
    </>
  );
}
