import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmojiPickerClient from "@/components/tools/text/emoji-picker-client";

const TITLE = "Emoji Picker & Search | Toolzium";
const DESCRIPTION = "Search and copy emojis easily. Browse by categories like Smileys, People, Animals, Food, and more.";
const PATH = "/tools/text/emoji-picker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Emoji Picker & Search",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EmojiPickerClient />
    </>
  );
}
