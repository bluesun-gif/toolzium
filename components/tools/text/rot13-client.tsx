"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Shield, RefreshCw, BookOpen, RotateCcw, Lock, Copy, Code2, Hash, Eye, Zap } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";

export function Rot13Client() {
  const [inputText, setInputText] = useState("");
  const [shiftAmount, setShiftAmount] = useState<number>(13);
  const [isBruteForce, setIsBruteForce] = useState(false);

  // Apply Caesar cipher with a specific shift
  const applyCaesar = useCallback((text: string, shift: number) => {
    return text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          // Uppercase
          return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          // Lowercase
          return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        return char; // Non-alphabetic characters remain unchanged
      })
      .join("");
  }, []);

  const outputText = useMemo(() => {
    if (isBruteForce) return "";
    return applyCaesar(inputText, shiftAmount);
  }, [inputText, shiftAmount, isBruteForce, applyCaesar]);

  const bruteForceResults = useMemo(() => {
    if (!isBruteForce || !inputText) return [];
    const results = [];
    for (let i = 1; i < 26; i++) {
      results.push({ shift: i, text: applyCaesar(inputText, i) });
    }
    return results;
  }, [inputText, isBruteForce, applyCaesar]);

  const frequencyAnalysis = useMemo(() => {
    if (!inputText) return [];
    const counts: Record<string, number> = {};
    let totalAlpha = 0;
    
    for (const char of inputText.toLowerCase()) {
      if (/[a-z]/.test(char)) {
        counts[char] = (counts[char] || 0) + 1;
        totalAlpha++;
      }
    }
    
    if (totalAlpha === 0) return [];
    
    return Object.entries(counts)
      .map(([char, count]) => ({
        char,
        count,
        percentage: ((count / totalAlpha) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count);
  }, [inputText]);

  const handleReset = () => {
    setInputText("");
    setShiftAmount(13);
    setIsBruteForce(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        title="ROT13 / Caesar Cipher"
        description="Encode and decode text using ROT13 or a custom Caesar cipher shift. Includes brute-force mode and frequency analysis."
        icon={Shield}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to encode or decode..."
                className="w-full min-h-[200px] p-4 rounded-md border border-input bg-background resize-y"
              />
              
              <div className="mt-4 flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium mb-2">
                    Shift Amount: {shiftAmount}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={shiftAmount}
                    onChange={(e) => setShiftAmount(Number(e.target.value))}
                    disabled={isBruteForce}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span>
                    <span>13 (ROT13)</span>
                    <span>25</span>
                  </div>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setShiftAmount(13);
                      setIsBruteForce(false);
                    }}
                    className={"px-4 py-2 rounded-md border text-sm font-medium transition-colors " + (shiftAmount === 13 && !isBruteForce
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:bg-muted")}
                  >
                    ROT13
                  </button>
                  <button
                    onClick={() => setIsBruteForce(!isBruteForce)}
                    className={"px-4 py-2 rounded-md border text-sm font-medium transition-colors " + (isBruteForce
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:bg-muted")}
                  >
                    Brute Force
                  </button>
                  <ResetButton onClick={handleReset} />
                </div>
              </div>
            </CardContent>
          </GlassCard>

          {frequencyAnalysis.length > 0 && (
            <GlassCard>
              <CardHeader>
                <CardTitle>Character Frequency Analysis (Input)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {frequencyAnalysis.map(({ char, count, percentage }) => (
                    <div
                      key={char}
                      className="flex flex-col items-center p-2 rounded-md bg-muted min-w-[3rem]"
                    >
                      <span className="text-lg font-bold uppercase">{char}</span>
                      <span className="text-xs">{count}</span>
                      <span className="text-[10px] text-muted-foreground">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </GlassCard>
          )}
        </div>

        <div className="space-y-6">
          {!isBruteForce ? (
            <GlassCard>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Result (Shift +{shiftAmount})</CardTitle>
                {outputText && <CopyButton getText={() => outputText} />}
              </CardHeader>
              <CardContent>
                <div className="w-full min-h-[200px] p-4 rounded-md border border-input bg-muted whitespace-pre-wrap break-words">
                  {outputText || <span className="text-muted-foreground">Output will appear here...</span>}
                </div>
                
                <div className="mt-4 p-4 rounded-md bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900">
                  <h4 className="text-sm font-semibold mb-1">How to reverse this?</h4>
                  <p className="text-sm text-muted-foreground">
                    To decode this text, {shiftAmount === 13 ? "apply ROT13 again." : `apply a shift of ${26 - shiftAmount}.`}
                  </p>
                </div>
              </CardContent>
            </GlassCard>
          ) : (
            <GlassCard>
              <CardHeader>
                <CardTitle>Brute Force Results (All Shifts)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {bruteForceResults.length > 0 ? (
                    bruteForceResults.map(({ shift, text }) => (
                      <div key={shift} className="p-3 rounded-md border border-input bg-background">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-sm">Shift +{shift} {shift === 13 && "(ROT13)"}</span>
                          <CopyButton getText={() => text} size="sm" />
                        </div>
                        <div className="whitespace-pre-wrap break-words text-sm bg-muted p-2 rounded">
                          {text}
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-muted-foreground">Enter text to see all possible shifts...</span>
                  )}
                </div>
              </CardContent>
            </GlassCard>
          )}
        </div>
      </div>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Enter Your Text",
            description: "Type or paste any text you want to encode or decode with ROT13. Works with any Latin alphabet text — numbers, spaces, and punctuation are passed through unchanged.",
            icon: Code2,
          },
          {
            step: "02",
            title: "ROT13 Applied Instantly",
            description: "The cipher is applied character by character in real time as you type. Each letter is shifted 13 positions forward in the alphabet — A becomes N, B becomes O, etc.",
            icon: RotateCcw,
          },
          {
            step: "03",
            title: "Copy the Result",
            description: "Copy the ROT13 output with one click. To decode ROT13 text, simply paste the encoded text — applying ROT13 twice returns the original text.",
            icon: Copy,
          },
        ]}
        badges={[
          "Encode & decode in one step",
          "Instant cipher",
          "Numbers unchanged",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: RotateCcw,
            title: "Self-Inverse Cipher",
            description: "ROT13 is its own inverse: applying it twice returns the original text. There's no separate encode/decode button — paste encoded text and it decodes automatically.",
          },
          {
            icon: Eye,
            title: "Spoiler Hiding",
            description: "ROT13 is traditionally used on Usenet, Reddit, and forums to hide spoilers. Readers must actively decode to read — preventing accidental spoiling.",
          },
          {
            icon: Hash,
            title: "Letter-Only Substitution",
            description: "Only A-Z and a-z letters are shifted. Numbers (0-9), spaces, punctuation, and special characters pass through unchanged — preserving the structure of the text.",
          },
          {
            icon: Code2,
            title: "Caesar Cipher Variant",
            description: "ROT13 is a Caesar cipher with a shift of 13. It works on the 26-letter English alphabet, where shifting 13 positions in either direction gives the same result.",
          },
          {
            icon: Lock,
            title: "Not Encryption",
            description: "ROT13 provides no real security — anyone who knows the system can decode it instantly. Use it only for casual obfuscation, spoiler hiding, and puzzle games.",
          },
          {
            icon: Shield,
            title: "Client-Side & Private",
            description: "All ROT13 encoding happens in your browser. Your text is never sent to any server — safe for any content you don't want transmitted.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">ROT13 & Caesar Cipher Guide</h3>
          <p>
            <strong>ROT13</strong> ("rotate by 13 places") is a simple letter substitution cipher
            that replaces each letter with the letter 13 positions after it in the alphabet.
            Because the English alphabet has 26 letters, ROT13 is self-inverse: applying it
            twice always returns the original text. It was widely used on Usenet newsgroups
            in the 1980s-1990s to obscure punchlines, spoilers, and potentially offensive content.
          </p>

          <h4 className="font-semibold">ROT13 Alphabet Map</h4>
          <div className="bg-muted/40 rounded-lg p-4 font-mono text-xs overflow-x-auto">
            <div>Plain:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</div>
            <div>ROT13:  N O P Q R S T U V W X Y Z A B C D E F G H I J K L M</div>
          </div>

          <h4 className="font-semibold">Caesar Cipher Variants</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Cipher</th>
                  <th className="border p-2 text-left">Shift</th>
                  <th className="border p-2 text-left">Example: 'HELLO'</th>
                  <th className="border p-2 text-left">Self-Inverse?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["ROT1", "+1", "IFMMP", "No (ROT25 to decode)"],
                  ["ROT3 (Caesar)", "+3", "KHOOR", "No (ROT23 to decode)"],
                  ["ROT13", "+13", "URYYB", "Yes (apply twice)"],
                  ["ROT18 (ROT13+ROT5)", "+13 letters, +5 digits", "URYYB", "Yes"],
                  ["ROT47", "+47 (all printable ASCII)", "w6==@", "Yes"],
                ].map(([cipher, shift, ex, inv]) => (
                  <tr key={cipher} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-primary text-xs">{cipher}</td>
                    <td className="border p-2 text-xs">{shift}</td>
                    <td className="border p-2 font-mono text-xs">{ex}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{inv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Common Uses for ROT13 Today</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li><strong>Spoiler hiding:</strong> Reddit, forums, and game communities use ROT13 to hide plot spoilers — readers must actively decode to see them.</li>
            <li><strong>Puzzle games:</strong> Crosswords, ARGs, and escape rooms sometimes use ROT13 as a hint cipher.</li>
            <li><strong>Email obfuscation:</strong> Some sites encode email addresses in ROT13 to reduce spam bot harvesting (though CSS methods are better).</li>
            <li><strong>Teaching cryptography:</strong> ROT13 is the simplest possible substitution cipher — ideal for introducing the concept of encoding without real security implications.</li>
          </ul>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "What is ROT13?",
            answer: "ROT13 is a simple letter substitution cipher that replaces each letter with the letter 13 positions later in the alphabet (A→N, B→O, ... M→Z, then N→A wrapping around). It works on the 26-letter English alphabet. Because 13+13=26, applying ROT13 twice always returns the original text — making it both an encoder and decoder.",
          },
          {
            question: "Is ROT13 the same as encoding and decoding?",
            answer: "Yes — because ROT13 is self-inverse. There's no separate encode/decode function. Paste plain text to encode it; paste ROT13 text to decode it. The same operation does both. This is why you see only one text field and one output — the process is symmetrical.",
          },
          {
            question: "Is ROT13 secure encryption?",
            answer: "No. ROT13 provides zero security. Anyone who knows (or guesses) the cipher can decode it instantly. It's not encryption — it's obfuscation. For actual security, use AES-256 encryption, TLS, or PGP. Use ROT13 only for casual content hiding, spoilers, and puzzles where security is not a concern.",
          },
          {
            question: "What is the difference between ROT13 and a Caesar cipher?",
            answer: "ROT13 is a specific Caesar cipher with a shift of exactly 13. A Caesar cipher can use any shift value from 1-25. ROT13 is unique because 26÷2=13 makes it self-inverse — other Caesar cipher shifts require a different shift value to decode (e.g., ROT3 encodes, ROT23 decodes). Julius Caesar historically used a shift of 3.",
          },
          {
            question: "Why does ROT13 not change numbers or punctuation?",
            answer: "ROT13 is defined only for the 26 letters of the Latin alphabet (A-Z, a-z). Numbers, spaces, and punctuation are passed through unchanged because they are not part of the traditional alphabetic rotation. ROT47 is an extended version that also rotates printable ASCII characters including numbers and symbols.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/rot13" max={6} />
    </div>
  );
}
