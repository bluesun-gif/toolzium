import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiTextHumanizerClient from "@/components/tools/writing/ai-text-humanizer-client";

const TITLE = "Ai Text Humanizer | Toolzium";
const DESCRIPTION = "Free online ai text humanizer generator and assistant. Fast, private, and 100% free forever.";
const PATH = "/tools/writing/ai-text-humanizer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Ai Text Humanizer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiTextHumanizerClient />
    </>
  );
}
