"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { ActionButton, CopyButton, ExportTextButton, ResetButton } from "@/components/shared/action-buttons";
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
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";
import { normalizeEOL } from "@/lib/utils";
import { AlignLeft, Copy, Filter, Hash, List, ListOrdered, Replace, Scissors, Search, Settings2, Shield, Shuffle, SortAsc, SortDesc, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { GridPattern } from "@/components/magicui/grid-pattern";
const LS_KEY = "Toolzium:line-tools-v1";

/* Utilities */
function splitLines(s: string) {
  if (!s) return [] as string[];
  return normalizeEOL(s).split("\n");
}
function joinLines(lines: string[]) {
  return lines.join("\n");
}
export default function LineToolsClient() {
  const [text, setText] = useState("");
  const [resultLines, setResultLines] = useState<string[]>([]);
  const [keepOrder, setKeepOrder] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [trimEach, setTrimEach] = useState(true);
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterRegex, setFilterRegex] = useState(false);
  const [filterMode, setFilterMode] = useState<"keep" | "remove">("keep");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [numbering, setNumbering] = useState(false);
  const [startNum, setStartNum] = useState(1);
  const [numSep, setNumSep] = useState(".");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setText(saved);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, text);
    } catch {}
  }, [text]);

  /* Derived data */
  const lines = useMemo(() => {
    let l = splitLines(text);
    if (trimEach) l = l.map(x => x.trim());
    if (removeEmpty) l = l.filter(x => x.length > 0);
    return l;
  }, [text, trimEach, removeEmpty]);
  const stats = useMemo(() => {
    const total = splitLines(text).length;
    const empty = splitLines(text).filter(x => x.trim() === "").length;
    const uniqSet = new Set(lines.map(x => caseSensitive ? x : x.toLowerCase()));
    const avgLen = lines.length ? Math.round(lines.join("").length / lines.length) : 0;
    return {
      total,
      nonEmpty: total - empty,
      empty,
      unique: uniqSet.size,
      avgLen
    };
  }, [text, lines, caseSensitive]);
  const output = useMemo(() => {
    const base = resultLines.length > 0 ? resultLines : lines;
    if (base.length === 0) return "";
    return joinLines(base.map((line, i) => {
      const n = numbering ? `${startNum + i}${numSep}` : "";
      return `${n}${prefix}${line}${suffix}`;
    }));
  }, [resultLines, lines, numbering, startNum, numSep, prefix, suffix]);

  /* Actions */
  function actionSort(dir: "asc" | "desc") {
    const key = (s: string) => caseSensitive ? s : s.toLowerCase();
    const sorted = [...lines].sort((a, b) => key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0);
    if (dir === "desc") sorted.reverse();
    setResultLines(sorted);
  }
  function actionShuffle() {
    const arr = [...lines];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setResultLines(arr);
  }
  function actionUnique() {
    const seen = new Set<string>();
    const arr: string[] = [];
    for (const line of lines) {
      const k = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(k)) {
        seen.add(k);
        arr.push(line);
      }
    }
    if (!keepOrder) arr.sort((a, b) => a.localeCompare(b));
    setResultLines(arr);
  }
  function actionTrim() {
    const l = splitLines(text).map(x => x.trim());
    setResultLines(l.filter(x => removeEmpty ? x.length > 0 : true));
  }
  function actionFindReplace() {
    const src = splitLines(text);
    let pattern: RegExp | null = null;
    if (useRegex) {
      try {
        pattern = new RegExp(find, caseSensitive ? "g" : "gi");
      } catch {
        return;
      }
    }
    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = pattern || new RegExp(wholeWord ? `\\b${esc(find)}\\b` : esc(find), caseSensitive ? "g" : "gi");
    const out = src.map(line => line.replace(re, replace));
    setResultLines(out);
  }
  function actionFilter() {
    const src = [...lines];
    let re: RegExp | null = null;
    if (filterRegex) {
      try {
        re = new RegExp(filterQuery, caseSensitive ? "" : "i");
      } catch {
        return;
      }
    }
    const contains = (s: string) => re ? re.test(s) : caseSensitive ? s.includes(filterQuery) : s.toLowerCase().includes(filterQuery.toLowerCase());
    const out = src.filter(l => filterMode === "keep" ? contains(l) : !contains(l));
    setResultLines(out);
  }
  function resetAll() {
    setText("");
    setResultLines([]);
    setKeepOrder(true);
    setCaseSensitive(false);
    setRemoveEmpty(true);
    setTrimEach(true);
    setFind("");
    setReplace("");
    setUseRegex(false);
    setWholeWord(false);
    setFilterQuery("");
    setFilterRegex(false);
    setFilterMode("keep");
    setPrefix("");
    setSuffix("");
    setNumbering(false);
    setStartNum(1);
    setNumSep(".");
  }
  const inputHistory = [{
    label: "Total",
    value: stats.total
  }, {
    label: "Non-empty",
    value: stats.nonEmpty
  }, {
    label: "Empty",
    value: stats.empty
  }, {
    label: "Unique",
    value: stats.unique
  }, {
    label: "Avg length",
    value: stats.avgLen
  }];
  const actions = [{
    icon: SortAsc,
    label: "Sort A→Z",
    onClick: () => actionSort("asc")
  }, {
    icon: SortDesc,
    label: "Sort Z→A",
    onClick: () => actionSort("desc")
  }, {
    icon: Shuffle,
    label: "Shuffle",
    onClick: actionShuffle
  }, {
    icon: Hash,
    label: "Unique",
    onClick: actionUnique
  }, {
    icon: Scissors,
    label: "Trim lines",
    onClick: actionTrim
  }];
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

 {/* Header */}
 <ToolPageHeader icon={List} title="Line Tools" description="Sort, dedupe, trim, find & replace, filter, shuffle, and format lines fast." actions={<>
 <InputField accept=".txt,text/plain" type="file" onFilesChange={async files => {
          const f = files?.[0];
          if (!f) return;
          const txt = await f.text();
          setText(txt);
        }} />
 <ExportTextButton variant="outline" filename="text.txt" getText={() => text} label="Export" disabled={!text} />
 <ResetButton onClick={resetAll} />
 <CopyButton variant="default" getText={() => output || text || ""} disabled={!text && !output} />
 </>} />

 {/* Input */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Input</CardTitle>
 <CardDescription>
 Paste or type your lines below. We can trim and remove empty lines
 automatically.
 </CardDescription>
 </CardHeader>
 <CardContent className="grid gap-4">
 <TextareaField textareaClassName="min-h-[220px]" placeholder={`orange\napple\nBanana\nbanana \n grape\n\npear`} value={text} onValueChange={setText} />

 <div className="grid gap-3 sm:grid-cols-4">
 <SwitchRow label="Trim each line" hint="Remove leading & trailing spaces." checked={trimEach} onCheckedChange={v => setTrimEach(Boolean(v))} />
 <SwitchRow label="Remove empty lines" hint="Ignore blank lines in processing." checked={removeEmpty} onCheckedChange={v => setRemoveEmpty(Boolean(v))} />
 <SwitchRow label="Case sensitive" hint="Affects sort & dedupe." checked={caseSensitive} onCheckedChange={v => setCaseSensitive(Boolean(v))} />
 <SwitchRow label="Keep order on dedupe" hint="Preserve first occurrence." checked={keepOrder} onCheckedChange={v => setKeepOrder(Boolean(v))} />
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs text-muted-foreground">
 {inputHistory.map((h, idx) => <div key={idx as number} className="rounded-md border p-2">
 {h.label}: <strong>{h.value}</strong>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>

 <Separator />

 {/* Operations */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Operations</CardTitle>
 <CardDescription>
 Run one action at a time—result appears below.
 Prefix/suffix/numbering update live.
 </CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {/* Basic ops */}
 <div className="flex flex-wrap gap-2">
 {actions.map((a, i) => <ActionButton key={i as number} icon={a.icon} label={a.label} onClick={a.onClick} variant="outline" />)}
 </div>

 {/* Find & Replace */}
 <div className="rounded-md border">
 <div className="px-3 py-2 border-b flex items-center gap-2 text-sm font-medium">
 <Replace className="h-4 w-4" /> Find & Replace
 </div>
 <div className="p-3 grid gap-2 sm:grid-cols-2">
 <InputField label="Find" value={find} onChange={e => setFind(e.target.value)} placeholder={useRegex ? "regex e.g. ^foo" : "text"} />
 <InputField label="Replace" value={replace} onChange={e => setReplace(e.target.value)} placeholder="with..." />
 <div className="flex items-center gap-4">
 <SwitchRow label="Regex" checked={useRegex} onCheckedChange={v => setUseRegex(Boolean(v))} />
 <SwitchRow label="Whole word" checked={wholeWord} onCheckedChange={v => setWholeWord(Boolean(v))} disabled={useRegex} />
 </div>
 <div className="flex justify-end">
 <ActionButton icon={Search} label="Run Replace" onClick={actionFindReplace} disabled={!find} />
 </div>
 </div>
 </div>

 {/* Filter */}
 <div className="rounded-md border">
 <div className="px-3 py-2 border-b text-sm font-medium flex items-center gap-2">
 <Filter className="h-4 w-4" /> Filter lines
 </div>
 <div className="p-3 grid gap-2 sm:grid-cols-2">
 <InputField label="Query" value={filterQuery} onChange={e => setFilterQuery(e.target.value)} placeholder={filterRegex ? "regex e.g. \\d{3}" : "contains..."} />
 <div className="grid grid-cols-2 gap-2 items-end">
 <SwitchRow label="Regex" checked={filterRegex} onCheckedChange={v => setFilterRegex(Boolean(v))} />
 <SelectField options={[{
                  value: "keep",
                  label: "Keep matches"
                }, {
                  value: "remove",
                  label: "Remove matches"
                }]} value={filterMode} onValueChange={v => setFilterMode(v as "keep" | "remove")} placeholder="Action" />
 </div>
 <div className="sm:col-span-2 flex justify-end">
 <ActionButton icon={Filter} label="Apply Filter" onClick={actionFilter} disabled={!filterQuery} />
 </div>
 </div>
 </div>

 {/* Prefix / Suffix / Numbering — LIVE */}
 <div className="rounded-md border">
 <div className="px-3 py-2 border-b text-sm font-medium flex items-center gap-2">
 <ListOrdered className="h-4 w-4" /> Prefix / Suffix / Numbering
 </div>
 <div className="p-3 grid gap-3 sm:grid-cols-2">
 <InputField label="Prefix" value={prefix} onChange={e => setPrefix(e.target.value)} placeholder="e.g. -" />
 <InputField label="Suffix" value={suffix} onChange={e => setSuffix(e.target.value)} placeholder="e.g. ;" />
 <div className="grid sm:grid-cols-2 gap-2 items-end">
 <SwitchRow label="Enable numbering" checked={numbering} onCheckedChange={v => setNumbering(Boolean(v))} />
 <InputField label="Start number" type="number" value={String(startNum)} onChange={e => setStartNum(Number(e.target.value) || 1)} disabled={!numbering} />
 </div>
 <InputField label="Number separator" value={numSep} onChange={e => setNumSep(e.target.value)} disabled={!numbering} />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <Separator />

 {/* Output */}
 <GlassCard>
 <CardHeader>
 <div className="flex flex-wrap items-center justify-between">
 <div className="flex items-center gap-2">
 <CardTitle className="text-base">Output</CardTitle>
 <Badge variant="secondary">Live</Badge>
 </div>
 <CardDescription>
 Result of the last action with live affixes applied.
 </CardDescription>
 </div>
 </CardHeader>
 <CardContent className="space-y-3">
 <TextareaField readOnly value={output} onValueChange={() => {}} textareaClassName="min-h-[200px] font-mono" placeholder="Run an operation to see results here..." />
 <div className="flex flex-wrap gap-2">
 <ExportTextButton variant="default" filename="lines-output.txt" getText={() => output} disabled={!output} />
 <CopyButton getText={() => output || ""} disabled={!output} label="Copy Output" copiedLabel="Copied Output" />
 <ActionButton icon={Replace} label="Replace Input" onClick={() => setText(output)} disabled={!output} />
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Paste Your Lines",
        description: "Paste any multi-line text: a list, log output, CSV column, code lines, or any text where each line needs individual processing.",
        icon: AlignLeft
      }, {
        step: "02",
        title: "Choose an Operation",
        description: "Select from: Sort A-Z, Sort Z-A, Sort by length, Reverse order, Remove duplicates, Remove empty lines, Shuffle randomly, Number lines, Add prefix or suffix, Trim whitespace.",
        icon: Settings2
      }, {
        step: "03",
        title: "Copy the Result",
        description: "The processed output appears instantly. Copy all lines with one click or download as a text file. Your original text is preserved in the input.",
        icon: Copy
      }]} badges={["10+ operations", "Instant processing", "Non-destructive"]} />

 <ToolFeatureGuides features={[{
        icon: SortAsc,
        title: "Sort Lines",
        description: "Sort lines alphabetically (A-Z or Z-A), numerically, by line length (shortest or longest first), or by word count. Case-sensitive or case-insensitive sorting available."
      }, {
        icon: Filter,
        title: "Remove Duplicates",
        description: "Remove duplicate lines keeping the first occurrence. Case-sensitive or case-insensitive deduplication. See the count of removed duplicates after processing."
      }, {
        icon: Shuffle,
        title: "Shuffle and Reverse",
        description: "Randomly shuffle lines using a Fisher-Yates algorithm for true randomness. Or reverse the line order (last line first). Both operations run instantly in your browser."
      }, {
        icon: AlignLeft,
        title: "Clean and Trim",
        description: "Remove empty lines, trim leading and trailing whitespace from each line, collapse multiple consecutive blank lines, and normalize line endings from CRLF to LF."
      }, {
        icon: Settings2,
        title: "Add Prefix or Suffix",
        description: "Add custom text before or after every line. Add sequential line numbers, bullet points, or any string. Useful for formatting Markdown lists and preparing SQL INSERT values."
      }, {
        icon: Shield,
        title: "Client-Side and Private",
        description: "All operations run in your browser. No text is sent to any server. Safe for logs containing sensitive data, passwords, or confidential information."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Line Tools Operations Reference</h3>
 <p>Line-by-line text processing is one of the most common tasks in software development, data analysis, and content management. Whether deduplicating a mailing list, sorting log entries, or preparing data for import, these operations handle the task instantly without requiring a spreadsheet or command-line tools.</p>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Operation</th>
 <th className="border p-2 text-left">Description</th>
 <th className="border p-2 text-left">Common Use Case</th>
 </tr>
 </thead>
 <tbody>
 {[["Sort A-Z", "Alphabetical ascending sort", "Sort a list of names, words, or items"], ["Sort Z-A", "Alphabetical descending sort", "Reverse-alphabetical ordering"], ["Sort by Length", "Shortest to longest line", "Find shortest or longest entries"], ["Reverse Order", "Last line becomes first", "Reverse log output, reverse list"], ["Remove Duplicates", "Keep unique lines only", "Deduplicate email lists, keywords"], ["Remove Empty Lines", "Delete blank lines", "Clean up pasted text or log output"], ["Shuffle Lines", "Random order (Fisher-Yates)", "Randomize quiz questions, test data"], ["Number Lines", "Add 1. 2. 3. prefix", "Create numbered lists from plain text"], ["Trim Whitespace", "Strip leading and trailing spaces", "Clean up CSV data or pasted content"], ["Add Prefix or Suffix", "Add text to start or end of each line", "Format SQL VALUES, create arrays"]].map(([op, desc, use]) => <tr key={op} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{op}</td>
 <td className="border p-2 text-xs">{desc}</td>
 <td className="border p-2 text-muted-foreground text-xs">{use}</td>
 </tr>)}
 </tbody>
 </table>
 </div>
 <h3 className="text-lg font-semibold">Command-Line Equivalents for Developers</h3>
 <p>For developers who prefer the command line, here are the Unix equivalents of each line tool operation:</p>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Operation</th>
 <th className="border p-2 text-left">Unix Command</th>
 </tr>
 </thead>
 <tbody>
 {[["Sort A-Z", "sort file.txt"], ["Sort and dedupe", "sort -u file.txt"], ["Remove duplicates", "awk '!seen[$0]++' file.txt"], ["Reverse order", "tac file.txt"], ["Remove empty lines", "grep -v '^$' file.txt"], ["Shuffle lines", "shuf file.txt"], ["Number lines", "nl file.txt"], ["Trim whitespace", "sed 's/^[ \\t]*//;s/[ \\t]*$//' file.txt"]].map(([op, cmd]) => <tr key={op} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{op}</td>
 <td className="border p-2 font-mono text-primary text-xs">{cmd}</td>
 </tr>)}
 </tbody>
 </table>
 </div>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "How do I remove duplicate lines from text?",
        answer: "Paste your text into the input, select the Remove Duplicates operation, and click Process. The tool keeps the first occurrence of each unique line and removes all subsequent duplicates. Enable case-insensitive mode to treat Apple and apple as duplicates. The output shows the count of removed lines."
      }, {
        question: "Can I sort lines that contain numbers correctly?",
        answer: "Yes. Select Sort Numerically to sort lines that start with numbers in numeric order so that 2 comes before 10, unlike alphabetical sort where 10 comes before 2. Alphabetical sort treats each character individually, which incorrectly orders: 1, 10, 2, 20, 3. Numeric sort correctly orders: 1, 2, 3, 10, 20."
      }, {
        question: "How do I add bullet points to every line?",
        answer: "Use the Add Prefix operation and type your prefix: a bullet symbol, hyphen, or asterisk. Every line will have the prefix prepended. For Markdown lists use a hyphen and space as prefix. For numbered lists use the Number Lines operation instead."
      }, {
        question: "What is the difference between Remove Duplicates and Remove Empty Lines?",
        answer: "Remove Duplicates finds lines with identical content and removes all but the first occurrence. Remove Empty Lines removes lines that contain no characters or only whitespace. These are independent operations you can apply separately or chain together."
      }, {
        question: "Can I process very large text files?",
        answer: "Yes. The tool processes text entirely in your browser using JavaScript array operations and handles tens of thousands of lines without performance issues. For extremely large files with millions of lines, command-line tools like sort, uniq, and awk will be faster. For files over 50MB, the browser memory limit may apply."
      }]} />

 <RelatedTools currentToolUrl="/tools/text/line-tools" max={6} />
 </div></div>;
}