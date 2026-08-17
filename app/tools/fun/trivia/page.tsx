import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TriviaClient from "@/components/tools/fun/trivia-client";

const TITLE = "Trivia | Toolzium";
const DESCRIPTION = "Free online trivia tool with instant calculation and privacy.";
const PATH = "/tools/fun/trivia";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Trivia",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TriviaClient />
    </>
  );
}
