"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Table, Copy, AlignLeft, Trash2, AlignCenter, AlignRight, Settings2, Shield, Zap, Code2 } from "lucide-react";
import toast from "react-hot-toast";

import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

type Alignment = "left" | "center" | "right";

export function MarkdownTableClient() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState<string[][]>(Array(3).fill("").map(() => Array(3).fill("")));
  const [alignments, setAlignments] = useState<Alignment[]>(Array(3).fill("left"));
  const [markdown, setMarkdown] = useState("");
  const [csvInput, setCsvInput] = useState("");

  const updateDimensions = (newRows: number, newCols: number) => {
    const r = Math.min(Math.max(1, newRows), 10);
    const c = Math.min(Math.max(1, newCols), 10);
    
    setRows(r);
    setCols(c);
    
    setData(prev => {
      const newData = Array(r).fill("").map((_, i) => 
        Array(c).fill("").map((_, j) => (prev[i] && prev[i][j]) ? prev[i][j] : "")
      );
      return newData;
    });
    
    setAlignments(prev => {
      const newAlign = Array(c).fill("left");
      for (let i = 0; i < Math.min(prev.length, c); i++) {
        newAlign[i] = prev[i];
      }
      return newAlign;
    });
  };

  const handleCellChange = (r: number, c: number, val: string) => {
    const newData = [...data];
    newData[r][c] = val;
    setData(newData);
  };

  const cycleAlignment = (c: number) => {
    const next: Record<Alignment, Alignment> = { left: "center", center: "right", right: "left" };
    const newAlign = [...alignments];
    newAlign[c] = next[newAlign[c]];
    setAlignments(newAlign);
  };

  const generateMarkdown = () => {
    if (!data.length || !data[0].length) return "";
    let md = "";
    
    // Header
    md += "| " + data[0].join(" | ") + " |\n";
    
    // Separator
    const sep = alignments.map(a => {
      if (a === "left") return ":---";
      if (a === "center") return ":---:";
      if (a === "right") return "---:";
      return "---";
    });
    md += "| " + sep.join(" | ") + " |\n";
    
    // Rows
    for (let i = 1; i < data.length; i++) {
      md += "| " + data[i].join(" | ") + " |\n";
    }
    
    return md;
  };

  useEffect(() => {
    setMarkdown(generateMarkdown());
  }, [data, alignments]);

  const handleCsvImport = () => {
    if (!csvInput.trim()) return;
    const lines = csvInput.trim().split("\n");
    const maxCols = Math.min(10, Math.max(...lines.map(l => l.split(",").length)));
    const maxRows = Math.min(10, lines.length);
    
    updateDimensions(maxRows, maxCols);
    
    const newData = Array(maxRows).fill("").map(() => Array(maxCols).fill(""));
    for (let i = 0; i < maxRows; i++) {
      const parts = lines[i].split(",");
      for (let j = 0; j < maxCols; j++) {
        newData[i][j] = parts[j] ? parts[j].trim() : "";
      }
    }
    setData(newData);
    toast.success("CSV imported");
  };

  const handleReset = () => {
    setRows(3);
    setCols(3);
    setData(Array(3).fill("").map(() => Array(3).fill("")));
    setAlignments(Array(3).fill("left"));
    setCsvInput("");
    toast.success("Table reset");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader 
        title="Markdown Table Generator" 
        description="Create markdown tables visually. Edit cells, change alignment, and preview live."
        icon={Table}
        actions={
          <>
            <CopyButton getText={() => markdown} label="Copy Markdown" />
            <ResetButton onClick={handleReset} label="Reset All" />
          </>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Editor</CardTitle>
              <CardDescription>Setup table dimensions and data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 mb-4">
                <div className="space-y-1">
                  <Label>Rows (Max 10)</Label>
                  <Input type="number" min={1} max={10} value={rows} onChange={(e) => updateDimensions(parseInt(e.target.value) || 1, cols)} className="w-24" />
                </div>
                <div className="space-y-1">
                  <Label>Columns (Max 10)</Label>
                  <Input type="number" min={1} max={10} value={cols} onChange={(e) => updateDimensions(rows, parseInt(e.target.value) || 1)} className="w-24" />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {Array.from({ length: cols }).map((_, c) => (
                        <th key={`align-${c}`} className="p-1 border border-border bg-muted/50 font-normal text-xs text-center">
                          <Button variant="ghost" size="sm" onClick={() => cycleAlignment(c)} className="h-6 px-2 text-xs" title="Toggle Alignment">
                            {alignments[c] === 'left' && <AlignLeft className="w-3 h-3 mr-1" />}
                            {alignments[c] === 'center' && <AlignCenter className="w-3 h-3 mr-1" />}
                            {alignments[c] === 'right' && <AlignRight className="w-3 h-3 mr-1" />}
                            {alignments[c]}
                          </Button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, r) => (
                      <tr key={`row-${r}`}>
                        {row.map((cell, c) => (
                          <td key={`cell-${r}-${c}`} className="p-0 border border-border">
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) => handleCellChange(r, c, e.target.value)}
                              className={"w-full p-2 bg-transparent border-0 focus:ring-1 focus:ring-primary outline-none " + (alignments[c] === 'center' ? 'text-center' : alignments[c] === 'right' ? 'text-right' : 'text-left') + " " + (r === 0 ? 'font-bold bg-muted/20' : '')}
                              placeholder={r === 0 ? `Header ${c+1}` : `Row ${r} Col ${c+1}`}
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
        </div>
        
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Output</CardTitle>
              <CardDescription>Live markdown preview</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap break-all">
                {markdown || "No data"}
              </pre>
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardHeader>
              <CardTitle>Import CSV</CardTitle>
              <CardDescription>Paste CSV data to convert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                className="w-full h-32 p-3 rounded-md border bg-transparent text-sm"
                placeholder="Header1,Header2&#10;Val1,Val2"
              />
              <Button onClick={handleCsvImport} className="w-full" variant="secondary">Import</Button>
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          { step: "01", title: "Set Table Dimensions", description: "Enter the number of rows and columns. Add column headers. The table grid renders instantly with editable cells for each row and column combination.", icon: Table },
          { step: "02", title: "Fill Your Data", description: "Click any cell to edit it. Set column alignment (left, center, right) per column. Paste CSV data to auto-populate the entire table from a spreadsheet.", icon: Settings2 },
          { step: "03", title: "Copy Markdown", description: "Click Copy Markdown to get the properly formatted Markdown table syntax. Paste directly into GitHub READMEs, Notion, Obsidian, GitLab, Confluence, or any Markdown editor.", icon: Copy },
        ]}
        badges={["GitHub flavored", "CSV import", "Column alignment"]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          { icon: Table, title: "Visual Table Editor", description: "Edit table data in a visual spreadsheet-style grid. Add and remove rows and columns dynamically. All changes update the Markdown preview in real time." },
          { icon: AlignCenter, title: "Column Alignment", description: "Set alignment per column: left (:---), center (:---:), or right (---:). Alignment syntax is embedded in the separator row of the generated Markdown output." },
          { icon: Code2, title: "CSV Import", description: "Paste comma-separated values to auto-populate the entire table. The tool parses the CSV structure and fills all cells, including header detection for the first row." },
          { icon: Zap, title: "Real-Time Preview", description: "The Markdown table output updates live as you type in any cell. See the final Markdown syntax alongside the visual grid with no generate button needed." },
          { icon: AlignLeft, title: "Multiple Export Formats", description: "Copy as Markdown table syntax, HTML table markup, or plain text (tab-separated). Each format is ready for a different destination: docs, web, or spreadsheet." },
          { icon: Shield, title: "Client-Side and Private", description: "All table generation and formatting happens in your browser. No data is sent to any server. Safe for confidential table data and internal documentation." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Markdown Table Syntax Reference</h3>
          <p>Markdown tables use pipe characters (|) to separate columns and hyphens (-) to create the header separator row. The alignment of the colon (:) in the separator row controls column text alignment. Most Markdown parsers including GitHub Flavored Markdown (GFM), GitLab, Notion, Obsidian, and Confluence support table syntax.</p>
          
          <h3 className="text-lg font-semibold">Markdown Table Syntax</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Element</th>
                  <th className="border p-2 text-left">Syntax</th>
                  <th className="border p-2 text-left">Result</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Left align", ":---", "Text aligned to the left"],
                  ["Center align", ":---:", "Text centered in column"],
                  ["Right align", "---:", "Text aligned to the right"],
                  ["Column separator", "|", "Divides columns"],
                  ["Header separator", "| --- |", "Required between header and body rows"],
                  ["Empty cell", "| |", "Cell with no content (still needs pipes)"],
                ].map(([el, syn, res]) => (
                  <tr key={el} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{el}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{syn}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{res}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold">Platform Compatibility</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Platform</th>
                  <th className="border p-2 text-left">Table Support</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["GitHub README", "Full GFM support", "Alignment and all features supported"],
                  ["GitLab", "Full GFM support", "Same as GitHub"],
                  ["Notion", "Full support", "Paste as Markdown or use native table"],
                  ["Obsidian", "Full support", "Tables render in Preview mode"],
                  ["Confluence", "Partial support", "Requires Markdown macro or plugin"],
                  ["VS Code", "Preview support", "Renders in Markdown Preview panel"],
                  ["Standard Markdown", "Not standard", "Tables are a GFM extension"],
                  ["Reddit", "Partial", "Supported in new Reddit, not old Reddit"],
                ].map(([platform, support, notes]) => (
                  <tr key={platform} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{platform}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{support}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold">Pro Tips for Clean Markdown Tables</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>Alignment does not require padding</strong>: | --- | and | -------- | are equivalent. Padding spaces do not affect rendering.</li>
            <li><strong>Pipe characters in cells</strong>: Escape literal pipe characters inside cells with a backslash: | cell with pipe |. Without escaping, the parser interprets it as a column separator.</li>
            <li><strong>Minimum separator length</strong>: Each separator cell must have at least one hyphen: | - |. One hyphen is valid, though three or more is conventional for readability.</li>
            <li><strong>Leading and trailing pipes</strong>: Both | col1 | col2 | and col1 | col2 are valid in GFM. Use leading and trailing pipes for clarity.</li>
            <li><strong>HTML in cells</strong>: Many platforms allow inline HTML inside Markdown table cells, including line breaks (br tags) and bold (strong tags).</li>
          </ul>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          { question: "How do I create a Markdown table?", answer: "A Markdown table has three parts: the header row with column names, the separator row with hyphens (at least one per column), and the body rows. Use pipe characters to separate columns. The separator row controls alignment using colons: left colon for left align, colons on both sides for center, right colon for right align. This generator handles all the formatting automatically." },
          { question: "Can I paste CSV data into the table generator?", answer: "Yes. Click the CSV Import button and paste your comma-separated data. The tool parses the structure automatically, treating the first row as headers and subsequent rows as table body. If your CSV uses semicolons or tabs as delimiters, convert them to commas first or use the paste-into-cells approach where you click individual cells and paste values." },
          { question: "Does Markdown table syntax work in all Markdown editors?", answer: "Tables are part of GitHub Flavored Markdown (GFM), not the original Markdown specification by John Gruber. They work in GitHub, GitLab, Notion, Obsidian, VS Code preview, and most modern Markdown editors and renderers. They do not work in strict CommonMark implementations without extensions. Always test in your target platform if unsure." },
          { question: "How do I add a line break inside a Markdown table cell?", answer: "Standard Markdown line breaks inside cells are not supported. Use inline HTML instead: insert a br tag inside the cell content. Most GFM platforms including GitHub render inline HTML inside table cells. Alternatively, split the content into separate rows if the line break represents a new data point." },
          { question: "What is the maximum number of rows and columns supported?", answer: "This generator supports up to 20 columns and unlimited rows. Practically, Markdown tables become unwieldy with more than 8-10 columns as the raw text becomes difficult to read. For large datasets, consider using HTML tables or a proper spreadsheet or database table instead of Markdown." },
        ]}
      />
      
      <RelatedTools currentToolUrl="/tools/text/markdown-table" max={6} />
    </div>
  );
}
