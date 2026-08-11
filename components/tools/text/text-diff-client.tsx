"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { GitCompare, FileText, Search, BarChart3 } from "lucide-react";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

interface DiffLine {
  type: "same" | "added" | "removed";
  text: string;
}

export default function TextDiffClient() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<DiffLine[]>([]);
  const [hasCompared, setHasCompared] = useState(false);

  const stats = useMemo(() => {
    let added = 0, removed = 0, same = 0;
    diff.forEach((line) => {
      if (line.type === "added") added++;
      else if (line.type === "removed") removed++;
      else same++;
    });
    return { added, removed, same };
  }, [diff]);

  const handleCompare = () => {
    if (!text1 && !text2) {
      toast.error("Please enter text in both boxes.");
      return;
    }
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const maxLen = Math.max(lines1.length, lines2.length);
    const result: DiffLine[] = [];

    for (let i = 0; i < maxLen; i++) {
      const l1 = lines1[i];
      const l2 = lines2[i];
      if (l1 === l2) {
        result.push({ type: "same", text: l1 || "" });
      } else {
        if (l1 !== undefined) result.push({ type: "removed", text: l1 });
        if (l2 !== undefined) result.push({ type: "added", text: l2 });
      }
    }
    setDiff(result);
    setHasCompared(true);
    toast.success("Comparison complete");
  };

  const getBgClass = (type: string) => {
    if (type === "added") return "bg-green-500/20 text-green-700 dark:text-green-400 border-l-4 border-green-500";
    if (type === "removed") return "bg-red-500/20 text-red-700 dark:text-red-400 border-l-4 border-red-500 line-through";
    return "bg-transparent text-muted-foreground border-l-4 border-transparent";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader icon={GitCompare} title="Text Diff Checker" description="Compare two blocks of text line-by-line to highlight additions, deletions, and changes." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}><FileText className="w-4 h-4 text-primary" /> Original Text</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              rows={10}
              className={textareaClass}
              placeholder="Paste original text here..."
            />
          </CardContent>
        </Card>
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}><FileText className="w-4 h-4 text-primary" /> Modified Text</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              rows={10}
              className={textareaClass}
              placeholder="Paste modified text here..."
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleCompare} size="lg">
          <Search className="w-4 h-4 mr-2" /> Compare Text
        </Button>
      </div>

      {hasCompared && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-green-500/30 bg-green-500/5">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">+{stats.added}</div>
                <div className="text-xs text-muted-foreground">Lines Added</div>
              </CardContent>
            </Card>
            <Card className="border-red-500/30 bg-red-500/5">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">-{stats.removed}</div>
                <div className="text-xs text-muted-foreground">Lines Removed</div>
              </CardContent>
            </Card>
            <Card className={cardClass}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{stats.same}</div>
                <div className="text-xs text-muted-foreground">Lines Unchanged</div>
              </CardContent>
            </Card>
          </div>

          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <CardTitle className={titleClass}><BarChart3 className="w-4 h-4 text-primary" /> Diff Result</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="max-h-96 overflow-y-auto rounded-lg border border-border/60 bg-background/50 font-mono text-xs">
                {diff.map((line, idx) => (
                  <div key={idx} className={`px-3 py-1 ${getBgClass(line.type)}`}>
                    {line.type === "added" && "+ "}
                    {line.type === "removed" && "- "}
                    {line.type === "same" && "  "}
                    {line.text || "\u00A0"}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Input Versions", description: "Paste the original draft in the left box and the revised version in the right box.", icon: FileText },
          { step: "02", title: "Run Comparison", description: "Click the compare button to analyze the differences line by line.", icon: Search },
          { step: "03", title: "Review Changes", description: "Identify exactly what was added, deleted, or kept the same with color coding.", icon: BarChart3 },
        ]}
        badges={["100% Free", "Client-Side", "No Signup"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: GitCompare, title: "Line-by-Line Analysis", description: "Compares documents sequentially to highlight structural changes and edits." },
          { icon: Search, title: "Visual Highlighting", description: "Uses green for additions and red with strikethrough for deletions for instant recognition." },
          { icon: BarChart3, title: "Change Statistics", description: "Provides a quick summary of how many lines were added, removed, or left untouched." },
          { icon: FileText, title: "Code & Prose Friendly", description: "Works equally well for comparing programming scripts, essays, or configuration files." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>Tracking changes between two versions of a document is essential for writers, editors, and developers. When collaborating on a project, it's common to receive a revised draft and need to know exactly what the other person changed without reading the entire document from scratch. A diff tool highlights these modifications instantly.</p>
          <p>For developers, comparing code snippets or configuration files helps identify bugs introduced during recent edits. If a script was working yesterday but fails today, pasting the old and new versions into a diff checker reveals the exact lines that were modified, added, or deleted, drastically reducing debugging time.</p>
          <p>Our line-by-line comparison algorithm provides a clear, Git-style output. Green lines indicate new additions, while red lines show what was removed. This visual language is universally understood in the tech industry, making it easy to review pull requests, track document revisions, or audit legal contracts for unauthorized changes.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Does this compare word-by-word or line-by-line?", answer: "This tool performs a strict line-by-line comparison. If a single word changes on a line, the entire line will be marked as removed and re-added." },
          { question: "Are empty lines counted in the diff?", answer: "Yes, empty lines are treated as valid lines of text. Adding or removing blank lines will register as a change in the diff output." },
          { question: "Can I compare large files?", answer: "Yes, the tool can handle several thousand lines. However, extremely large files might take a second to process in the browser." },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/text/text-diff" max={6} />
    </div>
  );
}
