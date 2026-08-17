import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TypingChallengeClient from "@/components/tools/fun/typing-challenge-client";

const TITLE = "Typing Challenge | Toolzium";
const DESCRIPTION = "Free online typing challenge tool with instant calculation and privacy.";
const PATH = "/tools/fun/typing-challenge";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Typing Challenge",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TypingChallengeClient />
    </>
  );
}
