import PalindromeCheckerClient from "@/components/tools/text/palindrome-checker-client";
export const metadata = {
  title: "Palindrome Checker",
  description: "Check if a word, phrase, or number is a palindrome. Ignores spaces and punctuation.",
};

export default function PalindromeCheckerPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Palindrome Checker</h1>
        <p className="text-muted-foreground">
          Instantly check if your text reads the same forwards and backwards.
        </p>
      </div>
      <PalindromeCheckerClient />
    
      <RelatedTools currentToolUrl="/tools/text/palindrome-checker" />
</div>
  );
}
