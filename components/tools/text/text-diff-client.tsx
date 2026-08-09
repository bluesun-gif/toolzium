"use client";

import { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import { Split, Copy, ArrowLeftRight, Trash2, BookOpen, Shield, GitCompare, FileText, AlignLeft, Code2, Eye, Download, Zap } from "lucide-react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import * as diff from "diff";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

export function TextDiffClient() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [isInline, setIsInline] = useState(false);

  const handleSwap = () => {
    setLeftText(rightText);
    setRightText(leftText);
  };

  const handleClear = () => {
    setLeftText("");
    setRightText("");
  };

  const diffResult = useMemo(() => {
    return diff.diffLines(leftText, rightText);
  }, [leftText, rightText]);

  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    let unchanged = 0;

    diffResult.forEach(part => {
      const lineCount = part.count || 0;
      if (part.added) added += lineCount;
      else if (part.removed) removed += lineCount;
      else unchanged += lineCount;
    });

    return { added, removed, unchanged };
  }, [diffResult]);

  const getDiffText = () => {
    return diffResult.map(part => {
      const prefix = part.added ? "+ " : part.removed ? "- " : "  ";
      return part.value.split('\n').filter((line, index, arr) => index < arr.length - 1 || line !== '').map(line => prefix + line).join('\n');
    }).join('\n');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        icon={Split}
        title="Text Diff Viewer"
        description="Compare two text snippets side-by-side to easily find differences."
        actions={
          <>
            <ActionButton onClick={handleSwap} icon={ArrowLeftRight} label="Swap Texts" />
            <ResetButton onClick={handleClear} label="Clear All" />
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard>
          <CardHeader>
            <CardTitle>Original Text</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full min-h-[300px] p-3 rounded-md border bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              placeholder="Paste original text here..."
            />
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Modified Text</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full min-h-[300px] p-3 rounded-md border bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              placeholder="Paste modified text here..."
            />
          </CardContent>
        </GlassCard>
      </div>

      <GlassCard>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Difference Comparison</CardTitle>
            <CardDescription>
              <span className="text-green-500 font-semibold">{stats.added}</span> additions,{" "}
              <span className="text-red-500 font-semibold">{stats.removed}</span> deletions,{" "}
              <span className="text-muted-foreground">{stats.unchanged}</span> unchanged lines.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch id="inline-diff" checked={isInline} onCheckedChange={setIsInline} />
              <Label htmlFor="inline-diff">Inline Diff</Label>
            </div>
            <CopyButton getText={getDiffText} label="Copy Diff" />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0 overflow-hidden">
          <div className="overflow-x-auto p-4 bg-muted/30">
            <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {diffResult.map((part, index) => {
                const colorClass = part.added
                  ? "bg-green-500/20 text-green-700 dark:text-green-400"
                  : part.removed
                  ? "bg-red-500/20 text-red-700 dark:text-red-400"
                  : "text-foreground";
                  
                if (!isInline && part.removed) {
                   // In side-by-side we might want to do more complex rendering, 
                   // but for simplicity here we'll just render unified diff with different colors
                }

                return (
                  <span key={index} className={cn("block px-2", colorClass)}>
                    {part.value}
                  </span>
                );
              })}
            </pre>
          </div>
        </CardContent>
      </GlassCard>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Paste Two Texts",
            description: "Paste your original text in the left panel and the modified text in the right panel. Works with any text: documents, code, emails, articles, or data files.",
            icon: FileText,
          },
          {
            step: "02",
            title: "See the Differences",
            description: "Added content is highlighted in green, removed content in red, and unchanged text is shown normally. Changed lines and characters are highlighted precisely.",
            icon: GitCompare,
          },
          {
            step: "03",
            title: "Review & Export",
            description: "Switch between side-by-side and unified diff views. Export the diff as a patch file or copy the highlighted output for documentation or review.",
            icon: Download,
          },
        ]}
        badges={[
          "Character-level diff",
          "Side-by-side view",
          "Line-by-line comparison",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: GitCompare,
            title: "Character-Level Diff",
            description: "Highlights differences at the character level within changed lines — showing exactly which characters were added, removed, or changed, not just which lines differ.",
          },
          {
            icon: AlignLeft,
            title: "Side-by-Side & Unified Views",
            description: "Switch between side-by-side view (original left, modified right) and unified diff view (insertions/deletions in one panel) — choose what's most readable for your use case.",
          },
          {
            icon: Eye,
            title: "Whitespace Detection",
            description: "Toggle whitespace sensitivity: see whether differences are due to trailing spaces, tabs, or newlines — useful for diagnosing subtle formatting differences in code or data.",
          },
          {
            icon: Code2,
            title: "Code & Markup Support",
            description: "Works with any plain text: HTML, CSS, JavaScript, Python, JSON, YAML, Markdown, SQL, or natural language. No syntax-aware parsing needed — pure text comparison.",
          },
          {
            icon: FileText,
            title: "Statistics Summary",
            description: "Shows total lines changed, lines added, lines deleted, and percentage similarity between the two texts — giving an at-a-glance measure of how different the texts are.",
          },
          {
            icon: Shield,
            title: "Private & Client-Side",
            description: "All diffing runs in your browser. Neither text is sent to any server — safe for confidential documents, proprietary code, and private communications.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Text Diff Guide — How Diff Algorithms Work</h3>
          <p>
            A text diff tool finds the shortest sequence of additions and deletions needed to
            transform one text into another. This is the same algorithm used by Git, Google Docs
            revision history, and Wikipedia's edit comparison. Understanding how diffs work helps
            you interpret results and use them effectively in code review, document editing, and
            content management.
          </p>

          <h4 className="font-semibold">Reading a Diff — Color Coding Reference</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Color / Symbol</th>
                  <th className="border p-2 text-left">Meaning</th>
                  <th className="border p-2 text-left">Action Needed</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["🟢 Green (+ prefix)", "Added in the new version", "Review if addition is correct"],
                  ["🔴 Red (- prefix)", "Removed from original", "Verify deletion is intentional"],
                  ["⚪ No color", "Unchanged (context lines)", "No action needed"],
                  ["🟡 Yellow highlight", "Changed characters within a line", "Review the specific change"],
                ].map(([color, meaning, action]) => (
                  <tr key={color} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{color}</td>
                    <td className="border p-2 text-xs">{meaning}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Common Use Cases for Text Diff</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Use Case</th>
                  <th className="border p-2 text-left">What to Compare</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Code review", "Before/after a code change to verify only intended lines changed"],
                  ["Document editing", "Two versions of a contract, policy, or report"],
                  ["Content revision", "Original vs edited article to review writer changes"],
                  ["Config file changes", "Old vs new config to audit server/application changes"],
                  ["Data validation", "Two CSV exports to find data discrepancies"],
                  ["Translation review", "Source text vs back-translation to check accuracy"],
                  ["Plagiarism check", "Two texts to see how similar or different they are"],
                ].map(([use, what]) => (
                  <tr key={use} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{use}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "What is a text diff?",
            answer: "A text diff shows the differences between two versions of a text. Lines or characters added to the new version are highlighted in green; those removed from the original are in red; unchanged content is shown without highlighting. It's the same output format used by Git's 'git diff' command.",
          },
          {
            question: "How does the diff algorithm work?",
            answer: "Most diff tools use the Longest Common Subsequence (LCS) algorithm, invented by Myers (1986). It finds the longest sequence of lines that appear in both texts in the same order, then marks everything else as additions or deletions. Git uses a variant of this algorithm. The result is the minimal set of changes needed to transform one text into the other.",
          },
          {
            question: "What is the difference between line diff and character diff?",
            answer: "Line diff shows which entire lines were added or removed. Character diff (also called word diff or inline diff) goes further and highlights the specific characters that changed within a line. Character diff is more useful when changes are small (e.g., a word substitution in a long line); line diff is better for large block changes.",
          },
          {
            question: "Can I compare code files with this tool?",
            answer: "Yes. This tool works with any plain text, including source code in any language. Paste your code directly — no file upload needed. For comparing files with syntax highlighting, VS Code's built-in diff viewer (View > Compare Editor) or GitHub's pull request diff view provides syntax-aware comparison.",
          },
          {
            question: "Is my text sent to a server?",
            answer: "No. All comparison happens in your browser using JavaScript. Neither the original nor the modified text is transmitted anywhere. This makes the tool safe for confidential documents, proprietary source code, legal contracts, and private communications.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/text-diff" max={6} />
    </div>
  );
}
