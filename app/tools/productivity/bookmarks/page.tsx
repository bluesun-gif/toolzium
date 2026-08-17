import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BookmarksClient from "@/components/tools/productivity/bookmarks-client";

const TITLE = "Bookmark Manager | Toolzium";
const DESCRIPTION = "Organize and manage your bookmarks and links.";
const PATH = "/tools/productivity/bookmarks";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Bookmark Manager",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BookmarksClient />
    </>
  );
}
