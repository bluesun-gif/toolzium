import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TypingTestClient from "@/components/tools/util/typing-test-client";

const TITLE = "Typing Test | Toolzium";
const DESCRIPTION = "Free online typing test tool with instant calculation and privacy.";
const PATH = "/tools/util/typing-test";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Typing Test",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TypingTestClient />
    </>
  );
}
