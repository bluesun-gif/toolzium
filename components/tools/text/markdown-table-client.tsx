"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { Table, Plus, Minus, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

export default function MarkdownTableClient() {
 const [rows, setRows] = useState(3);
 const [cols, setCols] = useState(3);
 const [data, setData] = useState<string[][]>(() =>
 Array(3).fill(null).map(() => Array(3).fill(""))
 );

 const markdownOutput = useMemo(() => {
 if (rows === 0 || cols === 0) return"";

 const header = `| ${data[0].join("|")} |`;
 const separator = `| ${Array(cols).fill("---").join("|")} |`;
 const body = data
 .slice(1)
 .map((row) => `| ${row.join("|")} |`)
 .join("\n");

 return `${header}\n${separator}\n${body}`;
 }, [data, rows, cols]);

 const updateCell = (row: number, col: number, value: string) => {
 const newData = [...data];
 newData[row][col] = value;
 setData(newData);
 };

 const addRow = () => {
 if (rows >= 10) {
 toast.error("Maximum 10 rows allowed");
 return;
 }
 setRows(rows + 1);
 setData([...data, Array(cols).fill("")]);
 };

 const removeRow = () => {
 if (rows <= 1) {
 toast.error("Minimum 1 row required");
 return;
 }
 setRows(rows - 1);
 setData(data.slice(0, -1));
 };

 const addCol = () => {
 if (cols >= 8) {
 toast.error("Maximum 8 columns allowed");
 return;
 }
 setCols(cols + 1);
 setData(data.map((row) => [...row,""]));
 };

 const removeCol = () => {
 if (cols <= 1) {
 toast.error("Minimum 1 column required");
 return;
 }
 setCols(cols - 1);
 setData(data.map((row) => row.slice(0, -1)));
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader
 icon={Table}
 title="Markdown Table Generator"
 description="Create Markdown tables visually with an interactive grid editor."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Table className="w-4 h-4 text-primary"/> Table Editor
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="flex gap-2 flex-wrap">
 <Button onClick={addRow} size="sm"variant="outline">
 <Plus className="w-4 h-4 mr-1"/> Add Row
 </Button>
 <Button onClick={removeRow} size="sm"variant="outline">
 <Minus className="w-4 h-4 mr-1"/> Remove Row
 </Button>
 <Button onClick={addCol} size="sm"variant="outline">
 <Plus className="w-4 h-4 mr-1"/> Add Column
 </Button>
 <Button onClick={removeCol} size="sm"variant="outline">
 <Minus className="w-4 h-4 mr-1"/> Remove Column
 </Button>
 </div>

 <div className="text-xs text-muted-foreground">
 Size: {rows} rows × {cols} columns
 </div>

 <div className="overflow-x-auto">
 <table className="w-full border-collapse">
 <tbody>
 {data.map((row, rowIdx) => (
 <tr key={rowIdx}>
 {row.map((cell, colIdx) => (
 <td key={colIdx} className="border border-border/60 p-1">
 <Input
 value={cell}
 onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
 placeholder={rowIdx === 0 ? `Header ${colIdx + 1}` : `Cell ${rowIdx}-${colIdx + 1}`}
 className="text-sm"
 />
 </td>
 ))}
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </CardContent>
 </GlassCard>

 {markdownOutput && (
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Copy className="w-4 h-4 text-primary"/> Markdown Output
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <pre className="p-3 bg-muted/40 rounded-lg overflow-x-auto text-sm font-mono">
 {markdownOutput}
 </pre>
 <CopyButton getText={() => markdownOutput} label="Copy Markdown"/>
 </CardContent>
 </GlassCard>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Build Your Table", description:"Use the grid editor to enter your table data row by row.", icon: Table },
 { step:"02", title:"Adjust Dimensions", description:"Add or remove rows and columns to match your data structure.", icon: Plus },
 { step:"03", title:"Copy Markdown", description:"Get the properly formatted Markdown table syntax instantly.", icon: Copy },
 ]}
 badges={["100% Free","Client-Side","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Table, title:"Visual Grid Editor", description:"Interactive table editor makes it easy to enter and organize your data."},
 { icon: Plus, title:"Dynamic Sizing", description:"Add or remove rows and columns on the fly to match your needs."},
 { icon: Copy, title:"Standard Markdown", description:"Generates GitHub-flavored Markdown table syntax compatible with most platforms."},
 { icon: Table, title:"Live Preview", description:"See your Markdown output update in real-time as you edit the table."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Markdown tables provide a clean, readable way to display tabular data in documentation, README files, and technical writing. However, writing Markdown table syntax by hand is error-prone and tedious, especially for larger tables. This visual generator eliminates the frustration by letting you build tables interactively.</p>
 <p>The tool generates GitHub-flavored Markdown (GFM) table syntax, which is supported by GitHub, GitLab, Bitbucket, and most modern Markdown renderers. The first row becomes the header, the second row contains alignment separators (---), and subsequent rows contain your data. Each cell is separated by pipe characters (|) for clean formatting.</p>
 <p>Use cases include creating comparison tables for product documentation, displaying configuration options, organizing feature lists, presenting data in README files, and building reference tables for API documentation. The visual editor makes it easy to adjust your table structure without manually counting pipes and dashes, ensuring your Markdown tables are always properly formatted.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What Markdown flavor does this generate?", answer:"This tool generates GitHub-flavored Markdown (GFM) table syntax, which is widely supported across platforms."},
 { question:"Can I align columns left, center, or right?", answer:"Currently, all columns use default left alignment. You can manually edit the separator row (---) to add colons for alignment after copying."},
 { question:"What's the maximum table size?", answer:"The tool supports up to 10 rows and 8 columns, which covers most documentation needs."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/text/markdown-table" max={6} />
 </div>
 );
}
