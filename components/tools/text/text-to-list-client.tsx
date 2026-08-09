"use client";

import { History, ListChecks, Wand2, List, AlignLeft, Settings2, Copy, FileText, LayoutList, Shield } from "lucide-react";
import * as React from "react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import {
  ActionButton,
  CopyButton,
  ExportCSVButton,
  ExportTextButton,
  ResetButton,
} from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toTitleCase } from "@/lib/utils";

type CaseMode = "none" | "lower" | "upper" | "title";
type SortMode = "none" | "asc" | "desc";

export default function TextToListClient() {
  const [source, setSource] = React.useState("");
  const [trimItems, setTrimItems] = React.useState(true);
  const [collapseSpaces, setCollapseSpaces] = React.useState(true);
  const [removeEmpty, setRemoveEmpty] = React.useState(true);
  const [dedupe, setDedupe] = React.useState(true);
  const [sortMode, setSortMode] = React.useState<SortMode>("none");
  const [caseMode, setCaseMode] = React.useState<CaseMode>("none");
  const [prefix, setPrefix] = React.useState("");
  const [suffix, setSuffix] = React.useState("");
  const [numbering, setNumbering] = React.useState(false);
  const [numStart, setNumStart] = React.useState<number>(1);
  const [numPad, setNumPad] = React.useState<number>(0);
  const [numSep, setNumSep] = React.useState(". ");
  const [copiedKind, setCopiedKind] = React.useState<"list" | "joined" | null>(null);

  const processed = React.useMemo(() => {
    const parts = source
      .split(/[\n,;|\t]+/g)
      .map((s) => (collapseSpaces ? s.replace(/\s+/g, " ") : s))
      .map((s) => (trimItems ? s.trim() : s));

    let items = removeEmpty ? parts.filter((s) => s.length > 0) : parts.slice();

    if (caseMode !== "none") {
      items = items.map((s) =>
        caseMode === "upper"
          ? s.toUpperCase()
          : caseMode === "lower"
            ? s.toLowerCase()
            : toTitleCase(s),
      );
    }

    if (dedupe) {
      const seen = new Set<string>();
      const out: string[] = [];
      for (const it of items) {
        if (!seen.has(it)) {
          seen.add(it);
          out.push(it);
        }
      }
      items = out;
    }

    if (sortMode !== "none") {
      items = [...items].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
      if (sortMode === "desc") items.reverse();
    }

    if (prefix || suffix) {
      items = items.map((s) => `${prefix}${s}${suffix}`);
    }

    if (numbering) {
      items = items.map((s, i) => {
        const n = (numStart + i).toString();
        const padded = numPad > 0 ? n.padStart(numPad, "0") : n;
        return `${padded}${numSep}${s}`;
      });
    }

    return items;
  }, [
    source,
    trimItems,
    collapseSpaces,
    removeEmpty,
    dedupe,
    sortMode,
    caseMode,
    prefix,
    suffix,
    numbering,
    numStart,
    numPad,
    numSep,
  ]);

  const stats = React.useMemo(() => {
    const baseline = source
      .split(/[\n,;|\t]+/g)
      .map((s) => (collapseSpaces ? s.replace(/\s+/g, " ") : s))
      .map((s) => (trimItems ? s.trim() : s));
    const afterEmpty = removeEmpty ? baseline.filter(Boolean) : baseline.slice();
    const cased =
      caseMode === "none"
        ? afterEmpty
        : afterEmpty.map((s) =>
            caseMode === "upper"
              ? s.toUpperCase()
              : caseMode === "lower"
                ? s.toLowerCase()
                : toTitleCase(s),
          );

    return {
      inputCount: baseline.length,
      nonEmptyCount: afterEmpty.length,
      uniqueCount: new Set(cased).size,
      outputCount: processed.length,
    };
  }, [source, collapseSpaces, trimItems, removeEmpty, caseMode, processed]);

  function resetAll() {
    setSource("");
    setTrimItems(true);
    setCollapseSpaces(true);
    setRemoveEmpty(true);
    setDedupe(true);
    setSortMode("none");
    setCaseMode("none");
    setPrefix("");
    setSuffix("");
    setNumbering(false);
    setNumStart(1);
    setNumPad(0);
    setNumSep(". ");
    setCopiedKind(null);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <ToolPageHeader
        icon={ListChecks}
        title="Text to List"
        description="Split by comma/newline → clean list."
        actions={
          <>
            <ResetButton onClick={resetAll} />
            <CopyButton
              label="Copy (newline)"
              copiedLabel="Copied"
              getText={() => processed.join("\n")}
              disabled={!processed.length}
            />
            <ExportTextButton
              variant="default"
              filename="clean-list.txt"
              getText={() => processed.join("\n")}
              disabled={!processed.length}
            />
          </>
        }
      />

      {/* Input */}
      <GlassCard>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Input Text</CardTitle>
          <CardDescription>
            Paste or type values separated by commas and/or new lines.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TextareaField
            value={source}
            onValueChange={setSource}
            textareaClassName="min-h-[180px] font-mono"
            placeholder={`e.g. apple, banana
orange
grape,  mango

pear`}
          />
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="font-normal">
              Auto split: comma / newline / ; / | / tab
            </Badge>
            <div className="flex items-center gap-1">
              <History className="h-3.5 w-3.5" /> {stats.inputCount} segments found
            </div>
          </div>
        </CardContent>
      </GlassCard>

      <Separator />

      {/* Settings */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="text-base">Settings</CardTitle>
          <CardDescription>Clean and format your list exactly how you want.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <SwitchRow
              label="Trim items"
              hint="Remove leading/trailing whitespace."
              checked={trimItems}
              onCheckedChange={setTrimItems}
            />
            <SwitchRow
              label="Collapse spaces"
              hint="Convert multiple spaces/tabs to single space."
              checked={collapseSpaces}
              onCheckedChange={setCollapseSpaces}
            />
            <SwitchRow
              label="Remove empty"
              hint="Drop blank lines or empty segments."
              checked={removeEmpty}
              onCheckedChange={setRemoveEmpty}
            />
            <SwitchRow
              label="Dedupe"
              hint="Keep the first occurrence only."
              checked={dedupe}
              onCheckedChange={setDedupe}
            />
          </div>

          <div className="space-y-4">
            <div>
              <Label>Sort</Label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(
                  [
                    { key: "none", label: "None" },
                    { key: "asc", label: "A→Z" },
                    { key: "desc", label: "Z→A" },
                  ] as const
                ).map((opt) => (
                  <ActionButton
                    key={opt.key}
                    label={opt.label}
                    variant={sortMode === opt.key ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSortMode(opt.key)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label>Case</Label>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {(["none", "lower", "upper", "title"] as const).map((m) => (
                  <ActionButton
                    key={m as string}
                    variant={caseMode === m ? "default" : "outline"}
                    onClick={() => setCaseMode(m)}
                    className="capitalize"
                    label={m}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <InputField
                id="prefix"
                label="Prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="e.g. - "
              />
              <InputField
                id="suffix"
                label="Suffix"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                placeholder="e.g. ;"
              />
            </div>

            <SwitchRow
              label="Numbering"
              hint="Add incremental numbers to each item."
              checked={numbering}
              onCheckedChange={setNumbering}
            />

            {numbering && (
              <div className="grid gap-3 sm:grid-cols-3">
                <InputField
                  id="numStart"
                  label="Start"
                  type="number"
                  min={-999999}
                  max={999999}
                  value={String(numStart)}
                  onChange={(e) => setNumStart(Number(e.target.value) || 1)}
                />
                <InputField
                  id="numPad"
                  label="Pad"
                  type="number"
                  min={0}
                  max={8}
                  value={String(numPad)}
                  onChange={(e) => setNumPad(Math.max(0, Math.min(8, Number(e.target.value) || 0)))}
                />
                <InputField
                  id="numSep"
                  label="Separator"
                  value={numSep}
                  onChange={(e) => setNumSep(e.target.value)}
                  placeholder=". "
                />
              </div>
            )}
          </div>
        </CardContent>
      </GlassCard>

      <Separator />

      {/* Output */}
      <GlassCard>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Result</CardTitle>
          <CardDescription>Clean list preview and exports.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Badge variant="secondary" className="gap-1">
                <Wand2 className="h-3.5 w-3.5" /> Output: {stats.outputCount}
              </Badge>
              <Badge variant="outline">Input Segments: {stats.inputCount}</Badge>
              <Badge variant="outline">Non-empty: {stats.nonEmptyCount}</Badge>
              <Badge variant="outline">Unique: {stats.uniqueCount}</Badge>
            </div>

            <TextareaField
              readOnly
              value={processed.join("\n")}
              onValueChange={() => {}}
              textareaClassName="min-h-[200px]"
            />

            <div className="flex flex-wrap gap-2">
              <CopyButton
                variant="outline"
                size="sm"
                label={copiedKind === "joined" ? "Copied" : "Copy (comma)"}
                getText={() => processed.join(", ")}
                disabled={!processed.length}
              />
              <ExportCSVButton
                size="sm"
                variant="default"
                filename="clean-list.csv"
                disabled={!processed.length}
                getRows={() => [["Item"], ...processed.map((s) => [s])]}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Preview List</Label>
                <p className="text-xs text-muted-foreground">
                  A quick visual of each cleaned item.
                </p>
              </div>
              <Badge variant="secondary">{processed.length} items</Badge>
            </div>
            <div className="rounded-md border p-3">
              {processed.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No items yet. Paste text on the left to begin.
                </p>
              ) : (
                <ul className="list-disc pl-6 text-sm space-y-1">
                  {processed.map((it, i) => (
                    <li key={`${i}-${it.slice(0, 32)}`}>{it}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CardContent>
      </GlassCard>
      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Your Text", description: "Paste a block of text containing items separated by commas, semicolons, newlines, pipes, or any custom delimiter. Works with messy exports from spreadsheets, databases, and documents.", icon: FileText },
          { step: "02", title: "Set List Options", description: "Choose the input delimiter, list format (bullet, numbered, alphabetical), sorting preference, and whether to remove duplicates or trim whitespace from each item.", icon: Settings2 },
          { step: "03", title: "Copy the List", description: "The formatted list appears instantly. Copy as plain text, as Markdown, as HTML, or as a JSON array. One-click copy for immediate use in documents or code.", icon: Copy },
        ]}
        badges={["Multiple delimiters", "Markdown and HTML output", "Sort and deduplicate"]}
      />
      <ToolFeatureGuides
        features={[
          { icon: List, title: "Multiple Input Delimiters", description: "Splits text by comma, semicolon, newline, tab, pipe, or any custom delimiter. Handles mixed delimiters and trims whitespace from each extracted item." },
          { icon: LayoutList, title: "Multiple Output Formats", description: "Output as bullet points, numbered list, Markdown list, HTML list, or JSON array. Choose the format that matches your target system." },
          { icon: AlignLeft, title: "Sort and Deduplicate", description: "Sort list items alphabetically or numerically. Remove duplicate items to get a unique list. Optionally ignore case when deduplicating." },
          { icon: Settings2, title: "Trim and Clean Items", description: "Automatically trims leading and trailing whitespace from each item. Optionally removes empty items that result from consecutive delimiters." },
          { icon: Copy, title: "Multiple Copy Formats", description: "Copy as plain text for word processors, Markdown for GitHub/Notion, HTML for web, or JSON array for code. Each format is one click away." },
          { icon: Shield, title: "Client-Side and Private", description: "All list conversion happens in your browser. Your text is never sent to any server." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Text to List Conversion Guide</h3>
          <p>Converting delimited text to a structured list is a common task in data processing, content creation, and development. Whether converting a CSV column to a bullet list or raw text to a JSON array, this tool handles the conversion in one step.</p>
          <h4 className="font-semibold">Common Delimiter Patterns</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-muted/50"><th className="border p-2 text-left">Source</th><th className="border p-2 text-left">Delimiter</th></tr></thead>
              <tbody>
                {[["CSV column","Comma"],["TSV column","Tab"],["Email list","Semicolon"],["Excel paste","Newline"],["Pipe-delimited","Pipe"]].map(([source, delim]) => (
                  <tr key={source} className="odd:bg-muted/20"><td className="border p-2 font-medium text-xs">{source}</td><td className="border p-2 font-mono text-primary text-xs">{delim}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ToolFeatureGuides>
      <ToolFaqAccordion
        faqs={[
          { question: "How do I convert a comma-separated list to bullet points?", answer: "Paste your comma-separated text, select Comma as the delimiter, choose Bullet as the output format, and click Convert. Each item between commas becomes a separate bullet point." },
          { question: "Can I convert text to a JSON array?", answer: "Yes. Select your delimiter, choose JSON Array as the output format, and the tool generates a properly formatted JSON array with each item as a quoted string. Useful for populating config files, test fixtures, and API payloads." },
          { question: "How do I remove duplicate items from a list?", answer: "Enable the Remove duplicates option before converting. The tool processes your text, splits it into items, removes exact duplicates keeping the first occurrence, then formats the result." },
          { question: "Can I sort the list alphabetically?", answer: "Yes. Enable sorting (A-Z or Z-A) in the options. The tool splits your text into items, sorts them alphabetically using locale-aware comparison, then formats the sorted items in your chosen output format." },
          { question: "What if my list has mixed delimiters?", answer: "For text with mixed delimiters, use the Custom delimiter option and enter a pattern to split on multiple separators. Alternatively, normalize all delimiters to one type in a text editor first, then use this tool." },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/to-list" max={6} />
    </div>
  );
}
