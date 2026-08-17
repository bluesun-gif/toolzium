import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ReactionTimeClient from "@/components/tools/fun/reaction-time-client";

const TITLE = "Reaction Time | Toolzium";
const DESCRIPTION = "Free online reaction time tool with instant calculation and privacy.";
const PATH = "/tools/fun/reaction-time";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Reaction Time",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ReactionTimeClient />
    </>
  );
}
