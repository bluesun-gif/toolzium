import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ClipboardManagerClient from "@/components/tools/util/clipboard-manager-client";

const TITLE = "Clipboard Manager | Toolzium";
const DESCRIPTION = "Save and manage your clipboard history with up to 50 items. Search, re-copy, and organize text snippets. 100% private, browser-only. Free.";
const PATH = "/tools/util/clipboard-manager";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Clipboard Manager",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ClipboardManagerClient />
    </>
  );
}
