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
import { Table, Copy, AlignLeft, Trash2, AlignCenter, AlignRight } from "lucide-react";
import toast from "react-hot-toast";

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
    <div className="space-y-6">
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
                              className={`w-full p-2 bg-transparent border-0 focus:ring-1 focus:ring-primary outline-none ${
                                alignments[c] === 'center' ? 'text-center' : alignments[c] === 'right' ? 'text-right' : 'text-left'
                              } ${r === 0 ? 'font-bold bg-muted/20' : ''}`}
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
    </div>
  );
}
