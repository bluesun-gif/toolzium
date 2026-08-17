import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CodeMinifierClient from "@/components/tools/dev/code-minifier-client";

const TITLE = "Code Minifier | Toolzium";
const DESCRIPTION = "Minify HTML, CSS, and JavaScript code to reduce file size and improve load times.";
const PATH = "/tools/dev/code-minifier";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Code Minifier",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CodeMinifierClient />
    </>
  );
}
