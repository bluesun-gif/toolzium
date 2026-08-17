import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PalindromeCheckerClient from "@/components/tools/text/palindrome-checker-client";

const TITLE = "Palindrome Checker | Toolzium";
const DESCRIPTION = "Free online palindrome checker tool with instant calculation and privacy.";
const PATH = "/tools/text/palindrome-checker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Palindrome Checker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PalindromeCheckerClient />
    </>
  );
}
