import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WordleUnlimitedClient from "@/components/tools/fun/wordle-unlimited-client";

const TITLE = "Wordle Unlimited Game & Word Helper | Toolzium";
const DESCRIPTION = "Play unlimited Wordle games and use the built-in solver to find 5-letter words.";
const PATH = "/tools/fun/wordle-unlimited";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Wordle Unlimited Game & Word Helper",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WordleUnlimitedClient />
    </>
  );
}
