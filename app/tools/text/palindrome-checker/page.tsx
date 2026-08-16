import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PalindromeCheckerClient from "@/components/tools/text/palindrome-checker-client";
<<<<<<< HEAD
export const metadata = {
=======

export const metadata = buildMetadata({
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
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
