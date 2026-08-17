import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AnagramSolverClient from "@/components/tools/fun/anagram-solver-client";

const TITLE = "Anagram Solver | Toolzium";
const DESCRIPTION = "Free online anagram solver tool with instant calculation and privacy.";
const PATH = "/tools/fun/anagram-solver";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Anagram Solver",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AnagramSolverClient />
    </>
  );
}
