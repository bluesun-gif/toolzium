"use client";

import React, { useState, useEffect } from "react";
import { Eraser, AlignJustify, Settings2, Code2, FileText, Shield } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Separator } from "@/components/ui/separator";
import Stat from "@/components/shared/stat";

export default function WhitespaceRemoverClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  
  const [options, setOptions] = useState({
    removeLeading: true,
    removeTrailing: true,
    collapseSpaces: true,
    removeBlankLines: true,
    trimEachLine: true,
    removeAll: false,
  });

  const handleOptionChange = (key: keyof typeof options) => (checked: boolean) => {
    setOptions(prev => {
      const newOptions = { ...prev, [key]: checked };
      if (key === "removeAll" && checked) {
        newOptions.removeLeading = true;
        newOptions.removeTrailing = true;
        newOptions.collapseSpaces = true;
        newOptions.removeBlankLines = true;
        newOptions.trimEachLine = true;
      }
      return newOptions;
    });
  };

  useEffect(() => {
    let result = inputText;
    
    if (result) {
      if (options.removeAll) {
        result = result.replace(/\s+/g, "");
      } else {
        if (options.removeBlankLines) {
          result = result.replace(/^\s*[\r\n]/gm, "");
        }
        if (options.trimEachLine) {
          result = result.replace(/^[ \t]+|[ \t]+$/gm, "");
        }
        if (options.collapseSpaces) {
          // Collapse multiple spaces/tabs into a single space, but leave newlines alone
          result = result.replace(/[ \t]{2,}/g, " ");
        }
        if (options.removeLeading) {
          result = result.replace(/^\s+/, "");
        }
        if (options.removeTrailing) {
          result = result.replace(/\s+$/, "");
        }
      }
    }
    
    setOutputText(result);
  }, [inputText, options]);

  const handleReset = () => {
    setInputText("");
    setOptions({
      removeLeading: true,
      removeTrailing: true,
      collapseSpaces: true,
      removeBlankLines: true,
      trimEachLine: true,
      removeAll: false,
    });
  };

  const charsRemoved = Math.max(0, inputText.length - outputText.length);
  const linesBefore = inputText ? inputText.split("\n").length : 0;
  const linesAfter = outputText ? outputText.split("\n").length : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        title="Whitespace Remover"
        description="Remove extra spaces, blank lines, and unnecessary whitespace from your text."
        icon={Eraser}
      />

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
              <CardDescription>Paste your text here to remove whitespace</CardDescription>
            </CardHeader>
            <CardContent>
              <TextareaField
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here..."
                rows={8}
                className="font-mono text-sm"
              />
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Output Text</CardTitle>
                <CardDescription>Your clean, trimmed text</CardDescription>
              </div>
              <div className="flex gap-2">
                <CopyButton getText={outputText} />
                <ResetButton onClick={handleReset} />
              </div>
            </CardHeader>
            <CardContent>
              <TextareaField
                value={outputText}
                readOnly
                placeholder="Cleaned text will appear here..."
                rows={8}
                className="font-mono text-sm bg-muted/50"
              />
            </CardContent>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SwitchRow
                id="removeLeading"
                label="Remove leading whitespace"
                checked={options.removeLeading}
                onCheckedChange={handleOptionChange("removeLeading")}
                disabled={options.removeAll}
              />
              <SwitchRow
                id="removeTrailing"
                label="Remove trailing whitespace"
                checked={options.removeTrailing}
                onCheckedChange={handleOptionChange("removeTrailing")}
                disabled={options.removeAll}
              />
              <SwitchRow
                id="trimEachLine"
                label="Trim each line"
                checked={options.trimEachLine}
                onCheckedChange={handleOptionChange("trimEachLine")}
                disabled={options.removeAll}
              />
              <SwitchRow
                id="collapseSpaces"
                label="Collapse multiple spaces"
                checked={options.collapseSpaces}
                onCheckedChange={handleOptionChange("collapseSpaces")}
                disabled={options.removeAll}
              />
              <SwitchRow
                id="removeBlankLines"
                label="Remove blank lines"
                checked={options.removeBlankLines}
                onCheckedChange={handleOptionChange("removeBlankLines")}
                disabled={options.removeAll}
              />
              <Separator />
              <SwitchRow
                id="removeAll"
                label="Remove ALL whitespace"
                checked={options.removeAll}
                onCheckedChange={handleOptionChange("removeAll")}
              />
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Stat
                  label="Chars Removed"
                  value={charsRemoved.toString()}
                />
                <Stat
                  label="Lines Changed"
                  value={linesBefore === linesAfter ? linesBefore.toString() : linesBefore + " → " + linesAfter}
                />
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Your Text", description: "Paste any text containing unwanted whitespace: extra spaces, trailing spaces, double spaces, blank lines, tabs, or mixed indentation from different sources.", icon: FileText },
          { step: "02", title: "Choose Clean Mode", description: "Select what to remove: trim leading/trailing spaces, collapse multiple spaces to one, remove blank lines, remove all tabs, or strip all whitespace entirely.", icon: Settings2 },
          { step: "03", title: "Copy Clean Text", description: "The cleaned text appears instantly. Copy it with one click or download as a text file. See the character count reduction to verify whitespace was removed.", icon: Eraser },
        ]}
        badges={["Multiple clean modes", "Instant processing", "Character count diff"]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          { icon: Eraser, title: "Trim Leading and Trailing", description: "Removes spaces, tabs, and newlines at the very beginning and end of the text - equivalent to JavaScript's .trim() or Python's .strip() method." },
          { icon: AlignJustify, title: "Collapse Multiple Spaces", description: "Replaces any run of 2+ consecutive spaces with a single space. Essential for cleaning up copy-pasted text from PDFs, emails, or web pages." },
          { icon: Settings2, title: "Remove Blank Lines", description: "Removes empty lines and lines containing only whitespace from the text. Useful for cleaning up code, logs, exported data, and document drafts." },
          { icon: Code2, title: "Tab to Space Conversion", description: "Converts tab characters to spaces (2 or 4 spaces configurable). Essential for normalizing indentation in code that mixes tabs and spaces." },
          { icon: FileText, title: "Normalize Line Endings", description: "Converts Windows-style line endings (CRLF) to Unix-style (LF) and vice versa. Fixes encoding issues when sharing files between operating systems." },
          { icon: Shield, title: "Client-Side and Private", description: "All text processing happens in your browser. Your content is never transmitted to any server." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Whitespace Guide - Types, Problems and Solutions</h3>
          <p>Whitespace characters are invisible formatting characters that control spacing in text. Excess whitespace causes problems in data processing, code, and web content.</p>
          <h4 className="font-semibold">Common Whitespace Problems and Fixes</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-muted/50"><th className="border p-2 text-left">Problem</th><th className="border p-2 text-left">Cause</th><th className="border p-2 text-left">Fix</th></tr></thead>
              <tbody>
                {[["Double spaces","Copy from PDF or Word","Collapse multiple spaces to one"],["Trailing spaces","Editor auto-format disabled","Trim trailing whitespace"],["Mixed CRLF/LF","Windows/Mac/Linux file sharing","Normalize line endings"],["Extra blank lines","Manual editing, paste","Remove consecutive blank lines"],["Tabs in HTML","Template copy-paste","Convert tabs to spaces"]].map(([prob, cause, fix]) => (
                  <tr key={prob} className="odd:bg-muted/20"><td className="border p-2 font-medium text-xs">{prob}</td><td className="border p-2 text-xs">{cause}</td><td className="border p-2 text-primary text-xs">{fix}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          { question: "What is trailing whitespace and why does it matter?", answer: "Trailing whitespace is spaces or tabs at the end of a line after the last visible character. It causes problems: diff tools show false changes, some compilers reject files with trailing whitespace, version control shows unintended modifications, and linters like ESLint flag it as an error." },
          { question: "What is the difference between CRLF and LF line endings?", answer: "CRLF (\\r\\n) is used by Windows. LF (\\n) is used by Unix/Linux/macOS. When files are shared between systems, mixed line endings cause issues: Git may show every line as changed, some text processors display '^M' characters, and scripts may fail." },
          { question: "What is a non-breaking space and how do I remove it?", answer: "A non-breaking space (NBSP, Unicode U+00A0) looks identical to a regular space but prevents line breaks and is treated differently by HTML parsers. It often enters text when copying from web pages or Microsoft Word. This tool detects and replaces NBSP with regular spaces." },
          { question: "Why do I have double spaces in copy-pasted text?", answer: "PDFs use character spacing to position text visually, which often results in extra spaces when copied. Word documents may add spaces around special formatting. The 'collapse multiple spaces' option reduces any run of spaces to a single space." },
          { question: "Should I remove all whitespace from code?", answer: "No - only remove problematic whitespace. Indentation spaces and tabs in code are meaningful. For code, use your editor's 'trim trailing whitespace on save' and 'normalize line endings' settings, or a linter like Prettier. Never strip indentation from code." },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/whitespace-remover" max={6} />
    </div>
  );
}
