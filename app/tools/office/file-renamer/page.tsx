import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FileRenamerClient from "@/components/tools/office/file-renamer-client";

const TITLE = "Batch File Renamer | Toolzium";
const DESCRIPTION = "Preview file rename patterns without actually renaming.";
const PATH = "/tools/office/file-renamer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Batch File Renamer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FileRenamerClient />
    </>
  );
}
