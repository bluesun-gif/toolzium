"use client";

import {
 ArrowLeftRight,
 Diff as DiffIcon,
 ListTree,
 Settings2,
 BookOpen,
 Shield,
 GitCompare,
 FileText,
 Code2,
 Layers,
 AlignLeft,
 Eye,
 Download
} from"lucide-react";
import * as React from"react";

import {
 ActionButton,
 CopyButton,
 ExportTextButton,
 ResetButton,
} from"@/components/shared/action-buttons";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import InputField from"@/components/shared/form-fields/input-field";
import SelectField from"@/components/shared/form-fields/select-field";
import SwitchRow from"@/components/shared/form-fields/switch-row";
import TextareaField from"@/components/shared/form-fields/textarea-field";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Badge } from"@/components/ui/badge";
import { CardContent } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Separator } from"@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from"@/components/ui/tabs";
import { cn } from"@/lib/utils";
import { buildUnified, clamp, diffTokens, normalize, tokenize } from"@/lib/utils/dev/diff-checker";
import { GridPattern } from"@/components/magicui/grid-pattern";

export default function DiffCheckerClient() {
 const [a, setA] = React.useState<string>("");
 const [b, setB] = React.useState<string>("");
 const [granularity, setGranularity] = React.useState<Granularity>("line");
 const [ignoreCase, setIgnoreCase] = React.useState<boolean>(false);
 const [ignoreWs, setIgnoreWs] = React.useState<boolean>(false);
 const [collapse, setCollapse] = React.useState<boolean>(true);
 const [context, setContext] = React.useState<number>(3);
 const [showLineNos, setShowLineNos] = React.useState<boolean>(true);
 const [auto, setAuto] = React.useState<boolean>(true);
 const [activeTab, setActiveTab] = React.useState<TabKey>("split");

 const compute = React.useCallback(() => {
 const A = normalize(a, { ignoreCase, ignoreWs });
 const B = normalize(b, { ignoreCase, ignoreWs });
 const tA = tokenize(A, granularity);
 const tB = tokenize(B, granularity);
 return diffTokens(tA, tB);
 }, [a, b, granularity, ignoreCase, ignoreWs]);

 const [chunks, setChunks] = React.useState<DiffChunk[]>([]);

 // Auto recompute
 React.useEffect(() => {
 if (auto) {
 setChunks(compute());
 }
 }, [auto, compute]);

 const recomputeNow = React.useCallback(() => {
 setChunks(compute());
 }, [compute]);

 const unified = React.useMemo(
 () => buildUnified(chunks, clamp(context, 0, 20)),
 [chunks, context],
 );

 const stats = React.useMemo(() => {
 let adds = 0;
 let dels = 0;
 let equals = 0;
 for (const c of chunks) {
 if (c.op ==="add") adds += c.b.length;
 else if (c.op ==="remove") dels += c.a.length;
 else equals += c.a.length;
 }
 return { adds, dels, equals, total: adds + dels + equals };
 }, [chunks]);

 const swap = () => {
 setA(b);
 setB(a);
 };

 const resetAll = () => {
 setA("");
 setB("");
 setGranularity("line");
 setIgnoreCase(false);
 setIgnoreWs(false);
 setCollapse(true);
 setContext(3);
 setShowLineNos(true);
 setAuto(true);
 setActiveTab("split");
 setChunks([]);
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern />

 <ToolPageHeader
 title="Diff Checker"
 description="Compare text inputs and see differences in split or unified view."
 icon={DiffIcon}
 actions={
 <>
 <ResetButton onClick={resetAll} />
 <ActionButton onClick={swap} icon={ArrowLeftRight} label="Swap"/>
 {!auto && <ActionButton onClick={recomputeNow} icon={Settings2} label="Update now"/>}
 <CopyButton getText={unified} label="Copy Diff"disabled={!unified} />
 <ExportTextButton
 disabled={!unified}
 variant="default"
 filename="diff.patch"
 getText={() => unified}
 label="Export PATCH"
 />
 </>
 }
 />

 {/* Inputs */}
 <GlassCard>
 <CardContent>
 <div className="grid gap-4 lg:grid-cols-2">
 <TextareaField
 id="original"
 label="Original (A)"
 placeholder="Paste or type the original text here…"
 value={a}
 onChange={(e) => setA(e.target.value)}
 autoResize
 textareaClassName="min-h-[220px]"
 />
 <TextareaField
 id="modified"
 label="Modified (B)"
 placeholder="Paste or type the modified text here…"
 value={b}
 onChange={(e) => setB(e.target.value)}
 autoResize
 textareaClassName="min-h-[220px]"
 />
 </div>

 <Separator className="my-4"/>

 {/* Settings */}
 <div className="grid gap-4 lg:grid-cols-3">
 <GlassCard className="p-3">
 <div className="flex items-center gap-2">
 <Settings2 className="h-4 w-4"/>
 <div className="text-sm font-medium">Options</div>
 </div>
 <div className="grid gap-2">
 <SelectField
 id="granularity"
 label="Granularity"
 value={granularity}
 onValueChange={(v) => setGranularity(v as Granularity)}
 options={[
 { label:"Line", value:"line"},
 { label:"Word", value:"word"},
 { label:"Character", value:"char"},
 ]}
 />
 <SwitchRow
 label="Ignore case"
 checked={ignoreCase}
 onCheckedChange={setIgnoreCase}
 />
 <SwitchRow
 label="Ignore extra spaces"
 checked={ignoreWs}
 onCheckedChange={setIgnoreWs}
 />
 <SwitchRow label="Auto update"checked={auto} onCheckedChange={setAuto} />
 </div>
 </GlassCard>

 <GlassCard className="p-3">
 <div className="flex items-center gap-2">
 <ListTree className="h-4 w-4"/>
 <div className="text-sm font-medium">Viewer</div>
 </div>
 <div className="grid gap-2">
 <SwitchRow
 label="Collapse unchanged"
 checked={collapse}
 onCheckedChange={setCollapse}
 />
 <InputField
 id="context"
 type="number"
 label="Context lines"
 min={0}
 max={50}
 value={String(context)}
 onChange={(e) => setContext(clamp(Number(e.target.value) || 0, 0, 50))}
 />
 <SwitchRow
 label="Show line numbers (split)"
 checked={showLineNos}
 onCheckedChange={setShowLineNos}
 />
 </div>
 </GlassCard>

 <GlassCard className="p-3">
 <div className="text-sm font-medium">Summary</div>
 <div className="grid grid-cols-3 gap-2 text-center">
 <StatPill label="Added"value={stats.adds} tone="add"/>
 <StatPill label="Removed"value={stats.dels} tone="remove"/>
 <StatPill label="Unchanged"value={stats.equals} tone="muted"/>
 </div>
 <div className="mt-2 text-xs text-muted-foreground">
 Total tokens: <b>{stats.total}</b> • Mode: <b>{granularity}</b>
 </div>
 </GlassCard>
 </div>
 </CardContent>
 </GlassCard>

 <Separator className="my-4"/>

 {/* Results */}
 <GlassCard>
 <CardContent>
 <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)}>
 <div className="flex flex-wrap items-center justify-between gap-2">
 <TabsList className="flex-1">
 <TabsTrigger value="split">Split</TabsTrigger>
 <TabsTrigger value="unified">Unified</TabsTrigger>
 <TabsTrigger value="stats">Stats</TabsTrigger>
 </TabsList>
 <div className="flex items-center gap-2">
 {!auto && (
 <ActionButton label="Update now"onClick={recomputeNow} icon={Settings2} />
 )}
 <ExportTextButton
 disabled={!unified}
 variant="default"
 filename="diff.patch"
 getText={() => unified}
 label="Download .patch"
 />
 </div>
 </div>

 <TabsContent value="split">
 <SplitView
 chunks={chunks}
 collapse={collapse}
 context={context}
 showLineNos={showLineNos}
 />
 </TabsContent>

 <TabsContent value="unified">
 <pre className="max-h-[520px] overflow-auto rounded-md border bg-muted/30 p-3 text-xs leading-relaxed">
 {unified ||"—"}
 </pre>
 </TabsContent>

 <TabsContent value="stats">
 <div className="grid gap-3 md:grid-cols-3">
 <Kpi label="Added"value={stats.adds} />
 <Kpi label="Removed"value={stats.dels} />
 <Kpi label="Unchanged"value={stats.equals} />
 </div>
 <div className="mt-3 rounded-md border p-3 text-xs text-muted-foreground">
 The diff is computed with an LCS (Longest Common Subsequence) over the chosen
 granularity (line / word / char). For very large inputs, we fall back to a trivial
 hunk to avoid slow or memory-heavy computations.
 </div>
 </TabsContent>
 </Tabs>
 </CardContent>
 </GlassCard>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Paste Your Texts",
 description:"Paste the original text in the left panel and the modified/new text in the right panel. Works with code, prose, JSON, config files, or any plain text.",
 icon: FileText,
 },
 {
 step:"02",
 title:"See Differences Highlighted",
 description:"Additions are highlighted in green, deletions in red. View side-by-side or unified diff mode. Each changed line is clearly marked.",
 icon: Eye,
 },
 {
 step:"03",
 title:"Copy or Export",
 description:"Copy the diff output or export it. Use it for code reviews, change tracking, documentation updates, or comparing configuration files.",
 icon: BookOpen,
 },
 ]}
 badges={[
"Line-by-line diff",
"Works offline",
"No data uploads",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: GitCompare,
 title:"Side-by-Side Comparison",
 description:"View original and modified text side-by-side with synchronized scrolling — the clearest way to spot changes in longer documents.",
 },
 {
 icon: Eye,
 title:"Inline Diff Highlighting",
 description:"Unified view shows insertions (green), deletions (red), and context lines in a single column — the format used by Git and patch files.",
 },
 {
 icon: Code2,
 title:"Code-Friendly",
 description:"Preserves whitespace and indentation faithfully. Perfect for comparing source code, JSON configs, YAML files, SQL scripts, and HTML templates.",
 },
 {
 icon: Layers,
 title:"Change Statistics",
 description:"See at-a-glance totals: lines added, lines removed, lines unchanged. Useful for estimating code review scope or change magnitude.",
 },
 {
 icon: AlignLeft,
 title:"Any Text Type",
 description:"Works with any plain text — prose documents, CSV data, Markdown files, configuration INI files, log files, or shell scripts.",
 },
 {
 icon: Shield,
 title:"Private & Offline",
 description:"All comparison runs entirely in your browser. Your text is never sent to any server — safe for comparing confidential code or documents.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Text Diff Explained — How Comparison Algorithms Work</h3>
 <p>
 A <strong>diff</strong> (short for"difference") is a representation of the changes between two texts.
 The concept originated with the Unix <code>diff</code> command (1974) and became foundational to
 modern software development through version control systems like Git. Understanding how diffs work
 helps you use them more effectively for code review, documentation management, and change tracking.
 </p>

 <h4 className="font-semibold">Diff Output Format Reference</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Symbol / Color</th>
 <th className="border p-2 text-left">Meaning</th>
 <th className="border p-2 text-left">In Git Output</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["+ (green)","Line added in the new version","+added line"],
 ["- (red)","Line removed from the original","-removed line"],
 ["(white/gray)","Unchanged context line","context line"],
 ["@@ -a,b +c,d @@","Hunk header: line range in old/new file","@@ -1,5 +1,7 @@"],
 ].map(([sym, meaning, git]) => (
 <tr key={sym} className="odd:bg-muted/20">
 <td className="border p-2 font-mono font-medium text-xs">{sym}</td>
 <td className="border p-2 text-xs">{meaning}</td>
 <td className="border p-2 font-mono text-muted-foreground text-xs">{git}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Diff Algorithms Comparison</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Algorithm</th>
 <th className="border p-2 text-left">Used By</th>
 <th className="border p-2 text-left">Best For</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Myers (default)","Git, GNU diff","General purpose; finds shortest edit path"],
 ["Patience","Git (--patience), Bazaar","Code with repeated lines; cleaner hunks"],
 ["Histogram","Git (--histogram)","Similar to Patience but faster on large files"],
 ["Levenshtein","Spell checkers, fuzzy match","Character-level edit distance"],
 ].map(([algo, usedBy, best]) => (
 <tr key={algo} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{algo}</td>
 <td className="border p-2 text-muted-foreground text-xs">{usedBy}</td>
 <td className="border p-2 text-xs">{best}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Common Use Cases for Text Diff Tools</h4>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li><strong>Code review:</strong> Compare before/after versions of a function or module to understand what changed.</li>
 <li><strong>Config file auditing:</strong> Spot differences between staging and production configuration files before deployment.</li>
 <li><strong>Document revision:</strong> Track changes between draft versions of legal documents, reports, or articles.</li>
 <li><strong>API response comparison:</strong> Compare JSON responses from two API versions to verify backward compatibility.</li>
 <li><strong>Database schema comparison:</strong> Diff CREATE TABLE statements to audit schema migrations.</li>
 <li><strong>Log analysis:</strong> Compare log files from two time periods to identify new error patterns.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"What types of text can I compare with this tool?",
 answer:"Any plain text — source code (JavaScript, Python, SQL, etc.), configuration files (JSON, YAML, INI, TOML), Markdown documents, CSV data, HTML, log files, or prose. The tool compares line-by-line, so it works on any text format.",
 },
 {
 question:"What is the difference between unified and side-by-side diff view?",
 answer:"Unified diff shows all changes in a single column with + and - prefixes, like Git output — compact and good for sharing. Side-by-side diff shows original and modified text in two columns with changes highlighted — better for visual review of larger texts.",
 },
 {
 question:"Is my text sent to a server when I use this diff checker?",
 answer:"No. All diffing runs locally in your browser using a JavaScript diff library. Your text never leaves your device, making it safe for comparing confidential source code, proprietary documents, or sensitive configuration files.",
 },
 {
 question:"Can this tool compare files (not just pasted text)?",
 answer:"The tool accepts text input by pasting. For full file comparison workflows, use it alongside your IDE's built-in diff tool (VS Code has excellent built-in diffing) or Git's diff command for version-controlled files.",
 },
 {
 question:"How does the diff algorithm handle whitespace changes?",
 answer:"By default, whitespace changes (spaces, tabs, line endings) are treated as real changes and shown in the diff. This is important for languages where indentation is significant, like Python or YAML.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/dev/diff-checker" max={6} />
 </div>
 );
}

/* =============================== Subcomponents ============================== */

function SplitView({
 chunks,
 collapse,
 context,
 showLineNos,
}: {
 chunks: DiffChunk[];
 collapse: boolean;
 context: number;
 showLineNos: boolean;
}) {
 const rows: Array<{ left?: string; right?: string; type:"equal"|"add"|"remove"}> = [];

 for (const c of chunks) {
 const leftLines = c.op ==="add"? [] : c.a.join("").split("\n");
 const rightLines = c.op ==="remove"? [] : c.b.join("").split("\n");

 if (c.op ==="equal") {
 const L = Math.max(leftLines.length, rightLines.length);
 for (let i = 0; i < L; i++) {
 rows.push({ left: leftLines[i] ??"", right: rightLines[i] ??"", type:"equal"});
 }
 } else if (c.op ==="remove") {
 for (const l of leftLines) rows.push({ left: l, type:"remove"});
 } else {
 for (const r of rightLines) rows.push({ right: r, type:"add"});
 }
 }

 const finalRows: typeof rows = [];
 if (collapse) {
 let i = 0;
 while (i < rows.length) {
 if (rows[i].type !=="equal") {
 finalRows.push(rows[i++]);
 continue;
 }
 const start = i;
 while (i < rows.length && rows[i].type ==="equal") i++;
 const end = i;
 const len = end - start;
 if (len > context * 2 + 1) {
 for (let k = 0; k < context; k++) finalRows.push(rows[start + k]);
 finalRows.push({ type:"equal", left: `… ${len - context * 2} unchanged lines …` });
 for (let k = end - context; k < end; k++) finalRows.push(rows[k]);
 } else {
 for (let k = start; k < end; k++) finalRows.push(rows[k]);
 }
 }
 } else {
 finalRows.push(...rows);
 }

 let ln = 1;
 let rn = 1;

 return (
 <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
 <div className="rounded-md border">
 <Header label="Original (A)"/>
 <div className="max-h-[520px] overflow-auto p-2 text-sm leading-relaxed">
 {finalRows.map((r, i) => {
 const lineNo =
 r.type ==="remove"|| r.type ==="equal"? (
 <span
 key={i as number}
 className="w-10 shrink-0 text-right text-xs text-muted-foreground"
 >
 {r.left != null && showLineNos ? ln :""}
 </span>
 ) : (
 <span key={i as number} className="w-10 shrink-0"/>
 );

 const content =
 r.type ==="equal"? (
 <span key={i as number}>{r.left ??""}</span>
 ) : r.type ==="remove"? (
 <span key={i as number} className="bg-destructive/15 text-destructive">
 {r.left ??""}
 </span>
 ) : (
 <span key={i as number} className="opacity-50">
 {r.left ??""}
 </span>
 );

 const rowEl = (
 <div
 key={`l${i as number}`}
 className={cn(
"flex items-start gap-2 whitespace-pre-wrap break-words border-b px-2 py-1",
 r.type ==="remove"&&"bg-destructive/10",
 )}
 >
 {lineNo}
 <div className="min-w-0 flex-1 font-mono">{content}</div>
 </div>
 );

 if (r.left != null && (r.type ==="equal"|| r.type ==="remove")) ln++;
 return rowEl;
 })}
 </div>
 </div>

 <div className="rounded-md border">
 <Header label="Modified (B)"/>
 <div className="max-h-[520px] overflow-auto p-2 text-sm leading-relaxed">
 {finalRows.map((r, i) => {
 const lineNo =
 r.type ==="add"|| r.type ==="equal"? (
 <span
 key={i as number}
 className="w-10 shrink-0 text-right text-xs text-muted-foreground"
 >
 {r.right != null && showLineNos ? rn :""}
 </span>
 ) : (
 <span key={i as number} className="w-10 shrink-0"/>
 );

 let content: React.ReactNode;
 if (r.type ==="equal") {
 content = <span>{r.right ??""}</span>;
 } else if (r.type ==="add") {
 content = <span className="bg-emerald-500/15 text-emerald-600">{r.right ??""}</span>;
 } else {
 content = <span className="opacity-50">{r.right ??""}</span>;
 }

 const rowEl = (
 <div
 key={`r${i as number}`}
 className={cn(
"flex items-start gap-2 whitespace-pre-wrap break-words border-b px-2 py-1",
 r.type ==="add"&&"bg-emerald-500/10",
 )}
 >
 {lineNo}
 <div className="min-w-0 flex-1 font-mono">{content}</div>
 </div>
 );
 if (r.right != null && (r.type ==="equal"|| r.type ==="add")) rn++;
 return rowEl;
 })}
 </div>
 </div>
 </div>
 );
}

function Header({ label }: { label: string }) {
 return (
 <div className="flex items-center justify-between border-b bg-muted/40 px-3 py-2">
 <div className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
 {label}
 </div>
 <Badge variant="outline"className="text-[10px]">
 Monospace view
 </Badge>
 </div>
 );
}

/* UI pieces */

function StatPill({
 label,
 value,
 tone,
}: {
 label: string;
 value: number | string;
 tone:"add"|"remove"|"muted";
}) {
 const toneClass =
 tone ==="add"
 ?"bg-emerald-500/15 text-emerald-600"
 : tone ==="remove"
 ?"bg-destructive/15 text-destructive"
 :"bg-muted/50 text-muted-foreground";
 return (
 <div className={cn("rounded-md px-3 py-2 text-center", toneClass)}>
 <div className="text-xs">{label}</div>
 <div className="text-lg font-semibold">{value}</div>
 </div>
 );
}

function Kpi({ label, value }: { label: string; value: number }) {
 return (
 <div className="rounded-lg border p-3">
 <div className="text-sm text-muted-foreground">{label}</div>
 <div className="text-2xl font-semibold">{value}</div>
 </div>
 );
}
