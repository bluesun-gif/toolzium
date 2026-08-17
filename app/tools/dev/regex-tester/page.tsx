import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RegexTesterClient from "@/components/tools/dev/regex-tester-client";

const TITLE = "Regex Tester | Toolzium";
const DESCRIPTION = "Free online regex tester tool with instant calculation and privacy.";
const PATH = "/tools/dev/regex-tester";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Regex Tester",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RegexTesterClient />
    </>
  );
}
