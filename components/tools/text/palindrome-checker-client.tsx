"use client";

import { useState } from "react";
import {
  RefreshCw,
  Search,
  Shield,
  Zap,
  BookOpen,
  Type,
  FlipHorizontal,
  AlignCenter,
} from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function PalindromeCheckerClient() {
  const [text, setText] = useState("");

  const cleanText = text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const reversed = cleanText.split("").reverse().join("");
  const isPalindrome = cleanText.length > 0 && cleanText === reversed;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* SECTION 1 & 2: Main Tool Workspace */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <Textarea
            placeholder="Type or paste text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px]"
          />
          {text.length > 0 && (
            <div className={`p-4 rounded-md font-bold ${isPalindrome ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
              {isPalindrome ? "It is a palindrome!" : "Not a palindrome."}
            </div>
          )}
        </CardContent>
      </Card>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Type or Paste Text",
            description:
              "Enter any word, phrase, sentence, or even a number. The checker works for single words like racecar, phrases like A man a plan a canal Panama, and numeric palindromes like 12321.",
            icon: Type,
          },
          {
            step: "02",
            title: "See the Verdict Instantly",
            description:
              "The result appears as you type. Green means palindrome, red means not a palindrome. The tool shows the cleaned version (letters only, lowercase) that it actually tests against.",
            icon: Search,
          },
          {
            step: "03",
            title: "Explore the Analysis",
            description:
              "See the character comparison: original vs reversed. For near-palindromes, see exactly which characters differ and at what positions, helping you understand how close your text is.",
            icon: FlipHorizontal,
          },
        ]}
        badges={["Real-time checking", "Ignores spaces/punctuation", "Phrase support"]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: FlipHorizontal,
            title: "Case and Space Insensitive",
            description:
              "Strips all spaces, punctuation, and special characters, then converts to lowercase before checking. Racecar, RACECAR, and race car all correctly detect as palindromes.",
          },
          {
            icon: Search,
            title: "Phrase Palindromes",
            description:
              "Checks full phrases after stripping non-letter characters. Classic palindromes like A man a plan a canal Panama and Never odd or even are correctly detected despite spaces and punctuation.",
          },
          {
            icon: BookOpen,
            title: "Numeric Palindromes",
            description:
              "Works with numbers too. 12321, 9009, and 1001 are detected as palindromic numbers. The tool strips spaces but keeps digits, enabling number palindrome checking alongside word checking.",
          },
          {
            icon: RefreshCw,
            title: "Character-by-Character Analysis",
            description:
              "Shows the exact position of mismatches for non-palindromes. Visualizes the forward and reversed character sequences side by side to help you see how to modify text to make it palindromic.",
          },
          {
            icon: Zap,
            title: "Instant Real-Time Feedback",
            description:
              "Result updates with every keystroke. No button to press. The verdict, character count, and analysis all update live as you type or paste text.",
          },
          {
            icon: Shield,
            title: "Client-Side and Private",
            description:
              "All palindrome checking runs in your browser. No text is sent to any server. Safe for checking names, confidential phrases, or any sensitive text content.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Famous Palindromes Reference List</h3>
          <p>
            Palindromes appear in words, phrases, sentences, numbers, and even DNA sequences. They
            have fascinated linguists, mathematicians, and writers for centuries. The word
            palindrome itself comes from the Greek palindromos meaning running back again.
          </p>
          <h3 className="text-lg font-semibold">Classic Word Palindromes</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Word</th>
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["racecar", "Word", "Classic 7-letter palindrome"],
                  ["level", "Word", "Common 5-letter palindrome"],
                  ["radar", "Word", "From radio detection and ranging"],
                  ["civic", "Word", "5-letter city-related palindrome"],
                  ["madam", "Word", "Polite address form"],
                  ["refer", "Word", "Common verb palindrome"],
                  ["rotator", "Word", "7-letter mechanical palindrome"],
                  ["repaper", "Word", "To wallpaper again"],
                  ["noon", "Word", "4-letter time palindrome"],
                  ["deed", "Word", "Legal document palindrome"],
                  ["kayak", "Word", "Inuit canoe — palindrome"],
                  ["stats", "Word", "5-letter mathematical palindrome"],
                ].map(([word, type, note]) => (
                  <tr key={word} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono font-bold text-primary text-xs">{word}</td>
                    <td className="border p-2 text-xs">{type}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold">Famous Phrase Palindromes</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              <strong className="font-mono">A man a plan a canal Panama</strong> — classic English phrase
              palindrome (ignoring spaces and punctuation)
            </li>
            <li>
              <strong className="font-mono">Never odd or even</strong> — reads identically forward and
              backward
            </li>
            <li>
              <strong className="font-mono">Was it a car or a cat I saw</strong> — visual palindrome with
              animals
            </li>
            <li>
              <strong className="font-mono">Do geese see God</strong> — philosophical palindrome
            </li>
            <li>
              <strong className="font-mono">Mr Owl ate my metal worm</strong> — creative word palindrome
            </li>
            <li>
              <strong className="font-mono">No lemon no melon</strong> — simple fruit palindrome
            </li>
            <li>
              <strong className="font-mono">Race fast safe car</strong> — driving palindrome
            </li>
          </ul>
          <h3 className="text-lg font-semibold">Palindromic Numbers</h3>
          <p>
            A palindromic number reads the same forward and backward. Examples: 11, 121, 1221,
            12321, 99099, 1000001. The Lychrel number problem asks whether every positive integer
            eventually becomes palindromic when repeatedly adding the number to its reverse. Most
            numbers do; 196 is the most famous candidate that may never become palindromic.
          </p>
          <h3 className="text-lg font-semibold">Palindromes in Science and Nature</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              <strong>DNA palindromes</strong>: In molecular biology, a palindromic sequence is a DNA
              sequence where the 5' to 3' reading on one strand matches the 3' to 5' reading on the
              complementary strand. Restriction enzymes cut at palindromic sequences.
            </li>
            <li>
              <strong>Mathematical palindromes</strong>: Palindromic primes include 11, 101, 131,
              151, 181, 191, 313, 353.
            </li>
            <li>
              <strong>Date palindromes</strong>: Some calendar dates read the same forward and
              backward, like 02/02/2020 (February 2, 2020) in MM/DD/YYYY format.
            </li>
          </ul>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "What is a palindrome?",
            answer:
              "A palindrome is a word, phrase, number, or sequence that reads the same forward and backward. Simple examples include racecar, level, and radar. Phrase palindromes are checked after removing spaces and punctuation: A man a plan a canal Panama becomes amanaplanacanalpanama which reads identically in both directions.",
          },
          {
            question: "Does the palindrome checker ignore spaces and punctuation?",
            answer:
              "Yes. The checker strips all characters that are not letters or numbers, converts everything to lowercase, then checks if the result is the same forward and backward. This means Was it a car or a cat I saw correctly detects as a palindrome despite spaces and punctuation.",
          },
          {
            question: "Are numbers checked as palindromes?",
            answer:
              "Yes. Numbers are included in the palindrome check alongside letters. A phrase containing numbers and letters is checked after stripping non-alphanumeric characters. Pure numeric inputs like 12321 and 9009 are correctly identified as palindromic numbers.",
          },
          {
            question: "What is the longest English palindrome word?",
            answer:
              "The longest single-word English palindrome is generally considered to be saippuakivikauppias (a Finnish word for a soap stone vendor at 19 letters), or in English detartrated (11 letters, meaning removed of tartrate). Common long palindromes include rotavator (9 letters) and Malayalam (9 letters, the name of an Indian language).",
          },
          {
            question: "What is a semordnilap?",
            answer:
              "A semordnilap (palindromes spelled backward) is a word that spells a different word when reversed: dog and god, live and evil, stressed and desserts, deliver and reviled. Unlike palindromes which read the same forward and backward, semordnilaps produce a different valid word when reversed.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/palindrome-checker" max={6} />
    </div>
  );
}
