import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RegexCheatsheetClient from "@/components/tools/dev/regex-cheatsheet-client";

const TITLE = "Regex Cheat Sheet & Tester | Toolzium";
const DESCRIPTION = "Comprehensive regex quick reference with interactive testing. Includes common patterns, character classes, anchors, and quantifiers.";
const PATH = "/tools/dev/regex-cheatsheet";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Regex Cheat Sheet & Tester",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RegexCheatsheetClient />
    </>
  );
}
