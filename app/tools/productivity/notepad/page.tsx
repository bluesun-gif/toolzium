import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NotepadClient from "@/components/tools/productivity/notepad-client";

const TITLE = "Notepad | Toolzium";
const DESCRIPTION = "Free online notepad tool with instant calculation and privacy.";
const PATH = "/tools/productivity/notepad";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Notepad",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NotepadClient />
    </>
  );
}
