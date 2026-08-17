import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WhitespaceRemoverClient from "@/components/tools/text/whitespace-remover-client";

const TITLE = "Whitespace Remover";
const DESCRIPTION = "Remove extra spaces, leading/trailing whitespace, duplicate blank lines, and tab characters from text online. Clean up formatting instantly.";
const PATH = "/tools/text/whitespace-remover";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Whitespace Remover",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WhitespaceRemoverClient />
    </>
  );
}
