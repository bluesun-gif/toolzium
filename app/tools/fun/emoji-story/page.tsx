import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmojiStoryClient from "@/components/tools/fun/emoji-story-client";

const TITLE = "Emoji Story | Toolzium";
const DESCRIPTION = "Free online emoji story tool with instant calculation and privacy.";
const PATH = "/tools/fun/emoji-story";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Emoji Story",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EmojiStoryClient />
    </>
  );
}
