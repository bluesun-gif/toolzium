import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RegexLibraryClient from "@/components/tools/dev/regex-library-client";

const TITLE = "Regex Library | Toolzium";
const DESCRIPTION = "Free online regex library tool with instant calculation and privacy.";
const PATH = "/tools/dev/regex-library";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Regex Library",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RegexLibraryClient />
    </>
  );
}
