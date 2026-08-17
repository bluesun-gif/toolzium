import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ReadingListClient from "@/components/tools/productivity/reading-list-client";

const TITLE = "Reading List Manager | Toolzium";
const DESCRIPTION = "Manage your reading list of books, articles, and papers with our free online tool.";
const PATH = "/tools/productivity/reading-list";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Reading List Manager",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ReadingListClient />
    </>
  );
}
