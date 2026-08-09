"use client";

import {
  CopyButton,
  ExportTextButton,
  ResetButton,
} from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SelectField from "@/components/shared/form-fields/select-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Badge } from "@/components/ui/badge";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";
import {
  collapseSpaces,
  countWords,
  normalizeEOL,
  removeDiacritics,
  removePunctuation,
  toSentenceCase,
} from "@/lib/utils";
import { toTitleCase } from "@/lib/utils/text/case-converter";
import {
  collapseNewlines,
  decodeHtmlEntities,
  keepAsciiOnly,
  removeEmails,
  removeEmojis,
  removeEmptyLines,
  removeUrls,
  smartQuotesToStraight,
  stripHtmlTags,
  trimEachLine,
} from "@/lib/utils/text/text-cleaner";
import { Eraser, FileText, Sparkles, Type, Settings2, Copy, Shield } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const LS_KEY = "Toolzium:text-cleaner-v1";

type CaseMode = "none" | "lower" | "upper" | "sentence" | "title";

/* Component */
export default function TextCleanerClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // toggles
  const [trimEnds, setTrimEnds] = useState(true);
  const [doCollapseSpaces, setDoCollapseSpaces] = useState(true);
  const [doCollapseNewlines, setDoCollapseNewlines] = useState(true);
  const [doTrimEachLine, setDoTrimEachLine] = useState(true);
  const [doRemoveEmptyLines, setDoRemoveEmptyLines] = useState(true);
  const [doSmartToStraight, setDoSmartToStraight] = useState(true);
  const [doStripHtml, setDoStripHtml] = useState(false);
  const [doDecodeEntities, setDoDecodeEntities] = useState(false);
  const [doRemoveUrls, setDoRemoveUrls] = useState(false);
  const [doRemoveEmails, setDoRemoveEmails] = useState(false);
  const [doRemoveEmojis, setDoRemoveEmojis] = useState(false);
  const [doRemovePunct, setDoRemovePunct] = useState(false);
  const [doRemoveDiacritics, setDoRemoveDiacritics] = useState(false);
  const [doAsciiOnly, setDoAsciiOnly] = useState(false);
  const [caseMode, setCaseMode] = useState<CaseMode>("none");

  // persist input
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInput(saved);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, input);
    } catch {}
  }, [input]);

  // recompute live output
  useEffect(() => {
    let s = input ?? "";
    if (doDecodeEntities) s = decodeHtmlEntities(s);
    if (doStripHtml) s = stripHtmlTags(s);
    if (doSmartToStraight) s = smartQuotesToStraight(s);
    if (doRemoveUrls) s = removeUrls(s);
    if (doRemoveEmails) s = removeEmails(s);
    if (doRemoveEmojis) s = removeEmojis(s);
    if (doRemovePunct) s = removePunctuation(s);
    if (doRemoveDiacritics) s = removeDiacritics(s);
    if (doAsciiOnly) s = keepAsciiOnly(s);

    if (doTrimEachLine) s = trimEachLine(s);
    if (doRemoveEmptyLines) s = removeEmptyLines(s);
    if (doCollapseSpaces) s = collapseSpaces(s);
    if (doCollapseNewlines) s = collapseNewlines(s);
    if (trimEnds) s = s.trim();

    switch (caseMode) {
      case "lower":
        s = s.toLowerCase();
        break;
      case "upper":
        s = s.toUpperCase();
        break;
      case "sentence":
        s = toSentenceCase(s);
        break;
      case "title":
        s = toTitleCase(s);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOutput(s);
  }, [
    input,
    trimEnds,
    doCollapseSpaces,
    doCollapseNewlines,
    doTrimEachLine,
    doRemoveEmptyLines,
    doSmartToStraight,
    doStripHtml,
    doDecodeEntities,
    doRemoveUrls,
    doRemoveEmails,
    doRemoveEmojis,
    doRemovePunct,
    doRemoveDiacritics,
    doAsciiOnly,
    caseMode,
  ]);

  const statsBefore = useMemo(
    () => ({
      chars: input.length,
      words: countWords(input),
      lines: normalizeEOL(input).split("\n").length,
    }),
    [input],
  );

  const statsAfter = useMemo(
    () => ({
      chars: output.length,
      words: countWords(output),
      lines: normalizeEOL(output).split("\n").length,
    }),
    [output],
  );

  function resetAll() {
    setInput("");
    setOutput("");
    setTrimEnds(true);
    setDoCollapseSpaces(true);
    setDoCollapseNewlines(true);
    setDoTrimEachLine(true);
    setDoRemoveEmptyLines(true);
    setDoSmartToStraight(true);
    setDoStripHtml(false);
    setDoDecodeEntities(false);
    setDoRemoveUrls(false);
    setDoRemoveEmails(false);
    setDoRemoveEmojis(false);
    setDoRemovePunct(false);
    setDoRemoveDiacritics(false);
    setDoAsciiOnly(false);
    setCaseMode("none");
  }

  const inputHistory = [
    { label: "Chars", value: statsBefore.chars },
    { label: "Words", value: statsBefore.words },
    { label: "Lines", value: statsBefore.lines },
    { label: "-> Chars", value: statsAfter.chars },
    { label: "-> Words", value: statsAfter.words },
    { label: "-> Lines", value: statsAfter.lines },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        icon={Sparkles}
        title="Text Cleaner"
        description="Remove extra spaces, emojis, HTML, etc."
        actions={
          <>
            <ResetButton onClick={resetAll} />
            <InputField
              type="file"
              accept=".txt,text/plain"
              onFilesChange={async (files) => {
                const f = files?.[0];
                if (!f) return;
                setInput(await f.text());
              }}
            />
            <ExportTextButton
              variant="default"
              filename="cleaned.txt"
              getText={() => output || input || ""}
              label="Export"
              disabled={!input && !output}
            />
          </>
        }
      />

      {/* Input */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="text-base">Input</CardTitle>
          <CardDescription>Paste your text below.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <TextareaField
            value={input}
            onValueChange={setInput}
            textareaClassName="min-h-[220px] font-mono"
            placeholder={`“Hello”—world!  Visit https://example.com\n\n<p>Bangla: দেশ — ভালো? 😊`}
          />

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs text-muted-foreground">
            {inputHistory.map((h, idx) => (
              <div key={idx as number} className="rounded-md border p-2">
                {h.label}: <strong>{h.value}</strong>
              </div>
            ))}
          </div>
        </CardContent>
      </GlassCard>

      <Separator />

      {/* Options */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="text-base">Cleaning Options</CardTitle>
          <CardDescription>Pick what to remove/normalize. Case is applied last.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border p-3 space-y-3">
              <div className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" /> Whitespace & Lines
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SwitchRow label="Trim ends" checked={trimEnds} onCheckedChange={setTrimEnds} />
                <SwitchRow
                  label="Collapse spaces"
                  checked={doCollapseSpaces}
                  onCheckedChange={setDoCollapseSpaces}
                />
                <SwitchRow
                  label="Collapse newlines"
                  checked={doCollapseNewlines}
                  onCheckedChange={setDoCollapseNewlines}
                />
                <SwitchRow
                  label="Trim each line"
                  checked={doTrimEachLine}
                  onCheckedChange={setDoTrimEachLine}
                />
                <SwitchRow
                  label="Remove empty lines"
                  checked={doRemoveEmptyLines}
                  onCheckedChange={setDoRemoveEmptyLines}
                />
              </div>
            </div>

            <div className="rounded-md border p-3 space-y-3">
              <div className="text-sm font-medium flex items-center gap-2">
                <Type className="h-4 w-4" /> Text Normalization
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SwitchRow
                  label="straight “ ” or —"
                  checked={doSmartToStraight}
                  onCheckedChange={setDoSmartToStraight}
                />
                <SwitchRow
                  label="Strip HTML tags"
                  checked={doStripHtml}
                  onCheckedChange={setDoStripHtml}
                />
                <SwitchRow
                  label="Decode HTML entities"
                  checked={doDecodeEntities}
                  onCheckedChange={setDoDecodeEntities}
                />
                <SwitchRow
                  label="Remove URLs"
                  checked={doRemoveUrls}
                  onCheckedChange={setDoRemoveUrls}
                />
                <SwitchRow
                  label="Remove emails"
                  checked={doRemoveEmails}
                  onCheckedChange={setDoRemoveEmails}
                />
                <SwitchRow
                  label="Remove emojis"
                  checked={doRemoveEmojis}
                  onCheckedChange={setDoRemoveEmojis}
                />
                <SwitchRow
                  label="Remove punctuation"
                  checked={doRemovePunct}
                  onCheckedChange={setDoRemovePunct}
                />
                <SwitchRow
                  label="Remove diacritics"
                  checked={doRemoveDiacritics}
                  onCheckedChange={setDoRemoveDiacritics}
                />
                <SwitchRow
                  label="ASCII only"
                  checked={doAsciiOnly}
                  onCheckedChange={setDoAsciiOnly}
                />
              </div>
            </div>
          </div>

          <SelectField
            label="Change Case"
            value={caseMode}
            onValueChange={(v) => setCaseMode(v as CaseMode)}
            options={[
              { value: "none", label: "None" },
              { value: "lower", label: "lowercase" },
              { value: "upper", label: "UPPERCASE" },
              { value: "sentence", label: "Sentence case" },
              { value: "title", label: "Title Case" },
            ]}
          />
        </CardContent>
      </GlassCard>

      <Separator />

      {/* Output */}
      <GlassCard>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Output</CardTitle>
            <Badge variant="secondary">Live</Badge>
          </div>
          <CardDescription>
            Result updates automatically as you type or toggle options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <TextareaField
            readOnly
            value={output}
            onValueChange={() => {}}
            textareaClassName="min-h-[220px] font-mono"
          />
          <div className="flex flex-wrap gap-2">
            <ExportTextButton
              variant="default"
              filename="cleaned.txt"
              getText={() => output}
              disabled={!output}
            />
            <CopyButton
              label="Copy Output"
              copiedLabel="Copied Output"
              getText={() => output}
              disabled={!output}
            />
            <ResetButton
              icon={Eraser}
              label="Replace Input"
              onClick={() => setInput(output)}
              disabled={!output}
            />
          </div>
        </CardContent>
      </GlassCard>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Your Text", description: "Paste any messy text that needs cleaning - from Word documents, PDFs, emails, web pages, or CMS exports. Common problems include smart quotes, special characters, and formatting artifacts.", icon: FileText },
          { step: "02", title: "Select Cleaning Options", description: "Choose what to clean: remove HTML tags, fix smart quotes, strip special characters, normalize punctuation, remove duplicate lines, fix encoding artifacts, and more.", icon: Settings2 },
          { step: "03", title: "Copy Clean Output", description: "See the cleaned text instantly. Copy with one click or download. See before/after statistics showing how many characters or issues were removed.", icon: Copy },
        ]}
        badges={["HTML tag removal", "Smart quote fix", "Encoding cleanup"]}
      />
      <ToolFeatureGuides
        features={[
          { icon: Eraser, title: "HTML Tag Removal", description: "Strips all HTML tags from text, leaving only the plain text content. Essential for processing web-scraped data or HTML email content." },
          { icon: Type, title: "Smart Quote Normalization", description: "Converts Word/Mac smart (curly) quotes to standard straight quotes. Fixes encoding issues when text is processed by systems that do not support Unicode." },
          { icon: Sparkles, title: "Special Character Removal", description: "Removes or replaces unwanted special characters, non-printable characters, zero-width spaces, and Unicode artifacts that cause problems in databases and code." },
          { icon: Settings2, title: "Duplicate Line Removal", description: "Finds and removes duplicate lines from the text, keeping only the first occurrence. Useful for cleaning up lists and deduplicating data." },
          { icon: FileText, title: "Encoding Fix", description: "Fixes common encoding artifacts from UTF-8/Latin-1 mismatches, producing garbled characters like garbled apostrophes and accents." },
          { icon: Shield, title: "Client-Side and Private", description: "All text processing happens in your browser. Your content is never sent to any server." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Text Cleaning Guide - Common Problems and Solutions</h3>
          <p>When text moves between systems - from Word to email, PDF to database, HTML to plain text - it accumulates formatting artifacts, encoding errors, and invisible characters. A text cleaner normalizes this chaos into clean, processable text.</p>
          <h4 className="font-semibold">Common Text Problems and Solutions</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-muted/50"><th className="border p-2 text-left">Problem</th><th className="border p-2 text-left">Fix</th></tr></thead>
              <tbody>
                {[["Smart quotes","Replace with straight quotes"],["HTML tags","Strip all HTML tags"],["Encoding artifact","Fix UTF-8/Latin-1 mojibake"],["Non-breaking space","Replace with regular space"],["Duplicate lines","Remove duplicate lines"],["Windows line endings","Convert CRLF to LF"]].map(([prob, fix]) => (
                  <tr key={prob} className="odd:bg-muted/20"><td className="border p-2 font-medium text-xs">{prob}</td><td className="border p-2 text-primary text-xs">{fix}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ToolFeatureGuides>
      <ToolFaqAccordion
        faqs={[
          { question: "What is text cleaning?", answer: "Text cleaning is the process of removing or fixing formatting artifacts, encoding errors, HTML tags, special characters, and other issues that make text hard to process. It is a critical first step in data pipelines, NLP, and content publishing workflows." },
          { question: "How do I remove HTML tags from text?", answer: "Paste your HTML-containing text and enable the Remove HTML tags option. All tags are stripped, leaving only the text content. Useful for processing web-scraped data, HTML emails, or CMS-exported content." },
          { question: "What are smart quotes and how do I fix them?", answer: "Smart quotes (curly quotes) are typographically correct but cause issues in code and systems that expect straight ASCII quotes. Word, Pages, and macOS auto-replace straight quotes with smart quotes as you type. Use the normalize quotes option to convert all smart quotes to straight ASCII equivalents." },
          { question: "What causes garbled text like encoding artifacts?", answer: "This is called mojibake - a character encoding mismatch. It occurs when UTF-8 text is incorrectly read as Latin-1 or Windows-1252. The multi-byte sequence is misinterpreted, producing garbled characters. The text cleaner detects and fixes common mojibake patterns." },
          { question: "Can I remove all special characters and keep only letters and numbers?", answer: "Yes. Enable the Remove special characters option and set it to alphanumeric only mode. This strips everything except A-Z, a-z, 0-9, and optionally spaces. Useful for preparing text for systems that cannot handle special characters." },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/cleaner" max={6} />
    </div>
  );
}
