import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiffCheckerClient from "@/components/tools/dev/diff-checker-client";

const TITLE = "Diff Checker | Toolzium";
const DESCRIPTION = "Free online diff checker tool with instant calculation and privacy.";
const PATH = "/tools/dev/diff-checker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Diff Checker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DiffCheckerClient />
    </>
  );
}
