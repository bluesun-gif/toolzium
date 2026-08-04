"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LayoutGrid, Code, Copy, Monitor } from "lucide-react";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";

export function CssGridClient() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [colGap, setColGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);

  const reset = () => {
    setColumns(3);
    setRows(3);
    setColGap(16);
    setRowGap(16);
  };

  const cssCode = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  column-gap: ${colGap}px;
  row-gap: ${rowGap}px;
}`;

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={LayoutGrid}
        title="CSS Grid Generator"
        description="Design your CSS Grid layouts visually and copy the generated code."
        actions={<ResetButton onClick={reset} label="Reset" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Grid Settings</CardTitle>
            <CardDescription>Adjust the grid properties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Columns</Label>
              <Input type="number" min={1} max={12} value={columns} onChange={(e) => setColumns(Number(e.target.value) || 1)} />
            </div>
            <div className="space-y-2">
              <Label>Rows</Label>
              <Input type="number" min={1} max={12} value={rows} onChange={(e) => setRows(Number(e.target.value) || 1)} />
            </div>
            <div className="space-y-2">
              <Label>Column Gap (px)</Label>
              <Input type="number" min={0} value={colGap} onChange={(e) => setColGap(Number(e.target.value) || 0)} />
            </div>
            <div className="space-y-2">
              <Label>Row Gap (px)</Label>
              <Input type="number" min={0} value={rowGap} onChange={(e) => setRowGap(Number(e.target.value) || 0)} />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Generated CSS</CardTitle>
            <CardDescription>Copy the CSS code for your grid</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm">
              {cssCode}
            </pre>
            <CopyButton getText={() => cssCode} label="Copy CSS" />
          </CardContent>
        </GlassCard>
      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="w-full h-96 bg-muted/20 border border-dashed border-primary/20 rounded-lg overflow-auto"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              columnGap: `${colGap}px`,
              rowGap: `${rowGap}px`,
              padding: "16px"
            }}
          >
            {Array.from({ length: columns * rows }).map((_, i) => (
              <div key={i} className="bg-primary/10 border border-primary/30 rounded flex items-center justify-center font-mono text-primary/50 text-xl font-bold min-h-[50px]">
                {i + 1}
              </div>
            ))}
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
