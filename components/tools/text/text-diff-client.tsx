"use client";

import { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import { Split, Copy, ArrowLeftRight, Trash2 } from "lucide-react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import * as diff from "diff";

export function TextDiffClient() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [isInline, setIsInline] = useState(false);

  const handleSwap = () => {
    setLeftText(rightText);
    setRightText(leftText);
  };

  const handleClear = () => {
    setLeftText("");
    setRightText("");
  };

  const diffResult = useMemo(() => {
    return diff.diffLines(leftText, rightText);
  }, [leftText, rightText]);

  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    let unchanged = 0;

    diffResult.forEach(part => {
      const lineCount = part.count || 0;
      if (part.added) added += lineCount;
      else if (part.removed) removed += lineCount;
      else unchanged += lineCount;
    });

    return { added, removed, unchanged };
  }, [diffResult]);

  const getDiffText = () => {
    return diffResult.map(part => {
      const prefix = part.added ? "+ " : part.removed ? "- " : "  ";
      return part.value.split('\n').filter((line, index, arr) => index < arr.length - 1 || line !== '').map(line => prefix + line).join('\n');
    }).join('\n');
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Split}
        title="Text Diff Viewer"
        description="Compare two text snippets side-by-side to easily find differences."
        actions={
          <>
            <ActionButton onClick={handleSwap} icon={ArrowLeftRight} label="Swap Texts" />
            <ResetButton onClick={handleClear} label="Clear All" />
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard>
          <CardHeader>
            <CardTitle>Original Text</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full min-h-[300px] p-3 rounded-md border bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              placeholder="Paste original text here..."
            />
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Modified Text</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full min-h-[300px] p-3 rounded-md border bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              placeholder="Paste modified text here..."
            />
          </CardContent>
        </GlassCard>
      </div>

      <GlassCard>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Difference Comparison</CardTitle>
            <CardDescription>
              <span className="text-green-500 font-semibold">{stats.added}</span> additions,{" "}
              <span className="text-red-500 font-semibold">{stats.removed}</span> deletions,{" "}
              <span className="text-muted-foreground">{stats.unchanged}</span> unchanged lines.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch id="inline-diff" checked={isInline} onCheckedChange={setIsInline} />
              <Label htmlFor="inline-diff">Inline Diff</Label>
            </div>
            <CopyButton getText={getDiffText} label="Copy Diff" />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0 overflow-hidden">
          <div className="overflow-x-auto p-4 bg-muted/30">
            <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {diffResult.map((part, index) => {
                const colorClass = part.added
                  ? "bg-green-500/20 text-green-700 dark:text-green-400"
                  : part.removed
                  ? "bg-red-500/20 text-red-700 dark:text-red-400"
                  : "text-foreground";
                  
                if (!isInline && part.removed) {
                   // In side-by-side we might want to do more complex rendering, 
                   // but for simplicity here we'll just render unified diff with different colors
                }

                return (
                  <span key={index} className={cn("block px-2", colorClass)}>
                    {part.value}
                  </span>
                );
              })}
            </pre>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
