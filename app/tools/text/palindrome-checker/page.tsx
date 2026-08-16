import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PalindromeCheckerClient from "@/components/tools/text/palindrome-checker-client";
export const metadata = {
  title: "Palindrome Checker",
  description: "Check if a word, phrase, or number is a palindrome. Ignores spaces and punctuation.",
  path: "/tools/text/palindrome-checker",
  keywords: ["check", "spaces", "phrase", "number", "palindrome", "word", "punctuation", "ignores"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Palindrome Checker",
    description: "Check if a word, phrase, or number is a palindrome. Ignores spaces and punctuation.",
    path: "/tools/text/palindrome-checker",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PalindromeCheckerClient />
    
      <RelatedTools currentToolUrl="/tools/text/palindrome-checker" />
</div>
  );
}
