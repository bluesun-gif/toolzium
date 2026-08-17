import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NumberGuessClient from "@/components/tools/fun/number-guess-client";

const TITLE = "Number Guess | Toolzium";
const DESCRIPTION = "Free online number guess tool with instant calculation and privacy.";
const PATH = "/tools/fun/number-guess";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Number Guess",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NumberGuessClient />
    </>
  );
}
